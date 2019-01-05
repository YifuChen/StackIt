import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import StartMenu from './StartMenu';
import '../css/app.css';
import Avatar from './Avatar';
import NavBar from './NavBar';
import { ScoreBoard, LeaderBoard } from './LeaderBoard';
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
      leaderboardData: [{ id: '1', name: 'yifu', score: '122' },
        { id: '2', name: 'kacey', score: '34' },
        { id: '3', name: 'david', score: '31' },
        { id: '4', name: 'david', score: '26' },
        { id: '5', name: 'david', score: '12' }],
    };
  }

  UNSAFE_componentWillMount() {
    // initialize firebase
    firebase.initializeApp(this.props.firebaseConfig);
    const settings = {
      timestampsInSnapshots: true,
    };
    const firestore = firebase.firestore();
    firestore.settings(settings);

    // if user already logged in, fetch user info
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          isLoggedIn: true,
          username: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
        });
        // fetch user alias from firestore
        console.log(user);
        const docRef = firestore.collection('users').doc(user.uid);
        docRef.get().then((doc) => {
          const alias = doc.get('alias');
          this.setState({
            alias,
            hasAlias: true,
          });
        }).catch((err) => {
          console.log(err);
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
      alias: '',
    });
  }

  handleUserLogin(userInfo) {
    const firestore = firebase.firestore();
    const docRef = firestore.collection('users').doc(userInfo.uid);

    this.setState({
      isLoggedIn: true,
      username: userInfo.username,
      email: userInfo.email,
      uid: userInfo.uid,
      photoURL: userInfo.photoURL,
    });

    docRef.get().then((doc) => {
      if (doc.exists) {
        // user already has data in firestore
        const alias = doc.get('alias');
        this.setState({
          hasAlias: true,
          alias,
        });
      } else {
        // create a new doc for user in firestore
        docRef.set({
          alias: '',
          scores: [],
        });
        this.setState({
          hasAlias: false,
          alias: '',
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  handleAliasFormSubmit(alias) {
    const firestore = firebase.firestore();
    const uid = this.state.uid;
    // TODO(1): alias duplication check
    // write new alias to firestore
    firestore.collection('users').doc(uid).update({
      alias,
    }).catch((err) => {
      console.log(err);
    });
    // update app state
    this.setState({
      hasAlias: true,
      alias,
    });
  }

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

        <ScoreBoard score="78" combo="7"/>
        <LeaderBoard data={this.state.leaderboardData}/>

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

/*  */
