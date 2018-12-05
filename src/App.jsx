// REACT
import React, { Component } from 'react';
// STYLE
import './App.css';
// COMPONENTS
import MapComponent from './components/MapComponent'
// DATABASE
import sushis from './database/sushis'

const API_BASE_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
const ACCESS_TOKEN = 'pk.eyJ1Ijoic3loa28iLCJhIjoiY2prMThnbnVhMDR6NTNvcnc3ZGNwbGV2ZCJ9.HaLGB6YPhrcvJbEkvg3U1A'

class App extends Component {

  state = {
    geodata: sushis
  }



  render() {

// Api call for getting the adress with the coordinates
    /*fetch(`${API_BASE_URL}18.0419132%2C%2059.3334637.json?access_token=${ACCESS_TOKEN}&types=address`)
    .then(response => response.json())
    .then(data => {
      console.log(data.features[0].place_name);
    })
    */

    return (

      <div className="App">
        <MapComponent />
      </div>

    );
  }
}

export default App;
