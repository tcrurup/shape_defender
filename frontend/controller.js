class Controller{

    constructor(game={}){

        this.allProjectiles = [];
        if(Object.keys(game).length > 0){
            this.game = game
        } else {
            this.createNewGame()
        }

        this.userUnit = new UserUnit()
        this.gameScreen = document.querySelector('div.gameScreen');
        this.gameTime = 0;
        this.pressedKeys = {
            'w': false,
            'a': false,
            's': false,
            'd': false,
            ' ': false
        }
        this.userHUD = new userHUD(this)
        document.querySelector('div.userInputContainer').appendChild(this.userHUD.draw())
        this.addMovementListeners()
        this.spawnUser(225, 740)
    }

    addElementToScreen(element){
        this.gameScreen.appendChild(element)
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
        let projectile = new Projectile(this.game, x, y)
        this.allProjectiles.push(projectile)        
    }

    spawnUser(x, y){
        this.userUnit = new UserUnit(x, y)
        GAME_DISPLAY.appendChild(this.userUnit.element)
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

    draw(){
        this.game.draw()
    }

    update(){
        this.userHUD.update()
        this.userUnit.update(this.allPressedKeys())
        console.log(this.userUnit)
        for(let i = 0; i< this.allProjectiles.length; i++){
            let object = this.allProjectiles[i]
            if(object.isDestroyed){
                this.allProjectiles = [...this.allProjectiles.slice(0,i) , ...this.allProjectiles.slice(i+1)]
            } else {
                object.update()
            }
        }
    }

    start(){
        //Refresh approx 30 per second
        this.draw()
        setInterval(this.update.bind(this), 33)
    }

}