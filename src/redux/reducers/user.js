import {
  ADD_ALIAS,
  ADD_USER,
  REMOVE_USER,
  ADD_USER_DATA,
  REMOVE_USER_DATA,
} from '../constants/actionTypes';
import { userInfoDefault, userDataDefault } from '../constants/defaultStates';

export function userInfoReducer(state = userInfoDefault, action) {
  switch (action.type) {
    case ADD_USER:
      return Object.assign({}, state, { data: action.payload });
    case REMOVE_USER:
      return userInfoDefault;
    default:
      return state;
  }
}

export function userDataReducer(state = userDataDefault, action) {
  switch (action.type) {
    case ADD_ALIAS:
      return {
        ...state,
        data: Object.assign({}, state.data, {
          alias: action.payload,
        }),
      };
    case ADD_USER_DATA:
      return Object.assign({}, state, { data: action.payload });
    case REMOVE_USER_DATA:
      return userDataDefault;
    default:
      return state;
  }
}
