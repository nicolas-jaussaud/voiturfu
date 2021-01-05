class World {

  /**
   * Initialize the decor and make it move
   * 
   * @param  {scene} object 
   */
  constructor(scene) {

    this.scene = scene

    // All the building colors
    this.buildings = []
    
    // Building will be stored in this array
    this.buildingColors = [
      0x4d0066,
      0x3333cc,
      0x000080,
      0x3333ff,
      0x800033,
      0x204060,
      0x602060,

      0x4d0066,
      0x3333cc,
      0x000080,
      0x3333ff,
      0x800033,
      0x204060,
      0x602060,

      0x4d0066,
      0x3333cc,
      0x000080,
      0x3333ff,
      0x800033,
      0x204060,
      0x602060,
    ]

    // Space between the buildings
    this.buildingSpace = 200

    this.createCube       = this.createCube.bind(this)
    this.createLandscape  = this.createLandscape.bind(this)
    this.animateLandscape = this.animateLandscape.bind(this)
    this.createObstacle   = this.createObstacle.bind(this)
    this.animateObstacle  = this.animateObstacle.bind(this)
    this.getRandomSide    = this.getRandomSide.bind(this)
    this.thunder          = this.thunder.bind(this)
    this.getThunderLight  = this.getThunderLight.bind(this)
    
    this.createObstacle()
    this.createFloor()
    this.createLandscape()
  }


  /**
   * Generate the building on the side 
   */
  createLandscape() {

    // Distance from origin
    let distance = 0

    for(let i = 0; i < this.buildingColors.length; i++) {
      
      this.createCube( this.buildingColors[i], 'right', distance )
      this.createCube( this.buildingColors[i], 'left', distance )
      
      distance -= this.buildingSpace
    }

    // Move the decor and make it loopable
    setInterval(() => this.animateLandscape(), 10)
    setInterval(() => this.animateObstacle(), 10)

    // Thunder every 6 seconds
    this.thunder()
    setInterval(() => this.thunder(), 10000)
    
    this.rain()
  }


  /**
   * Animate the landscape
   */
  animateLandscape() {
    for (let i = 0; i < this.buildings.length; i++) {
      this.buildings[i].position.z = this.buildings[i].position.z >= this.buildingSpace ? 
        -(this.buildingSpace * (this.buildings.length/2 -1)) :
        this.buildings[i].position.z + 35;
    }
  }


  /**
   * Create a cube and add it to the scene 
   */
  createCube(color, side, position) {

    let geometry = new THREE.CubeGeometry( 200, 600, 50 )
    let material = new THREE.MeshStandardMaterial({ color: color })
    let mesh = new THREE.Mesh( geometry, material )

    mesh.position.x = side === 'right' ? 300 : -300
    mesh.position.z = position
    mesh.position.y = -200

    mesh.shading = THREE.FlatShading
    mesh.castShadow = true
    mesh.receiveShadow = true
    
    this.scene.add( mesh )
    this.buildings.push( mesh )
  }


  createFloor() {

    let geometry = new THREE.CubeGeometry( 150, 0, 8000 )
    let material = new THREE.MeshStandardMaterial({ color: 0x3333cc })
    let mesh = new THREE.Mesh( geometry, material )

    mesh.position.x = 0
    mesh.position.y = -30
    mesh.position.z = 0
    
    mesh.shading = THREE.FlatShading
    mesh.castShadow = true
    mesh.receiveShadow = true

    this.scene.add( mesh )
  }


  createObstacle() {

    let geometry = new THREE.CubeGeometry( 50, 50, 50 )
    let material = new THREE.MeshStandardMaterial({ color: 0x444444 })
    let mesh = new THREE.Mesh( geometry, material )
    
    mesh.position.y = -20
    mesh.position.x = this.getRandomSide()
    mesh.position.z = -3000
    
    mesh.shading = THREE.FlatShading
    mesh.castShadow = true
    mesh.receiveShadow = true

    this.scene.remove( this.currentObstacle );
    this.currentObstacle = mesh 
    this.scene.add( mesh )
  }


  animateObstacle() {
    
    if(this.currentObstacle.position.z < 200) {
      this.currentObstacle.position.z = this.currentObstacle.position.z + 80
      return;
    }
    
    this.createObstacle()
  }


  getRandomSide() {
    switch( Math.floor(Math.random() * Math.floor(3)) ) {
      case 0:
        return 0;
      case 1:
        return -50;
      case 2:
        return 50;
    } 
  }

  getThunderLight() {
    
    if(this.thunderLight) return this.thunderLight;  
    
    this.thunderLight = new THREE.DirectionalLight('rgb(50, 50, 150)', 800);
    this.thunderLight.position.set(800, 800, 100).normalize()
    this.thunderLight.rotation.x = 0
    
    return this.thunderLight;
  }
  
  thunder() {

    const thunderLight = this.getThunderLight()
    thunderLight.intensity = 0
    this.scene.add(thunderLight)
    
    // Random thunder sound with a little delay
    setTimeout(() => {
      const sound = new Audio('./assets/audio/sound' + Math.floor(Math.random() * Math.floor(3)) + '.mp3');
      sound.play()
    }, 400);

    let decline = false
    const interval = setInterval(() => {
      

      thunderLight.intensity = decline === false ? 
        thunderLight.intensity + 50 :
        thunderLight.intensity - 50
      
      const color = thunderLight.intensity / 500
      this.scene.background = new THREE.Color(
        'rgb(' + thunderLight.intensity + '%, ' + thunderLight.intensity + '%, ' + thunderLight.intensity + '%)'
      )
      
      if(thunderLight.intensity > 500) {
        decline = true;
        return;
      }

      if(decline === true && thunderLight.intensity < 0) {

        thunderLight.intensity = 0
        this.scene.background = null
        clearInterval(interval)
      }
    }, 10)

  }

  rain() {
    const sound = new Audio('./assets/audio/rain.mp3');
    
    // loop
    sound.addEventListener('ended', () => {
      this.currentTime = 0;
      this.play();
    }, false);

    sound.play()
  }
  
}
