import * as THREE from 'three';
import palette from '../Palette';

class SpinningBrick {
  constructor(param = {}) {
    this.params = Object.assign(SpinningBrick.default, param);
    // console.log(this.params);

    const geom = new THREE.BoxGeometry(this.params.edge.x, this.params.edge.y, this.params.edge.z);
    const mat = new THREE.MeshLambertMaterial({
      color: this.params.color,
    });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.copy(this.params.position);
    mesh.castShadow = this.params.castShadow;
    mesh.receiveShadow = this.params.receiveShadow;
    this.mesh = mesh;
  }

  build() {
    return this.mesh;
  }

  update(deltaTime) {
    this.mesh.rotateX(deltaTime);
    this.mesh.rotateY(deltaTime);
    this.mesh.translateY(-30 * deltaTime);
  }
}

SpinningBrick.default = {
  edge: new THREE.Vector3(50, 8, 50),
  position: new THREE.Vector3(0, 0, 0),
  castShadow: true,
  receiveShadow: true,
  color: palette.white,
  mass: 0,
  scene: null,
};

export default SpinningBrick;
