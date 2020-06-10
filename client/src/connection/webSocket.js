import React, { createContext } from 'react';
import io from 'socket.io-client';
import { WS_BASE } from './config';
import { useDispatch } from 'react-redux';
import { addNewPlayer, newGame, diceRolled } from '../redux/actions';

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
    socket.emit('event://send-newgame', JSON.stringify(payload));
  };

  const rollDice = roomId => {
    const payload = { roomId: roomId };
    socket.emit('event://send-rolldice', JSON.stringify(payload));
  };

  if (!socket) {
    socket = io.connect(WS_BASE);

    socket.on('event://get-newplayer', msg => {
      const { roomId, user } = msg;
      dispatch(addNewPlayer(roomId, user));
    });

    socket.on('event://get-newgame', msg => {
      const { roomId } = msg;
      dispatch(newGame(roomId));
    });

    socket.on('event://get-rolldice', msg => {
      const { roomId, dice } = msg;
      dispatch(diceRolled(roomId, dice));
    });

    ws = {
      socket: socket,
      newPlayer,
      startNewGame,
      rollDice
    };
  }

  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
};
