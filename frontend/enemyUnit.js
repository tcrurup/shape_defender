class EnemyUnit extends GameUnit{

    constructor(controller){
        super(controller)
        this.element = Shape.circle('enemyShape', 40)
        this.x = Math.floor(Math.random() * 475);
        this.y = 0

        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }

    update(){
        this.y += 5;
        this.element.style.top = `${this.y}px`;
        if(this.y > 800){
            this.destroy()
        }
    }

    destroy(){
        this.element.remove()
        this.isDestroyed = true;
    }
}