import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createRoom, joinRoom } from '../redux/actions';

export default function HomeComponent() {
  const [roomName, setRoomName] = useState('');
  const [roomId, setRoomId] = useState('');
  const currentRoom = useSelector(state => state.gameRoom.roomName);

  const dispatch = useDispatch();

  return (
    <>
      {!currentRoom && (
        <div>
          <div>
            <span>Create new room</span>
            <input
              type='text'
              placeholder='Room name'
              value={roomName}
              onChange={e => setRoomName(e.target.value)}
            />
            <button
              disabled={!roomName}
              onClick={() => dispatch(createRoom(roomName))}
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
              disabled={!roomId}
              onClick={() => dispatch(joinRoom(roomId))}
            >
              Join
            </button>
          </div>
        </div>
      )}

      {currentRoom && (
        <>
          <p>ROOM</p>
        </>
      )}
    </>
  );
}
