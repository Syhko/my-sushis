//REACT
import React, { Component } from 'react';
// STYLE
import './OverlayElement.css';
// BOOTSTRAP
import { ButtonToolbar, ButtonGroup, Button, Glyphicon } from 'react-bootstrap';

class OverlayElement extends Component {

  state = {
    datas: {
      name : this.props.name,
      coordinates: this.props.coordinates
    }
  }

  render() {

    const { datas, value } = this.state

    return (
      <div
        className="overlay-element-wrapper"
        onMouseEnter={() => this.props.onHover(this.state.datas)}
        onMouseLeave={this.props.handleMouseLeave}
      >
        <div
          className="overlay-element-name-wrapper"
        >
          <Button
            className="button-restaurant"
            onClick={() => this.props.onButtonClicked(this.state.datas)}
          >
            <Glyphicon glyph="info-sign"/>
          </Button>
          <p
            className="overlay-element-name"
            onClick={() => this.props.onItemClicked(this.state.datas)}
          >
            {this.props.name}
          </p>
        </div>
      </div>
    );
  }
}

export default OverlayElement;
