class ScoreCounter extends GameWindow{

    constructor(){
        super()
        
        this.currentScore = 0;
        this.element = document.createElement('div')
        this.element.id = ScoreCounter.elementId

        this._addTitle()
        this._addCounter()
        this.hide()
    }

    set score(points){
        this.element.querySelector('div#counter').innerHTML = points
    }

    static get elementId(){
        return 'scoreCounter'
    }

    _addTitle(){
        let title = document.createElement('div')
        title.innerHTML = "SCORE"

        let divider = document.createElement('div')
        divider.innerHTML = '-----------------------------------------'

        this.element.appendChild(title)
        this.element.appendChild(divider)
    }

    _addCounter(){
        let counter = document.createElement('div')
        counter.id = 'counter'
        counter.innerHTML = '0'

        this.element.appendChild(counter)
    }
}