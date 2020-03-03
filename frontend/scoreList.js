class ScoreList{

    //CCONSTRUCTOR

    constructor(){
        this.element = document.createElement('table')
        this.element.id = ScoreList.tableId
        this.addHeaders()
        return this
    }

    //STATIC FUNCTIONS
    static get elementId(){
        return document.querySelector('div#scoreList')
    }

    static get tableId(){
        return 'scoreList'
    }

    //CLASS FUNCTIONS
    addHeaders(){
        const leftHeader = this.createHeader('Rank')
        const rightHeader = this.createHeader('Username  -  High Score')


        const headers = [leftHeader, rightHeader]
        this.appendRow(headers)  
    }

    addListItem(rank, usernameScore){
        let left = document.createElement('td')
        left.innerHTML = rank
        let right = document.createElement('td')
        right.innerHTML = `${usernameScore}`
        const listItem = [left, right]
        this.appendRow(listItem)
    }

    appendRow(array){
        let newRow = this.createRow()
        array.forEach( elem => { newRow.appendChild(elem) }) 
        this.element.appendChild(newRow)
    }

    clear(){
        this.element.querySelectorAll('tr:not(:first-child)').forEach( node => { node.parentNode.removeChild(node) })
    }

    createRow(){
        return document.createElement('tr')
    }

    createHeader(text){
        let header = document.createElement('th')
        header.innerHTML = text
        return header
    }

    updateList(response){
        this.clear()
        Object.keys(response).forEach( key => {
            this.addListItem(key, response[key])
        })
    }    
}