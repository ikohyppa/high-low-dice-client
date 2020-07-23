import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import { getRoom } from '../redux/selectors';

const TopBar = props => {
  const { roomId, roomName, username } = props.room;
  const title = 'Wellcome to High-Low Dice';
  return (
    <Container fluid className='topbar'>
      <Row>
        <Col id='title'>{title}</Col>
        <Col xs={6} id='room'>
          {roomId && `Room: ${roomName}`}
        </Col>
      </Row>
      <Row>
        <Col id='player'>{roomId && `${username}`}</Col>
        <Col xs={6} id='roomid'>
          {roomId && `RoomId: ${roomId}`}
        </Col>
      </Row>
    </Container>
  );
};

export default connect(
  state => ({
    room: getRoom(state)
  }),
  null
)(TopBar);
