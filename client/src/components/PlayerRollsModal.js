import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getGame, getPlayers } from '../redux/selectors';
import '../App.css';

const PlayerRollsModal = props => {
  const { show, handleClose, title, buttonText } = props;
  return (
    <Modal show={show} onClose={handleClose} data-background={false}/* backdrop='static' */ className='modal'>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{props.children}</Modal.Body>

      <Modal.Footer>
        <Button variant='primary' onClick={handleClose}>
          {buttonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default connect(
  state => ({ game: getGame(state), players: getPlayers(state) }),
  null
)(PlayerRollsModal);
