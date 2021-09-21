import { combineReducers } from 'redux';

import game from './game';
import leaderBoard from './leaderBoard';

export default combineReducers({ game, leaderBoard });
