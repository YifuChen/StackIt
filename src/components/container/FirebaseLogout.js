import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../Button';
import { userLogout } from '../../redux/actions/user';
import { appSwitchSection } from '../../redux/actions/app';


function FirebaseLogout(props) {
  const onClick = () => {
    props.userLogout();
    props.appSwitchSection('start');
  };
  return (<Button name="logout" onClick={onClick}/>);
}

FirebaseLogout.propTypes = {
  userLogout: PropTypes.func,
  appSwitchSection: PropTypes.func,
};

const mapDispatchToProps = {
  userLogout,
  appSwitchSection,
};

export default connect(null, mapDispatchToProps)(FirebaseLogout);
