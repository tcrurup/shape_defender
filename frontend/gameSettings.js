class GameSettings extends GameWindow{

    constructor(){
        super()
        this.element = this.createElement()
        this.hide()
    }

    //********** CLASS FUNCTIONS **********//

    static get spawnCooldownId(){
        return 'spawnCooldown'
    }

    static get frameRateId(){
        return 'frameRate'
    }

    static get enemyYVelId(){
        return 'enemyYVel'
    }

    static get shootCooldownId(){
        return 'shootCooldown'
    }

    static get maxXIncreaseId(){
        return 'maxXIncrease'
    }

    //********** GETTERS **********//

    get currentSettings(){
        return {
            frameRate: this.frameRate,
            spawnCooldown: this.spawnCooldown,
            shootCooldown: this.shootCooldown,
            enemyYVel: this.enemyYVel,
            maxXIncrease: this.maxXIncrease
        }
    }

    get enemyYVel(){
        return this.getValueFromId(GameSettings.enemyYVelId)
    }

    get frameRate(){
        return this.getValueFromId(GameSettings.frameRateId)
    }

    get maxXIncrease(){
        return this.getValueFromId(GameSettings.maxXIncreaseId)
    }

    get shootCooldown(){
        return this.getValueFromId(GameSettings.shootCooldownId)
    }
    
    get spawnCooldown(){
        return this.getValueFromId(GameSettings.spawnCooldownId)
    }

    //********** SETTERS **********//


    //********** INSTANCE FUNCTIONS **********//

    createElement(){
        let element = document.createElement('div')
        element.id = 'userSettings'

        const fps = this.newSlider(GameSettings.frameRateId, 10, 60, 1, "FPS: ")
        const spawnCooldown = this.newSlider(GameSettings.spawnCooldownId, .2, 5, .2, 'Spawn Cooldown: ')
        const enemySpeed = this.newSlider(GameSettings.enemyYVelId, 1, 20, 1, "Circle Speed: ")
        const shootCooldown = this.newSlider(GameSettings.shootCooldownId, 2, 360, 1, "Shot Cooldown: ")
        const maxXIncreaseOnLoop = this.newSlider(GameSettings.maxXIncreaseId, .2, 4, .2, "Max X Increase On Loop: ")
        
        const allSettingElements = [fps, spawnCooldown, enemySpeed, shootCooldown, maxXIncreaseOnLoop]

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