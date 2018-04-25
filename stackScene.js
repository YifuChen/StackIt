'use strict';
var scene, camera, renderer;
var light1, light2;  // two lights
var clock;           // time
var bricks;
var stackHeight;
var gameState = {
	score: 0,
	scene: "start"
};

var rainBowColors=[0xd358f7,0xfa5858,0xfaac58,0xfafa58,0x58fa58,0x58faf4,0x5882fa]
var combo = 0;

var palette_summer = {
	yellow: 0xfff489,
	white: 0xF7F9F9,
	pink: 0xffdcfc,
	blue: 0xedc6ff,
	purple: 0xc4ddff,
	red: 0xffb8b8,
}

createScene();
animate();  // start the animation loop!


function createScene() {
	
	// define the following global variables
	// scene, camera, renderer, light1, light2
    initScene();
	initCamera();
	initLight();
	initRenderer();
	initControls();
	bricks = new Array(200);
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
				if (camera.position.y - bricks[stackHeight].mesh.position.y <= 100) {
					moveCamera(deltaTime);
				}			
				moveBrick(bricks[stackHeight], deltaTime);
			} else {
				dropBrick(bricks[stackHeight]);
				if (gameState.scene != 'end') {
					addBrick();
				}
			}
			
			scene.simulate();
			renderer.render(scene, camera);
			break;
		case 'end':
			scene.simulate();
			renderer.render(scene, camera);
			break;
		default:
	}
	
	requestAnimationFrame(animate);
}


function initPysijs() {
	Physijs.scripts.worker = './lib/physijs_worker.js'
    Physijs.scripts.ammo = './lib/ammo.js';
}

function initScene() {
	scene = new Physijs.Scene();
	scene.background = new THREE.Color(0x162d47)
    scene.fog = new THREE.Fog(0x162d47, 5, 380);
	scene.setGravity(new THREE.Vector3(0,  -100, 0))
}


