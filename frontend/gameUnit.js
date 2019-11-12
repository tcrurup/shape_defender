class GameUnit {    
    
    constructor(initX, initY){
        this.isDestroyed = false;
        this.x = initX;
        this.y = initY;
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