import {
  CREATE_ROOM_SUCCESS,
  JOIN_ROOM_SUCCESS,
  ADD_PLAYER,
  ADD_NEW_PLAYER
} from './actionTypes';

const initialState = {
  roomId: null,
  roomName: null,
  username: null,
  players: { allIds: [], byIds: {} }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_ROOM_SUCCESS: {
      const { id, name, user } = action.payload;
      return {
        ...state,
        roomId: id,
        roomName: name,
        username: user
      };
    }
    case JOIN_ROOM_SUCCESS: {
      const { id, name, user } = action.payload;
      return {
        ...state,
        roomId: id,
        roomName: name,
        username: user
      };
    }
    case ADD_PLAYER: {
      const { id, name } = action.payload;
      return {
        ...state,
        players: {
          allIds: [...state.players.allIds, id],
          byIds: {
            ...state.players.byIds,
            [id]: {
              name,
              score: 0,
              rolls: []
            }
          }
        }
      };
    }
    case ADD_NEW_PLAYER: {
      const { roomId, id, name } = action.payload;
      if (roomId === state.roomId) {
        return {
          ...state,
          players: {
            allIds: [...state.players.allIds, id],
            byIds: {
              ...state.players.byIds,
              [id]: {
                name,
                score: 0,
                rolls: []
              }
            }
          }
        };
      } else {
        return state;
      }
    }
    default:
      return state;
  }
}
