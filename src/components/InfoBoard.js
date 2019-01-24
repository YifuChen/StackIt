import React from 'react';
import PropTypes from 'prop-types';
import '../css/infoboard.css';


function InfoBoard(props) {
  return (
    <div className="info-board">
      <ul>
        <li key="title" id="title">{props.title}</li>
        {React.Children.map(props.children,
          (item, index) => <li key={index} id='content'>{item}</li>)}
      </ul>
    </div>
  );
}

InfoBoard.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default InfoBoard;
