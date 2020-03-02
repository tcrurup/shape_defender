class ScoreList{

    //CCONSTRUCTOR

    constructor(){
        this.element = document.createElement('table')
        this.element.id = ScoreList.tableId
        this.addHeaders()
    }

    //STATIC FUNCTIONS
    static get elementId(){
        return document.querySelector('div#scoreList')
    }

    static get tableId(){
        return 'scoreList'
    }

    addHeaders(){
        const leftHeader = this.createHeader('Rank')
        const middleHeader = this.createHeader('Username')
        const rightHeader = this.createHeader('High Score')


        const headers = [leftHeader, middleHeader, rightHeader]
        this.appendRow(headers)  
    }

    addListItem(rank, username, score){
        const left = this.createElement('td').innerHTML = rank
        const middle = this.createElement('td').innerHTML = username
        const right = this.createElement('td').innerHTML = score

        const listItem = [left, middle, right]
        this.appendRow(listItem)
    }

    appendRow(array){
        array.forEach( elem => { this.element.appendChild(elem) }) 
    }

    createRow(){
        return document.createElement('tr')
    }

    createHeader(text){
        let header = document.createElement('th')
        header.innerHTML = text
        return header
    }

    
}