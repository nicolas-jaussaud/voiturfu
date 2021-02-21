// Need to be out of scope
var isLoading = true

window.car = false
window.obstacle = false

window.onload = () => {

  const d = document

  let scene = new THREE.Scene()

  let camera = new THREE.PerspectiveCamera( 70, window.innerWidth/window.innerHeight, 0.1, 8000 )
  camera.position.z = 50
  camera.position.y = 25
  camera.rotation.x = 50

  let renderer = new THREE.WebGLRenderer()
  renderer.setSize( window.innerWidth, window.innerHeight )
  renderer.shadowMap.enabled = true
  
  d.body.appendChild( renderer.domElement )
  
  const game = new Game(scene)

  const animate = function () {

    // Limit to 24 FPS 
    setTimeout(() => requestAnimationFrame( animate ), 1000 / 24 );
    
    renderer.render( scene, camera )
    
    game.events()
  }

  animate()
}

