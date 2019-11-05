class Game{

    constructor(controller){
        this.allObjects = [];
        this.controller = controller
        this.userShape = new UserShape(this)
        this.allObjects.push(this.userShape)
        
    }

    addElement(element){
        this.controller.addElementToScreen(element)
    }

    draw(){
        this.allObjects.forEach(obj =>{
            obj.draw()
        });
    }


   


}