class Shape {
    constructor(){

    }
}

class UserShape extends Shape{

    constructor(){
        super()
        let shape = this.element
        
        this.element = document.createElement("div")
        this.element.className = "userShape"
        this.element.style.top = "100px"
        this.element.style.left = "50px"

        this.pressedKeys = {};

        document.querySelector("div.gameScreen").appendChild(this.element)
        this.addMovementListeners()
    }

    addMovementListeners(){
        console.log("Adding user controls")
        document.addEventListener('keydown', function(e){
            if(e.key === 'w'){
                moveVertical.call(UserShape.element(), 2)
            } else if(e.key === 's'){
                moveVertical.call(UserShape.element(), -2)
            } else if(e.key === 'a'){
                moveHorizontal.call(UserShape.element(), -5)
            } else if (e.key === 'd'){
                moveHorizontal.call(UserShape.element(), 5)
            }
        })
    }

    static element() {
        return document.querySelector("div.userShape")
    }
  
}

function moveVertical(factor){
    let topStyle = this.style.top.replace("px", "");
    let top = parseInt(topStyle, 10);
    this.style.top = `${top - factor}px`;
}

function moveHorizontal(factor){
    let leftStyle = this.style.left.replace("px", "");
    let left = parseInt(leftStyle, 10);
    this.style.left = `${left + factor}px`;
}