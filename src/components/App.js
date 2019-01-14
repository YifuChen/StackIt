import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import StartMenu from './StartMenu';
import Avatar from './Avatar';
import NavBar from './NavBar';
import InfoBoard from './InfoBoard';
import EndMenu from './EndMenu';
import ThreeContainer from './ThreeContainer';
import MenuScene from './three/MenuScene';
import GameScene from './three/GameScene';
import '../css/app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      inStartMenu: true,
      inGame: false,
      inEndMenu: false,
      threeSceneManager: new MenuScene(),
      hasAlias: false,
      aliasFormPh: '',
      username: '',
      email: '',
      uid: '',
      photoURL: '',
      alias: '',
      gameScore: '78',
      combo: '6',
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

  handleEndMenuBackButtonClick() {
    this.setState({
      inStartMenu: true,
      inEndMenu: false,
      inGame: false,
      threeSceneManager: new MenuScene(),
    });
  }

  initGame() {
    this.setState({
      inStartMenu: false,
      inGame: true,
      inEndMenu: false,
      threeSceneManager: new GameScene(),
    });
  }

  handleGameEnd() {
    this.setState({
      inStartMenu: false,
      inGame: false,
      inEndMenu: true,
    });
  }

  resolveAppSectionView() {
    if (this.state.inStartMenu || this.state.inEndMenu) {
      return (
        <React.Fragment>
          <NavBar />
          <InfoBoard title='Stack.io'>
            {
              (this.state.isLoggedIn && this.state.hasAlias)
                ? (
                  <Avatar name={this.state.alias} src={this.state.photoURL}/>
                ) : (
                  '- A WebGL game built on THREE.js -'
                )
            }
          </InfoBoard>
          {
            this.state.inStartMenu
              ? (
                <StartMenu onLogin={userInfo => this.handleUserLogin(userInfo)}
                        onLogout={() => this.handleUserLogout()}
                        isLoggedIn={this.state.isLoggedIn}
                        hasAlias={this.state.hasAlias}
                        aliasFormPh={this.state.username}
                        onAliasFormSubmit={alias => this.handleAliasFormSubmit(alias)}
                        onGameStart={() => this.initGame()}/>
              )
              : (
                <EndMenu
                  score={this.state.gameScore}
                  combo={this.state.combo}
                  leaderboardData={this.state.leaderboardData}
                  onBackButtonClick={() => this.handleEndMenuBackButtonClick()} />
              )
          }
          <footer className="app-footer">
            - designed and created by Yifu Chen -
          </footer>
        </React.Fragment>
      );
    }

    if (this.state.inGame) {
      return null;
    }
    return null;
  }

  render() {
    return (
      <div className="app">
        <div className="three-container-style-wrapper"
              style={this.state.inGame ? null : { filter: 'blur(5px) brightness(90%)' }}>
          <ThreeContainer manager={this.state.threeSceneManager}
                          onSceneEnd={() => this.handleGameEnd()}/>
        </div>
        {this.resolveAppSectionView()}
      </div>
    );
  }
}

App.propTypes = {
  firebaseConfig: PropTypes.object.isRequired,
};

export default App;
