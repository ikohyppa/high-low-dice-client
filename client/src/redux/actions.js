import axios from 'axios';
import { API_BASE } from '../connection/config';

import {
  CREATE_ROOM_REQUEST,
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_ERROR,
  JOIN_ROOM_REQUEST,
  JOIN_ROOM_SUCCESS,
  JOIN_ROOM_ERROR,
  ADD_PLAYER,
  ADD_NEW_PLAYER,
  RESET_PLAYER_ROLLS,
  NEW_GAME,
  NEXT_ROUND,
  NEXT_PLAYER,
  INCREMENT_ROLLS,
  UPDATE_ROUND_LOW,
  UPDATE_ROUND_HIGH,
  WAITING_PLAYERS,
  PLAYER_READY,
  ROLL_DICE
} from './actionTypes';

// ***** room state actions *****

export function createRoomRequest() {
  return {
    type: CREATE_ROOM_REQUEST
  };
}

export function createRoomSuccess(payload) {
  return {
    type: CREATE_ROOM_SUCCESS,
    payload
  };
}

export function createRoomError(error) {
  return {
    type: CREATE_ROOM_ERROR,
    error
  };
}

export function createRoom(roomName, username) {
  return async function (dispatch) {
    dispatch(createRoomRequest());
    try {
      const response = await axios.get(
        `${API_BASE}/room?name=${roomName}&user=${username}`
      );
      const playerlist = response.data.playerlist;
      dispatch(createRoomSuccess(response.data));
      playerlist.forEach(player => {
        dispatch(addPlayer(player));
      });
    } catch (error) {
      dispatch(createRoomError(error));
    }
  };
}

export function joinRoomRequest() {
  return {
    type: JOIN_ROOM_REQUEST
  };
}

export function joinRoomSuccess(payload) {
  return {
    type: JOIN_ROOM_SUCCESS,
    payload
  };
}

export function joinRoomError(error) {
  return {
    type: JOIN_ROOM_ERROR,
    error
  };
}

export function joinRoom(roomId, username) {
  return async function (dispatch) {
    dispatch(joinRoomRequest());
    try {
      const response = await axios.get(
        `${API_BASE}/room/${roomId}?user=${username}`
      );
      const playerlist = response.data.playerlist;
      dispatch(joinRoomSuccess(response.data));
      playerlist.forEach(player => {
        dispatch(addPlayer(player));
      });
    } catch (error) {
      dispatch(joinRoomError(error));
    }
  };
}

// ***** players state actions *****

export const addPlayer = user => ({
  type: ADD_PLAYER,
  payload: {
    name: user
  }
});

export const addNewPlayer = (roomId, user) => ({
  type: ADD_NEW_PLAYER,
  payload: {
    roomId: roomId,
    name: user
  }
});

export const resetPlayerRolls = roomId => ({
  type: RESET_PLAYER_ROLLS,
  payload: {
    roomId: roomId
  }
});

// ***** game state actions *****

export const newGame = roomId => ({
  type: NEW_GAME,
  payload: {
    roomId: roomId
  }
});

export const nextRound = () => ({
  type: NEXT_ROUND
});

export const nextPlayer = () => ({
  type: NEXT_PLAYER
});

export const incrementRolls = () => ({
  type: INCREMENT_ROLLS
});

export const updateRoundLow = (round, newLow) => ({
  type: UPDATE_ROUND_LOW,
  payload: { round, newLow }
});

export const updateRoundHigh = (round, newHigh) => ({
  type: UPDATE_ROUND_HIGH,
  payload: { round, newHigh }
});

export const waitingPlayers = () => ({
  type: WAITING_PLAYERS
});

export const playerIsReady = (roomId, userId) => ({
  type: PLAYER_READY,
  payload: {
    roomId: roomId,
    playerId: userId
  }
});

// ***** dice state actions *****

export const diceRolled = (roomId, dice, round, id, rolls) => ({
  type: ROLL_DICE,
  payload: {
    roomId: roomId,
    dice: dice,
    round: round,
    id: id,
    rolls: rolls
  }
});
