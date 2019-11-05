class Shape {
    constructor(){

    }
}

class UserShape extends Shape{

    constructor(game){
        super()
        this.game = game

        this.element = document.createElement('canvas')
        this.element.className = 'userShape'
        this.element.setAttribute('width', 50)
        this.element.setAttribute('height', 50)
        this.element.style.top = '10px'
        this.element.style.left = '10px'

        let context = this.element.getContext("2d")
        context.beginPath();
        context.moveTo(10,40)
        context.lineTo(25,10)
        context.lineTo(40,40)
        context.closePath()

        context.lineWidth = 5;
        context.strokeStyle = '#666666';
        context.stroke()

        context.fillStyle = "#FFCC00";
        context.fill();

        this.x = 0;
        this.y=0;
    }

    draw(){
        let user = document.querySelector('canvas.userShape')
        if(user == null){
            this.game.addElement(this.element); 
        } else {
        }
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