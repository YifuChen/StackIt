import firebase from 'firebase';
import {
  ADD_ALIAS,
  ADD_USER,
  ADD_USER_DATA,
  REMOVE_USER,
  REMOVE_USER_DATA,
} from '../constants/actionTypes';
import errorLogging from './error';


const addAlias = alias => ({
  type: ADD_ALIAS,
  payload: alias,
});

function userAddAlias(alias) {
  return (dispatch, getState) => {
    const firestore = firebase.firestore();
    const uid = getState().uid;
    // write new alias to firestore
    firestore.collection('users').doc(uid)
      .update({ alias })
      .then(() => {
        dispatch(addAlias(alias));
      })
      .catch((err) => {
        dispatch(err);
      });
  };
}

const addUser = user => ({
  type: ADD_USER,
  payload: user,
});

function userGoogleSignIn() {
  return (dispatch) => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth()
      .signInWithPopup(provider)
      .then(result => result.user)
      .then((user) => {
        dispatch(addUser(user));
      })
      .catch((err) => {
        dispatch(errorLogging(err));
      });
  };
}

function userFacebookSignIn() {
  return (dispatch) => {
    const provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth()
      .signInWithPopup(provider)
      .then(result => result.user)
      .then((user) => {
        dispatch(addUser(user));
      })
      .catch((err) => {
        dispatch(errorLogging(err));
      });
  };
}

function userAuth() {
  return (dispatch) => {
    firebase.auth()
      .onAuthStateChanged((user) => {
        if (user) {
          dispatch(addUser(user));
        }
      })
      .catch((err) => {
        dispatch(errorLogging(err));
      });
  };
}

const addUserData = userData => ({
  type: ADD_USER_DATA,
  payload: userData,
});

function userFetchData() {
  return (dispatch, getState) => {
    // fetch user data from firestore
    const firestore = firebase.firestore();
    const uid = getState().uid;
    const docRef = firestore.collection('users').doc(uid);
    docRef.get()
      .then((doc) => {
        dispatch(addUserData(doc));
      })
      .catch((err) => {
        dispatch(errorLogging(err));
      });
  };
}

function userUpdateData() {
  return (dispatch, getState) => {
    // fetch user data from firestore
    const firestore = firebase.firestore();
    const uid = getState().uid;
    const scores = getState().scores;
    firestore.collection('users').doc(uid)
      .update({
        scores,
      })
      .then((doc) => {
        dispatch(addUserData(doc));
      })
      .catch((err) => {
        dispatch(errorLogging(err));
      });
  };
}

const removeUser = () => ({
  type: REMOVE_USER,
});

const removeUserData = () => ({
  type: REMOVE_USER_DATA,
});

function userLogout() {
  return (dispatch) => {
    firebase.auth().signOut()
      .then(() => {
        dispatch(removeUser());
        dispatch(removeUserData());
      }).catch((err) => {
        dispatch(errorLogging(err));
      });
  };
}

export {
  userAddAlias,
  userFacebookSignIn,
  userGoogleSignIn,
  userAuth,
  userFetchData,
  userUpdateData,
  userLogout,
};
