import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import Button from './Button';


class FirebaseGoogleLogin extends Component {
  constructor(props) {
    super(props);
    this.handleUserLogin = this.handleUserLogin.bind(this);
  }

  handleUserLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then((result) => {
      const user = result.user;
      const userInfo = {
        username: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
      };
      this.props.onLogin(userInfo);
    }).catch((error) => {
      console.log(`Failed login with Google, ${error.code}`);
    });
  }

  render() {
    return (<Button name="Google" onClick={this.handleUserLogin}/>);
  }
}


class FirebaseFacebookLogin extends Component {
  constructor(props) {
    super(props);
    this.handleUserLogin = this.handleUserLogin.bind(this);
  }

  handleUserLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider).then((result) => {
      const user = result.user;
      const userInfo = {
        username: user.displayName,
        email: user.email,
      };
      console.table(userInfo);
      this.props.onLogin(userInfo);
    }).catch((error) => {
      console.log(`Failed login with Facebook, ${error.code}`);
    });
  }

  render() {
    return (<Button name="Facebook" onClick={this.handleUserLogin}/>);
  }
}

FirebaseFacebookLogin.propTypes = {
  onLogin: PropTypes.func,
  isLoggedIn: PropTypes.bool,
};

FirebaseGoogleLogin.propTypes = {
  onLogin: PropTypes.func,
  isLoggedIn: PropTypes.bool,
};

export { FirebaseGoogleLogin, FirebaseFacebookLogin };
