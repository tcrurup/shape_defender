class ScoreList extends GameWindow{

    //CCONSTRUCTOR

    constructor(){
        super()
        this.element = document.createElement('table')
        this.element.id = ScoreList.tableId
        this.addHeaders()
        this.hide()
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
        const middleHeader = this.createHeader('Username')
        const rightHeader = this.createHeader('High Score')


        const headers = [leftHeader, middleHeader, rightHeader]
        this.appendRow(headers)  
    }

    addListItem(rank, username, score){
        let left = this.newTableData(rank)
        let middle = this.newTableData(username)
        let right = this.newTableData(score)
        const listItem = [left, middle, right]
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

    newTableData(innerHtml){
        let elem = document.createElement('td')
        elem.innerHTML = innerHtml
        return elem
    }

    submitScoreAndUpdate(user, score){
        const url = `http://localhost:3000/submitScore`

        let formData = {
            username: user,
            score: score
        }

        let config = {
            method: "POST",
            body: JSON.stringify(formData),
            headers:{
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            }
        }

        console.log(JSON.stringify(formData))

        fetch(url, config)
            .then(response => response.json())
            .then( (object) => {
                this.updateList(object)
            })
        .catch( error => alert(error)) 
    }

    updateList(response){
        this.clear()
        Object.keys(response).forEach( key => {
            let username = response[key][0]
            let score = response[key][1]
            this.addListItem(key, username, score)
        })
    }    
}