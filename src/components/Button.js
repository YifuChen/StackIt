import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/button.css';

class Button extends Component {
  render() {
    return <button onClick={this.props.onClick}> {this.props.name.toString()} </button>;
  }
}

Button.defaultProps = {
  name: 'button',
  onClick: () => {}
}

Button.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func
}

export default Button;
