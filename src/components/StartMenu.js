import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import { FirebaseGoogleLogin, FirebaseFacebookLogin } from './FirebaseService';
import AliasForm from './AliasForm';
import TutorialBoard from './TutorialBoard';
import ShowcaseLayout from './layout/ShowcaseLayout';
import ListLayout from './layout/ListLayout';
import '../css/startmenu.css';

class StartMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inLoginSection: false,
      inTutorSection: false,
      inAliasSection: false,
    };
    this.handleLoginButtonClick = this.handleLoginButtonClick.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.handleTutorButtonClick = this.handleTutorButtonClick.bind(this);
    this.handleUserLoggedIn = this.handleUserLoggedIn.bind(this);
    this.handleAliasFormSubmit = this.handleAliasFormSubmit.bind(this);
    this.handleLogoutButtonClick = this.handleLogoutButtonClick.bind(this);
    this.handleStartButtonClick = this.handleStartButtonClick.bind(this);
  }

  handleStartButtonClick() {
    this.props.onGameStart();
  }

  handleLoginButtonClick() {
    this.setState({
      inLoginSection: true,
    });
  }

  handleLogoutButtonClick() {
    if (this.props.isLoggedIn) {
      this.props.onLogout();
    }
    this.setState({
      inAliasSection: false,
    });
  }

  handleBackButtonClick() {
    this.setState({
      inLoginSection: false,
      inTutorSection: false,
      inAliasSection: false,
    });
  }

  handleTutorButtonClick() {
    this.setState({
      inTutorSection: true,
    });
  }

  handleUserLoggedIn(userInfo) {
    console.log(this.props.hasAlias);
    this.props.onLogin(userInfo);
    console.log(this.props.hasAlias);
    this.setState((state, props) => ({
      inLoginSection: !props.isLoggedIn,
      inAliasSection: !props.hasAlias,
    }));
    console.log(this.props.hasAlias);
  }

  handleAliasFormSubmit(alias) {
    console.log(this.props.hasAlias);
    this.props.onAliasFormSubmit(alias);
    console.log(this.props.hasAlias);
    this.setState((state, props) => ({
      inAliasSection: !props.hasAlias,
    }));
    console.log(this.props.hasAlias);
  }

  resolveMenuSectionView() {
    if (this.state.inLoginSection) {
      return (
        <div key='login-section' className='login-section'>
          <ListLayout>
            <Button name="👈" onClick={this.handleBackButtonClick}/>
            <FirebaseGoogleLogin onLogin={this.handleUserLoggedIn}/>
            <FirebaseFacebookLogin onLogin={this.handleUserLoggedIn}/>
          </ListLayout>
        </div>
      );
    }
    if (this.state.inTutorSection) {
      return (
        <div key='tutorial-section' className='tutorial-section'>
          <ShowcaseLayout showcase={<TutorialBoard title="🎲 RULES" />}>
            <Button name="👈" onClick={this.handleBackButtonClick}/>
          </ShowcaseLayout>
        </div>
      );
    }
    if (this.state.inAliasSection) {
      return (
          <AliasForm placeholder={this.props.aliasFormPh}
                      onSubmit={this.handleAliasFormSubmit}
                      onLogout={this.handleLogoutButtonClick}/>
      );
    }
    return (
      <div key='main-section' className='main-section'>
        <ListLayout>
          <Button name="start" onClick={this.handleStartButtonClick}/>
          <Button name="tutorial" onClick={this.handleTutorButtonClick}/>
          {this.props.isLoggedIn ? (
            <Button name="logout" onClick={this.handleLogoutButtonClick}/>
          ) : (
            <Button name="login" onClick={this.handleLoginButtonClick}/>
          )}
        </ListLayout>
      </div>
    );
  }

  render() {
    return (
      <div className='start-menu'>
        {this.resolveMenuSectionView()}
      </div>
    );
  }
}

StartMenu.propTypes = {
  isLoggedIn: PropTypes.bool,
  hasAlias: PropTypes.bool,
  aliasFormPh: PropTypes.string,
  onAliasFormSubmit: PropTypes.func,
  onLogin: PropTypes.func,
  onLogout: PropTypes.func,
  onGameStart: PropTypes.func,
};

export default StartMenu;
