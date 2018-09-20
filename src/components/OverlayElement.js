// REACT
import React, { Component } from 'react';
// STYLE
import './OverlayElement.css';

class OverlayElement extends Component {

  state = {
    datas: {
      name : this.props.name,
      coordinates: this.props.coordinates
    }
  }

  render() {


    return (
      <div
        className="overlay-element-wrapper"
        onMouseEnter={() => this.props.onHover(this.state.datas)}
        onClick={() => this.props.onItemClicked(this.state.datas)}
        onMouseLeave={this.props.handleMouseLeave}
      >
        <p className="overlay-element-name">{this.props.name}</p>
        {/*}<p className="overlay-element-address">{this.props.address}</p>*/}
      </div>
    );
  }
}

export default OverlayElement;
