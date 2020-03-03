class ScoreCounter{

    //currentPlayerHigh
    //currentScore

    constructor(){
        this.element = document.createElement('div')
        this.element.id = ScoreCounter.elementId
        this.currentScore = 0;
    }

    static get elementId(){
        return 'scoreCounter'
    }
}