import { ERROR_LOGGING } from '../constants/actionTypes';
import { errorDefault } from '../constants/defaultStates';

export default function errorReducer(state = errorDefault, action) {
  switch (action.type) {
    case ERROR_LOGGING:
      return [...state, action.payload];
    default:
      return state;
  }
}
