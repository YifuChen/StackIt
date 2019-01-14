import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import { ScoreBoard, LeaderBoard } from './LeaderBoard';
import '../css/endmenu.css';


class EndMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inScoreSection: true,
      inLeaderSection: false,
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.handleLeaderBoardButtonClick = this.handleLeaderBoardButtonClick.bind(this);
    this.handleScoreBoardButtonClick = this.handleScoreBoardButtonClick.bind(this);
  }

  handleBackButtonClick() {
    this.props.onBackButtonClick();
  }

  handleLeaderBoardButtonClick() {
    this.setState({
      inScoreSection: false,
      inLeaderSection: true,
    });
  }

  handleScoreBoardButtonClick() {
    this.setState({
      inScoreSection: true,
      inLeaderSection: false,
    });
  }

  render() {
    return (
      <div className='end-menu'>
        {
          (this.state.inScoreSection)
            ? (<ScoreBoard score={this.props.score} combo={this.props.combo} />)
            : (<LeaderBoard data={this.props.leaderboardData} />)
        }
        <ul className='end-menu-options'>
          <li key="back"> <Button name="👈" onClick={this.handleBackButtonClick}/> </li>
          <li key="board">
            {
              (this.state.inScoreSection)
                ? (<Button name="leaderboard" onClick={this.handleLeaderBoardButtonClick}/>)
                : (<Button name="scoreboard" onClick={this.handleScoreBoardButtonClick}/>)
            }
          </li>
        </ul>
      </div>
    );
  }
}

EndMenu.propTypes = {
  score: PropTypes.string,
  combo: PropTypes.string,
  leaderboardData: PropTypes.array,
  onBackButtonClick: PropTypes.func,
};

export default EndMenu;
