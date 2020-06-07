import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createRoom, joinRoom } from '../redux/actions';
import { WebSocketContext } from '../connection/webSocket';
import Room from './Room';
import Players from './Players';
import Round from './Round';

export default function HomeComponent() {
  const [username, setUserName] = useState('');
  const [roomName, setRoomName] = useState('');
  const [roomId, setRoomId] = useState('');
  const currentRoom = useSelector(state => state.roomName);

  const dispatch = useDispatch();
  const ws = useContext(WebSocketContext);

  const joinGameRoom = (roomId, username) => {
    dispatch(joinRoom(roomId, username));
    ws.newPlayer(roomId, username);
  };

  return (
    <>
      {!currentRoom && (
        <div>
          <div>
            <span>Enter username</span>
            <input
              type='text'
              placeholder='Username'
              value={username}
              onChange={e => setUserName(e.target.value)}
            />
          </div>
          <div>
            <span>Create new room</span>
            <input
              type='text'
              placeholder='Room name'
              value={roomName}
              onChange={e => setRoomName(e.target.value)}
            />
            <button
              disabled={!username || !roomName}
              onClick={() => dispatch(createRoom(roomName, username))}
            >
              Create
            </button>
          </div>
          <div>
            <span>Join existing room</span>
            <input
              type='text'
              placeholder='Room code'
              value={roomId}
              onChange={e => setRoomId(e.target.value)}
            />
            <button
              disabled={!username || !roomId}
              onClick={() => joinGameRoom(roomId, username)}
            >
              Join
            </button>
          </div>
        </div>
      )}

      {currentRoom && (
        <>
          <Room />
          <Players />
          <Round />
        </>
      )}
    </>
  );
}
