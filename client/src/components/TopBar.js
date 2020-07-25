import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import { BsTag, BsInfoCircle, BsClipboard } from 'react-icons/bs';
import { MdContentCopy, MdInfo } from 'react-icons/md';

import { getRoom } from '../redux/selectors';
import InfoModal from './InfoModal';

const TopBar = props => {
  const [showId, setShowId] = useState(false);
  const { roomId, roomName, username } = props.room;
  const title = 'Wellcome to High-Low-Dice';
  const closeRoomId = () => {
    setShowId(false);
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
                <BsTag onClick={() => setShowId(true)} />
                {`Room: ${roomName} `}
              </>
            )}
          </Col>
          <BsInfoCircle id='info' />
        </Row>
      </Container>

      {showId && (
        <InfoModal title='Room ID' show={showId} handleClose={closeRoomId}>
          <p className='aling-buttons'>
            {roomId}
            <MdContentCopy id='icon' tooltip='copy to clipboard' />
          </p>
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
