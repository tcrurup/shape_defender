class GameWindow{

    constructor(){
    }

    set elementClassName(name){
        this.element.className = name
    }

    hide(){
        this.elementClassName = 'hidden'
    }

    showAsFlex(){
        this.elementClassName = 'flexContainer'
    }
    
    showAsInline(){
        this.elementClassName = 'inlineContainer'
    }
}