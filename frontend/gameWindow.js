class GameWindow{

    constructor(){
    }

    set elementDisplay(type){
        this.element.style.display = type
    }

    hide(){
        this.elementDisplay = 'none'
    }

    show(){
        this.elementDisplay = 'flex'
    }  
}