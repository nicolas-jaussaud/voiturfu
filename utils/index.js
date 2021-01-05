/**
 * Load the car in the scene
 */
const loadCar = (scene) => {
  
  let mtlLoader = new THREE.MTLLoader()

  mtlLoader.setTexturePath('./textures/')
  mtlLoader.setPath('./textures/')
  mtlLoader.load('Low_Poly_Sportcar.mtl', (materials) => {

    materials.preload()
    let objLoader = new THREE.OBJLoader()
    
    objLoader.setMaterials(materials)
    objLoader.setPath('./objects//')
    objLoader.load('Low_Poly_Sportcar.obj', (object) => {
      
      car = new Car(object, scene)
      scene.add(object)
      isLoading = false
      
      window.car = object
    })

  })
}


/**
 * Create and add the camera to the scene
 */
const lights = (scene) => {

  let backLight = new THREE.DirectionalLight(0xffffff, 1.0)
  backLight.position.set(100, 20, 100).normalize()
  
  let ambientLight = new THREE.AmbientLight('rgb(50, 50, 150)', 1)
  
  let sideLight = new THREE.DirectionalLight('rgb(50, 50, 150)', 10)
  sideLight.position.set(800, 800, 100).normalize()
  sideLight.rotation.x = 0
  
  scene.add(sideLight)
  scene.add(backLight)
  scene.add(ambientLight)
}


/**
 * Handle sound with SoundCloud iframe
 */
const initRadio = () => {
  
  // Start audio init animation
  document.getElementById('audio').setAttribute('class', 'audio init')
  setTimeout(() => document.getElementById('audio').setAttribute('class', 'audio'), 5000)
}
