// REACT
import React, { Component } from 'react';
// STYLE
import './RestaurantModal.css';
// REACT RATING
import Rating from 'react-rating';
import sushi_green from './sushi_green.png';
import sushi_black from './sushi_black.png';
//BOOTSTRAP
import { Glyphicon, Button, Modal } from 'react-bootstrap';


class RestaurantModal extends Component {

  render() {

    const { showModal, closeModal, modalName, ratingValue, handleCloseModal } = this.props;

    return (

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header>
          <p>{modalName}</p>
          <Button
            className="close-modal-button"
            onClick={handleCloseModal}
          >
            <Glyphicon glyph="remove"/>
          </Button>
        </Modal.Header>
        <Modal.Body>
        <p>Some information about the restaurant like bullet points ...</p>
        <ul>
          <li>QUALITY</li>
          <li>TYPE OF SUSHI</li>
          <li>OVERALL REVIEW</li>
        </ul>
        </Modal.Body>
        <Modal.Footer>
          <p>Rating :</p>
          <Rating
            initialRating={ratingValue}
            ref="rate"
            className="rating-wrapper"
            onClick={(ratingValue) => this.setState({ ratingValue })}
            fractions={2}
            emptySymbol={<img src={sushi_black} className="rating-icon" />}
            fullSymbol={<img src={sushi_green} className="rating-icon" />}
          />

        </Modal.Footer>
      </Modal>

    );
  }
}

export default RestaurantModal;
