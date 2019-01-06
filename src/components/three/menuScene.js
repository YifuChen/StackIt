import * as THREE from 'three';
import { SceneBuilder, RendererBuilder, Cornerstone } from './GeomComponent';
import palette from './Palette';

class MenuScene {
  constructor() {
    this.scene = new SceneBuilder({
      fog: new THREE.Fog(0x162d47, 50, 380),
      background: new THREE.Color(0x162d47),
    }).build();
    this.renderer = new RendererBuilder().build();
    this.camera = new THREE.PerspectiveCamera(
      45, window.innerWidth / window.innerHeight, 0.1, 1000,
    );
    this.camera.position.set(120, 200, 120);
    this.camera.lookAt(0, 0, 0);
    this.clock = new THREE.Clock();
    const cornerstone = new Cornerstone().build();
    cornerstone.position.set(0, -75, 0);
    const light1 = new THREE.DirectionalLight(palette.white, 0.9);
    light1.position.set(THREE.Vector3(1, 1, 0.5));
    const light2 = new THREE.HemisphereLight(palette.gray, palette.black, 0.9);
    this.scene.add(this.camera);
    this.scene.add(light1);
    this.scene.add(light2);
    this.scene.add(cornerstone);
    window.addEventListener('resize', this.handleWindowResize.bind(this), false);
  }

  startClock() {
    this.clock.start();
  }

  handleWindowResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }

  animate() {
    const deltaTime = this.clock.getDelta();
    const elapsedTime = this.clock.elapsedTime;
    if (this.clock.elapsedTime < 3) {
      this.camera.translateY(-deltaTime * 30);
    }
    this.camera.position.x = 120 * Math.sin(0.1 * elapsedTime);
    this.camera.position.z = 120 * Math.cos(0.1 * elapsedTime);
    this.camera.lookAt(0, 0, 0);
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate.bind(this));
  }
}


export default MenuScene;
