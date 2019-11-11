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
        return [this.x, (this.x + this.element.width)]
    }

    get yRange(){
        return [(this.y - this.element.height), this.y]
    }

}