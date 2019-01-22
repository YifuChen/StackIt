import { ADD_LEADERS, REMOVE_LEADERS } from '../constants/actionTypes';
import { leadersDataDefault } from '../constants/defaultStates';

export default function leadersDataReducer(state = leadersDataDefault, action) {
  switch (action.type) {
    case ADD_LEADERS:
      return action.payload;
    case REMOVE_LEADERS:
      return leadersDataDefault;
    default:
      return state;
  }
}
