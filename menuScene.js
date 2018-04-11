'use strict';
var scene, camera, renderer;
var light1, light2;  // two lights
var clock;          // time
var bricks;
var stackHeight;
var gameState = {
	score: 0,
	scene: "start"
};

var palette_summer = {
	yellow: 0xfff489,
	pink: 0xffdcfc,
	blue: 0xedc6ff,
	purple: 0xc4ddff,
	red: 0xffb8b8,
	
}

createScene();
animate();  // start the animation loop!


function createScene() {
    // these calls define the following global variables
    //scene, camera, renderer, light1, light2
    initScene();
	initCamera();
	initLight();
	initRenderer();
	initControls();
	bricks = new Array(200);
	var foundation = new Foundation();
	
	scene.add(foundation.mesh);
	renderer.render(scene, camera);
}

function animate() {
	
	var deltaTime = clock.getDelta();
	
	if (clock.elapsedTime < 3) {
		camera.translateY(-deltaTime*30);
	}
	
	camera.position.x = 120*Math.sin(0.1*clock.elapsedTime);
	camera.position.z = 120*Math.cos(0.1*clock.elapsedTime);
	camera.lookAt(0,0,0);
	renderer.render(scene, camera);
	requestAnimationFrame( animate );
}


function initScene() {
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x162d47)
    scene.fog = new THREE.Fog(0x162d47, 5, 380);
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
	renderer.setSize(window.innerWidth, window.innerHeight);
	var canvas = document.getElementById("WebGL-output");
	canvas.innerHTML = "";
	canvas.appendChild(renderer.domElement);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	window.addEventListener('resize', handleWindowResize, false);
}

function handleWindowResize() {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
}

function initCamera() {
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.set(120, 200, 120);
	camera.lookAt(0, 0, 0);
	scene.add(camera);
}


function initLight() {
	light1 = new THREE.DirectionalLight(0xffffff, 0.9);
	light1.position.set(1, 1, 0.5);
	scene.add(light1)
    light2 = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9);
	scene.add(light2)
}

function initControls() {
	// here is where we create the eventListeners to respond to operations
    //create a clock for the time-based animation ...
	clock = new THREE.Clock();
	clock.start();
	  //window.addEventListener('click', handleMouseClick, false);
	handleButtonEvent('button-start');
}

function handleMouseClick(event) {
	bricks[stackHeight].isDropped = true;
}

function Foundation() {
	var geom = new THREE.BoxGeometry(50, 150, 50);
	var mat = new THREE.MeshLambertMaterial({
		color: palette_summer['blue']
	});
	this.mesh = new THREE.Mesh(geom, mat, 0);
	this.mesh.castShadow = true;
	this.mesh.receiveShadow = true;
	this.mesh.position.set(0,  -79, 0);
}

function handleButtonEvent(id) {
	
	var button = document.getElementById(id);
	if (id == 'button-start') {
		button.addEventListener('click', function(event) {
			window.location.href = 'stack.html';
		})
	} else if(id == 'button-ins') {
		
	}
	
	
}
