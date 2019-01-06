import * as THREE from 'three';
import * as ThreeSubject from './ThreeSubject';

class ThreeSceneManager {
  constructor(canvas) {
    // canvas = document.getElementById('canvas');
    this.canvas = canvas;
    this.scene = ThreeSubject.createCamera();
    this.renderer = ThreeSubject.createRenderer();
    this.clock = new THREE.Clock();
    this.camera = ThreeSubject.createCamera({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    this.bindDOMElement(this.renderer, canvas);
    this.handleWindowResize.bind(this);
    this.addSubjectToScene.bind(this);
    // this.clock.start();
  }

  addSceneSubject(subject) {
    this.scene.add(subject);
  }

  // bind renderer with a DOM element
  bindDOMElement() {
    this.canvas.innerHTML = '';
    this.canvas.appendChild(this.renderer.domElement);
  }

  // add basic subjects to scene
  addSubjecttoScene(name, threeSubject) {
    Object.assign({ name: threeSubject }, this.subjects);
    this.scene.add(threeSubject.content);
  }

  // handle window resize
  handleCanvasResize() {
    const { width, height } = this.canvas;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  // scene update
  // update() {
  //   const deltaTime = this.clock.getDelta();
  // }
}

export default ThreeSceneManager;
