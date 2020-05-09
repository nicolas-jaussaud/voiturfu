class Car {

	/**
	 * Initialize the car with the right position
	 * 
	 * @param  {object} object 
	 */
	constructor(object) {

	  this.object = object

	  // Initial position of the object
	  this.object.rotation.x = Math.PI / 2
    this.object.rotation.y = Math.PI
		
    this.speed = 3
    this.currentPosition = 'center'
		this.lateralSpeed = 1 * this.speed
		this.rotateSpeed = 0.01 * this.speed

		// Bind all functions for avoiding scope issues
		this.controls           = this.controls.bind(this)
    this.isInitialPosition  = this.isInitialPosition.bind(this)
		this.toInitialPosition  = this.toInitialPosition.bind(this)
    this.isLeftPosition     = this.isLeftPosition.bind(this)
		this.goLeft             = this.goLeft.bind(this)
    this.isRightPosition    = this.isRightPosition.bind(this)
		this.goRight            = this.goRight.bind(this)
		
		// Add listeners for the user inputs
		this.controls()
	}


	/**
	 * Handle input from the user
	 */
	controls() {

		// Handle direction
		document.addEventListener('keydown', (event) => {

			switch(event.which) {

				// On left arrow go on left until we reached the max position
				case 37:
          if(this.currentPosition === 'left') return;
          this.currentPosition = 'left'
					this.goLeft()
					break;

				// On right arrow go on right until we reached the max position
				case 39:
          if(this.currentPosition === 'right') return;
          this.currentPosition = 'right'
					this.goRight()
					break;
			}

		}, false)

		// Back to initial position
		document.addEventListener('keyup', () => {

      this.currentPosition = 'center'
      
      if(!this.isInitialPosition()) this.toInitialPosition();

		}, false)
	}


	/**
	 * Back to initial position
	 */
	toInitialPosition() {

		if(this.object.position.x !== 0) {
			this.object.position.x = this.object.position.x < 0 ?
        this.object.position.x + this.lateralSpeed :
        this.object.position.x - this.lateralSpeed;
		}

		if(this.object.rotation.y !== Math.PI) {
			this.object.rotation.y = this.object.rotation.y < Math.PI ?
        this.object.rotation.y + this.rotateSpeed :
        this.object.rotation.y - this.rotateSpeed;
		}

    if(!this.isInitialPosition()) setTimeout(() => this.toInitialPosition(), 5);
	}


  /**
   * True if on the initial position
   */
  isInitialPosition() {
    return this.object.position.x === 0 && this.object.rotation.y === Math.PI;
  }


  /**
   * True if on the left position
   */
  isLeftPosition() {
    return this.object.position.x < -30;
  }


  /**
   * True if on the right position
   */
  isRightPosition() {
    return this.object.position.x > 30;
  }


	/**
	 * Go to the left
	 */
	goLeft() {
		
		if(this.currentPosition !== 'left' || this.isLeftPosition()) return;
		
		this.object.position.x -= this.lateralSpeed
		this.object.rotation.y -= this.rotateSpeed
    
    setTimeout(() => this.goLeft(), 5)
	}


	/**
	 * Go to the right
	 */
	goRight() {
				
		if(this.currentPosition !== 'right' || this.isRightPosition()) return;

		this.object.position.x += this.lateralSpeed
		this.object.rotation.y += this.rotateSpeed

    setTimeout(() => this.goRight(), 5)
	}
}
