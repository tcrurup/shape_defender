class Shape {
    constructor(game){
        this.game = game;
    }

    get controller(){
        return this.game.controller
    }
}

class UserShape extends Shape{

    
    constructor(game){
        super(game)

        this.element = this._createElement()
        this.x = 225;
        this.y = 740;
    }    

    draw(){
        let user = document.querySelector('canvas.userShape')
        if(user == null){
            this.game.addElement(this.element);
            this.draw(); 
        } else {             
            user.style.top = `${this.y}px`;
            user.style.left = `${this.x}px`;
        }
    }

    update(){
        let inputs = this.controller.allPressedKeys()
        if (inputs.length > 0){
            let user = document.querySelector('canvas.userShape')
            inputs.forEach( input => {
                switch(input){
                    case 'w':
                        this.y -= 6
                        if(this.y < 500){ this.y = 500 }
                        break;
                    case 'a':
                        this.x -= 10
                        if(this.x < -5){ this.x = -5 }
                        break;
                    case 's':
                        this.y += 6
                        if(this.y > 740){ this.y = 740 }
                        break;
                    case 'd':
                        this.x += 10
                        if(this.x > 455){ this.x = 455 }
                        break;    
                }
            })
        }
        
        
    }

    //PRIVATE FUNCTIONS
    _createElement(){
        let element = document.createElement('canvas')
        element.className = 'userShape'
        element.setAttribute('width', 50)
        element.setAttribute('height', 50)

        let context = element.getContext("2d")
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

        return element
    }
  
}

