class EnemyUnit extends GameUnit{

    constructor(controller, size, color){
        super(controller)

        this.element = Shape.circle('enemyShape', size, color)
        this.x = Math.floor(Math.random() * 475);
        this.y = 0
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }

    update(){
        this.y += 5;
        this.element.style.top = `${this.y}px`;
        if(this.y > 800){
            this.isDestroyed = true
        }
    }

    destroy(){
        this.element.remove()
    }
}



