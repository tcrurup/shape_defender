class Shape {
    constructor(){

    }
}

class UserShape extends Shape{

    constructor(){
        super()
        this.element = document.createElement("div")
        this.element.className = "userShape"
        document.querySelector("div.gameScreen").appendChild(this.element)
    }

  
}