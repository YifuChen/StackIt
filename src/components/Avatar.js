import React from 'react';
import PropTypes from 'prop-types';
import '../css/avatar.css';

function Avatar(props) {
  return (
    <div className="avatar">
      <img className="avatar-photo" src={props.src} alt="A"/>
      <p className="avatar-info">- Welcome, {props.name} -</p>
    </div>
  );
}

Avatar.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
};

export default Avatar;
