import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/aliasform.css';
import Button from './Button';
import ShowcaseLayout from './layout/ShowcaseLayout';

class AliasForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.placeholder,
    };
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
      <div key="alias-form" className="alias-form">
        <ShowcaseLayout showcase={
          <input className="alias-form-input"
                  placeholder={this.props.placeholder}
                  onChange={event => this.handleInputChange(event)}/>
        }>
          <Button name="submit" onClick={this.handleSubmit}/>
          <Button name="logout" onClick={this.handleLogout}/>
        </ShowcaseLayout>
      </div>
    );
  }
}

AliasForm.propTypes = {
  placeholder: PropTypes.string,
  onSubmit: PropTypes.func,
  onLogout: PropTypes.func,
};

export default AliasForm;
