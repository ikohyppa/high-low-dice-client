import {
  CREATE_ROOM_SUCCESS,
  JOIN_ROOM_SUCCESS,
  ADD_PLAYER,
  ADD_NEW_PLAYER,
  NEW_GAME,
  NEXT_ROUND,
  NEXT_PLAYER,
  RESET_TURN,
  INCREMENT_ROLLS,
  ROLL_DICE
} from './actionTypes';

const initialState = {
  room: {
    roomId: null,
    roomName: null,
    username: null
  },
  players: { allIds: [], byIds: {} },
  game: { gameOn: false, round: null, turn: null, rolls: null },
  dice: {
    dice: [
      { value: null, ready: false },
      { value: null, ready: false },
      { value: null, ready: false },
      { value: null, ready: false },
      { value: null, ready: false },
      { value: null, ready: false }
    ]
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_ROOM_SUCCESS: {
      const { id, name, user } = action.payload;
      return {
        ...state,
        room: {
          ...state.room,
          roomId: id,
          roomName: name,
          username: user
        }
      };
    }
    case JOIN_ROOM_SUCCESS: {
      const { id, name, user } = action.payload;
      return {
        ...state,
        room: {
          ...state.room,
          roomId: id,
          roomName: name,
          username: user
        }
      };
    }
    case ADD_PLAYER: {
      const { name } = action.payload;
      let id = state.players.allIds.length + 1;
      return {
        ...state,
        players: {
          ...state.players,
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
      const { roomId, name } = action.payload;
      if (roomId === state.room.roomId) {
        let id = state.players.allIds.length + 1;
        return {
          ...state,
          players: {
            ...state.players,
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
      const { roomId } = action.payload;
      if (roomId === state.room.roomId) {
        return {
          ...state,
          game: {
            ...state.game,
            gameOn: true,
            round: 1,
            turn: 1,
            rolls: 0
          }
        };
      } else {
        return state;
      }
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
    case ROLL_DICE: {
      const { roomId, dice } = action.payload;
      if (roomId === state.room.roomId) {
        let currentDice = state.dice.dice;
        console.log(currentDice);
        let tempDice = currentDice.map((die, index) => {
          return die.ready === false
            ? {
                value: dice[index],
                ready: dice[index] === state.game.round
              }
            : { ...state.dice.dice[index] };
        });
        return {
          ...state,
          game: { ...state.game, rolls: state.game.rolls + 1 },
          dice: { ...state.dice, dice: tempDice }
        };
      } else {
        return state;
      }
    }
    default:
      return state;
  }
}
