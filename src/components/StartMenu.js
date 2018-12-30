import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import ButtonLogin from './ButtonLogin'
import ButtonFacebook from './ButtonFacebook'
import '../css/startmenu.css'

class StartMenu extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='start-menu'>
        <ul className='menu-info'>
          <li key="title" id="title">Stack.io</li>
          <li key="description" id="description">{
            this.props.isLoggedIn ? (
              "- Welcome, " + this.props.username + " -"
            ) : (
              "- A WebGL game built on THREE.js -"
            )
          }</li>	
        </ul>
        <ul className='menu-options'>
          <li> <Button name="start" /> </li>
          <li> <Button name="instruction" /> </li>
          <li> <ButtonLogin name="login" >
            <ButtonFacebook appId={this.props.appId}
                            onLoggedIn={this.props.onLoggedIn}/>
          </ButtonLogin> </li>
        </ul>
        <footer>
          <p>© Copyright 2018 by Seapunk. All rights reserved.</p>
        </footer>
      </div>
    );
  }
}


StartMenu.propTypes = {
  appId: PropTypes.string,
  onLoggedIn: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  username: PropTypes.string
}

export default StartMenu;