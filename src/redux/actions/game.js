import {
  INC_SCORE,
  INC_COMBO,
  SET_MAX_COMBO,
  RESET_GAME,
} from '../constants/actionTypes';

function gameIncrementScore() {
  return {
    type: INC_SCORE,
  };
}

function gameIncrementCombo() {
  return {
    type: INC_COMBO,
  };
}

function gameSetMaxCombo() {
  return {
    type: SET_MAX_COMBO,
  };
}

function gameReset() {
  return {
    type: RESET_GAME,
  };
}


export {
  gameIncrementCombo,
  gameIncrementScore,
  gameReset,
  gameSetMaxCombo,
};
