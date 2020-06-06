import { ADD_PLAYER } from '../actionTypes';

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
            name,
          }
        }
      };
    }
    default:
      return state;
  }
}
