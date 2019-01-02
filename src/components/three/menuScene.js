import * as THREE from 'three';

var scene = initScene();
var camera = initCamera();
var renderer = initRenderer();
var lights = initLights();  // two lights
var clock = new THREE.Clock(); // time

var palette_summer = {
	yellow: 0xfff489,
	pink: 0xffdcfc,
	blue: 0xedc6ff,
	purple: 0xc4ddff,
	red: 0xffb8b8,
	
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


function createScene() {
	scene.add(camera);
	scene.add(lights[0]);
	scene.add(lights[1]);
	clock.start();
	handleButtonEvent('button-start');
	var foundation = new Foundation();
	scene.add(foundation.mesh);
	renderer.render(scene, camera);
}


function initScene() {
	var scene = new THREE.Scene();
	scene.background = new THREE.Color(0x162d47)
	scene.fog = new THREE.Fog(0x162d47, 5, 380);
	return scene;
}


/*
	The renderer needs a size and the actual canvas we draw on
	needs to be added to the body of the webpage. We also specify
	that the renderer will be computing soft shadows
*/
function initRenderer() {
	var renderer = new THREE.WebGLRenderer({
		alpha: true,
		antialias: true
	});
	renderer.setSize(window.innerWidth, window.innerHeight);

	var canvas = document.getElementById("canvas")
	canvas.innerHTML = "";
	canvas.appendChild(renderer.domElement);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	window.addEventListener('resize', handleWindowResize, false);
	return renderer;
}


function handleWindowResize() {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
}


function initCamera() {
	var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.set(120, 200, 120);
	camera.lookAt(0, 0, 0);
	return camera;
}


function initLights() {
	var light1 = new THREE.DirectionalLight(0xffffff, 0.9);
	light1.position.set(1, 1, 0.5);
	var light2 = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9);
	return [light1, light2];
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
	if (id === 'button-start') {
		button.addEventListener('click', () => {
			// console.log('clicked');
			window.location.href = 'stackScene.html';
		})
	}
}

// ===========================================================
createScene();
animate();  // start the animation loop!