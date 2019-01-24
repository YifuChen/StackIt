import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import LeaderBoard from './LeaderBoard';
import ResultBoard from './ResultBoard';
import '../css/endmenu.css';
import ShowcaseLayout from './layout/ShowcaseLayout';


class EndMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSection: 'result',
      leaderboardData: [{ id: '1', name: 'yifu', score: '122' },
        { id: '2', name: 'kacey', score: '34' },
        { id: '3', name: 'david', score: '31' },
        { id: '4', name: 'david', score: '26' },
        { id: '5', name: 'david', score: '12' }],
      score: 76,
      combo: 7,
    };
  }

  navigateToSection(section) {
    this.setState({
      currentSection: section,
    });
  }

  render() {
    const section = this.state.currentSection;
    return (
      <div className='end-menu'>
        <ShowcaseLayout showcase={
          (section === 'result')
            ? (<ResultBoard score={this.state.score} combo={this.state.combo} />)
            : (<LeaderBoard data={this.state.leaderboardData} />)
        }>
          <Button name="👈" onClick={this.props.onFinish}/>
          {(section === 'result')
            ? (<Button name="leaderboard" onClick={() => this.navigateToSection('leader')}/>)
            : (<Button name="scores" onClick={() => this.navigateToSection('score')}/>)}
        </ShowcaseLayout>
      </div>
    );
  }
}

EndMenu.propTypes = {
  score: PropTypes.string,
  combo: PropTypes.string,
  leaderboardData: PropTypes.array,
  onFinish: PropTypes.func,
};

export default EndMenu;
