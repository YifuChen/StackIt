
class ThreeSubject {
  constructor(threeObj, onUpdate) {
    this.content = threeObj; // a mesh, camera, light...
    this.update = onUpdate;
  }

  set update(newUpdate) {
    this.update = newUpdate;
  }
}

export default ThreeSubject;