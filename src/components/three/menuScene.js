import * as THREE from 'three';
import { SceneModule, RendererModule, CameraModule } from './module/SceneModules';
import Cornerstone from './entity/Cornerstone';
import palette from './Palette';

class MenuScene {
  constructor() {
    this.init();
    // manager state
    this.state = {
      id: this.scene.uuid,
      isTerminated: false,
    };
    this.name = this.scene.uuid;
    // utilities
    this.handleWindowResize = this.handleWindowResize.bind(this);
  }

  init() {
    // init scene
    this.scene = new SceneModule({
      fog: new THREE.Fog(palette.darkBlue, 50, 380),
      background: new THREE.Color(palette.darkBlue),
    }).build();
    // init renderer
    this.renderer = new RendererModule().build();
    // init camera
    this.camera = new CameraModule({
      type: 'orthograpgic',
      position: new THREE.Vector3(120, 200, 120),
      target: new THREE.Vector3(0, 0, 0),
      frustumSize: 150,
    }).build();
    // init clock
    this.clock = new THREE.Clock();
    // init entities
    const light1 = new THREE.DirectionalLight(palette.white, 0.9);
    light1.position.set(new THREE.Vector3(1, 1, 0));
    const light2 = new THREE.HemisphereLight(palette.white, palette.darkBlue, 1);
    const cornerstone = new Cornerstone({
      position: new THREE.Vector3(0, -100, 0),
      edge: new THREE.Vector3(50, 200, 50),
    });
    this.scene.add(this.camera, light1, light2, cornerstone.mesh);
  }

  update() {
    if (this.state.isTerminated) {
      return;
    }
    const deltaTime = this.clock.getDelta();
    const elapsedTime = this.clock.elapsedTime;
    if (elapsedTime < 3) {
      this.camera.translateY(-deltaTime * 30);
    }
    this.camera.position.x = 120 * Math.sin(0.1 * elapsedTime);
    this.camera.position.z = 120 * Math.cos(0.1 * elapsedTime);
    this.camera.lookAt(0, 0, 0);
    this.renderer.render(this.scene, this.camera);
  }

  handleWindowResize() {
    const aspect = window.innerWidth / window.innerHeight;
    const frustumSize = 150;
    this.camera.left = -frustumSize * aspect / 2;
    this.camera.right = frustumSize * aspect / 2;
    this.camera.top = frustumSize / 2;
    this.camera.bottom = -frustumSize / 2;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  handleMouseClick() {
    console.log(this.state.id);
  }
}

export default MenuScene;
