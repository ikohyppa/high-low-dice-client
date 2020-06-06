import axios from 'axios';
import { API_BASE } from '../connection/config';

import {
  CREATE_ROOM_REQUEST,
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_ERROR,
  JOIN_ROOM_REQUEST,
  JOIN_ROOM_SUCCESS,
  JOIN_ROOM_ERROR,
  ADD_PLAYER
} from './actionTypes';

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

let nextPlayerId = 0;

export const addPlayer = name => ({
  type: ADD_PLAYER,
  payload: {
    id: ++nextPlayerId, //player IDs will start from 1
    name
  }
});