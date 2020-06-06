import { combineReducers } from 'redux';
import gameRoom from './gameRoom';
import players from './players';

export default combineReducers({ gameRoom, players });
