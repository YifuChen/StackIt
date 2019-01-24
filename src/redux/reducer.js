import { combineReducers } from 'redux';
import appReducer from './reducers/app';
import gameStateReducer from './reducers/game';
import { userInfoReducer, userDataReducer } from './reducers/user';
import leadersDataReducer from './reducers/leaders';
import errorReducer from './reducers/error';

// combine all reducers
const rootReducer = combineReducers({
  appState: appReducer,
  gameState: gameStateReducer,
  userInfo: userInfoReducer,
  userData: userDataReducer,
  leadersData: leadersDataReducer,
  error: errorReducer,
});

export default rootReducer;
