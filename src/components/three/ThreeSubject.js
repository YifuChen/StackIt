import * as THREE from 'three';

// const defaultHemisphereLightParams = {
//   skyColor: 0xaaaaaa,
//   groundColor: 0x000000,
//   intensity: 0.9,
// };

// const defaultDirectinoalLightParams = {
//   color: 0xffffff,
//   intensity: 0.9,
// };

export function createScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#000000');
  return scene;
}

export function createRenderer() {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
  renderer.setPixelRatio(DPR);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  return renderer;
}

export function createCamera({ width, height }) {
  const aspectRatio = width / height;
  const nearPlane = 0.1;
  const farPlane = 1000;
  const fieldOfView = 45;
  const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
  // camera.position.set(120, 100, 120);
  // camera.lookAt(0, 0, 0);
  return camera;
}

export function createDirenctionalLight({ color, intensity }) {
  const directionalLight = new THREE.DirectionalLight(color, intensity);
  return directionalLight;
}

export function createHemisphereLight({ skyColor, groundColor, intensity }) {
  const hemisLight = new THREE.HemisphereLight(skyColor, groundColor, intensity);
  return hemisLight;
}
