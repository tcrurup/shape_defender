class Game{

    constructor(controller){
        this.allObjects = [];
        this.gameController = controller
        this.userUnit = new UserUnit(this)
        this.allObjects.push(this.userUnit)
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
        console.log(this.allObjects)
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

    draw(){
        this.allObjects.forEach(obj =>{
            obj.draw()
        });
    }

}