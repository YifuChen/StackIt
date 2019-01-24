import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../css/scoreboard.css';


function ScoreBoard(props) {
  return (
    <div className="scoreboard">
      <p>{props.score}</p>
    </div>
  );
}

ScoreBoard.propTypes = {
  score: PropTypes.number.isRequired,
};

function mapStateToProps(store) {
  const { gameState } = store;
  return {
    score: gameState.score,
    maxCombo: gameState.maxCombo,
  };
}


export default connect(mapStateToProps, null)(ScoreBoard);
