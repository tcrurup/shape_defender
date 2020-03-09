class GameBoard extends GameWindow{

    constructor(){
        super()
        this.element = this.createElement()
    }

    createElement(){

        let mainElem = document.createElement('div')
        mainElem.className = 'gameScreen'

        let subElem = document.createElement('div')
        subElem.className = 'gameMenu'

        let button = document.createElement('button')
        button.id = 'startGame'
        button.innerHTML = 'START'

        subElem.appendChild(button)        
        mainElem.appendChild(subElem)
        return mainElem
    }

    appendToDisplay(elem){
        this.element.appendChild(elem)
    }
}