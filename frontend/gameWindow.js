class GameWindow{

    constructor(){
    }

    set elementClassName(name){
        this.element.className = name
    }

    hide(){
        this.elementClassName = 'hidden'
    }

    show(){
        this.elementClassName = 'flexContainer'
    }  
}