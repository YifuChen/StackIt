
class ThreeSubject {
  constructor(threeObj, onUpdate) {
    this.subject = threeObj; // a mesh, camera, light...
    this.update = onUpdate;
  }
}

export default ThreeSubject;