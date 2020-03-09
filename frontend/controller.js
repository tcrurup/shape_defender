class Controller{

    constructor(){

        //User HUD elements
        this.gameBoard = new GameBoard()
        this.scoreList = new ScoreList()
        this.scoreCounter = new ScoreCounter()
        this.userHud = new userHUD()

        this.loginPortal = new AppPortal() 
        this.loginPortal.onLoginCallback = this.displayGame.bind(this)       
        
        //Initial Settings
        this.isPaused = false;
        this.userPoints = 0;
        
        //this.speedIncreaseFactor = 1.5;  //max % enemy speed will increase upon cyclying    

        //Add event listeners
        
        this.addInputListeners()    

        //document.querySelector('a#debug').addEventListener('click', this.debugMode.bind(this))
        document.querySelector('button#startGame').addEventListener('click', this.restartLevel.bind(this))
        document.querySelector('a#logout').addEventListener('click', this.logoutUser.bind(this))
        

        //Add on the board
        this.resetKeyInputs()//Set initial key inputs to false to avoid unwanted initial movement
        
    }

    //********************GETTERS********************

    get allPressedKeys(){
        let pressedInputs = []

        Object.keys(this.pressedKeys).forEach( key => {
            if(this.pressedKeys[key] == true){
                pressedInputs.push(key)
            }
        });

        return pressedInputs
    }

    get displayLeft(){
        return document.querySelector('div.screenLeft')
    }

    get displayMiddle(){
        return document.querySelector('div.screenMiddle')
    }

    get displayRight(){
        return document.querySelector('div.screenRight')
    }

    get gameBoard(){
        return this._gameBoardObject
    }

    get loginPortal(){
        return this._loginPortalObject
    }

    get scoreCounter(){
        return this._scoreCounterObject
    }

    get scoreList(){
        return this._scoreListObject
    }

    get userHud(){
        return this._userHudObject
    }

    //********************SETTERS********************
    set gameBoard(gbObject){
        this._gameBoardObject = gbObject
        this.displayMiddle.appendChild(this.gameBoard.element)
    }

    set loginPortal(lpObject){
        this._loginPortalObject = lpObject
        this.displayMiddle.appendChild(this.loginPortal.element)
    }

    set scoreCounter(scObject){
        this._scoreCounterObject = scObject
        this.displayLeft.appendChild(this.scoreCounter.element)
    }

    set scoreList(slObject){
        this._scoreListObject = slObject
        this.displayRight.appendChild(this.scoreList.element)
    }

    set userHud(uhObject){
        this._userHudObject = uhObject
        this.displayLeft.appendChild(this.userHud.element)
    }

    //********************FUNCTIONS********************
    addInputListeners(){
        document.addEventListener('keydown', e => {
            if(this.inputIsValid(e.key)){ 
                this.pressedKeys[e.key] = true 
            }
        });

        document.addEventListener('keyup', e => {
            if(this.inputIsValid(e.key)){
                if(e.key === 'p'){
                    this.togglePause()
                } else {
                    this.pressedKeys[e.key] = false
                }
            }
        });
    }


    

    debugMode(event){
        event.preventDefault()
        this.hideLogin();
        this.showGameDisplay();
        this.showControlBox();
    }

    displayGame(){
        this.gameBoard.show()
        this.userHud.show()
        this.scoreCounter.show()
        this.scoreList.show()

        this.loginPortal.hide()
    }

    displayLogin(){
        this.gameBoard.hide()
        this.userHud.hide()
        this.scoreCounter.hide()
        this.scoreList.hide()

        this.loginPortal.show()
    }

    hideControlBox(){
        this.controlBox.hide()
    }

    hideGameDisplay(){
        this.gameDisplay.hide()
    }

    hideLogin(){
        this.loginPortal.hide()
    }

    hideScoreCounter(){
        this.scoreCounter.hide()
    }

    initialize(){
        this.showLogin();
    }

    inputIsValid(input){
        return Controller.validInputs.includes(input)
    }

    isPressed(key){
        return this.allPressedKeys.includes(key)
    }

    logInUserAndShowGame(username){
        this.currentUser = username
        document.querySelector('span#loggedInUser').innerHTML = username
        this.hideLogin();
        this.showGameDisplay();
        this.submitScore();
    }

    logoutUser(event){
        event.preventDefault()
        this.currentUser = undefined
        this.hideGameDisplay();
        this.hideControlBox();
        this.showLogin();
    }

    outputUserToLog(){
        console.log(this.currentUser)
    }

    pause(){
        clearInterval(this.loop)
        this.showMenu();
    }

    
    

    

    resetKeyInputs(){
        this.pressedKeys = {
            'w': false,
            'a': false,
            's': false,
            'd': false,
            ' ': false
        } 
    }

    restartLevel(){
        this.gameBoard.restartLevel()
        this.userPoints = 0;            
        this.unpause();        
    }

    showControlBox(){
        //this.controlBox.style.display = 'inline-flex'
    }

    showGameDisplay(){
        this.gameDisplay.style.display = 'inline-flex'
        this.hideLogin()
    }

    showLogin(){
        this.loginPortal.show()
    }

    showScoreCounter(){
        this.scoreCounter.show()
    }
    
    

    

    start(){
        this.gameBoard.start()
        this.loop = setInterval(this.update.bind(this), 16)
    }

    submitScore(){
        const url = `http://localhost:3000/submitScore`

        let formData = {
            username: this.currentUser,
            score: this.userPoints
        }

        let config = {
            method: "POST",
            body: JSON.stringify(formData),
            headers:{
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            }
        }

        fetch(url, config)
            .then(response => response.json())
            .then( (object) => {
                this.scoreList.updateList(object)
            })
        .catch( error => alert(error)) 
    }

    togglePause(){
        if(this.isPaused){
            this.isPaused = false;
            this.start()
        } else {
            this.isPaused = true;
            clearInterval(this.loop)
            this.showMenu()
        }
    }

    unpause(){
        this.start()
    }
    
    update(){
        if(this.gameBoard.userIsDestroyed()){
            this.gameBoard.endGame()
            this.pause()
            this.submitScore()
        } 
        else {            
            this.userHud.update(this.allPressedKeys)
            this.gameBoard.update(this.allPressedKeys)
            this.updateScoreCounter();     
        }
    }    

    updateScoreList(){

    }

    updateScoreCounter(){
        this.scoreCounter.score = this.userPoints
    }

    

    //********************STATIC FUNCTIONS********************

    static get randomXCoordinate(){
        Math.floor(Math.random() * 475)
    }

    static get validInputs(){
        return ['w','a','s','d',' ', 'p']
    }

}