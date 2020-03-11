class GameSettings extends GameWindow{

    constructor(){
        super()
        this.element = this.createElement()
        this.hide()
    }

    createElement(){
        let element = document.createElement('div')
        element.id = 'userSettings'

        const spawnCooldown = document.createElement()

        return element
    }

    newSlider(){
        
    }
}