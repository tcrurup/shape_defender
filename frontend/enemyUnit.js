class EnemyUnit extends GameUnit{

    constructor(controller, size, color){
        super(controller)

        this.element = Shape.circle('enemyShape', size, color)
        this.x = Math.floor(Math.random() * 475);
        this.y = 0
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.xVel = 5;
        this.yVel = 5;
    }

    update(){
        this.y += this.yVel;
        this.x += this.xVel;
        this.element.style.top = `${this.y}px`;
        this.element.style.left = `${this.x}px`;
        if(this.y > 800){
            this.isDestroyed = true
        }
        if(this.x >475 || this.x < 0){
            this.xVel *= -1
        }
    }

    destroy(){
        this.element.remove()
    }
}



