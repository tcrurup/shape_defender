class Controller{

    constructor(game={}){

       //This is an option to load a saved game that is a json file, otherwise it just creates new
        if(Object.keys(game).length > 0){
            this.game = game
        } else {
            this.game = new Game(this)
        }

        //Everything that you will see on display
        this.allProjectiles = [];
        this.allEnemies = []; 
        this.display = document.querySelector('div.gameScreen');
        this.isPaused = false;
        this.userHUD = new userHUD(this)
        this.userUnit = new UserUnit(225, 700)
        this.pressedKeys = {
            'w': false,
            'a': false,
            's': false,
            'd': false,
            ' ': false
        }        

        //Add event listeners
        this.addInputListeners()

        document.querySelector('div.userInputContainer').appendChild(this.userHUD.draw())
        document.querySelector('button#startGame').addEventListener('click', this.restartLevel.bind(this))

        //Add on the board
        this.draw()
    }

    //GETTERS

    get allPressedKeys(){
        let pressedInputs = []

        Object.keys(this.pressedKeys).forEach( key => {
            if(this.pressedKeys[key] == true){
                pressedInputs.push(key)
            }
        });

        return pressedInputs
    }

    //SETTERS

    addInputListeners(){

        document.addEventListener('keydown', e => {
            if(this.inputIsValid(e.key)){ 
                this.pressedKeys[e.key] = true 
            }
        });

        document.addEventListener('keyup', e => {
            if(this.inputIsValid(e.key)){
                if(e.key === 'p'){
                    this.togglePause()
                } else {
                    this.pressedKeys[e.key] = false
                }
            }
        });
    }

    appendToDisplay(element){
        this.display.appendChild(element)
    }
    
    clearDisplay(){
        this.display.querySelectorAll('canvas').forEach( x => {
            x.parentNode.removeChild(x)
        })
    }

    draw(){
        this.clearDisplay()
        this.appendToDisplay(this.userUnit.element)
    }

    deleteDestroyedObjects(){
        this.allEnemies = this.allEnemies.filter( x => { return x.isDestroyed === false } )
        this.allProjectiles = this.allProjectiles.filter( x => { return x.isDestroyed === false } )
    }

    isPressed(key){
        return this.allPressedKeys.includes(key)
    }

    removeDestroyedElementsFromDOM(){
        this.removeDestroyedEnemiesFromDOM();
        this.removeDestroyedProjectilesFromDOM();
    }

    removeDestroyedEnemiesFromDOM(){
        this.allEnemies.filter( enemy => {
            return enemy.isDestroyed
        }).forEach( destroyedEnemy => {
            destroyedEnemy.destroy().forEach( newEnemy => {
                this.spawnEnemy(newEnemy)
            })
        })
    }

    removeDestroyedProjectilesFromDOM(){
        this.allProjectiles.forEach( projectile => { 
            if(projectile.isDestroyed === true){ 
                projectile.destroy() 
            } 
        })
    }

    restartLevel(){
        this.userUnit.isDestroyed = false;
        this.allEnemies = [];
        this.allProjectiles = [];
        this.draw()              
        this.unpause();        
    }
    
    spawnEnemy(enemy){
        this.allEnemies.push(enemy)
        this.appendToDisplay(enemy.element)
    }

    spawnProjectile(x, y){
        let projectile = new Projectile(x, y)
        this.appendToDisplay(projectile.element)
        this.allProjectiles.push(projectile)        
    }

    checkCollision(){

        //Check projectile collision against enemies
        this.allProjectiles.forEach( projectile => {
                
                let hitEnemies = this.allEnemies.filter( 
                    enemy => {
                        return projectile.intersectOnX(enemy)
                    }
                ).filter( 
                    enemyOnIntersect => {
                        return projectile.intersectOnY(enemyOnIntersect)
                    }
                )

                //If there is a hit mark both the enemy and projectile for destruction
                if(hitEnemies.length > 0){
                    projectile.isDestroyed = true;
                    hitEnemies.forEach( enemy => { enemy.isDestroyed = true })
                }
        })

        //Check enemy collision against the main player
        this.allEnemies.filter( enemy => { return this.userUnit.intersectOnY(enemy) } ).forEach( enemy => {
            if (this.userUnit.intersectOnX(enemy)){
                this.userUnit.isDestroyed = true;
            }
        })
    }

    hideMenu(){
        document.querySelector('div.gameMenu').style.display = 'none'
    }

    showMenu(){
        document.querySelector('div.gameMenu').style.display = 'flex'
    }

    update(){

        if(this.userUnit.isDestroyed){
            this.clearDisplay()
            this.pause()
        } 
        else {
            
            if(this.allEnemies.length === 0){
                this.spawnEnemy(new MediumEnemy())
            }

            this.userHUD.update()
            this.checkCollision()
            this.removeDestroyedElementsFromDOM()  
            this.deleteDestroyedObjects()            

            this.allEnemies.filter( x => { return x.atBottom === true } ).forEach( enemy => {
                enemy.y = 0;
                enemy.atBottom = false;
                this.spawnEnemy(enemy.clone())
            });

            //Update the users shape based on input
            this.userUnit.update(this.allPressedKeys)

            //Shoot projectile
            if(this.userUnit.shotCooldownFrames === 0 && this.isPressed(' ')){
                this.spawnProjectile(this.userUnit.center, this.userUnit.y)
                this.userUnit.shotCooldownFrames = 15
            }      

            //Update remaining projectiles and enemies
            this.allEnemies.forEach( x => { x.update() } )
            this.allProjectiles.forEach( x => { x.update() } )

            
        }
    }

    pause(){
        clearInterval(this.loop)
        this.showMenu();
    }

    unpause(){
        this.hideMenu();
        this.loop = setInterval(this.update.bind(this), 16)
    }

    start(){
        this.hideMenu();
        this.loop = setInterval(this.update.bind(this), 16)
    }

    togglePause(){
        if(this.isPaused){
            this.isPaused = false;
            this.start()
        } else {
            this.isPaused = true;
            clearInterval(this.loop)
            this.showMenu()
        }
    }

    inputIsValid(input){
        return Controller.validInputs.includes(input)
    }

    static get validInputs(){
        return ['w','a','s','d',' ', 'p']
    }

}