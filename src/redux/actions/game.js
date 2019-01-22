import {
  INC_SCORE,
  INC_COMBO,
  SET_MAX_COMBO,
  RESET_GAME,
} from '../constants/actionTypes';

function gameIncreaseScore() {
  return {
    type: INC_SCORE,
  };
}

function gameIncreaseCombo() {
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
  gameIncreaseCombo,
  gameIncreaseScore,
  gameReset,
  gameSetMaxCombo,
};
