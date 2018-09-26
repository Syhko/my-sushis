// REACT
import React, { Component } from 'react';
// STYLE
import './OverlayElement.css';
// REACT RATING
import Rating from 'react-rating';
import sushi_green from './sushi_green.png';
import sushi_black from './sushi_black.png';
// BOOTSTRAP
import { ButtonToolbar, ButtonGroup, Button, Glyphicon } from 'react-bootstrap';

class OverlayElement extends Component {

  state = {
    datas: {
      name : this.props.name,
      coordinates: this.props.coordinates
    },
    value: 0
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
        onClick={() => this.props.onItemClicked(this.state.datas)}
        >
          <Button
            className="button-restaurant"
            onClick={this.props.onButtonClicked}
          >
            <Glyphicon glyph="info-sign"/>
          </Button>
          <p className="overlay-element-name">{this.props.name}</p>
        </div>
        {/*<Rating
          initialRating={value}
          ref="rate"
          className="rating-wrapper"
          onClick={(value) => this.setState({ value })}
          fractions={2}
          emptySymbol={<img src={sushi_black} className="rating-icon" />}
          fullSymbol={<img src={sushi_green} className="rating-icon" />}
        />*/}
      </div>
    );
  }
}

export default OverlayElement;
