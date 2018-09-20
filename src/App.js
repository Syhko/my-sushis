// REACT
import React, { Component } from 'react';
// STYLE
import './App.css';
// COMPONENTS
import MapComponent from './components/MapComponent'
// DATABASE
import sushis from './database/sushis'

class App extends Component {

  state = {
    geodata: sushis
  }

  render() {

    return (

      <div className="App">
        <MapComponent />
      </div>

    );
  }
}

export default App;
