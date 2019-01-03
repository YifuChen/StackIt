import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/accountform.css';
import Button from './Button';

class AliasForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.placeholder,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  handleSubmit() {
    this.props.onSubmit(this.state.value);
  }

  handleLogout() {
    this.props.onLogout();
  }

  render() {
    return (
      <div className="alias-form">
        <input className="alias-form-input" 
                placeholder={this.props.placeholder}
                onChange={event => this.handleInputChange(event)}/>
        <ul className="alias-form-buttons">
          <li key="submit"> <Button name="submit" onClick={this.handleSubmit}/> </li>
          <li key="logout"> <Button name="logout" onClick={this.handleLogout}/> </li>
        </ul>
      </div>
    );
  }
}

AliasForm.propTypes = {
  placeholder: PropTypes.string,
  onSubmit: PropTypes.func,
  onLogout: PropTypes.func,
}

export default AliasForm;