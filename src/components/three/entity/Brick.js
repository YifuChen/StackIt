import * as THREE from 'three';
import Physijs from 'physijs-webpack/webpack';
import PhysiBrick from './PhysiBrick';
import palette from '../Palette';

class Brick {
  constructor(param = {}) {
    this.params = Object.assign(Brick.default, param);
    // console.log(this.params);

    const geom = new THREE.BoxGeometry(this.params.edge.x, this.params.edge.y, this.params.edge.z);
    const mat = new THREE.MeshLambertMaterial({
      color: this.params.color,
    });
    const physiMaterial = new Physijs.createMaterial(mat, 0.9, 0.6);
    // init mesh
    const mesh = new Physijs.BoxMesh(geom, physiMaterial, 0);
    mesh.position.copy(this.params.position);
    mesh.scale.copy(this.params.scale);
    mesh.castShadow = this.params.castShadow;
    mesh.receiveShadow = this.params.receiveShadow;
    this.mesh = mesh;
  }

  build() {
    return this.mesh;
  }

  move(deltaTime) {
    this.mesh.__dirtyPosition = true;
    if (this.params.direction === 'x') {
      if (this.mesh.position.x >= 60 || this.mesh.position.x <= -60) {
        this.params.speed.h = -this.params.speed.h;
        this.mesh.position.x = this.mesh.position.x < 0 ? -60 : 60;
      }
      this.mesh.position.x += deltaTime * this.params.speed.h;
    } else if (this.params.direction === 'z') {
      if (this.mesh.position.z >= 60 || this.mesh.position.z <= -60) {
        this.params.speed.h = -this.params.speed.h;
        this.mesh.position.z = this.mesh.position.z < 0 ? -60 : 60;
      }
      this.mesh.position.z += deltaTime * this.params.speed.h;
    }
  }

  cut(prev) {
    this.mesh.__dirtyPosition = true;
    // parameters of the previous brick on stack
    const prevInfo = {
      width: 50 * prev.mesh.scale.x,
      depth: 50 * prev.mesh.scale.z,
      x: prev.mesh.position.x,
      y: prev.mesh.position.y,
      z: prev.mesh.position.z,
    };

    const currInfo = {
      width: 50 * this.mesh.scale.x,
      height: 8 * this.mesh.scale.y,
      depth: 50 * this.mesh.scale.z,
      deltaX: this.mesh.position.x - prevInfo.x,
      deltaZ: this.mesh.position.z - prevInfo.z,
      newWidth: prevInfo.width - Math.abs(this.mesh.position.x - prevInfo.x),
      newDepth: prevInfo.depth - Math.abs(this.mesh.position.z - prevInfo.z),
    };

    let fallingBrick;
    let fallingBrickCase;
    if (currInfo.newWidth < 0 || currInfo.newDepth < 0) {
      // no overlapping
      fallingBrick = new PhysiBrick({
        position: this.mesh.position,
        scale: this.mesh.scale,
        color: palette.purple,
        mass: 500,
      });
      fallingBrickCase = 'miss';
    } else if (Math.abs(currInfo.deltaX) > 1 || Math.abs(currInfo.deltaZ) > 1) {
      // set tolerance = 1
      if (this.params.direction === 'x') {
        this.mesh.scale.x = currInfo.newWidth / 50;
        this.mesh.position.x = prevInfo.x + currInfo.deltaX / 2;
        const fallingBrickPos = (currInfo.deltaX > 0)
          ? new THREE.Vector3(prevInfo.x + currInfo.deltaX + currInfo.newWidth / 2 + 2,
            prevInfo.y + 8, prevInfo.z)
          : new THREE.Vector3(prevInfo.x + currInfo.deltaX - currInfo.newWidth / 2 - 2,
            prevInfo.y + 8, prevInfo.z);
        fallingBrick = new PhysiBrick({
          position: fallingBrickPos,
          scale: new THREE.Vector3((prevInfo.width - currInfo.newWidth) / 50,
            1, prevInfo.depth / 50),
          color: palette.purple,
          mass: 500,
        });
        fallingBrickCase = 'partial';
      } else {
        this.mesh.scale.z = currInfo.newDepth / 50;
        this.mesh.position.z = prevInfo.z + currInfo.deltaZ / 2;
        const fallingBrickPos = (currInfo.deltaZ > 0)
          ? new THREE.Vector3(prevInfo.x, prevInfo.y + 8,
            prevInfo.z + currInfo.deltaZ + currInfo.newDepth / 2 + 2)
          : new THREE.Vector3(prevInfo.x, prevInfo.y + 8,
            prevInfo.z + currInfo.deltaZ - currInfo.newDepth / 2 - 2);
        fallingBrick = new PhysiBrick({
          position: fallingBrickPos,
          scale: new THREE.Vector3(prevInfo.width / 50, 1,
            (prevInfo.depth - currInfo.newDepth) / 50),
          color: palette.purple,
          mass: 500,
        });
        fallingBrickCase = 'partial';
      }
    } else {
      this.mesh.position.x = prevInfo.x;
      this.mesh.position.z = prevInfo.z;
      fallingBrick = null;
      fallingBrickCase = 'overlap';
    }
    return {
      fallingBrick,
      case: fallingBrickCase,
    };
  }
}

Brick.default = {
  edge: new THREE.Vector3(50, 8, 50),
  position: new THREE.Vector3(0, 0, 0),
  scale: new THREE.Vector3(1, 1, 1),
  castShadow: true,
  receiveShadow: true,
  color: palette.white,
  scene: null,
  speed: { h: 50, v: 60 },
  isDropped: false,
  direction: 'x',
};

export default Brick;
