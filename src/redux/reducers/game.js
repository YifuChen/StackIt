import {
  INC_SCORE,
  INC_COMBO,
  SET_MAX_COMBO,
  RESET_GAME,
} from '../constants/actionTypes';
import { gameStateDefault } from '../constants/defaultStates';

export default function gameStateReducer(state = gameStateDefault, action) {
  switch (action.type) {
    case INC_SCORE:
      return Object.assign({}, state, {
        score: state.score + 1,
      });
    case INC_COMBO:
      return Object.assign({}, state, {
        combo: state.combo + 1,
      });
    case SET_MAX_COMBO:
      return Object.assign({}, state, {
        maxCombo: Math.max(state.combo, state.maxCombo),
        combo: 0,
      });
    case RESET_GAME:
      return gameStateDefault;
    default:
      return state;
  }
}
