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
        this.allObjects.forEach(obj =>{
            obj.update()
        });
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