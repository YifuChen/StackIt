import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/button.css';

class Button extends Component {
  handleClick(e) {
    e.preventDefault();
    this.props.onClick();
  }

  render() {
    return <button onClick={e => this.handleClick(e)}> {this.props.name.toString()} </button>;
  }
}

Button.defaultProps = {
  name: 'button',
  onClick: () => {},
};

Button.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
