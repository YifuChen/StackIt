import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../Button';
import { userGoogleSignIn, userSignInBatch } from '../../redux/actions/user';


function FirebaseGoogleSignIn(props) {
  const onClick = () => {
    props.userSignInBatch(props.userGoogleSignIn);
  };
  return (<Button name="Google" onClick={onClick}/>);
}

FirebaseGoogleSignIn.propTypes = {
  userGoogleSignIn: PropTypes.func,
  userSignInBatch: PropTypes.func,
};

const mapDispatchToProps = {
  userGoogleSignIn,
  userSignInBatch,
};

export default connect(null, mapDispatchToProps)(FirebaseGoogleSignIn);
