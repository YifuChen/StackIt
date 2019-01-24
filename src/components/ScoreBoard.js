import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../css/scoreboard.css';


function ScoreBoard(props) {
  return (
    <div className="scoreboard">
      <ul>
        <li className="scoreboard-score" key="score">{props.score}</li>
        {
          props.combo !== 0 && (<li className="scoreboard-combo" key="combo">- COMBO -</li>)
        }
      </ul>
    </div>
  );
}

ScoreBoard.propTypes = {
  score: PropTypes.number.isRequired,
  combo: PropTypes.number.isRequired,
};

function mapStateToProps(store) {
  const { gameState } = store;
  return {
    score: gameState.score,
    combo: gameState.combo,
  };
}


export default connect(mapStateToProps, null)(ScoreBoard);
