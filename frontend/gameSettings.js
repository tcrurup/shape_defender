class GameSettings extends GameWindow{

    constructor(){
        super()
        this.element = this._createElement()
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
        return this.getElementValueFromId(GameSettings.enemyYVelId)
    }

    get frameRate(){
        return this.getElementValueFromId(GameSettings.frameRateId)
    }

    get maxXIncrease(){
        return this.getElementValueFromId(GameSettings.maxXIncreaseId)
    }

    get scoreModifier(){
        return this.getElementValueFromId(GameSettings.scoreModifierId)
    }

    get shootCooldown(){
        return this.getElementValueFromId(GameSettings.shootCooldownId)
    }
    
    get spawnCooldown(){
        return this.getElementValueFromId(GameSettings.spawnCooldownId)
    }

    //********** SETTERS **********//


    //********** INSTANCE FUNCTIONS **********//

    calculateScoreModifier(){
        let allPercentiles = []

        const defSettings = GameSettings.defaultSettings

        /* Calculate the % the current setting value is versus the default value
        for all values and store in array */
        for (const elementId in defSettings){
            let currentSetting = parseFloat(this.getElementValueFromId(elementId))
            let defaultSetting = parseFloat(defSettings[elementId])
            
            allPercentiles.push(currentSetting/defaultSetting)
        }

        //Find the average of the array and return that as the answer
        const reducer = (total, index) => { return total + index }
        let percent = (allPercentiles.reduce(reducer, 0))/allPercentiles.length
        
        return percent.toFixed(2)
    }      

    setElementValueFromId(elementId, value){
        super.setElementValueFromId(elementId, value).dispatchEvent(new Event('change'))
    }

    toDefault(){
        const defSetting = GameSettings.defaultSettings
        for (const elementId in defSetting){
            this.setElementValueFromId(elementId, defSetting[elementId])
        }
    }

    updateScoreModifier(){
        const modifier = this.calculateScoreModifier()
        this.getElementFromId(GameSettings.scoreModiferId).innerHTML = (`%${(modifier *100).toFixed(2)}`)
    }    

    //********** PRIVATE **********//
    _createElement(){
        let element = document.createElement('div')
        element.id = 'userSettings'

        const fps = this._newSlider(GameSettings.frameRateId, 10, 60, 1, "FPS: ")
        const spawnCooldown = this._newSlider(GameSettings.spawnCooldownId, .2, 5, .2, 'Spawn Speed: ')
        const enemySpeed = this._newSlider(GameSettings.enemyYVelId, 1, 20, 1, "Circle Speed: ")
        const shootCooldown = this._newSlider(GameSettings.shootCooldownId, 2, 30, 1, "Shot Cooldown: ")
        const maxXIncreaseOnLoop = this._newSlider(GameSettings.maxXIncreaseId, .2, 4, .2, "Max X Increase On Loop: ")
        
        let scoreModifier = document.createElement('div')
        scoreModifier.id = GameSettings.scoreModiferId

        
        const allSettingElements = [
            fps, 
            spawnCooldown, 
            enemySpeed, 
            shootCooldown, 
            maxXIncreaseOnLoop, 
            scoreModifier,
            this._defaultButtonElement(),
            this._presetButtonElements()
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

    _newSlider(id, min, max, step, label = ""){
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

    _presetButtonElements(){
        
        let div = document.createElement('div')
        div.id = 'presets'
        
        const createButton = function(presetNumber) {
            let button = document.createElement('button')
            button.id = (`preset-${presetNumber}`)
            button.innerHTML = (`Preset ${presetNumber}`)
            return button
        }
        
        for (let i = 1; i <= GameSettings.numOfPresets; i++){
            div.appendChild(createButton(i))
        }

        let saveButton = document.createElement('button')
        saveButton.id = "savePresets"
        saveButton.innerHTML = "Save Presets"
        div.appendChild(saveButton)

        return div
    }
}