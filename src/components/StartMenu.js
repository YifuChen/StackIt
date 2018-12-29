import React, { Component } from 'react'
import Button from './Button'
import LoginSection from './LoginSection'
import '../css/startmenu.css'

class StartMenu extends Component {
  render() {
    return (
      <div className='start-menu'>
        <header className='info'>
          <h1>Stack.io</h1>
          <h2>- A WebGL game built on THREE.js - </h2>	
        </header>
        <ul className='menu-options'>
          <Button name="start" />
          <Button name="instruction" />
        </ul>
        <LoginSection title='Login'> 
          <li>Google</li>
          <li>Facebook</li>
        </LoginSection>
        <footer>
          <p>© Copyright 2018 by Seapunk. All rights reserved.</p>
        </footer>

      </div>
    );
  }
}

export default StartMenu;