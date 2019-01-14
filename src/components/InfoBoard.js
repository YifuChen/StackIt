import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/infoboard.css';

class InfoBoard extends Component {
  render() {
    return (
      <div className="info-board">
        <ul>
          <li key="title" id="title">{this.props.title}</li>
          {React.Children.map(this.props.children,
            (item, index) => <li key={index} id='content'>{item}</li>)}
        </ul>
      </div>
    );
  }
}

InfoBoard.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default InfoBoard;
