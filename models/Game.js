class Game {

  /**
   * Handle games action (score, start, die... etc)
   * 
   * @param  {scene} object 
   */
  constructor(scene) {
    
    this.score = 0

    this.scoreDiv       = document.getElementById('score')
    this.deathScreen    = document.getElementById('die')
    this.deathScore     = document.getElementById('die-score')    
    this.loadingScreen  = document.getElementById('loading')
    this.loadingText    = document.getElementById('loading-message')
    this.startButton    = document.getElementById('start')
    this.restartButton  = document.getElementById('restart')
    
    this.status = 'stopped'
    
    this.world = new World(scene, this)
    
    // Init restart button action
    this.restartButton.addEventListener('click', () => this.restart())

    // Init loading screen
    this.loading()
  }

  /**
   * Add loading screen until everything is loaded
   */
  loading = () => {
    
    if(isLoading === false) {
      this.loadingText.textContent = 'Game loaded'
      this.startButton.setAttribute('style', '')
      this.startButton.addEventListener('click', () => this.start())
    } 
  
    setTimeout(() => this.loading(), 200)
  }
    
  /**
   * Called at every frame by three js, handle game events
   */
  events() {
    if(this.status !== 'stopped') this.incrementScore()
  }

  /**
   * Start the game (only called the first time)
   */
  start() {

    // Start counting points
    this.status = 'play'

    this.world.start()

    // Soundcloud
    initRadio()
      
    this.loadingScreen.setAttribute('style', 'display:none') 
  }

  /**
   * Restart game after user death
   */
  restart() {

    this.deathScreen.setAttribute('style','display: none')
    
    this.setScore(0)

    this.status = 'play'

    this.world.createObstacle()
    this.world.startObstacles()
  }
  
  die() {

    this.status = 'stopped'
    this.world.stopObstacles()
  
    // Show page and score
    this.deathScreen.setAttribute('style','')
    this.deathScore.textContent = this.score  
  }

  /**
   * Score +1
   */
  incrementScore() {
    this.setScore(this.score + 1)
  }

  setScore(score) {
    this.score = score
    this.scoreDiv.textContent = score 
  }
}
