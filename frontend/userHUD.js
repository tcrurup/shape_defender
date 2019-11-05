class userHUD{

    
    constructor(controller){
        this.controller = controller
    }

    draw(){
        
    }

    update(){
        let [wKey, aKey, sKey, dKey] = [
            this.controller.isPressed('w'),
            this.controller.isPressed('a'),
            this.controller.isPressed('s'),
            this.controller.isPressed('d')
        ]
        
        let [wElement, aElement, sElement, dElement] = [
            document.querySelector('div.userButtonKeyboard-w'),
            document.querySelector('div.userButtonKeyboard-a'),
            document.querySelector('div.userButtonKeyboard-s'),
            document.querySelector('div.userButtonKeyboard-d')
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