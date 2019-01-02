import React, { Component } from 'react';
import * as THREE from 'three';
import ThreeSubject from './ThreeSubject';


class ThreeSceneManager {

  constructor(canvas) {
    this.canvas = canvas;
    this.scene = this.createScene();
    this.renderer = this.createRenderer();
    this.clock = new THREE.Clock();
    this.camera = new ThreeSubject(this.createCamera({width: window.innerWidth, height: window.innerHeight}), function(){});
    this.subjects = {};

    this.bindDOMElement(this.renderer, canvas);
    this.handleWindowResize.bind(this);
    this.addSubjectToScene.bind(this);
    this.clock.start();
  }

  // bind renderer with a DOM element
  bindDOMElement(canvas, renderer) {
    canvas.innerHTML = "";
    canvas.appendChild(renderer.domElement);
  }

  // add basic subjects to scene
  addSubjecttoScene(name, threeSubject) {
    Object.assign({name: threeSubject}, this.subjects);
    this.scene.add(threeSubject.content);
  }

  // handle window resize
  handleCanvasResize() {
    const {width, height} = this.canvas;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  // scene update
  update() {
    const deltaTime = this.clock.getDelta();
    for (let threeSubject of Object.values(this.subjects)) {
      threeSubject.update(deltaTime);
    }
    this.camera.update(deltaTime);
    this.renderer.render(this.scene, this.camera.content);
  }

  createScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#000000");
    return scene;
  }

  createRenderer() {
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
    renderer.setPixelRatio(DPR);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    return renderer;
  }

  createCamera({width, height}) {
    const aspectRatio = width / height;
    const nearPlane = 0.1;
    const farPlane = 1000;
    const fieldOfView = 45;
    const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
    // camera.position.set(120, 100, 120);
    // camera.lookAt(0, 0, 0);
    return camera;
  }

  createDirenctionalLight({color, intensity}) {
    const directionalLight = new THREE.DirectionalLight(color, intensity);
    return directionalLight;
  }

  createHemisphereLight({skyColor, groundColor, intensity}) {
    const hemisLight = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    return hemisLight;
  }

}


class ThreeContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const threeSceneManager = new ThreeSceneManager(this.threeMountEl);
    this.setState({
      sceneManager: threeSceneManager
    })
  }

  render() {
    return <div className="three-container"
                ref={el => this.threeMountEl = el}> </div>
  }
}


const defaultHemisphereLightParams = {
  skyColor: 0xaaaaaa,
  groundColor: 0x000000,
  intensity: 0.9,
}

const defaultDirectinoalLightParams = {
  color: 0xffffff,
  intensity: 0.9,
}


export default ThreeContainer;
