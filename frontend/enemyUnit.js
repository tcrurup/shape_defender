class EnemyUnit extends GameUnit{

    constructor(initX = Math.floor(Math.random() * 475), initY = 0, xVel=5, yVel=5){
        super()
        this.atBottom = false;
        this.x = initX;
        this.y = initY;
        this.xVel = xVel;
        this.yVel = yVel
    }

    set verticalSpeed(speed){
        this.yVel = speed
    }

    increaseXVelocityUpTo(max){
        const factor = parseFloat(max)
        this.xVel += (Math.random() * factor)
        this.yVel += (Math.random() * 2)
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

    constructor(initX, initY, xVel, yVel){
        super(initX, initY, xVel, yVel)
        this.element = Shape.circle('enemyShape', 20, 'red')
        this.pointValue = 100;
        return this
    }

    breaksInto(){
        return [];
    }

    clone(){
        return new SmallEnemy(Controller.randomXCoordinate, this.y, this.xVel * -1, this.yVel);
    }
}

class MediumEnemy extends EnemyUnit{

    constructor(initX, initY, xVel, yVel){
        super(initX, initY, xVel, yVel)
        this.element = Shape.circle('enemyShape', 40, 'blue')
        this.pointValue = 200;
        return this
    }

    breaksInto(){
        return [
            new SmallEnemy(this.left, this.top, this.xVel, this.yVel), 
            new SmallEnemy(this.left, this.top, this.xVel*-1, this.yVel)
        ]
    }

    clone(){
        return new MediumEnemy(Controller.randomXCoordinate, this.y, this.xVel * -1, this.yVel);
    }
}

class LargeEnemy extends EnemyUnit{

    constructor(initX, initY, xVel, yVel){
        super(initX, initY, xVel, yVel)
        this.element = Shape.circle('enemyShape', 80, 'Yellow')
        this.pointValue = 400;
        return this
    }

    breaksInto(){
        return [
            new MediumEnemy(this.left, this.top, this.xVel, this.yVel), 
            new MediumEnemy(this.left, this.top, this.xVel*-1, this.yVel)
        ]
    }

    clone(){
        return new LargeEnemy(Controller.randomXCoordinate, this.y, this.xVel * -1, this.yVel);
    }
}





