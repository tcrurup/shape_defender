class ScoreCounter extends GameWindow{

    constructor(){
        super()
        this.element = document.createElement('div')
        this.element.id = ScoreCounter.elementId
        this.currentScore = 0;
        this.hide()
    }

    set score(points){
        this.element.innerHTML = points
    }

    static get elementId(){
        return 'scoreCounter'
    }
}