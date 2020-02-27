class EnemyUnit extends GameUnit{

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
        this.pointValue = 100;
        return this
    }

    breaksInto(){
        return [];
    }

    clone(){
        return new SmallEnemy(Controller.randomXCoordinate, this.y, this.xVel * -1);
    }
}

class MediumEnemy extends EnemyUnit{

    constructor(initX, initY, xVel){
        super(initX, initY, xVel)
        this.element = Shape.circle('enemyShape', 40, 'blue')
        this.pointValue = 200;
        return this
    }

    breaksInto(){
        return [new SmallEnemy(this.left, this.top, this.xVel), new SmallEnemy(this.left, this.top, this.xVel*-1)]
    }

    clone(){
        return new MediumEnemy(Controller.randomXCoordinate, this.y, this.xVel * -1);
    }
}

class LargeEnemy extends EnemyUnit{

    constructor(initX, initY, xVel){
        super(initX, initY, xVel)
        this.element = Shape.circle('enemyShape', 80, 'Yellow')
        this.pointValue = 400;
        return this
    }

    breaksInto(){
        return [new MediumEnemy(this.left, this.top, this.xVel), new MediumEnemy(this.left, this.top, this.xVel*-1)]
    }

    clone(){
        return new LargeEnemy(Controller.randomXCoordinate, this.y, this.xVel * -1);
    }
}





