import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import StartMenu from './StartMenu';
import '../css/app.css';
import Avatar from './Avatar';
import NavBar from './NavBar';
// import Button from './Button';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      hasAlias: false,
      aliasFormPh: '',
      username: '',
      email: '',
      uid: '',
      photoURL: '',
      alias: '',
    };
  }

  UNSAFE_componentWillMount() {
    firebase.initializeApp(this.props.firebaseConfig);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        this.setState({
          isLoggedIn: true,
          username: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
        });
      }
    });
  }

  handleUserLogout() {
    firebase.auth().signOut();
    this.setState({
      isLoggedIn: false,
      hasAlias: false,
      username: '',
      email: '',
      uid: '',
      photoURL: '',
    });
  }

  handleUserLogin(userInfo) {
    this.setState({
      isLoggedIn: true,
      hasAlias: false,
      username: userInfo.username,
      email: userInfo.email,
      uid: userInfo.uid,
    });
  }

  handleAliasFormSubmit(alias) {
    // check firebase if alias already exists in database
    const rootRef = firebase.firestore();
    // let aliasExist = false;
    const uid = this.state.uid;
    // rootRef.collection('users').doc(uid).get().then(doc => {
    //   if (!doc) {
    //     console.log("no such doc!");
    //   } else if (doc.data()['alias']) {
    //     aliasExist = true;
    //   }
    // })
    // .catch(err => {
    //   console.log(err);
    // });

    // write new alias to firebase if no alias exists
    rootRef.collection('user').doc(uid).set({
      alias: alias,
    }).catch((err) => {
      console.log(err);
    });

    // update app state
    this.setState({
      hasAlias: true,
      alias: alias,
    });
  }

  // testFirebaseDb() {
  //   const rootRef = firebase.firestore();
  //   rootRef.collection('users').doc('test-user1').get().then(doc => {
  //     if (!doc) {
  //       console.log("no such doc!");
  //     } else {
  //       console.table(doc.data());
  //     }
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  // }

  render() {
    return (
      <React.Fragment>
        <div className="app-bg">
          <img src="/src/assets/img/test.jpg"/>
        </div>

        <NavBar />

        <div className="app-info">
          <ul>
            <li key="title" id="title">Stack.io</li>
            <li key="description" id="description">{
              (this.state.isLoggedIn && this.state.hasAlias) ? (
                <Avatar name={this.state.alias} src={this.state.photoURL}/>
              ) : (
                '- A WebGL game built on THREE.js -'
              )
            }</li>
          </ul>
        </div>

        <StartMenu onLogin={userInfo => this.handleUserLogin(userInfo)}
                    onLogout={() => this.handleUserLogout()}
                    isLoggedIn={this.state.isLoggedIn}
                    hasAlias={this.state.hasAlias}
                    aliasFormPh={this.state.username}
                    onAliasFormSubmit={alias => this.handleAliasFormSubmit(alias)}/>

        <footer className="app-footer">
          <p>© Copyright 2018 by Seapunk. All rights reserved.</p>
        </footer>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  firebaseConfig: PropTypes.object.isRequired,
};

export default App;
