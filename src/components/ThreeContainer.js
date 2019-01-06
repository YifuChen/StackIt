import React, { Component } from 'react';
import '../css/threecontainer.css';
import MenuScene from './three/MenuScene';

class ThreeContainer extends Component {
  componentDidMount() {
    const app = new MenuScene();
    this.container.appendChild(app.renderer.domElement);
    app.animate();
  }


  render() {
    return (
      <div className="whs-container" ref={(el) => {
        this.container = el;
        // console.log(el);
      }}></div>
    );
  }
}

export default ThreeContainer;
