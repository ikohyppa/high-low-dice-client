import React, { createContext } from 'react';
import io from 'socket.io-client';
import { WS_BASE } from './config';
import { useDispatch } from 'react-redux';
import {
  addNewPlayer,
  newGame,
  diceRolled,
  playerIsReady
} from '../redux/actions';

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

  const rollDice = (roomId, round, turn, rolls) => {
    const payload = { roomId: roomId, round: round, id: turn, rolls: rolls };
    socket.emit('event://send-rolldice', JSON.stringify(payload));
  };

  const playerReady = (roomId, userId) => {
    const payload = {
      roomId: roomId,
      userId: userId
    };
    socket.emit('event://send-playerready', JSON.stringify(payload));
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
      const { roomId, dice, round, id, rolls } = msg;
      dispatch(diceRolled(roomId, dice, round, id, rolls));
    });

    socket.on('event://get-playerready', msg => {
      const { roomId, userId } = msg;
      dispatch(playerIsReady(roomId, userId));
    });

    ws = {
      socket: socket,
      newPlayer,
      startNewGame,
      rollDice,
      playerReady
    };
  }

  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
};
