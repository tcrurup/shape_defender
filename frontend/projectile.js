class Projectile extends GameUnit{

    constructor(initX, initY){
        super()
        this.element = Shape.line('projectile', 2, 8)
        this.x = initX;
        this.y = initY;
        this.draw()
        return this 
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
    }

    destroy(){
        this.element.remove();
        this.isDestroyed = true;
    }

}