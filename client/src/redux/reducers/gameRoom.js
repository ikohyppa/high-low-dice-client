import { CREATE_ROOM_SUCCESS, JOIN_ROOM_SUCCESS } from '../actionTypes';

const initialState = {
  roomId: null,
  roomName: null,
  username: null
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
    default:
      return state;
  }
}
