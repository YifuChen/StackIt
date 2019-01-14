import * as THREE from 'three';
import palette from '../Palette';

class Cornerstone {
  constructor(param = {}) {
    this.params = Object.assign(Cornerstone.default, param);
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
}

Cornerstone.default = {
  edge: new THREE.Vector3(50, 150, 50),
  position: new THREE.Vector3(0, -75, 0),
  castShadow: true,
  receiveShadow: true,
  color: palette.lightBlue,
  mass: 0,
  scene: null,
};

export default Cornerstone;
