import {
  REGISTER_ALIAS,
  REGISTER_USER,
  INVALIDATE_USER,
} from '../constants/actionTypes';
import appDefault from '../constants/defaultStates';

export default function appReducer(state = appDefault, action) {
  switch (action.type) {
    case REGISTER_ALIAS:
      return Object.assign({}, state, { aliasRegistered: true });
    case REGISTER_USER:
      return Object.assign({}, state, { userRegistered: true });
    case INVALIDATE_USER:
      return Object.assign({}, state, {
        userRegistered: false,
        aliasRegistered: false,
      });
    default:
      return state;
  }
}
