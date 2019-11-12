class GameUnit {    
    
    constructor(initX, initY){
        this.isDestroyed = false;
        this.x = initX;
        this.y = initY;
    }

    intersectOnY(target){
        return (this.top > target.top && this.top < target.bottom) || (this.bottom > target.top && this.bottom < target.bottom) 
    }

    intersectOnX(target){
        return (this.left > target.left && this.left < target.right) || (this.right > target.left && this.right < target.right)
    }

    get center(){
        let width = this.element.width  
        return this.x + (width / 2)        
    }

    get xRange(){
        return [this.left, this.right]
    }

    get yRange(){
        return [this.top, this.bottom]
    }

    get top(){
        return this.y
    }

    get bottom(){
        return this.y + this.element.height
    }

    get left(){
        return this.x
    }

    get right(){
        return this.x + this.element.width
    }

}