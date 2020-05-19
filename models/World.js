class World{

  /**
   * Initialize the decor and make it move
   * 
   * @param  {scene} object 
   */
  constructor(scene) {

    this.scene    = scene
    this.objects  = []

    this.createCube( 0x5200cc, 'right', 0 )
    this.createCube( 0x5200cc, 'left', 0 )
    
    this.createCube( 0x4d0066, 'right', -200 )
    this.createCube( 0x4d0066, 'left', -200 )

    this.createCube( 0x3333cc, 'right', -400 )
    this.createCube( 0x3333cc, 'left', -400 )

    this.createCube( 0x000080, 'right', -600 )
    this.createCube( 0x000080, 'left', -600 )

    this.createCube( 0x3333ff, 'right', -800 )
    this.createCube( 0x3333ff, 'left', -800 )

    this.createCube( 0x800033, 'right', -1000 )
    this.createCube( 0x800033, 'left', -1000 )

    this.createCube( 0x204060, 'right', -1200 )
    this.createCube( 0x204060, 'left', -1200 )

    this.createCube( 0x602060, 'right', -1400 )
    this.createCube( 0x602060, 'left', -1400 )

    this.createCube = this.createCube.bind(this)

    // Move the decor and make it loopable
    setInterval(() => {

      for (let i = 0; i < this.objects.length; i++) {
        this.objects[i].position.z = this.objects[i].position.z >= 200 ? 
          -1400 :
          this.objects[i].position.z + 10;
      }
    }, 10);
    
  }


  /**
   * Create a cube and add it to the scene 
   */
  createCube( color, side, position ) {

    let geometry = new THREE.CubeGeometry( 200, 200, 50 )
    let material = new THREE.MeshBasicMaterial( { color: color } )
    let mesh = new THREE.Mesh( geometry, material )

    mesh.position.x = side === 'right' ? 200 : -200
    mesh.position.z = position
    
    this.scene.add( mesh )
    this.objects.push( mesh )
  }

}
