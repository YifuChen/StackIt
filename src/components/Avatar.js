import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/avatar.css';

class Avatar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="avatar">
        <img className="avatar-photo" src={this.props.src}/>
        <p className="avatar-info">- Welcome, {this.props.name} -</p>
      </div>
    );
  }
}

Avatar.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
};

export default Avatar;
