import React, {Component} from 'react';
import PropTypes from 'prop-types'
import firebase from 'firebase';
import StartMenu from './StartMenu';
import '../css/app.css';
import Avatar from './Avatar';
import NavBar from './NavBar';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      hasAlias: false,
      aliasFormPh: "",
      username: "",
      email: "",
      userId: "",
      photoURL: "",
      alias: "",
    }
  }

  UNSAFE_componentWillMount() {
    firebase.initializeApp(this.props.firebaseConfig);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user);
        this.setState({
          isLoggedIn: true,
          username: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        })
      }
    })
  }

  handleUserLogin(userInfo) {
    this.setState({
      isLoggedIn: true,
      username: userInfo.username,
      email: userInfo.email,
      hasAlias: false,
    });

    // if (!this.state.hasAlias) {
    //   this.handleCreateAlias();
    //   this.setState({
    //     hasAlias: true,
    //   });
    // }
  }

  handleAliasFormSubmit(alias) {
    this.setState({
      hasAlias: true,
      alias: alias,
    });
  }

  handleUserLogout() {
    firebase.auth().signOut();
    this.setState({
      isLoggedIn: false,
      username: "",
      email: "",
      userId: "",
      photoURL: "",
    });
  }

	render() {
		return (
			<React.Fragment>
        <div className="app-bg"></div>

        <NavBar />

        <div className="app-info">
          <ul>
            <li key="title" id="title">Stack.io</li>
            <li key="description" id="description">{
              (this.state.isLoggedIn && this.state.hasAlias) ? (
                <Avatar name={this.state.alias} src={this.state.photoURL}/>
              ) : (
                "- A WebGL game built on THREE.js -"
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
  firebaseConfig: PropTypes.object
}

export default App;