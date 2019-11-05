class Game{

    constructor(){
        this.userShape = new UserShape
        Controller.gameScreen().appendChild(this.userShape.element)
    }

    draw(){
        this.userShape.draw()
    }


   


}