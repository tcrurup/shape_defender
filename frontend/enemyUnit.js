fclass EnemyUnit extends GameUnit{

    constructor(initX = Math.floor(Math.random() * 475), initY = 0, xVel=5){
        super()
        this.atBottom = false;
        this.x = initX;
        this.y = initY;
        this.xVel = xVel;
        this.yVel = 3;
    }

    update(){
        this.y += this.yVel;
        this.x += this.xVel;
        this.element.style.top = `${this.y}px`;
        this.element.style.left = `${this.x}px`;
        if(this.y > 800){
            this.atBottom = true;
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

    constructor(initX, initY, xVel){
        super(initX, initY, xVel)
        this.element = Shape.circle('enemyShape', 20, 'red')
        return this
    }

    clone(){
        let clone = new SmallEnemy;
        clone.y = this.y 
        clone.xVel = this.xVel * -1
        clone.x = Math.floor(Math.random() * 475)
        return clone
    }

    destroy(){
        this.element.remove()
        return []
    }

}

class MediumEnemy extends EnemyUnit{

    constructor(initX, initY, xVel){
        super(initX, initY, xVel)
        this.element = Shape.circle('enemyShape', 40, 'blue')
        return this
    }

    clone(){
        let clone = new MediumEnemy;
        clone.y = this.y 
        clone.xVel = this.xVel * -1
        clone.x = Math.floor(Math.random() * 475)
        return clone
    }

    destroy(){
        this.element.remove()
        return [new SmallEnemy(this.left, this.top, this.xVel), new SmallEnemy(this.right, this.top, this.xVel*-1)]
    }

}





