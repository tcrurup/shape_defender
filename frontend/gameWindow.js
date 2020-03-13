class GameWindow{

    constructor(){
    }

    set elementClassName(name){
        this.element.className = name
    }

    getElementFromId(elementId){
        return this.element.querySelector(`#${elementId}`)
    }

    getElementValueFromId(elementId){
        return this.getElementFromId(elementId).value
    }  

    setElementValueFromId(elementId, value){
        let element = this.getElementFromId(elementId)
        element.value = value
        return element
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