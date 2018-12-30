import React, { Component } from 'react'
import Button from './Button'
import '../css/startmenu.css'

class StartMenu extends Component {
  render() {
    return (
      <div className='start-menu'>
        <ul className='menu-info'>
          <li key="title" id="title">Stack.io</li>
          <li key="description" id="description">- A WebGL game built on THREE.js -</li>	
        </ul>
        <ul className='menu-options'>
          <li> <Button name="start" /> </li>
          <li> <Button name="instruction" /> </li>
          <li> <Button name="login" /> </li>
        </ul>
        <footer>
          <p>© Copyright 2018 by Seapunk. All rights reserved.</p>
        </footer>
      </div>
    );
  }
}

export default StartMenu;