class Controller{

    constructor(game={}){

       //This is an option to load a saved game that is a json file, otherwise it just creates new
        if(Object.keys(game).length > 0){
            this.game = game
        } else {
            this.createNewGame()
        }


        //Everything that you will see on display
        this.allProjectiles = [];
        this.allEnemies = []; 
        this.userHUD = new userHUD(this)
        this.userUnit = new UserUnit(this, 225, 700)
        console.log(this.userUnit)
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
        document.querySelector('button#spawnTestEnemy').addEventListener('click', this.spawnEnemy.bind(this))
        this.addMovementListeners()

        //Spawn in the user
        this.userUnit.draw()
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
            }
        })
    }

    allPressedKeys(){
        
        let pressedInputs = []
        
        Object.keys(this.pressedKeys).forEach( key => {
            if(this.pressedKeys[key] == true){
                pressedInputs.push(key)
            }
        });

        return pressedInputs
    }

    createNewGame(){
        this.game = new Game(this)
    }

    spawnProjectile(x, y){
        let projectile = new Projectile(this, x, y)
        this.allProjectiles.push(projectile)        
    }

    spawnUser(){
        this.userUnit = new UserUnit(this)
        GAME_DISPLAY.appendChild(this.userUnit.element)
    }

    spawnEnemy(){
        let enemy = new EnemyUnit(this, 20, 'red')
        this.allEnemies.push(enemy)
        GAME_DISPLAY.appendChild(this.allEnemies[(this.allEnemies.length - 1)].element)
    }


    onKeyDown(keyPressed){
        if(['w','a','s','d'].includes(e.key)){
            this.pressedKeys[e.key] = true
        }
    }

    isPressed(key){
        if(['w','a','s','d'].includes(key)){
            return this.pressedKeys[key]
        } 
    }

    checkCollision(){
        //Get all projectile x values as an array of [xmin, xmax]
        let allProjectilesX = this.allProjectiles.map( projectile => { return projectile.xRange } )
        let allProjectilesY = this.allProjectiles.map( projectile => { return projectile.yRange } )

        //Get all enemy x values as an array of [xmin, xmax]
        let allEnemyX = this.allEnemies.map( enemy => { return enemy.xRange } )
        let allEnemyY = this.allEnemies.map( enemy => { return enemy.yRange } )
        //Cycle through every projectile instead of enemies since there will be less at any given time
        for(let i = 0; i< allProjectilesX.length; i++){
            
            let projX = allProjectilesX[i]


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
                        this.allEnemies[j].destroy()
                        this.allProjectiles[i].destroy()
                    }

                }
                
            }
        }
    }

    update(){

        //Update the user display
        this.userHUD.update()

        //Update the users shape based on input
        this.userUnit.update(this.allPressedKeys())
        for(let i = 0; i< this.allProjectiles.length; i++){
            let object = this.allProjectiles[i]
            if(object.isDestroyed){
                this.allProjectiles = [...this.allProjectiles.slice(0,i) , ...this.allProjectiles.slice(i+1)]
            } else {
                object.update()
            }
        }

        //Move all the enmies on the board
        for(let i = 0; i< this.allEnemies.length; i++){
            let object = this.allEnemies[i]
            if(object.isDestroyed){
                this.allEnemies = [...this.allEnemies.slice(0,i) , ...this.allEnemies.slice(i+1)]
            } else {
                object.update()
            }
        }

        //Check if there is any collision between projectiles and enemy shapes
        this.checkCollision()
        if(this.allEnemies.length == 0){
            this.spawnEnemy()
        }
    }

    start(){
        setInterval(this.update.bind(this), 16)
    }

}