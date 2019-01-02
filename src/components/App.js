import React, {Component} from 'react';
import PropTypes from 'prop-types'
import firebase from 'firebase';
import StartMenu from './StartMenu';
import '../css/app.css';
import Avatar from './Avatar';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      username: "",
      email: "",
      userId: "",
      photoURL: "",
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
    })
  }

  handleUserLogout() {
    firebase.auth().signOut();
    this.setState({
      isLoggedIn: false,
      username: "",
      email: "",
      userId: "",
    });
  }

	render() {
		return (
			<React.Fragment>
        <div className="bg"></div>
        <ul className='info'>
          <li key="title" id="title">Stack.io</li>
          <li key="description" id="description">{
            this.state.isLoggedIn ? (
              <Avatar name={this.state.username} src={this.state.photoURL}/>
            ) : (
              "- A WebGL game built on THREE.js -"
            )
          }</li>	
        </ul>

        <StartMenu onLoggedIn={userInfo => this.handleUserLogin(userInfo)}
                    onLoggedOut={() => this.handleUserLogout()}
                    isLoggedIn={this.state.isLoggedIn}/>

        <footer>
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