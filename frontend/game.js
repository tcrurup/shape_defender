class Game{

    constructor(controller){
        this.allObjects = [];
        this.gameController = controller
        this.userShape = new UserShape(this)
        this.allObjects.push(this.userShape)
        
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