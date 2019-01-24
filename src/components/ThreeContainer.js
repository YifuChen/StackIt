import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/threecontainer.css';

class ThreeContainer extends Component {
  constructor(props) {
    super(props);
    this.manager = this.props.manager;
    this.isSceneEndHandled = false;
    this.animate = this.animate.bind(this);
    this.handleMouseClick = this.handleMouseClick.bind(this);
  }

  componentDidMount() {
    if (this.manager !== null) {
      const mountPoint = this.mountPoint;
      mountPoint.appendChild(this.manager.renderer.domElement);
      window.addEventListener('resize', this.manager.handleWindowResize, false);
      this.animate();
    }
  }

  shouldComponentUpdate(nextProps) {
    if (this.manager === null) {
      if (nextProps.manager !== null) {
        return true;
      }
      return false;
    }

    const mountPoint = this.mountPoint;
    const nextManager = nextProps.manager;
    const currManager = this.manager;
    const currRenderer = currManager.renderer;
    if (nextProps.manager === null || currManager.name !== nextManager.name) {
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
    if (manager !== null) {
      const renderer = manager.renderer;
      this.isSceneEndHandled = false;
      this.manager = manager;
      mountPoint.appendChild(renderer.domElement);
      window.addEventListener('resize', this.manager.handleWindowResize, false);
      this.animate();
    }
  }

  componentWillUnmount() {
    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId);
    }
    if (this.manager !== null) {
      this.mountPoint.removeChild(this.manager.renderer.domElement);
    }
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
        this.props.onFinish();
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
  manager: PropTypes.object,
  onFinish: PropTypes.func,
  handleWindowResize: PropTypes.func,
};

ThreeContainer.defaultProps = {
  manager: null,
  onFinish: null,
};

export default ThreeContainer;
