'use strict';

var scene, camera, renderer;  // all threejs programs need these
var light1,light2;  // we have two lights
var clock;          // time
var bricks;
var stackHeight;
var gameState = {score:0, scene:"start"};
var palette_summer = {
    yellow: 0xfff489,
    pink: 0xffdcfc,
    blue: 0xedc6ff,
    purple: 0xc4ddff,
    red: 0xffb8b8,
}

createScene();
animate();  // start the animation loop!

/**
  To initialize the scene, we initialize each of its components
*/
function createScene(){
    // these calls define the following global variables
    //scene, camera, renderer, light1, light2
    initScene();
    initCamera();
    initLight();
    initRenderer();
    initControls();
    bricks = new Array(200);
    // next we make the floor and walls
    var foundation = new Foundation();
    scene.add(foundation.mesh);

    stackHeight = 1;
    bricks[0] = new Brick('z', 50, 50);
    bricks[0].mesh.position.set(0, 0, 0);
    scene.add(bricks[0].mesh);
    addBrick();
}

function animate() {
  switch (gameState.scene) {
    case 'start':
      var deltaTime = clock.getDelta();
      if (!bricks[stackHeight].isDropped) {
          if(camera.position.y - bricks[stackHeight].mesh.position.y <= 100) {
              moveCamera(deltaTime);
          }
          moveBrick(bricks[stackHeight], deltaTime);
      } else {
          dropBrick(bricks[stackHeight]);
          addBrick();
      }
      scene.simulate();
      renderer.render( scene, camera );
      break;
    case 'end':
        endGame();
      break;
    default:

  }
  requestAnimationFrame( animate );
}


/* We don't do much here, but we could do more!
*/
function initPysijs() {
    Physijs.scripts.worker = './lib/physijs_worker.js'
    Physijs.scripts.ammo = './lib/ammo.js';
}

function initScene(){
	scene = new Physijs.Scene();
    scene.background = new THREE.Color(0x162d47)
    scene.fog = new THREE.Fog(0x162d47, 5, 380);
    scene.setGravity(new THREE.Vector3(0, -30, 0))
}

/*
	The renderer needs a size and the actual canvas we draw on
	needs to be added to the body of the webpage. We also specify
	that the renderer will be computing soft shadows
*/
function initRenderer() {
	renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });
	renderer.setSize( window.innerWidth, window.innerHeight );
  var canvas = document.getElementById("canvas-area");
	canvas.innerHTML = "";
  canvas.appendChild(renderer.domElement);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    window.addEventListener('resize', handleWindowResize, false);
}

function handleWindowResize() {
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

function initCamera() {
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.set(120, 100, 120);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
}

function moveCamera(deltaTime) {
    camera.position.y += deltaTime * 40;
}

function initLight() {
    light1 = new THREE.DirectionalLight(0xffffff, 0.9);
    light1.position.set(1,1,0.5);
    scene.add(light1)
    light2 = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9);
    scene.add(light2)
}

function initControls(){
	// here is where we create the eventListeners to respond to operations
    //create a clock for the time-based animation ...
	clock = new THREE.Clock();
	clock.start();
  //window.addEventListener('click', handleMouseClick, false);
  window.addEventListener( 'keydown', keydown);
}

function handleMouseClick(event) {
    bricks[stackHeight].isDropped = true;
}

function Foundation() {
    var geom = new THREE.BoxGeometry(50, 150, 50);
	var mat = new THREE.MeshLambertMaterial( {color: palette_summer['blue']} );
	this.mesh = new THREE.Mesh(geom, mat, 0);
	this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.mesh.position.set(0, -79, 0);
}

function Brick(direction, width, depth) {
    this.fly_speed = 80;
    this.drop_speed = 60;
    this.isDropped = false;
    this.direction = direction;

    var geom = new THREE.BoxGeometry(50, 8, 50);
    geom.scale(width/50, 1, depth/50)
	var mat = new THREE.MeshLambertMaterial( {color: palette_summer['yellow']} );
	this.mesh = new THREE.Mesh(geom, mat);
	this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
}

