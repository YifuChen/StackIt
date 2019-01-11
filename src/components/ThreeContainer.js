import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/threecontainer.css';

class ThreeContainer extends Component {
  constructor(props) {
    super(props);
    this.animate = this.animate.bind(this);
    this.app = this.props.app;
    this.handleMouseClick = this.handleMouseClick.bind(this);
  }

  componentDidMount() {
    this.canvas.appendChild(this.app.renderer.domElement);
    window.addEventListener('resize', this.app.handleWindowResize, false);
    this.animate();
  }

  shouldComponentUpdate(nextProps) {
    const nextApp = nextProps.app;
    const currApp = this.app;
    if (nextApp.name !== currApp.name) {
      cancelAnimationFrame(this.frameId);
      const canvas = this.canvas;
      const currRenderer = currApp.renderer;
      const nextRenderer = nextApp.renderer;
      canvas.removeChild(currRenderer.domElement);
      canvas.appendChild(nextRenderer.domElement);
      this.app = nextApp;
      window.addEventListener('resize', this.app.handleWindowResize, false);
      this.animate();
      return true;
    }
    return false;
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.frameId);
    this.canvas.removeChild(this.app.renderer.domElement);
  }

  animate() {
    this.frameId = requestAnimationFrame(this.animate);
    this.app.update();
  }

  handleMouseClick() {
    this.app.handleMouseClick();
  }

  render() {
    return (
      <div className="three-container"
        ref={(el) => { this.canvas = el; }}
        onClick={this.handleMouseClick}>
      </div>
    );
  }
}

ThreeContainer.propTypes = {
  app: PropTypes.object.isRequired,
  handleWindowResize: PropTypes.func,
};

export default ThreeContainer;
