import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getGame, getPlayers } from '../redux/selectors';
import '../App.css';

const PlayerRollsModal = props => {
  const { show, onClose, title, buttonText } = props;
  return (
    <div>
      {show && (
        <Modal.Dialog className='modal2'>
          <Modal.Header>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>

          <Modal.Body>{props.children}</Modal.Body>

          <Modal.Footer>
            <Button variant='primary' onClick={onClose}>
              {buttonText}
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      )}
      {!show && null}
    </div>
  );
};

export default connect(
  state => ({ game: getGame(state), players: getPlayers(state) }),
  null
)(PlayerRollsModal);
