class Controller{

    constructor(game={}){
        if(Object.keys(game).length > 0){
            this.game = game
        } else {
            this.game = new Game
        }
        this.gameTime = 0;
    }

    draw(){
        this.game.drawScreen()
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