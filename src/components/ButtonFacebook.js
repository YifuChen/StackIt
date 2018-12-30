import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login'
import PropTypes from 'prop-types'

// import Button from './Button';

class ButtonFacebook extends Component {
  constructor(props) {
    super(props)
    this.handleMouseClick = this.handleMouseClick.bind(this);
    //this.handleResponse = this.handleResponse(this);
  }

  handleMouseClick() {
    console.log("facebook button clicked");
  }

  render() {
    return (
      <FacebookLogin
        appId={this.props.appId}
        fields="name,email,picture"
        onClick={this.handleMouseClick}
        callback = {this.props.onLoggedIn} />
    );
  }
}

ButtonFacebook.propTypes = {
  appId: PropTypes.string,
  onClick: PropTypes.func,
  onLoggedIn: PropTypes.func,
}


export default ButtonFacebook;