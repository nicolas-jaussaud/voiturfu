const d = document

let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 50
camera.position.y = 25
camera.rotation.x = 50

let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
d.body.appendChild( renderer.domElement );

// @see utils/lights
lights(scene)
loadCar(scene)

const animate = function () {
	requestAnimationFrame( animate )
	renderer.render(scene, camera)
};

animate();
