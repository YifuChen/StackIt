import * as THREE from 'three';
import palette from './Palette';


class SceneBuilder {
  constructor(params = {}) {
    this.scene = new THREE.Scene();
    this.scene.fog = params.fog;
    this.scene.background = params.background;
  }

  build() {
    // console.log(this.scene);
    return this.scene;
  }
}

class RendererBuilder {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  build() {
    // console.log(this.renderer);
    return this.renderer;
  }
}

class CameraBuilder {
  constructor(params = {}) {
    this.camera = new THREE.PerspectiveCamera(45,
      window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(params.position);
    this.camera.lookAt(params.target);
  }

  build() {
    // console.log(this.camera);
    return this.camera;
  }
}

class Cornerstone {
  // default params
  static defaults = {
    color: palette.blue,
    position: new THREE.Vector3(0, -75, 0),
  }

  constructor(params = {}) {
    if (!params) {
      this.params = Cornerstone.defaults;
    } else {
      this.params = params;
    }
    this.mat = new THREE.MeshLambertMaterial(this.params.color);
    this.geom = new THREE.BoxGeometry(50, 150, 50);
  }

  build() {
    return new THREE.Mesh(this.geom, this.mat);
  }
}


class GameDirectionalLight {
  static defaults = {
    color: palette.white,
    intensity: 0.9,
    position: new THREE.Vector3(1, 1, 0.5),
  }

  constructor(params = {}) {
    this.light = new THREE.DirectionalLight(params.color, params.intensity);
    this.light.position.set(params.position);
  }

  build() {
    // console.log(this.light);
    return (this.light);
  }
}

class GameHemisphereLight {
  static defaults = {
    skyColor: palette.gray,
    groundColor: palette.black,
    intensity: 0.9,
    position: new THREE.Vector3(1, 1, 0.5),
  }

  constructor(params = {}) {
    this.light = new THREE.HemisphereLight(params.skyColor,
      params.groundColor,
      params.intensity);
    this.light.position.set(params.position);
  }

  build() {
    // console.log(this.light);
    return (this.light);
  }
}


export {
  SceneBuilder,
  RendererBuilder,
  CameraBuilder,
  Cornerstone,
  GameDirectionalLight,
  GameHemisphereLight,
};
