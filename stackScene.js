'use strict';

var scene, camera, renderer;  // all threejs programs need these
var light1,light2;  // we have two lights
var clock;          // time
var bricks = new Array(200);
var stackHeight;

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

    //scene.simulate();
	renderer.render( scene, camera );
    requestAnimationFrame( animate );
}


/* We don't do much here, but we could do more!
*/
function initPysijs() {
    Physijs.scripts.worker = '/lib/physijs_worker.js'
    Physijs.scripts.ammo = '/lib/ammo.js';
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
	document.body.appendChild( renderer.domElement );
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
    window.addEventListener('click', handleMouseClick, false);
}

function handleMouseClick(event) {
    bricks[stackHeight].isDropped = true;
}

function Foundation() {
    var geom = new THREE.BoxGeometry(50, 150, 50);
	var mat = new THREE.MeshLambertMaterial( {color: palette_summer['blue']} );
	this.mesh = new Physijs.BoxMesh(geom, mat, 0);
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
    var width = 50 * bricks[stackHeight - 1].mesh.scale.x;
    var depth = 50 * bricks[stackHeight - 1].mesh.scale.z;
    var posX = bricks[stackHeight - 1].mesh.position.x;
    var posZ = bricks[stackHeight - 1].mesh.position.z;

    if (bricks[stackHeight - 1].direction == 'z') {
        bricks[stackHeight] = new Brick('x', width, depth);
        bricks[stackHeight].mesh.position.set(-59, 8*(stackHeight) , posZ);
    } else {
        bricks[stackHeight] = new Brick('z', width, depth);
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

function dropBrick(brick) {
    var width = 50 * bricks[stackHeight - 1].mesh.scale.x;
    var depth = 50 * bricks[stackHeight - 1].mesh.scale.z;
    var posX = bricks[stackHeight - 1].mesh.position.x;
    var posZ = bricks[stackHeight - 1].mesh.position.z;

    if (brick.direction == 'x') {
        var newWidth = width - Math.abs(brick.mesh.position.x - posX);
        var deltaX = Math.abs(width - newWidth);
        brick.mesh.scale.x = newWidth/50;
        if (brick.mesh.position.x - posX <= 0) {
            brick.mesh.position.x = posX - deltaX/2;
        }else {
            brick.mesh.position.x = posX + deltaX/2;
        }

    } else {
        var newDepth = depth - Math.abs(brick.mesh.position.z - posZ);
        var deltaZ = Math.abs(depth - newDepth);
        brick.mesh.scale.z = newDepth/50;
        if (brick.mesh.position.z - posZ <= 0) {
            brick.mesh.position.z = posZ - deltaZ/2;
        } else {
            brick.mesh.position.z = posZ + deltaZ/2;
        }
    }
    brick.fly_speed = 0;
    stackHeight += 1;

}
