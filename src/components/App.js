import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { userSignInBatch, userAuth } from '../redux/actions/user';
import { appSwitchSection } from '../redux/actions/app';
import { gameReset } from '../redux/actions/game';
import StartMenu from './StartMenu';
import AliasForm from './AliasForm';
import Avatar from './Avatar';
import NavBar from './NavBar';
import InfoBoard from './InfoBoard';
import ScoreBoard from './ScoreBoard';
import EndMenu from './EndMenu';
import ThreeContainer from './ThreeContainer';
import MenuScene from './three/MenuScene';
import GameScene from './three/GameScene';
import '../css/animation.css';
import '../css/app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      threeSceneManager: new MenuScene(),
    };
  }

  componentDidMount() {
    // initialize firebase
    firebase.initializeApp(this.props.firebaseConfig);
    const settings = {
      timestampsInSnapshots: true,
    };
    const firestore = firebase.firestore();
    firestore.settings(settings);
    // if user already logged in, fetch user info
    this.props.userSignInBatch(this.props.userAuth);
  }

  navigateToSection(section) {
    this.props.appSwitchSection(section);
    if (section === 'start') {
      this.props.gameReset();
      this.setState({
        threeSceneManager: new MenuScene(),
      });
    } else if (section === 'game') {
      this.setState({
        threeSceneManager: new GameScene(),
      });
    }
  }

  resolveAppSectionView() {
    const section = this.props.currentSection;
    switch (section) {
      case 'start':
        return (<StartMenu onFinish={() => this.navigateToSection('game')}/>);
      case 'end':
        return (<EndMenu onFinish={() => this.navigateToSection('start')} />);
      case 'form':
        return (<AliasForm onFinish={() => this.navigateToSection('start')}/>);
      case 'game':
        return (<ScoreBoard />);
      default:
        return null;
    }
  }

  render() {
    const section = this.props.currentSection;
    return (
      <div className="app">
        <div className="three-container-style-wrapper"
              style={section === 'game' ? null : { filter: 'blur(5px) brightness(90%)' }}>
          <ThreeContainer manager={this.state.threeSceneManager}
                          onFinish={() => this.navigateToSection('end')}/>
        </div>
        {section !== 'game' && (
          <>
            <NavBar />
            <InfoBoard title='Stack.io'>
              {
                (this.props.userRegistered && this.props.aliasRegistered)
                  ? (
                    <Avatar name={this.props.alias} src={this.props.photoURL}/>
                  ) : (
                    '- A WebGL game built on THREE.js -'
                  )
              }
            </InfoBoard>
          </>)
        }
        {
          this.resolveAppSectionView()
        }
        {section !== 'game' && (
          <footer className="app-footer">
            - designed and created by Yifu Chen -
          </footer>)
        }
      </div>
    );
  }
}

App.propTypes = {
  firebaseConfig: PropTypes.object.isRequired,
  aliasRegistered: PropTypes.bool,
  userRegistered: PropTypes.bool,
  currentSection: PropTypes.string,
  photoURL: PropTypes.string,
  alias: PropTypes.string,
  userAuth: PropTypes.func,
  userSignInBatch: PropTypes.func,
  appSwitchSection: PropTypes.func,
  gameReset: PropTypes.func,
};

// connect component to redux store
function mapStateToProps(state) {
  const {
    appState, userInfo, userData,
  } = state;
  return {
    aliasRegistered: appState.aliasRegistered,
    userRegistered: appState.userRegistered,
    currentSection: appState.currentSection.app,
    photoURL: userInfo.data.photoURL,
    alias: userData.data.alias,
  };
}

const mapDispatchToProps = {
  userAuth,
  userSignInBatch,
  appSwitchSection,
  gameReset,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
