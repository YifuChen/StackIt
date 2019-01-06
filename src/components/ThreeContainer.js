import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/threecontainer.css';

class ThreeContainer extends Component {
  componentDidMount() {
    const app = this.props.app;
    this.container.appendChild(app.renderer.domElement);
    app.startClock();
    app.animate();
  }

  render() {
    return (
      <div className="three-container" ref={(el) => {
        this.container = el;
        // console.log(el);
      }}></div>
    );
  }
}

ThreeContainer.propTypes = {
  app: PropTypes.object.isRequired,
};

export default ThreeContainer;
