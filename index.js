// Need to be out of scope
var isLoading = true

window.car = false
window.obstacle = false

window.onload = () => {

  const d = document
  
  // Loader until we download all the assets
  const loadingContent = d.getElementById('loading')
  const scoreContent = d.getElementById('score')

  let scene = new THREE.Scene();

  let camera = new THREE.PerspectiveCamera( 70, window.innerWidth/window.innerHeight, 0.1, 8000 )
  camera.position.z = 50
  camera.position.y = 25
  camera.rotation.x = 50

  let renderer = new THREE.WebGLRenderer()
  renderer.setSize( window.innerWidth, window.innerHeight )
  renderer.shadowMap.enabled = true;
  
  d.body.appendChild( renderer.domElement )

  new World(scene)

  window.score = 0

  const animate = function () {

    // Limit to 24 FPS 
    setTimeout(() => requestAnimationFrame( animate ), 1000 / 24 );
    

    renderer.render( scene, camera )
    
    if(!window.stop) {
      window.score = window.score + 1
      scoreContent.textContent = window.score  
    } 
  }

  animate()

  d.getElementById('restart').addEventListener('click', () => {
    document.getElementById('die').setAttribute('style','display: none')
    window.score = 0
    window.stop = false
    animate()
  })

  // Remove when everything is loaded
  const loading = () => {
    
    if(isLoading === false) {
      
      // Start counting points
      window.stop = false

      // Soundcloud
      initRadio()
      
      loadingContent.setAttribute('style','display:none') 
      return;
    } 

    setTimeout(() => loading(), 200)
  }
  loading()
}

window.die = () => {

  window.stop = true

  // Show page and score
  document.getElementById('die').setAttribute('style','')
  document.getElementById('die-score').textContent = window.score  
}

