export const getRoom = store => store.room;

export const getPlayersState = store => store.players;

export const getPlayerList = store =>
  getPlayersState(store) ? getPlayersState(store).allIds : [];

export const getPlayerById = (store, id) =>
  getPlayersState(store) ? { ...getPlayersState(store).byIds[id], id } : {};

export const getPlayers = store =>
  getPlayerList(store).map(id => getPlayerById(store, id));

export const getGame = store => store.game;

export const getRound = store => store.game.round;

export const getRolls = store => store.game.rolls;
