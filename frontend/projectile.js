class Projectile extends GameUnit{

    constructor(game, initX, initY){
        super(game)

        this.element = Shape.line(2,8)
        this.x = initX;
        this.y = initY;
        this.isDestroyed = false;
        this.draw() 
    }

    update(){
        this.y -= 15;
        this.element.style.top = `${this.y}px`;
        if(this.y < 0){
            this.destroy()
        } 
    }

    draw(){
        this.element.style.top = `${this.y}px`;
        this.element.style.left = `${this.x}px`;
        GAME_DISPLAY.appendChild(this.element)        
    }

    destroy(){
        this.element.remove();
        this.isDestroyed = true;
    }

}