import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Button from './Button';
import '../css/button-login.css'

class ButtonLogin extends Component {

  render() {
    return (
      <div className="button-login">
        <Button name={this.props.name}/>
      </div>
    );
  }
}

ButtonLogin.propTypes = {
  children: PropTypes.any,
  name: PropTypes.string
}

export default ButtonLogin;