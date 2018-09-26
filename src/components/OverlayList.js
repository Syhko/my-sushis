// REACT
import React, { Component } from 'react';
// STYLE
import './OverlayList.css';
// COMPONENTS
import OverlayElement from './OverlayElement'
// DATABASE
import sushis from '../database/sushis'
// TURF
import * as turf from '@turf/turf';

class OverlayList extends Component {

  state = {
    geodata: sushis,
    boundNE: this.props.boundNE,
    boundSE: this.props.boundSE,
    boundSW: this.props.boundSW,
    boundNW: this.props.boundNW
  }

  render() {

    const { geodata } = this.state;
    const { boundNE, boundSE, boundSW, boundNW } = this.props
    const sushisList = geodata.sushis;

    // SORTING SUSHISLIST A-Z
    const orderedSushisList = sushisList.sort(function (a, b) {
      if (a.properties.name.toLowerCase() < b.properties.name.toLowerCase())
        return -1;
      if (a.properties.name.toLowerCase() > b.properties.name.toLowerCase())
        return 1;
      return 0;
    });

    var poly = turf.polygon([[
      [boundSW[0], boundSW[1]],
      [boundNW[0], boundNW[1]],
      [boundNE[0], boundNE[1]],
      [boundSE[0], boundSE[1]],
      [boundSW[0], boundSW[1]]
    ]]);

    const overlaySushisList = orderedSushisList.map((name, key) =>(
      turf.booleanPointInPolygon(turf.point([sushisList[key].geometry.coordinates[0], sushisList[key].geometry.coordinates[1]]), poly)
      && <OverlayElement
        name={sushisList[key].properties.name}
        address={sushisList[key].properties.phone ? sushisList[key].properties.phone : sushisList[key].properties.website}
        coordinates={sushisList[key].geometry.coordinates}
        key={key}
        onItemClicked={this.props.onItemClicked}
        onButtonClicked={this.props.onButtonClicked}
        onHover={this.props.onHover}
        handleMouseLeave={this.props.handleMouseLeave}
      />
    ));

    return(
      <div className="overlay-wrapper">
        <div className="overlay-title">
          <p className="overlay-title-text">All sushis restaurants in current area</p>
        </div>
        <div className="overlay-list">
          {overlaySushisList}
        </div>
      </div>
    );
  }
}
export default OverlayList;