function initRenderer() {
	renderer = new THREE.WebGLRenderer({
		alpha: true,
		antialias: true
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	var canvas = document.getElementById("canvas-area");
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
	camera.position.set(120, 100, 120);
	camera.lookAt(0, 0, 0);
	scene.add(camera);
}

function moveCamera(deltaTime) {
	camera.position.y += deltaTime * 40;
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
	window.addEventListener('keydown', keydown);
	handleButtonEvent('button-restart');
	handleButtonEvent('button-menu');
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

function playGameMusic(soundfile){
		// create an AudioListener and add it to the camera
		var listener = new THREE.AudioListener();
		camera.add( listener );

		// create a global audio source
		var sound = new THREE.Audio( listener );

		// load a sound and set it as the Audio object's buffer
		var audioLoader = new THREE.AudioLoader();
		audioLoader.load( '/sounds/'+soundfile, function( buffer ) {
			sound.setBuffer( buffer );
			sound.setLoop( false );
			sound.setVolume( 0.05 );
			sound.play();
		});
}

function cheers() {
	//console.log(bricks[stackHeight].mesh.material.__proto__.color);
	console.log(rainBowColors);
	bricks[stackHeight].mesh.material.__proto__.color.setHex(rainBowColors[combo%7]);
	var pm = combo % 8;
	var file = pm + '.mp3';
	console.log('combo: '+combo);
	playGameMusic(file);
	gameState.score += combo;
}

function Brick(direction, width, depth) {
	this.fly_speed = 80;
	this.drop_speed = 60;
	this.isDropped = false;
	this.direction = direction;
	
	var geom = new THREE.BoxGeometry(50, 8, 50);
	geom.scale(width / 50, 1, depth / 50)
	var mat = new THREE.MeshLambertMaterial({
		color: palette_summer['white']
		//color: (Math.random()*16777215)
	});
	var pmaterial = new Physijs.createMaterial(mat, 0.9, 0.01);
	
	//this.mesh = new THREE.Mesh(geom, mat);
	this.mesh = new Physijs.BoxMesh(geom, pmaterial, 0);
	
	this.mesh.castShadow = true;
	this.mesh.receiveShadow = true;
}


function DroppedBrick(width, depth, x, y, z) {
    var geom = new THREE.BoxGeometry(depth, 8, width);
	var mat = new THREE.MeshLambertMaterial({
		color: palette_summer.purple
	});
	var pmaterial = new Physijs.createMaterial(mat, 0.9, 0.01);
	this.mesh = new Physijs.BoxMesh(geom, pmaterial, 500);
	this.mesh.castShadow = true;
	this.mesh.receiveShadow = true;
	this.mesh.position.x = x;
	this.mesh.position.y = y;
	this.mesh.position.z = z;
	this.mesh.setLinearVelocity(new THREE.Vector3(0, 0, 0));
}


function addBrick() {
	var width = 50;
	var depth = 50;
	var posX = bricks[stackHeight - 1].mesh.position.x;
	var posZ = bricks[stackHeight - 1].mesh.position.z;
	if (bricks[stackHeight - 1].direction == 'z') {
		bricks[stackHeight] = new Brick('x', width, depth);
	    bricks[stackHeight].mesh.__dirtyPosition = true;
		bricks[stackHeight].mesh.scale.x = bricks[stackHeight - 1].mesh.scale.x;
		bricks[stackHeight].mesh.scale.z = bricks[stackHeight - 1].mesh.scale.z;
		bricks[stackHeight].mesh.position.set(-59, 8 * (stackHeight) , posZ);
	} else {
		bricks[stackHeight] = new Brick('z', width, depth);
		bricks[stackHeight].mesh.__dirtyPosition = true;
		bricks[stackHeight].mesh.scale.x = bricks[stackHeight - 1].mesh.scale.x;
		bricks[stackHeight].mesh.scale.z = bricks[stackHeight - 1].mesh.scale.z;
		bricks[stackHeight].mesh.position.set(posX, 8 * (stackHeight) ,  -59);
	}
	
	scene.add(bricks[stackHeight].mesh);
}

function moveBrick(brick, deltaTime) {
	brick.mesh.__dirtyPosition = true;
	if (brick.direction == 'x') {
		if (brick.mesh.position.x >= 60) {
			brick.fly_speed =  - brick.fly_speed;
		} else if (brick.mesh.position.x <= -60) {
			brick.fly_speed =  - brick.fly_speed;
		}
		
		brick.mesh.position.x += deltaTime * brick.fly_speed;
	} else {
		if (brick.mesh.position.z >= 60) {
			brick.fly_speed =  - brick.fly_speed;
		} else if (brick.mesh.position.z <= -60) {
			brick.fly_speed =  - brick.fly_speed;
		}
		
		brick.mesh.position.z += deltaTime * brick.fly_speed;
	}
}


function dropBrick(brick) {
	
	// enable flying brick to stop manually
	brick.mesh.__dirtyPosition = true;
	brick.mesh.__dirtyRotation = true;
	
	// parameters of the top brick on stack
	var width = 50 * bricks[stackHeight - 1].mesh.scale.x;
	var depth = 50 * bricks[stackHeight - 1].mesh.scale.z;
	var posX = bricks[stackHeight - 1].mesh.position.x;
	var posY = bricks[stackHeight - 1].mesh.position.y;
	var posZ = bricks[stackHeight - 1].mesh.position.z;
	
	var droppedBrick;
	
	// console.log("width:" + width);
	// console.log("depth:" + depth);
	
	if (brick.direction == 'x') {
		var newWidth = width - Math.abs(brick.mesh.position.x - posX);
		// console.log("newWidth:" + newWidth);
		if (newWidth < 0) {
			droppedBrick = new DroppedBrick(depth, width, brick.mesh.position.x, brick.mesh.position.y, brick.mesh.position.z);
			scene.remove(brick.mesh);
			scene.add(droppedBrick.mesh);
			combo = 0;
			endGame();
		} else {
			var deltaX = Math.abs(width - newWidth);
			
			if (brick.mesh.position.x - posX <= -1) {
				brick.mesh.scale.x = newWidth / 50;
				brick.mesh.position.x = posX - deltaX / 2;
				droppedBrick = new DroppedBrick(depth, width - newWidth, posX - deltaX - newWidth / 2, posY + 8, posZ)			
				droppedBrick.mesh.setAngularVelocity(new THREE.Vector3(0, 0, 20));
				combo=0;
				scene.add(droppedBrick.mesh);
				
			} else if (brick.mesh.position.x - posX >= 1){
				brick.mesh.scale.x = newWidth / 50;
				brick.mesh.position.x = posX + deltaX / 2;
				droppedBrick = new DroppedBrick(depth, width - newWidth, posX + deltaX + newWidth / 2, posY + 8, posZ)
				droppedBrick.mesh.setAngularVelocity(new THREE.Vector3(0, 0, -20));
				combo=0;
				scene.add(droppedBrick.mesh);
			} else {
				brick.mesh.position.x = posX;
				console.log("Right on spot!");
				combo++;
				cheers();
			}
		}
			
	} else {
		var newDepth = depth - Math.abs(brick.mesh.position.z - posZ);
		// console.log("newDepth:" + newDepth);
		if (newDepth < 0) {
			droppedBrick = new DroppedBrick(depth, width, brick.mesh.position.x, brick.mesh.position.y, brick.mesh.position.z);
			scene.remove(brick.mesh);
			scene.add(droppedBrick.mesh);
			combo = 0;
			endGame();
		} else {
			var deltaZ = Math.abs(depth - newDepth);
			
			if (brick.mesh.position.z - posZ <= -1) {
				brick.mesh.scale.z = newDepth / 50;
				brick.mesh.position.z = posZ - deltaZ / 2;
				droppedBrick = new DroppedBrick(depth - newDepth, width, posX , posY + 8, posZ - deltaZ - newDepth / 2)
				droppedBrick.mesh.setAngularVelocity(new THREE.Vector3(-20, 0, 0));
				scene.add(droppedBrick.mesh);
				combo = 0;
			} else if (brick.mesh.position.z - posZ >= 1) {
				brick.mesh.scale.z = newDepth / 50;
				brick.mesh.position.z = posZ + deltaZ / 2;
				droppedBrick = new DroppedBrick(depth - newDepth, width, posX , posY + 8, posZ + deltaZ + newDepth / 2)
				droppedBrick.mesh.setAngularVelocity(new THREE.Vector3(20, 0, 0));
				scene.add(droppedBrick.mesh);
				combo = 0;
			} else {
				brick.mesh.position.z = posZ;
				console.log("Right on spot!");
				combo++;
				cheers();
			}
		}	
	}
	
	//brick.fly_speed = 0;
	stackHeight += 1;
	gameState.score += 1;
}

function endGame() {
	gameState.scene = 'end';
	var message = document.getElementById("lose-message");
	var canvas = document.getElementById("canvas-area");
	var score_display = document.getElementById("score");
	score_display.innerHTML="[Your Score]: " + gameState.score;
	canvas.style.filter = "blur(3px) grayscale(30%)";
	canvas.style.transition;
	message.style.display = "block";
	playGameMusic('gameover.mp3');
}


function keydown(event) {
	// console.log("Keydown:" + event.key);
	// console.dir(event);
	if (gameState.scene == 'end' && (event.key == 'r' || event.key == 'R')) {
		var message = document.getElementById("lose-message");
		var canvas = document.getElementById("canvas-area");
		canvas.style.filter = "";
		message.style.display = "none";
		// clear three js scene
		while (scene.children.length > 0) {
			scene.remove(scene.children[0]);
		}
		createScene();
		gameState.scene = 'start';
		gameState.score = 0;
		playGameMusic('restart.mp3');
		return;
	}
	
	if (gameState.scene == 'start' && event.key == ' ') {
		bricks[stackHeight].isDropped = true;
		return;
	}
}


function handleButtonEvent(id) {
	
	var button = document.getElementById(id);
	if (id == 'button-restart') {
		button.addEventListener('click', function(event) {
			var message = document.getElementById("lose-message");
			var canvas = document.getElementById("canvas-area");
			canvas.style.filter = "";
			message.style.display = "none";
			// clear three js scene
			while (scene.children.length > 0) {
				scene.remove(scene.children[0]);
			}
			playGameMusic('restart.mp3');
			createScene();
			gameState.scene = 'start';
			gameState.score = 0;
		})
	} else if(id == 'button-menu') {
		button.addEventListener('click', function(event) {
			window.location.href = 'menu.html';
		})	
	}
}

