import React, { Component } from 'react'
import PropTypes from 'prop-types'

class LoginSection extends Component {

  render() {
    return (
      <div className="login-section">
        <p> {this.props.title} </p>
        <ul>
          {this.props.children}
        </ul>
      </div>
    );
  }
}

LoginSection.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string
}

export default LoginSection;