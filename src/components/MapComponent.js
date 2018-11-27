// REACT
import React, { PureComponent } from 'react';
// STYLE
import "./MapComponent.css";
// MAPBOX + REACT-MAPBOX
import ReactMapboxGl, { Layer, Marker, Feature, Popup } from 'react-mapbox-gl';
// DATABASE
import sushis from '../database/sushis';
// COMPONENTS
import OverlayList from './OverlayList';
import RestaurantModal from './RestaurantModal';




const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1Ijoic3loa28iLCJhIjoiY2prMThnbnVhMDR6NTNvcnc3ZGNwbGV2ZCJ9.HaLGB6YPhrcvJbEkvg3U1A"
});

class MapComponent extends PureComponent {

  state = {
    initCenter: [18.063240,	59.334591],
    initZoom: [12],
    initPitch: [30],
    geodata: sushis,
    PopUpCoord: {},
    PopUpText: [],
    boundNE: [18.14569055631918, 59.39432212307344],
    boundSE: [17.980735763032868, 59.39432212307344],
    boundSW: [18.14569055631918, 59.29325007072629],
    boundNW: [18.14569055631918, 59.29325007072629],
    showPopUp: false,
    showModal: false,
    ratingValue: 0,
    modalName: []
  }

  //Allow a popup to render with given coordinates and name of feature hovered
  togglePopup = (event) => {
    const popupId = event.feature.properties.id;
    this.setState({ showPopUp : true, PopUpText : this.state.geodata.sushis[popupId].properties.name, PopUpCoord : this.state.geodata.sushis[popupId].geometry.coordinates });
  }

  //Set the trigger off to remove popup
  detogglePopup = (event) => {
    this.setState({ showPopUp : false });
  }

  //Set a popup with informations given from grand child OverlayElement when div hovered
  PopupByOverlay = (event) => {
    this.setState({ showPopUp : true, PopUpText : event.name, PopUpCoord : event.coordinates });
  }

  //Set position of the center of the map on the clicked feature, be careful zoom have to be an array !
  goToPosition = (event) => {
    this.setState({ initCenter : [event.lngLat.lng, event.lngLat.lat], initZoom : [17], resistshowPopUp: true })
  }

  //Set the position of the map and zoom with coordinates given by grand child OverlayElement when hovered
  goToPositionbyOverlay = (event) => {
    this.setState({ initCenter : [event.coordinates[0], event.coordinates[1]], initZoom : [17] })
  }

  openModal = (event) => {
    this.setState({ showModal : true, modalName : event.name });
    console.log(event);
  }

  closeModal = () => {
    this.setState({ showModal : false });
  }

  render() {

    const { modalName, ratingValue, showModal, closeModal, initPitch, initZoom, initCenter, geodata, PopUpText, PopUpCoord, showPopUp } = this.state;
    const sushisList = geodata.sushis;

    //mapping through the state to extract just the array of coordinates
    const sushisCoordinates = sushisList.map(list => list.geometry).map(geometry => geometry.coordinates);

    //constructing the layer of all markers with the array of coordinates
    const sushisFeatures = sushisCoordinates.map((coordinates, key) =>(
    <Feature
        className="sushi-feature"
        coordinates={sushisCoordinates[key]}
        onClick={this.goToPosition}
        key={key}
        onMouseEnter={this.togglePopup}
        onMouseLeave={this.detogglePopup}
      />
    ));

    return(
      <div>
        <Map
          className="map"
          ref="map"
          movingMethod="flyTo"
          flyToOptions={{
            speed:"0.8"
          }}
          style={"mapbox://styles/mapbox/dark-v9"}
          center={initCenter}
          zoom={initZoom}
          pitch={initPitch}
          containerStyle={{
          height: "100vh",
          width: "81vw"
          }}
          onZoomEnd={this.resetPitch}
          onMove={(map) => { this.setState({
            boundNE : [map.getBounds()._ne.lng, map.getBounds()._ne.lat],
            boundSE : [map.getBounds()._ne.lng, map.getBounds()._sw.lat],
            boundSW : [map.getBounds()._sw.lng, map.getBounds()._sw.lat],
            boundNW : [map.getBounds()._sw.lng, map.getBounds()._ne.lat],
          })}}
        >
          <h1 className="syhko-credits">SYHKO'S SUSHI MAP</h1>
          <Layer
          type="symbol"
          id="sushi-feature-layer"
          layout={{
            "icon-image": "restaurant-15"
          }}
          >
          {sushisFeatures}
          </Layer>
          {showPopUp && <Popup
            className="popup"
            coordinates={PopUpCoord}
            offset={{
              'bottom-left': [10, -10],
              'bottom': [0, -10],
              'bottom-right': [-10, -10]
            }}
          >
            <p className="popup-text">{PopUpText}</p>
          </Popup>}
          <OverlayList
            onItemClicked={this.goToPositionbyOverlay}
            onButtonClicked={this.openModal}
            onHover={this.PopupByOverlay}
            handleMouseLeave={this.detogglePopup}
            boundNE={this.state.boundNE}
            boundSE={this.state.boundSE}
            boundSW={this.state.boundSW}
            boundNW={this.state.boundNW}
          />
        </Map>
        <RestaurantModal
          showModal={showModal}
          closeModal={closeModal}
          modalName={modalName}
          handleCloseModal={this.closeModal}
        />
      </div>
    );
  }
}

export default MapComponent;
