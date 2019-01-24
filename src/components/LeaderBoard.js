import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
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


LeaderBoard.propTypes = {
  data: PropTypes.array,
};

LeaderBoardItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.string,
};

export default LeaderBoard;
