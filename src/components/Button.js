import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/button.css';

class Button extends Component {
  render() {
    return <button> {this.props.name.toString()} </button>;
  }
}

Button.defaultProps = {
  name: 'button'
}

Button.propTypes = {
  name: PropTypes.string
}

export default Button;
