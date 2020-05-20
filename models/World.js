class World{

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
      0x602060
    ]

    // Space between the buildings
    this.buildingSpace = 200

    this.createCube       = this.createCube.bind(this)
    this.createLandscape  = this.createLandscape.bind(this)
    this.animateLandscape = this.animateLandscape.bind(this)
    
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
  }


  /**
   * Animate the landscape
   */
  animateLandscape() {
    for (let i = 0; i < this.buildings.length; i++) {
      this.buildings[i].position.z = this.buildings[i].position.z >= this.buildingSpace ? 
        -(this.buildingSpace * (this.buildings.length/2 -1)) :
        this.buildings[i].position.z + 10;
    }
  }


  /**
   * Create a cube and add it to the scene 
   */
  createCube(color, side, position) {

    let geometry = new THREE.CubeGeometry( 200, 200, 50 )
    let material = new THREE.MeshBasicMaterial({ color: color })
    let mesh = new THREE.Mesh( geometry, material )

    mesh.position.x = side === 'right' ? 300 : -300
    mesh.position.z = position
    
    this.scene.add( mesh )
    this.buildings.push( mesh )
  }

}
