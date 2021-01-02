// Need to be out of scope
var isLoading = true

window.onload = () => {

  const d = document

  // Start audio
  d.getElementById('audio').play()
  // Loader until we download all the assets
  const loadingContent = d.getElementById('loading')

  let scene = new THREE.Scene();

  let camera = new THREE.PerspectiveCamera( 70, window.innerWidth/window.innerHeight, 0.1, 8000 )
  camera.position.z = 50
  camera.position.y = 25
  camera.rotation.x = 50

  let renderer = new THREE.WebGLRenderer()
  renderer.setSize( window.innerWidth, window.innerHeight )
  renderer.shadowMap.enabled = true;
  
  d.body.appendChild( renderer.domElement )

  // @see utils/lights
  lights(scene)
  loadCar(scene)

  new World(scene)

  const animate = function () {

    // Limit to 24 FPS 
    setTimeout(() => requestAnimationFrame( animate ), 1000 / 24 );

    renderer.render( scene, camera )
  }

  animate()

  // Remove when everything is loaded
  const loading = () => isLoading === false ? 
    loadingContent.setAttribute('style','display:none') : 
    setTimeout(() => loading(), 200); 
  
  loading()
}
