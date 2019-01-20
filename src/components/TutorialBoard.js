import React from 'react';
import PropTypes from 'prop-types';
import '../css/tutorialboard.css';


function TutorialBoard(props) {
  return (
    <div className="tutorialboard">
      <h2 className="tutorialboard-title"> {props.title} </h2>
      <div className="tutorialboard-content">
        <p>Stack up blocks as many as possible!</p>
        <p>hit <b>SPACE</b> or <b>CLICK</b> or <b>TAP</b> to lay a new block on stack!</p>
      </div>
    </div>
  );
}

TutorialBoard.propTypes = {
  title: PropTypes.string,
};

export default TutorialBoard;
