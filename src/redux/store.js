import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducer';
import { rootDefault } from './constants/defaultStates';

const store = createStore(rootReducer, rootDefault, composeWithDevTools(
  applyMiddleware(thunk),
));

export default store;
