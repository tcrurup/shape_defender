class GameSettings extends GameWindow{

    constructor(){
        super()
        this.element = this.createElement()
        this.hide()
    }

    //********** CLASS FUNCTION **********//

    static get spawnCooldownID(){
        return 'spawnCooldown'
    }

    static get frameRateId(){
        return 'frameRate'
    }

    //********** GETTERS **********//

    get currentSettings(){
        return {
            frameRate: this.frameRate,
            spawnCooldown: this.spawnCooldown
        }
    }

    get frameRate(){
        return this.getValueFromId(GameSettings.frameRateId)
    }
    
    get spawnCooldown(){
        return this.getValueFromId(GameSettings.spawnCooldownID)
    }

    //********** SETTERS **********//


    //********** INSTANCE FUNCTIONS **********//

    createElement(){
        let element = document.createElement('div')
        element.id = 'userSettings'

        const fps = this.newSlider(GameSettings.frameRateId, 10, 60, 1, "FPS: ")
        const spawnCooldown = this.newSlider(GameSettings.spawnCooldownID, .2, 5, .2, 'Spawn Cooldown: ')
        
        const allSettingElements = [fps, spawnCooldown]

        allSettingElements.forEach( setting => element.appendChild(setting) )

        return element
    }

    getValueFromId(elementId){
        return this.element.querySelector(`#${elementId}`).value
    }

    newSlider(id, min, max, step, label = ""){
        let container = document.createElement('div')

        let slideLabel = document.createElement('label')
        slideLabel.htmlFor = id
        slideLabel.innerHTML = label

        container.appendChild(slideLabel)
        
        let slider = document.createElement('input')
        slider.type = 'range'
        slider.min = min
        slider.max = max
        slider.step = step
        slider.id = id

        container.appendChild(slider)

        let display = document.createElement('span')

        container.appendChild(display)

        const onSliderChange = function(event)  {
            display.innerHTML = event.target.value
        }

        slider.addEventListener('change', onSliderChange)

        return container
    }
}