import _ from 'lodash';
import {
  CREATE_ROOM_SUCCESS,
  JOIN_ROOM_SUCCESS,
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

const initialState = {
  room: {
    roomId: null,
    roomName: null,
    username: null
  },
  players: { allIds: [], byIds: {} },
  game: {
    gameOn: false,
    round: null,
    turn: null,
    rolls: null,
    roundLows: [0, 0, 0, 0, 0, 0],
    roundHighs: [0, 0, 0, 0, 0, 0],
    waiting: []
  },
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
    case RESET_PLAYER_ROLLS: {
      const { roomId } = action.payload;
      if (roomId === state.room.roomId) {
        let byIdsTemp = state.players.byIds;
        for (let id = 1; id <= state.players.allIds.length; id++) {
          byIdsTemp[id].rolls = [];
        }
        return {
          ...state,
          players: {
            ...state.players,
            byIds: byIdsTemp
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
            rolls: 0,
            roundLows: [0, 0, 0, 0, 0, 0],
            roundHighs: [0, 0, 0, 0, 0, 0]
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
        },
        dice: {
          ...state.dice,
          dice: initialState.dice.dice
        }
      };
    }
    case INCREMENT_ROLLS: {
      return {
        ...state,
        game: { ...state.game, rolls: state.game.rolls + 1 }
      };
    }
    case UPDATE_ROUND_LOW: {
      const { round, newLow } = action.payload;
      return {
        ...state,
        game: {
          ...state.game,
          roundLows: [
            ...state.game.roundLows.slice(0, round - 1),
            newLow,
            ...state.game.roundLows.slice(round)
          ]
        }
      };
    }
    case UPDATE_ROUND_HIGH: {
      const { round, newHigh } = action.payload;
      return {
        ...state,
        game: {
          ...state.game,
          roundHighs: [
            ...state.game.roundHighs.slice(0, round - 1),
            newHigh,
            ...state.game.roundHighs.slice(round)
          ]
        }
      };
    }
    case WAITING_PLAYERS: {
      return {
        ...state,
        game: { ...state.game, waiting: state.players.allIds }
      };
    }
    case PLAYER_READY: {
      const { roomId, playerId } = action.payload;
      if (roomId === state.room.roomId) {
        return {
          ...state,
          game: {
            ...state.game,
            waiting: state.game.waiting.filter(value => value !== playerId)
          }
        };
      } else {
        return state;
      }
    }
    case ROLL_DICE: {
      const { roomId, dice, round, id, rolls } = action.payload;
      if (roomId === state.room.roomId) {
        let currentDice = state.dice.dice;
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
          game: { ...state.game, rolls: rolls + 1 },
          dice: { ...state.dice, dice: tempDice },
          players: {
            ...state.players,
            byIds: {
              ...state.players.byIds,
              [id]: {
                ...state.players.byIds[id],
                rolls: [
                  ...state.players.byIds[id].rolls.slice(0, round - 1),
                  rolls + 1,
                  ...state.players.byIds[id].rolls.slice(round)
                ]
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
