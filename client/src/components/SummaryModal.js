import React from 'react';
import { Button, Modal } from 'react-bootstrap';
//import { connect } from 'react-redux';
//import { getGame, getPlayers } from '../redux/selectors';
import '../App.css';

const SummaryModal = props => {
  const {
    show,
    handleClose,
    title,
    showButton = true,
    buttonText = ''
  } = props;
  return (
    <Modal show={show} className='modal'>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{props.children}</Modal.Body>

      <Modal.Footer>
        {showButton && (
          <Button variant='primary' onClick={handleClose}>
            {buttonText}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default /*connect(
  state => ({ game: getGame(state), players: getPlayers(state) }),
  null
)(*/SummaryModal;//);
