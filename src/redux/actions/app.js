import { REGISTER_USER, REGISTER_ALIAS, INVALIDATE_USER } from '../constants/actionTypes';

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

export {
  appRegisterUser,
  appRegisterAlias,
  appInvalidateUser,
};
