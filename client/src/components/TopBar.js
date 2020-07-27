import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import { BsTag, BsInfoCircle } from 'react-icons/bs';
import { MdContentCopy } from 'react-icons/md';

import { getRoom } from '../redux/selectors';
import InfoModal from './InfoModal';
import { IconWithTooltip } from './IconWithTooltip';
import { copyToClipBoard } from '../helpers/copy';

const TopBar = props => {
  const [showId, setShowId] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const { roomId, roomName, username } = props.room;
  const title = 'Wellcome to High-Low-Dice';

  const closeRoomId = () => {
    setShowId(false);
  };

  const closeAbout = () => {
    setShowAbout(false);
  };

  return (
    <>
      <Container fluid className='topbar'>
        <Row>
          <Col id='title'>{title}</Col>
          <Col id='player'>{username}</Col>
          <Col id='room'>
            {roomId && (
              <>
                <IconWithTooltip
                  tooltip='RoomId'
                  placement='bottom'
                  size='1.3em'
                  marginRight='0.2em'
                >
                  <BsTag onClick={() => setShowId(true)} />
                </IconWithTooltip>
                {`Room: ${roomName} `}
              </>
            )}
          </Col>
          <Col id='info' xs={0.5}>
            <IconWithTooltip
              tooltip='Info'
              placement='bottom'
              size='1.5em'
              marginRight='0em'
            >
              <BsInfoCircle onClick={() => setShowAbout(true)} />
            </IconWithTooltip>
          </Col>
        </Row>
      </Container>

      {showId && (
        <InfoModal title='Room ID' show={showId} handleClose={closeRoomId}>
          <p className='aling-buttons'>
            {roomId}
            <IconWithTooltip
              tooltip='Copy'
              placement='right'
              size='1.3em'
              marginLeft='1em'
            >
              <MdContentCopy onClick={copyToClipBoard(roomId)} />
            </IconWithTooltip>
          </p>
        </InfoModal>
      )}

      {showAbout && (
        <InfoModal
          title='High-Low-Dice'
          show={showAbout}
          handleClose={closeAbout}
        >
          <span>
            Game has six rounds titled from '1' to '6'. On ever round players try to throw the round
            title with all five dice. Dice which land the correct face up are
            not rolled again.
            <br/>
            The aim to use either less or more throws than any
            other player on the round. Half of the round pot is divided by players with high-dice of the round
            and the other half with players who have the low-dice of the round.
          </span>
        </InfoModal>
      )}
    </>
  );
};

export default connect(
  state => ({
    room: getRoom(state)
  }),
  null
)(TopBar);
