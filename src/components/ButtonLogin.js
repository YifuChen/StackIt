import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Button from './Button';
import '../css/button-login.css'

class ButtonLogin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showOptions: false,
      name: this.props.name,
      options: this.props.children
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick() {
    this.setState(state => ({
      showOptions: !state.showOptions,
    }));
  }

  render() {
    const showOptions = this.state.showOptions;
    return (
      <div className="button-login">
        {showOptions ? (
          <ul>{this.state.options}</ul>
        ) : (
          <Button name={this.props.name} onClick={this.handleButtonClick}/>
        )}
      </div>
    );
  }
}

ButtonLogin.propTypes = {
  children: PropTypes.any,
  name: PropTypes.string
}

export default ButtonLogin;