import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../css/resultboard.css';

function ResultBoard(props) {
  return (
    <div className="resultboard">
      <ul className="resultboard-list">
        <li key="score-title"> score </li>
        <li key="score" id="score"> {props.score} </li>
        <li key="combo-title"> max combo </li>
        <li key="combo" id="combo">  {props.maxCombo} </li>
      </ul>
    </div>
  );
}

ResultBoard.propTypes = {
  score: PropTypes.number.isRequired,
  maxCombo: PropTypes.number.isRequired,
};


function mapStateToProps(store) {
  const { gameState } = store;
  return {
    score: gameState.score,
    maxCombo: gameState.maxCombo,
  };
}


export default connect(mapStateToProps, null)(ResultBoard);
