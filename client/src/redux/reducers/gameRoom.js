import { CREATE_ROOM_SUCCESS, JOIN_ROOM_SUCCESS } from '../actionTypes';

const initialState = {
  roomId: null,
  roomName: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_ROOM_SUCCESS: {
      const { id, name } = action.payload;
      return {
        ...state,
        roomId: id,
        roomName: name
      };
    }
    case JOIN_ROOM_SUCCESS: {
      const { id, name } = action.payload;
      return {
        ...state,
        roomId: id,
        roomName: name
      };
    }
    default:
      return state;
  }
}
