import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import {FirebaseGoogleLogin, FirebaseFacebookLogin} from './FirebaseService';
import '../css/startmenu.css'

class StartMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inLoginSection: false,
      inTutorSection: false,
    }
    this.handleLoginButtonClick = this.handleLoginButtonClick.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.handleTutorButtonClick = this.handleTutorButtonClick.bind(this);
  }

  handleLoginButtonClick() {
    this.setState({
      inLoginSection: true,
    })
  }

  handleBackButtonClick() {
    this.setState({
      inLoginSection: false,
      inTutorSection: false,
    })
  }

  handleTutorButtonClick() {
    this.setState({
      inTutorSection: true,
    })
  }

  render() {
    return (
      <div className='start-menu'>
        {this.state.inTutorSection ? (
          <Instruction title="🎲 RULES"> 
            <Button name="👈" onClick={this.handleBackButtonClick}/>
          </Instruction>
        ) : (
          <ul className='menu-options'>
            {this.props.isLoggedIn ? (
              <React.Fragment>
                <li> <Button name="start" /> </li>
                <li> <Button name="tutorial" onClick={this.handleTutorButtonClick}/> </li>
                <li> <Button name="logout" onClick={this.props.onLoggedOut}/> </li>
              </React.Fragment>
            ) : (
              this.state.inLoginSection ? (
                <React.Fragment>
                  <li> <Button name="👈" onClick={this.handleBackButtonClick}/> </li>
                  <li> <FirebaseGoogleLogin onLoggedIn={this.props.onLoggedIn}/> </li>
                  <li> <FirebaseFacebookLogin onLoggedIn={this.props.onLoggedIn}/> </li>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <li> <Button name="start" /> </li>
                  <li> <Button name="tutorial" onClick={this.handleTutorButtonClick}/> </li>
                  <li> <Button name="login" onClick={this.handleLoginButtonClick}/> </li>
                </React.Fragment>
              )
            )}
          </ul>
        )}
      </div>
    );
  }
}

function Instruction(props) {
  return (
    <ul className="instruction">
      <li id="instruction-info">
        <div>
          <h2> {props.title} </h2>
          <p> Stack up blocks as high as possible!</p>
          <p> </p>
          <p> 
            You will only need to hit <b>SPACE</b> or <b>CLICK</b> or <b>TAP</b> to lay a new block on stack!
          </p>
        </div>
      </li>
      <li> {props.children} </li>
    </ul>
  );
}

Instruction.propTypes = {
  title: PropTypes.string,
  children: PropTypes.object
}

StartMenu.propTypes = {
  isLoggedIn: PropTypes.bool,
  onLoggedIn: PropTypes.func,
  onLoggedOut: PropTypes.func
}

export default StartMenu;