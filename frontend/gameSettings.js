class GameSettings extends GameWindow{

    constructor(){
        super()
        this.element = this.createElement()
        this.hide()
    }

    createElement(){
        let element = document.createElement('div')
        element.id = 'userSettings'

        const spawnCooldown = this.newSlider('spawnCooldown', .2, 5, .2, 'Spawn Cooldown: ')
        element.appendChild(spawnCooldown)

        return element
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