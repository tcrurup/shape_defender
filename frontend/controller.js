class Controller{

    constructor(game={}){

        if(Object.keys(game).length > 0){
            this.game = game
        } else {
            this.createNewGame()
        }
        this.gameScreen = document.querySelector('div.gameScreen');
        this.gameTime = 0;
        this.pressedKeys = {
            'w': false,
            'a': false,
            's': false,
            'd': false
        }
        this.userHUD = new userHUD(this)
        this.addMovementListeners()
    }

    addElementToScreen(element){
        this.gameScreen.appendChild(element)
    }

    addMovementListeners(){

        document.addEventListener('keydown', e => {
            if(['w','a','s','d'].includes(e.key)){
                this.pressedKeys[e.key] = true;
            }
        })

        document.addEventListener('keyup', e => {
            if(['w','a','s','d'].includes(e.key)){
                this.pressedKeys[e.key] = false;
            }
        })
    }

    createNewGame(){
        this.game = new Game(this)
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
        document.querySelector('div.userInputContainer').appendChild(this.userHUD.draw())
        this.game.draw()
    }

    update(){
        this.userHUD.update()
    }

    start(){
        //Refresh approx 30 per second
        this.draw()
        setInterval(this.update.bind(this), 33)
    }

}