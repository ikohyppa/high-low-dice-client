import React, { createContext } from 'react';
import io from 'socket.io-client';
import { WS_BASE } from './config';
import { useDispatch } from 'react-redux';
import { addNewPlayer, newGame } from '../redux/actions';

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

  const startNewGame = roomId => {
    const payload = { roomId: roomId };
    socket.emit('event://send-newGame', JSON.stringify(payload));
  };

  if (!socket) {
    socket = io.connect(WS_BASE);

    socket.on('event://get-newPlayer', msg => {
      const { roomId, user } = msg;
      dispatch(addNewPlayer(roomId, user));
    });

    socket.on('event://get-newGame', msg => {
      const { roomId } = msg;
      dispatch(newGame(roomId));
    });

    ws = {
      socket: socket,
      newPlayer,
      startNewGame
    };
  }

  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
};