function addBrick() {
    var width = 50;
    var depth = 50;
    var posX = bricks[stackHeight - 1].mesh.position.x;
    var posZ = bricks[stackHeight - 1].mesh.position.z;

    if (bricks[stackHeight - 1].direction == 'z') {
        bricks[stackHeight] = new Brick('x', width, depth);
        bricks[stackHeight].mesh.scale.x = bricks[stackHeight - 1].mesh.scale.x;
        bricks[stackHeight].mesh.scale.z = bricks[stackHeight - 1].mesh.scale.z;
        bricks[stackHeight].mesh.position.set(-59, 8*(stackHeight) , posZ);
    } else {
        bricks[stackHeight] = new Brick('z', width, depth);
        bricks[stackHeight].mesh.scale.x = bricks[stackHeight - 1].mesh.scale.x;
        bricks[stackHeight].mesh.scale.z = bricks[stackHeight - 1].mesh.scale.z;
        bricks[stackHeight].mesh.position.set(posX, 8*(stackHeight) , -59);
    }
    scene.add(bricks[stackHeight].mesh);
}

function moveBrick(brick, deltaTime) {
    if(brick.direction == 'x') {
        if (brick.mesh.position.x >= 60) {
            brick.fly_speed = - brick.fly_speed;
        } else if (brick.mesh.position.x <= -60) {
            brick.fly_speed = - brick.fly_speed;
        }
        brick.mesh.position.x += deltaTime * brick.fly_speed;
    } else {
        if (brick.mesh.position.z >= 60) {
            brick.fly_speed = - brick.fly_speed;
        } else if (brick.mesh.position.z <= -60) {
            brick.fly_speed = - brick.fly_speed;
        }
        brick.mesh.position.z += deltaTime * brick.fly_speed;
    }
}

function DroppedBrick(width, depth, x, y, z) {
    console.log("dropping brick")
    console.log(width + " " + depth)
    var geom = new THREE.BoxGeometry(depth, 8, width);
	var mat = new THREE.MeshLambertMaterial( {color: palette_summer.purple} );
	var pmaterial = new Physijs.createMaterial(mat,0.9,0.95);
	var mesh = new Physijs.BoxMesh(geom, pmaterial, 50);
	mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.x = x;
    mesh.position.y = y;
    mesh.position.z = z;
    scene.add(mesh)
}

function dropBrick(brick) {
    var width = 50 * bricks[stackHeight - 1].mesh.scale.x;
    var depth = 50 * bricks[stackHeight - 1].mesh.scale.z;

    console.log("width:"+width);
    console.log("depth:"+depth);

    var posX = bricks[stackHeight - 1].mesh.position.x;
    var posY = bricks[stackHeight - 1].mesh.position.y;
    var posZ = bricks[stackHeight - 1].mesh.position.z;

    if (brick.direction == 'x') {
        var newWidth = width - Math.abs(brick.mesh.position.x - posX);
        console.log("newWidth:"+newWidth);
        if(newWidth < 0){
            gameState.scene = 'end';
            return;
        }
        var deltaX = Math.abs(width - newWidth);
        brick.mesh.scale.x = newWidth/50;
        if (brick.mesh.position.x - posX <= 0) {
            brick.mesh.position.x = posX - deltaX/2;
            DroppedBrick(depth, width - newWidth, posX - deltaX - newWidth / 2, posY + 8, posZ)
        }else {
            brick.mesh.position.x = posX + deltaX/2;
            DroppedBrick(depth, width - newWidth, posX + deltaX + newWidth / 2, posY + 8, posZ)
        }

    } else {
        var newDepth = depth - Math.abs(brick.mesh.position.z - posZ);
        console.log("newDepth:"+newDepth);
        if(newDepth < 0){
            gameState.scene = 'end';
            return;
        }
        var deltaZ = Math.abs(depth - newDepth);
        brick.mesh.scale.z = newDepth/50;
        if (brick.mesh.position.z - posZ <= 0) {
            brick.mesh.position.z = posZ - deltaZ/2;
            DroppedBrick(depth - newDepth, width, posX , posY + 8, posZ - deltaZ - newDepth / 2)
        } else {
            brick.mesh.position.z = posZ + deltaZ/2;
            DroppedBrick(depth - newDepth, width, posX , posY + 8, posZ + deltaZ + newDepth / 2)
        }
    }
    brick.fly_speed = 0;
    stackHeight += 1;

}

function endGame(){
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    gameState.scene = "default";
}

function keydown(event){
	console.log("Keydown:"+event.key);
	//console.dir(event);
	// first we handle the "play again" key in the "youwon" scene
	if (gameState.scene == 'default' && (event.key=='r'||event.key=='R')) {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    createScene();
    gameState.scene = 'start';
		gameState.score = 0;
		return;
	}
  if (gameState.scene == 'start' && (event.key=='j'||event.key=='J')) {
		bricks[stackHeight].isDropped = true;
		return;
	}
}
