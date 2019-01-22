import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer';
import rootDefault from './constants/defaultStates';

const store = createStore(rootReducer, rootDefault, applyMiddleware(thunk));

export default store;
