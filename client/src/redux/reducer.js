import {
  CREATE_ROOM_SUCCESS,
  JOIN_ROOM_SUCCESS,
  ADD_PLAYER,
  ADD_NEW_PLAYER,
  NEW_GAME,
  NEXT_ROUND,
  NEXT_PLAYER,
  RESET_TURN,
  INCREMENT_ROLLS
} from './actionTypes';

const initialState = {
  roomId: null,
  roomName: null,
  username: null,
  players: { allIds: [], byIds: {} },
  game: { gameOn: false, round: 0, turn: 0, rolls: 0 }
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
    case NEW_GAME: {
      return {
        ...state,
        game: {
          gameOn: true,
          round: 1,
          turn: 1,
          rolls: 0
        }
      };
    }
    case NEXT_ROUND: {
      return {
        ...state,
        game: {
          ...state.game,
          round: state.game.round + 1,
          turn: 1,
          rolls: 0
        }
      };
    }
    case NEXT_PLAYER: {
      return {
        ...state,
        game: {
          ...state.game,
          turn: state.game.turn + 1,
          rolls: 0
        }
      };
    }
    case RESET_TURN: {
      return {
        ...state,
        game: { ...state.game, turn: 0 }
      };
    }
    case INCREMENT_ROLLS: {
      return {
        ...state,
        game: { ...state.game, rolls: state.game.rolls + 1 }
      };
    }
    default:
      return state;
  }
}
