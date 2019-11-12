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
        
        //Show the heads up display
        document.querySelector('div.userInputContainer').appendChild(this.userHUD.draw())

        //Add event listeners
        this.addMovementListeners()

        //Add on the board
        this.draw()
    }

    addMovementListeners(){

        document.addEventListener('keydown', e => {
            if(['w','a','s','d',' '].includes(e.key)){
                this.pressedKeys[e.key] = true;
            } 
        })

        document.addEventListener('keyup', e => {
            if(['w','a','s','d',' '].includes(e.key)){
                this.pressedKeys[e.key] = false;
            } else if(e.key === 'p'){
                this.togglePause()
            }
        })
    }

    get allPressedKeys(){
        
        let pressedInputs = []
        
        Object.keys(this.pressedKeys).forEach( key => {
            if(this.pressedKeys[key] == true){
                pressedInputs.push(key)
            }
        });

        return pressedInputs
    }
    

    spawnProjectile(x, y){
        let projectile = new Projectile(x, y)
        this.display.appendChild(projectile.element)
        this.allProjectiles.push(projectile)        
    }

    spawnEnemy(enemy){
        console.log(enemy)
        this.allEnemies.push(enemy)
        this.display.appendChild(this.allEnemies[(this.allEnemies.length - 1)].element)
    }

    onKeyDown(keyPressed){
        if(['w','a','s','d'].includes(e.key)){
            this.pressedKeys[e.key] = true
        }
    }

    isPressed(key){
        if(['w','a','s','d',' '].includes(key)){
            return this.pressedKeys[key]
        } 
    }

    draw(){
        this.display.appendChild(this.userUnit.element)
    }

    checkCollision(){
        //Get all projectile x and y values as an array of [xmin, xmax]
        let allProjectilesX = this.allProjectiles.map( projectile => { return projectile.xRange } )
        let allProjectilesY = this.allProjectiles.map( projectile => { return projectile.yRange } )

        //Get all enemy x and y values as an array of [xmin, xmax]
        let allEnemyX = this.allEnemies.map( enemy => { return enemy.xRange } )
        let allEnemyY = this.allEnemies.map( enemy => { return enemy.yRange } )

        //Get all user x and y values as an array of [xmin, xmax]
        let userX = this.userUnit.xRange
        let userY = this.userUnit.yRange

        //Cycle through every projectile instead of enemies since there will be less at any given time
        for(let i = 0; i< allProjectilesX.length; i++){
            
            let projX = allProjectilesX[i]

            //Check if projectiles are colliding with enemy unit
            for(let j = 0; j< allEnemyX.length; j++){
                
                //If the the shapes x's overlap then go to next step and check y values
                
                let enemyX = allEnemyX[j]

                if(projX[0] >= enemyX[0] && projX[1] <= enemyX[1]){

                    let projY = allProjectilesY[i]
                    let enemyY = allEnemyY[j]

                    if( 
                        (projY[0] >= enemyY[0] && projY[0] <= enemyY[1]) || 
                        (projY[1] <= enemyY[0] && projY[1] >= enemyY[1]) 
                    ){
                        this.allEnemies[j].isDestroyed = true
                        this.allProjectiles[i].isDestroyed = true
                    }

                }
                
            }

        }
        this.allEnemies.filter( enemy => { return this.userUnit.intersectOnY(enemy) } ).forEach( enemy => {
            if (this.userUnit.intersectOnX(enemy)){
                this.userUnit.isDestroyed = true;
            }
        })
    }

    update(){
        if(this.userUnit.isDestroyed){
            this.pause()
            console.log(allEnemies)
        } else {
            if(this.allEnemies.length === 0){
                console.log('spawning new')
                this.spawnEnemy(new MediumEnemy())
            }
            //Update the user display
            this.userHUD.update()

            //Check for collision
            this.checkCollision()

            //Remove all DOM elements for objects marked for destruction
            this.allEnemies.map( x => { 
                if(x.isDestroyed === true){ 
                    let newEnemies = x.destroy()
                    if (newEnemies.length > 0){
                        newEnemies.forEach( x => {
                            this.spawnEnemy(x)
                        });
                    } 
                } 
            })

            this.allProjectiles.map( x => { if(x.isDestroyed === true){ x.destroy() } } )

            //Update the arrays the contain the projectile and enemy data to remove the objects marked destroyed
            this.allEnemies = this.allEnemies.filter( x => { return x.isDestroyed === false } )
            this.allProjectiles = this.allProjectiles.filter( x => { return x.isDestroyed === false } )

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

    start(){
        this.loop = setInterval(this.update.bind(this), 16)
    }

    togglePause(){
        if(this.isPaused){
            this.isPaused = false;
            this.start()
        } else {
            this.isPaused = true;
            console.log(this.allEnemies)
            clearInterval(this.loop)
        }
    }

}