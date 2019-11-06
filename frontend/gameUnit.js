class GameUnit {    
    
    constructor(){
        this.isDestroyed = false;
    }

}

class UserUnit extends GameUnit{

    
    constructor(){
        super()

        this.element = Shape.equilateralTriangle()
        this.fireRate = 1;
        this.shotCooldownFrames = 0;
        this.x = 225;
        this.y = 740;
        this.draw
    }    

    shoot(){
        if(this.shotCooldownFrames === 0){
            this.controller.spawnProjectile(this.x, this.y)
            this.shotCooldownFrames = 15
        }        
    }

    update(inputs){

        //Reduce the cooldown on the weapon every fram by the fire rate
        if(this.shotCooldownFrames > 0){ this.shotCooldownFrames -= this.fireRate }
        if (inputs.length > 0){
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
        
        this.element.style.top = `${this.y}px`;
        this.element.style.left = `${this.x}px`;
    }

}

