class Game{

    constructor(controller){
        this.allProjectiles = [];
        this.gameController = controller
        this.userUnit = new UserUnit(this)
    }

    addElement(element){
        this.controller.addElementToScreen(element)
    }

    update(){

        for(let i = 0; i< this.allObjects.length; i++){
            let object = this.allObjects[i]
            if(object.isDestroyed){
                this.allObjects = [...this.allObjects.slice(0,i) , ...this.allObjects.slice(i+1)]
            } else {
                object.update()
            }
        }
    }

    

    get controller(){
        return this.gameController
    }

    set controller(cont){
        this.gameController = controller
    }

    get allPressedKeys(){
        this.controller.allPressedKeys()
    }


}