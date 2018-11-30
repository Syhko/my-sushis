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

  state = {
    editMode : false,
    rating: 3,
    editTextTrigger : "non-edit-text"
  }

  triggerEditMode = () => {
    this.setState(prevState => ({
      editMode : !prevState.editMode }));
    this.state.editTextTrigger === "non-edit-text" ? this.setState({editTextTrigger : "edit-text"}) : this.setState({editTextTrigger : "non-edit-text"});
  }

  render() {

    const {
      showModal,
      closeModal,
      modalName,
      ratingValue,
      handleCloseModal
    } = this.props;

    const {
      editMode,
      rating,
      editTextTrigger
    } = this.state;

    return (

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header>
          <p>{modalName}</p>
          <Button
            className="edit-modal-button"
            onClick={this.triggerEditMode}
            >
              <Glyphicon glyph="pencil"/>
          </Button>
          <Button
            className="close-modal-button"
            onClick={handleCloseModal}
          >
            <Glyphicon glyph="remove"/>
          </Button>
        </Modal.Header>
        <Modal.Body>
        <p
          contentEditable={editMode}
          className={editTextTrigger}
        >
          Some information about the restaurant like bullet points ...
        </p>
        </Modal.Body>
        <Modal.Footer>
          <p>Rating :</p>
          <Rating
            initialRating={rating}
            ref="rate"
            className="rating-wrapper"
            onClick={(rating) => this.setState({ rating })}
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
