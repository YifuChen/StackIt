import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../css/aliasform.css';
import { userSumbitAliasBatch } from '../redux/actions/user';
import Button from './Button';
import ShowcaseLayout from './layout/ShowcaseLayout';
import FirebaseLogout from './container/FirebaseLogout';

class AliasForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.placeholder,
    };
  }

  handleInputChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  render() {
    return (
      <div key="alias-form" className="alias-form">
        <ShowcaseLayout showcase={
          <input className="alias-form-input"
                  placeholder={this.props.placeholder}
                  onChange={event => this.handleInputChange(event)}/>
        }>
          <Button name="submit" onClick={() => this.props.userSumbitAliasBatch(this.state.value)}/>
          <FirebaseLogout />
        </ShowcaseLayout>
      </div>
    );
  }
}

AliasForm.propTypes = {
  placeholder: PropTypes.string,
  userSumbitAliasBatch: PropTypes.func,
};

function mapStateToProps(state) {
  const { userInfo } = state;
  return { placeholder: userInfo.data.displayName };
}

const mapDispatchToProps = {
  userSumbitAliasBatch,
};

export default connect(mapStateToProps, mapDispatchToProps)(AliasForm);
