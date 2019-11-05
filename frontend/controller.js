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

    draw(){
        this.game.draw()
    }

    update(){
        this.draw()
    }

    start(){
        //Refresh approx 30 per second
        setInterval(this.update.bind(this), 33)
    }

}