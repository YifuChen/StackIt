import React, { Component } from 'react'

class ThreeCanvas extends Component {

  componentDidMount() {

  }

  render() {
    return (
      <div ref={el => this.threeRootEl = el}></div>
    );
  }

}

export default ThreeCanvas;
