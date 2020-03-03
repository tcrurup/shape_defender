class ScoreCounter{

    //currentPlayerHigh
    //currentScore

    constructor(){
        this.element = document.createElement('div')
        this.element.id = ScoreCounter.elementId
        this.currentScore = 0;
    }

    set score(points){
        this.element.innerHTML = points
    }

    static get elementId(){
        return 'scoreCounter'
    }
}