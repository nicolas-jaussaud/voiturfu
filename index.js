// Need to be out of scope
var isLoading = true

window.onload = () => {

  const d = document

  // Loader until we download all the assets
  const loadingContent = d.getElementById('loading')

  let scene = new THREE.Scene();

  let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1400 )
  camera.position.z = 50
  camera.position.y = 25
  camera.rotation.x = 50

  let renderer = new THREE.WebGLRenderer()
  renderer.setSize( window.innerWidth, window.innerHeight )
  d.body.appendChild( renderer.domElement )

  // @see utils/lights
  lights(scene)
  loadCar(scene)

  new World(scene)

  const animate = function () {
    requestAnimationFrame( animate )
    renderer.render( scene, camera )
  };

  animate();

  // Remove when everything is loaded
  const loading = () => isLoading === false ? 
    loadingContent.setAttribute('style','display:none') : 
    setTimeout(() => loading(), 200); 
  
  loading()
}
