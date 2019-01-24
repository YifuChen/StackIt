import {
  REGISTER_USER, REGISTER_ALIAS, INVALIDATE_USER, SWITCH_SECTION,
} from '../constants/actionTypes';

function appRegisterUser() {
  return {
    type: REGISTER_USER,
  };
}

function appRegisterAlias() {
  return {
    type: REGISTER_ALIAS,
  };
}

function appInvalidateUser() {
  return {
    type: INVALIDATE_USER,
  };
}

function appSwitchSection(sectionName) {
  return {
    type: SWITCH_SECTION,
    payload: sectionName,
  };
}

export {
  appRegisterUser,
  appRegisterAlias,
  appInvalidateUser,
  appSwitchSection,
};
