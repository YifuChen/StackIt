import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/threecontainer.css';

class ThreeContainer extends Component {
  constructor(props) {
    super(props);
    this.manager = this.props.manager;
    this.animate = this.animate.bind(this);
    this.isSceneEndHandled = false;
    this.handleMouseClick = this.handleMouseClick.bind(this);
  }

  componentDidMount() {
    const mountPoint = this.mountPoint;
    mountPoint.appendChild(this.manager.renderer.domElement);
    window.addEventListener('resize', this.manager.handleWindowResize, false);
    this.animate();
  }

  shouldComponentUpdate(nextProps) {
    const currManager = this.manager;
    const currRenderer = currManager.renderer;
    const nextManager = nextProps.manager;
    const mountPoint = this.mountPoint;
    if (currManager.name !== nextManager.name) {
      cancelAnimationFrame(this.frameId);
      mountPoint.removeChild(currRenderer.domElement);
      window.removeEventListener('resize', currManager.handleWindowResize);
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    const mountPoint = this.mountPoint;
    const manager = this.props.manager;
    const renderer = manager.renderer;
    this.isSceneEndHandled = false;
    this.manager = manager;
    mountPoint.appendChild(renderer.domElement);
    window.addEventListener('resize', this.manager.handleWindowResize, false);
    this.animate();
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.frameId);
    this.mountPoint.removeChild(this.manager.renderer.domElement);
  }

  animate() {
    if (this.isSceneEndHandled) {
      this.frameId = requestAnimationFrame(this.animate);
      this.manager.update();
    } else {
      this.frameId = requestAnimationFrame(this.animate);
      this.manager.update();
      if (this.manager.state.isTerminated) {
        console.log(this.manager.state);
        this.props.onSceneEnd();
        this.isSceneEndHandled = true;
      }
    }
  }

  handleMouseClick() {
    this.manager.handleMouseClick();
  }

  render() {
    return (
      <div className="three-container"
        ref={(el) => { this.mountPoint = el; }}
        onClick={this.handleMouseClick}>
      </div>
    );
  }
}

ThreeContainer.propTypes = {
  manager: PropTypes.object.isRequired,
  handleWindowResize: PropTypes.func,
  onSceneEnd: PropTypes.func,
  style: PropTypes.object,
};

export default ThreeContainer;
