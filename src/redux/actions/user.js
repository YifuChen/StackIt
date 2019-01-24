import firebase from 'firebase';
import {
  ADD_ALIAS,
  ADD_USER,
  ADD_USER_DATA,
  REMOVE_USER,
  REMOVE_USER_DATA,
} from '../constants/actionTypes';
import {
  appRegisterUser, appInvalidateUser, appRegisterAlias, appSwitchSection,
} from './app';
import errorLogging from './error';


// ACTION CREATORS
const addUser = user => ({
  type: ADD_USER,
  payload: user,
});

const addUserData = userData => ({
  type: ADD_USER_DATA,
  payload: userData,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const removeUserData = () => ({
  type: REMOVE_USER_DATA,
});

const userAddAlias = alias => ({
  type: ADD_ALIAS,
  payload: alias,
});


// THUNK: user sign in
function userGoogleSignIn() {
  return (dispatch) => {
    const provider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth()
      .signInWithPopup(provider)
      .then(result => result.user)
      .then((user) => {
        dispatch(addUser(user));
        dispatch(appRegisterUser());
      })
      .catch((err) => {
        dispatch(errorLogging(err));
      });
  };
}

function userFacebookSignIn() {
  return (dispatch) => {
    const provider = new firebase.auth.FacebookAuthProvider();

    return firebase.auth()
      .signInWithPopup(provider)
      .then(result => result.user)
      .then((user) => {
        dispatch(addUser(user));
        dispatch(appRegisterUser());
      })
      .catch((err) => {
        dispatch(errorLogging(err));
      });
  };
}

function userAuth() {
  return dispatch => (
    new Promise((resolve, reject) => {
      firebase
        .auth()
        .onAuthStateChanged((user) => {
          if (user) {
            dispatch(addUser(user));
            dispatch(appRegisterUser());
            resolve();
          } else {
            reject(new Error('no current user logged in'));
          }
        });
    })
  );
}

// THUNK: user fetch data
function userFetchData(uid) {
  return (dispatch) => {
    // fetch user data from firestore
    const firestore = firebase.firestore();
    const docRef = firestore.collection('users').doc(uid);
    return docRef.get()
      .then((doc) => {
        if (doc.exists) {
          const alias = doc.get('alias');
          const scores = doc.get('scores');
          if (alias && alias !== '') {
            dispatch(appRegisterAlias());
          }
          dispatch(addUserData({
            alias,
            scores,
          }));
        } else {
          const userData = {
            alias: '',
            scores: [],
          };
          docRef.set(userData);
          dispatch(addUserData(userData));
        }
      })
      .catch((err) => {
        dispatch(errorLogging(err));
      });
  };
}

// THUNK: user log out
function userLogout() {
  return dispatch => (
    firebase
      .auth().signOut()
      .then(() => {
        dispatch(removeUser());
        dispatch(removeUserData());
        dispatch(appInvalidateUser());
      }).catch((err) => {
        dispatch(errorLogging(err));
      })
  );
}

// THUNK: user put data
function userPutDataToDB(data, uid) {
  return (dispatch) => {
    const firestore = firebase.firestore();
    const docRef = firestore.collection('users').doc(uid);
    // return promise
    return docRef
      .update(data)
      .catch((err) => {
        dispatch(errorLogging(err));
      });
  };
}

// BATCH ACTIONS
function userSignInBatch(userSignInActionCreator = userAuth) {
  return (dispatch, getState) => {
    dispatch(userSignInActionCreator)
      .then(() => {
        const uid = (getState().userInfo.data.uid);
        console.log(uid);
        return dispatch(userFetchData(uid));
      })
      .then(() => {
        const aliasRegistered = getState().appState.aliasRegistered;
        console.log(aliasRegistered);
        if (aliasRegistered) {
          dispatch(appSwitchSection('start'));
        } else {
          dispatch(appSwitchSection('form'));
        }
      })
      .catch((err) => {
        dispatch(errorLogging(err));
      });
  };
}

function userSumbitAliasBatch(alias) {
  return (dispatch, getState) => {
    const uid = getState().userInfo.data.uid;
    dispatch(userPutDataToDB({ alias }, uid))
      .then(() => {
        dispatch(userAddAlias(alias));
        dispatch(appRegisterAlias());
        dispatch(appSwitchSection('start'));
      })
      .catch((err) => {
        dispatch(errorLogging(err));
      });
  };
}

export {
  userFacebookSignIn,
  userGoogleSignIn,
  userAuth,
  userFetchData,
  userLogout,
  userAddAlias,
  userPutDataToDB,
  userSignInBatch,
  userSumbitAliasBatch,
};
