class EnemyUnit extends GameUnit{

    constructor(){
        super()
        this.x = Math.floor(Math.random() * 475);
        this.y = 0
        this.xVel = 5;
        this.yVel = 3;
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

class SmallEnemy extends EnemyUnit{

    constructor(){
        super()
        this.element = Shape.circle('enemyShape', 20, 'red')
        return this
    }

    destroy(){
        this.element.remove()
        return []
    }

}

class MediumEnemy extends EnemyUnit{

    constructor(){
        super()
        this.element = Shape.circle('enemyShape', 40, 'blue')
        return this
    }

    destroy(){
        this.element.remove()
        return [new SmallEnemy, new SmallEnemy]
    }

}





