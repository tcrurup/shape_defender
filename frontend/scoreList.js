class ScoreList extends GameWindow{

    //CCONSTRUCTOR

    constructor(){
        super()
        this.element = this.newScoreListTableElement()
        this.hide()
    }

    //STATIC FUNCTIONS
    static get elementId(){
        return document.querySelector('div#scoreList')
    }

    static get leftColHeader(){
        return 'Rank'
    }

    static get middleColHeader(){
        return 'Username'
    }

    static get rightColHeader(){
        return 'High Score'
    }

    static get submitPath(){
        return '/submitScore'
    }

    static get tableId(){
        return 'scoreList'
    }

    //********** GETTERS **********//

    get submitUrl(){
        return `${Controller.baseUrl}${ScoreList.submitPath}`
    }

    //CLASS FUNCTIONS
    clear(){
        this.element.querySelectorAll('tr:not(:first-child)').forEach( node => { node.parentNode.removeChild(node) })
    }

    createNewListEntry(rank, username, score, currentUser){
        const leftCol = this.newTableData(rank)
        const middleCol = this.newTableData(username)
        const rightCol = this.newTableData(score)

        let listItem = this.newRowFromArray([leftCol, middleCol, rightCol])
        if(username == currentUser){ listItem.className = 'currentUser' }

        this.element.appendChild(listItem)
    }
    
    highlightRowWithUser(username){
        const allRows = this.element.childNodes
        for(i=0; i<allRows.length; i++){
            if(allRows[i].querySelector('td:nth-child(2)').innerHTML = username){
                allRows[i].className = 'currentUser'
                break;
            }
        }
    }

    newHeader(text){
        let header = document.createElement('td')
        header.innerHTML = text
        header.id = 'header'
        return header
    }

    newRowFromArray(array){
        let row = document.createElement('tr')
        array.forEach( elem => { row.appendChild(elem) }) 
        return row
    }

    newTableData(innerHtml){
        let elem = document.createElement('td')
        elem.innerHTML = innerHtml
        return elem
    }

    newScoreListTableElement(){
        let slTable = document.createElement('table')
        slTable.id = ScoreList.tableId

        const leftHeader = this.newHeader(ScoreList.leftColHeader)
        const middleHeader = this.newHeader(ScoreList.middleColHeader)
        const rightHeader = this.newHeader(ScoreList.rightColHeader)        

        const headers = this.newRowFromArray([leftHeader, middleHeader, rightHeader])

        slTable.appendChild(headers)  

        return slTable
    }  
    
    show(){
        this.elementClassName = 'inlineContainer'
    }

    submitScoreAndUpdate(user, score){
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

        fetch(this.submitUrl, config)
            .then(response => response.json())
            .then( object => this.updateList(object, user) )
        .catch( error => alert(error)) 
    }

    updateList(response, user){
        this.clear()
        Object.keys(response).forEach( key => {
            let username = response[key][0]
            let score = response[key][1]            
            this.createNewListEntry(key, username, score, user)
        })
    }    
}