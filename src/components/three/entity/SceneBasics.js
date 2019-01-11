import * as THREE from 'three';
import * as Physijs from 'physijs-webpack/webpack';
import palette from '../Palette';


class SceneModule {
  constructor(params = {}) {
    const param = Object.assign(SceneModule.defaults, params);
    this.scene = new THREE.Scene();
    this.scene.fog = param.fog;
    this.scene.background = param.background;
  }

  build() {
    return this.scene;
  }
}

SceneModule.defaults = {
  fog: new THREE.Fog(palette.darkBlue, 50, 300),
  background: new THREE.Color(palette.darkBlue),
};

class PhysicSceneModule {
  constructor(params = {}) {
    const param = Object.assign(PhysicSceneModule.defaults, params);
    this.scene = new Physijs.Scene();
    this.scene.background = param.background;
    this.scene.fog = param.fog;
    this.scene.setGravity(param.gravity);
  }

  build() {
    return this.scene;
  }
}

PhysicSceneModule.defaults = {
  fog: new THREE.Fog(palette.darkBlue, 50, 300),
  background: new THREE.Color(palette.darkBlue),
  gravity: new THREE.Vector3(0, -100, 0),
};

class RendererModule {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
    this.renderer.setPixelRatio(DPR);
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  build() {
    return this.renderer;
  }
}

class CameraModule {
  constructor(params = {}) {
    const param = Object.assign(CameraModule.defaults, params);
    if (param.type === 'perspective') {
      this.camera = new THREE.PerspectiveCamera(param.fov, param.aspect, param.near, param.far);
      this.type = 'perspective';
    } else {
      const frustumSize = param.frustumSize;
      const aspect = window.innerWidth / window.innerHeight;
      this.camera = new THREE.OrthographicCamera(
        frustumSize * aspect / -2,
        frustumSize * aspect / 2,
        frustumSize / 2,
        frustumSize / -2,
        1, 1000,
      );
      this.frustumSize = 300;
      this.type = 'orthographic';
    }
    this.camera.position.copy(param.position);
    this.camera.lookAt(param.target.x, param.target.y, param.target.z);
  }

  build() {
    return this.camera;
  }

  handleWindowResize() {
    const aspect = window.innerWidth / window.innerHeight;
    if (this.type === 'orthographic') {
      this.camera.left = -this.frustumSize * aspect / 2;
      this.camera.right = this.frustumSize * aspect / 2;
      this.camera.top = this.frustumSize / 2;
      this.camera.bottom = -this.frustumSize / 2;
      this.camera.updateProjectionMatrix();
    }
  }
}

CameraModule.defaults = {
  type: 'perspective',
  fov: 45,
  aspect: window.innerWidth / window.innerHeight,
  near: 0.1,
  far: 1000,
  frustumSize: 300,
  position: new THREE.Vector3(0, 0, 0),
  target: new THREE.Vector3(0, 0, 0),
};


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
  SceneModule,
  PhysicSceneModule,
  RendererModule,
  CameraModule,
  GameDirectionalLight,
  GameHemisphereLight,
};
