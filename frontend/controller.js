class Controller{

    constructor(game={}){

        if(Object.keys(game).length > 0){
            this.game = game
        } else {
            this.game = new Game
        }
        this.gameTime = 0;
        this.pressedKeys = {
            'w': false,
            'a': false,
            's': false,
            'd': false
        }
        this.addMovementListeners()
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

    static gameScreen(){
        return document.querySelector('div.gameScreen')
    }

}