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
            this.addListItem(key, response[key])
        })
    }    
}