import React, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { createRoom, joinRoom } from '../redux/actions';
import { WebSocketContext } from '../connection/webSocket';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import ErrorNotification from './ErrorNotification';

const Login = () => {
  const [username, setUserName] = useState('');
  const [roomName, setRoomName] = useState('');
  const [roomId, setRoomId] = useState('');

  const dispatch = useDispatch();
  const ws = useContext(WebSocketContext);

  const joinGameRoom = (roomId, username) => {
    dispatch(joinRoom(roomId, username));
    ws.newPlayer(roomId, username);
  };

  return (
    <Container fluid={false} className='loginContainer'>
      <form>
        <fieldset className='loginSet'>
          <div className='loginGroup'>
            <input
              type='text'
              placeholder='Player name required'
              value={username}
              onChange={e => setUserName(e.target.value)}
            />
          </div>
          <div className='loginGroup'>
            <span>Create a new room</span>
            <div className='aling-buttons'>
              <input
                type='text'
                placeholder='Room name'
                value={roomName}
                onChange={e => setRoomName(e.target.value)}
              />
              <Button
                className='loginButton'
                disabled={!username || !roomName}
                onClick={() => dispatch(createRoom(roomName, username))}
              >
                Create
              </Button>
            </div>
          </div>
          <div className='loginGroup'>
            <span>Join an existing room</span>
            <div className='aling-buttons'>
              <input
                type='text'
                placeholder='Room Id'
                value={roomId}
                onChange={e => setRoomId(e.target.value)}
              />
              <Button
                className='loginButton'
                disabled={!username || !roomId}
                onClick={() => joinGameRoom(roomId, username)}
              >
                Join
              </Button>
            </div>
          </div>
          <div>
            <ErrorNotification />
          </div>
        </fieldset>
      </form>
    </Container>
  );
};

export default Login;