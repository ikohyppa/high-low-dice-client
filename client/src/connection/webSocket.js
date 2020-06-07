import React, { createContext } from 'react';
import io from 'socket.io-client';
import { WS_BASE } from './config';
import { useDispatch } from 'react-redux';
import { addNewPlayer } from '../redux/actions';

const WebSocketContext = createContext(null);

export { WebSocketContext };

export default ({ children }) => {
  let socket;
  let ws;

  const dispatch = useDispatch();

  const newPlayer = (roomId, username) => {
    const payload = {
      roomId: roomId,
      user: username
    };
    socket.emit('event://send-newplayer', JSON.stringify(payload));
  };

  if (!socket) {
    socket = io.connect(WS_BASE);

    socket.on('event://get-newPlayer', msg => {
      const {roomId, user} = msg;
      dispatch(addNewPlayer(roomId, user));
    });

    ws = {
      socket: socket,
      newPlayer
    };
  }

  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
};
