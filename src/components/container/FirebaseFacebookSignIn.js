import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../Button';
import { userFacebookSignIn, userSignInBatch } from '../../redux/actions/user';


function FirebaseFacebookSignIn(props) {
  const onClick = () => {
    props.userSignInBatch(props.userFacebookSignIn);
  };
  return (<Button name="Facebook" onClick={onClick}/>);
}

FirebaseFacebookSignIn.propTypes = {
  userFacebookSignIn: PropTypes.func,
  userSignInBatch: PropTypes.func,
};


const mapDispatchToProps = {
  userFacebookSignIn,
  userSignInBatch,
};

export default connect(null, mapDispatchToProps)(FirebaseFacebookSignIn);
