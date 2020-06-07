import { ADD_PLAYER, ADD_NEW_PLAYER } from '../actionTypes';

const initialState = {
  allIds: [],
  byIds: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_PLAYER: {
      const { id, name } = action.payload;
      return {
        ...state,
        allIds: [...state.allIds, id],
        byIds: {
          ...state.byIds,
          [id]: {
            name
          }
        }
      };
    }
    case ADD_NEW_PLAYER: {
      console.log(action.payload);
      const { roomIdd, id, name } = action.payload;
      console.log(`roomIdd ${roomIdd}`);
      //console.log(`state.roomId ${fullState.gameRoom.roomId}`);
      if (roomIdd === 1) {
        return {
          ...state,
          allIds: [...state.allIds, id],
          byIds: {
            ...state.byIds,
            [id]: {
              name
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
