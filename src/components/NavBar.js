import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import Button from './Button';
import '../css/navbar.css';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showOptions: true,
      toggleIcon: '>',
    };
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState({
      showOptions: !this.state.showOptions,
      toggleIcon: this.state.showOptions ? '>' : '<',
    });
  }

  render() {
    return (
      <div className='nav-bar'>
        <div className="nav-bar-toggle" onClick={this.handleToggleClick}>
          <p>{this.state.toggleIcon}</p>
        </div>
        {this.state.showOptions && (
          <ul className="nav-bar-options">
            <li key="facebook">facebook</li>
            <li key="twitter">twitter</li>
            <li key="github"><a href="https://github.com/YifuChen/StackIt">github</a></li>
            <li key="about">about</li>
          </ul>
        )}
      </div>
    );
  }
}


export default NavBar;
