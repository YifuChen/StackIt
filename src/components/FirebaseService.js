import React, { Component } from 'react'
import PropTypes from 'prop-types'
import firebase from 'firebase'
import Button from './Button'


class FirebaseGoogleLogin extends Component {
  constructor(props) {
    super(props);
    this.handleUserLogin = this.handleUserLogin.bind(this);
  }

  handleUserLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
            .then(result => {
              const user = result.user;
              const userInfo = {
                username: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
              }
              this.props.onLoggedIn(userInfo);
            })
            .catch(error => {
              let errorCode = error.code;
              alert(`Failed login with Google, ${errorCode}`);
            })   
  }

  render() {
    return <Button name="Google" onClick={this.handleUserLogin}/>
  }
}


class FirebaseFacebookLogin extends Component {

  constructor(props) {
    super(props);
    this.handleUserLogin = this.handleUserLogin.bind(this);
  }

  handleUserLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider)
            .then(result => {
              const user = result.user;
              const userInfo = {
                username: user.displayName,
                email: user.email,
              }
              console.table(userInfo);
              this.props.onLoggedIn(userInfo);
            })
            .catch(error => {
              let errorCode = error.code;
              alert(`Failed login with Facebook, ${errorCode}`);
            })
  }

  render() {
    return <Button name="Facebook" onClick={this.handleUserLogin}/>
  }
}

FirebaseFacebookLogin.propTypes = {
  onLoggedIn: PropTypes.func,
  isLoggedIn: PropTypes.bool
}

FirebaseGoogleLogin.propTypes = {
  onLoggedIn: PropTypes.func,
  isLoggedIn: PropTypes.bool
}

export {FirebaseGoogleLogin, FirebaseFacebookLogin};

