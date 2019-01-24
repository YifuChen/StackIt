import {
  REGISTER_ALIAS,
  REGISTER_USER,
  INVALIDATE_USER,
  SWITCH_SECTION,
} from '../constants/actionTypes';
import { appStateDefault } from '../constants/defaultStates';

export default function appReducer(state = appStateDefault, action) {
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
    case SWITCH_SECTION:
      return {
        ...state,
        currentSection: Object.assign({}, state.currentSection, {
          app: action.payload,
        }),
      };
    default:
      return state;
  }
}
