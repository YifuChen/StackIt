import firebase from 'firebase';
import {
  ADD_LEADERS,
  REMOVE_LEADERS,
} from '../constants/actionTypes';

const addLeadersData = data => ({
  type: ADD_LEADERS,
  payload: data,
});

function leadersRemoveData() {
  return {
    type: REMOVE_LEADERS,
  };
}

function leadersFetchData() {
  return (dispatch, getState) => {
    const firestore = firebase.firestore();
    const uid = getState().uid;
    // write new alias to firestore
    firestore.collection('leaders').doc(uid)
      .get()
      .then(() => {
        dispatch(addLeadersData());
      })
      .catch((err) => {
        dispatch(err);
      });
  };
}


export {
  leadersFetchData,
  leadersRemoveData,
};
