class GameSettings extends GameWindow{

    constructor(){
        super()
        this.element = this.createElement()
        this.toDefault()
        this.hide()
    }

    //********** CLASS FUNCTIONS **********//

    static get scoreModiferId(){
        return 'scoreModifier'
    }

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

    static get defaultButtonId(){
        return 'defaultButton'
    }
    
    static get defaultSettings(){
        let def = {}

        def[GameSettings.spawnCooldownId] = 4;
        def[GameSettings.frameRateId] = 60;
        def[GameSettings.enemyYVelId] = 5;
        def[GameSettings.shootCooldownId] = 8;
        def[GameSettings.maxXIncreaseId] = 3.0;

        return def
    }

    static get numOfPresets(){
        return 3;
    }

    //********** GETTERS **********//

    get currentSettings(){
        return {
            frameRate: this.frameRate,
            spawnCooldown: this.spawnCooldown,
            shootCooldown: this.shootCooldown,
            enemyYVel: this.enemyYVel,
            maxXIncrease: this.maxXIncrease,
            scoreModifier: this.calculateScoreModifier()
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

    get scoreModifier(){
        return this.getValueFromId(GameSettings.scoreModifierId)
    }

    get shootCooldown(){
        return this.getValueFromId(GameSettings.shootCooldownId)
    }
    
    get spawnCooldown(){
        return this.getValueFromId(GameSettings.spawnCooldownId)
    }

    //********** SETTERS **********//


    //********** INSTANCE FUNCTIONS **********//

    calculateScoreModifier(){
        let allPercentiles = []

        const defSettings = GameSettings.defaultSettings
        for (const elementId in defSettings){
            let currentSetting = parseFloat(this.getValueFromId(elementId))
            let defaultSetting = parseFloat(defSettings[elementId])
            
            allPercentiles.push(currentSetting/defaultSetting)
        }

        const reducer = (total, index) => { return total + index }
        
        let percent = (allPercentiles.reduce(reducer, 0))/allPercentiles.length
        return percent.toFixed(2)
    }

    createElement(){
        let element = document.createElement('div')
        element.id = 'userSettings'

        const fps = this.newSlider(GameSettings.frameRateId, 10, 60, 1, "FPS: ")
        const spawnCooldown = this.newSlider(GameSettings.spawnCooldownId, .2, 5, .2, 'Spawn Speed: ')
        const enemySpeed = this.newSlider(GameSettings.enemyYVelId, 1, 20, 1, "Circle Speed: ")
        const shootCooldown = this.newSlider(GameSettings.shootCooldownId, 2, 30, 1, "Shot Cooldown: ")
        const maxXIncreaseOnLoop = this.newSlider(GameSettings.maxXIncreaseId, .2, 4, .2, "Max X Increase On Loop: ")
        
        let scoreModifier = document.createElement('div')
        scoreModifier.id = GameSettings.scoreModiferId

        
        const allSettingElements = [
            fps, 
            spawnCooldown, 
            enemySpeed, 
            shootCooldown, 
            maxXIncreaseOnLoop, 
            scoreModifier,
            this._defaultButtonElement()
        ]

        allSettingElements.forEach( setting => element.appendChild(setting) )

        return element
    }

    _defaultButtonElement(){
        let button = document.createElement('button')
        button.id = GameSettings.defaultButtonId
        button.innerHTML = "DEFAULT"
        button.addEventListener( 'click', this.toDefault.bind(this) )
        return button
    }

    _presetButtonElements(){
        
        const createButton = function(presetNumber) {
            let button = document.createElement('button')
        }
        
        for( const i = 1; i <= GameSettings.numOfPresets; i++ ){

        }
    }

    getElementFromId(elementId){
        return this.element.querySelector(`#${elementId}`)
    }

    getValueFromId(elementId){
        return this.getElementFromId(elementId).value
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

        const onSliderChange = event => {
            display.innerHTML = event.target.value
            this.updateScoreModifier()
        }

        slider.addEventListener('change', onSliderChange)

        return container
    }

    setValueById(elementId, value){
        let slider =   this.element.querySelector(`#${elementId}`)
        slider.value = value
        slider.dispatchEvent(new Event('change'))
    }

    toDefault(){
        const defSetting = GameSettings.defaultSettings
        for (const elementId in defSetting){
            this.setValueById(elementId, defSetting[elementId])
        }
    }

    updateScoreModifier(){
        const modifier = this.calculateScoreModifier()

        this.getElementFromId(GameSettings.scoreModiferId).innerHTML = (`%${(modifier *100).toFixed(2)}`)
    }
}