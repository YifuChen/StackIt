import { ERROR_LOGGING } from '../constants/actionTypes';

export default function errorLogging(err) {
  console.log(err);
  return {
    type: ERROR_LOGGING,
    payload: err,
  };
}
