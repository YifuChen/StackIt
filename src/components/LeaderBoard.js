import React from 'react';
import PropTypes from 'prop-types';
import '../css/leaderboard.css';

function LeaderBoard(props) {
  return (
    <div className="leaderboard">
      <ul className="leaderboard-list">
        <li key="title">leaderboard</li>
        {props.data.map(item => <LeaderBoardItem key={item.id}
                                                id={item.id}
                                                name={item.name}
                                                score={item.score}/>)}
      </ul>
    </div>
  );
}

function LeaderBoardItem(props) {
  return (
    <li key={props.id} className="leaderboard-item">
      <div>{props.name}</div>
      <div>{props.score}</div>
    </li>
  );
}

function ScoreBoard(props) {
  return (
    <div className="scoreboard">
      <ul className="scoreboard-list">
        <li key="score-title"> score </li>
        <li key="score" id="score"> {props.score} </li>
        <li key="combo-title"> max combo </li>
        <li key="combo" id="combo">  {props.combo} </li>
      </ul>
    </div>
  );
}

LeaderBoard.propTypes = {
  data: PropTypes.array,
};

LeaderBoardItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.string,
};

ScoreBoard.propTypes = {
  score: PropTypes.string,
  combo: PropTypes.string,
};

export { LeaderBoard, ScoreBoard };
