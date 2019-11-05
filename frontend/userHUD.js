class userHUD{

    
    constructor(controller){
        this.controller = controller
    }

    draw(){

        let controlBox = document.createElement('div')
        controlBox.className = 'controlBox'

        let topRow = document.createElement('div')
        topRow.className = 'topRow'

        let bottomRow = document.createElement('div')
        bottomRow.className = 'bottomRow'

        let topRowKeys = ['w'].map( x => {return this._createUserKeyElement(x)} ) 
        let bottomRowKeys = ['a','s','d'].map( x=> {return this._createUserKeyElement(x)} )

        topRowKeys.forEach( keyElement => {topRow.appendChild(keyElement)} )
        bottomRowKeys.forEach( keyElement => {bottomRow.appendChild(keyElement)} )

        controlBox.appendChild(topRow)
        controlBox.appendChild(bottomRow)
        return controlBox
    }

    _createUserKeyElement(key){
        let userKey = document.createElement('div')
        userKey.className = 'userButtonKeyboard'
        userKey.id = `userButton-${key}`

        let text = document.createElement('p')
        text.innerHTML = key.toUpperCase()

        userKey.appendChild(text)
        return userKey
    }

    update(){
        let [wKey, aKey, sKey, dKey] = [
            this.controller.isPressed('w'),
            this.controller.isPressed('a'),
            this.controller.isPressed('s'),
            this.controller.isPressed('d')
        ]
        
        let [wElement, aElement, sElement, dElement] = [
            document.querySelector('div#userButton-w'),
            document.querySelector('div#userButton-a'),
            document.querySelector('div#userButton-s'),
            document.querySelector('div#userButton-d')
        ]

        if(wKey){ 
            wElement.style.background = 'white' 
        } else {
            wElement.style.background = 'lightblue'
        }

        if(aKey){ 
            aElement.style.background = 'white' 
        } else {
            aElement.style.background = 'lightblue'
        }

        if(sKey){ 
            sElement.style.background = 'white' 
        } else {
            sElement.style.background = 'lightblue'
        }

        if(dKey){ 
            dElement.style.background = 'white' 
        } else {
            dElement.style.background = 'lightblue'
        }
    }
}