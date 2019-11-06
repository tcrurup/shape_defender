class GameUnit {
    
    
    
    constructor(game){
        this.game = game;
        this.isDestroyed = false;
    }

    get controller(){
        return this.game.controller
    }
}

class UserUnit extends GameUnit{

    
    constructor(game){
        super(game)

        this.element = Shape.equilateralTriangle()
        this.fireRate = 1;
        this.shotCooldownFrames = 0;
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

    shoot(){
        if(this.shotCooldownFrames === 0){
            let projectile = new Projectile(this.game, this.x, this.y)
            this.shotCooldownFrames = 30
        }        
    }

    update(){

        //Reduce the cooldown on the weapon every fram by the fire rate
        if(this.shotCooldownFrames > 0){ this.shotCooldownFrames -= this.fireRate }
        
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
                    case ' ':
                        this.shoot()
                        break; 
                }
            })
        }
        
        
    }

}

