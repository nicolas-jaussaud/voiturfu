/**
 * Load the car in the scene
 */
const loadCar = async (scene) => {
  
  let mtlLoader = new THREE.MTLLoader();
  mtlLoader.setTexturePath('./textures/');
  mtlLoader.setPath('./textures/');
  mtlLoader.load('CyberpunkDeLorean.mtl', (materials) => {

    materials.preload();
    let objLoader = new THREE.OBJLoader();
    
    objLoader.setMaterials(materials);
    objLoader.setPath('./objects//');
    objLoader.load('CyberpunkDeLorean.obj', (object) => {
      car = new Car(object)
      scene.add(object)
    })

  })
}


/**
 * Create and add the camera to the scene
 */
const lights = (scene) => {

  let backLight = new THREE.DirectionalLight(0xffffff, 1.0)
  backLight.position.set(100, 0, -100).normalize()
  
  let ambientLight = new THREE.AmbientLight('rgb(50, 50, 150)', 5)
  
  let sideLight = new THREE.DirectionalLight('rgb(50, 50, 150)', 5);
  sideLight.position.set(0, 0, 500).normalize()
  
  scene.add(sideLight);
  scene.add(backLight);
  scene.add(ambientLight);
}
