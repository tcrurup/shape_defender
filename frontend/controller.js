class Controller{

    constructor(){

        //User HUD elements
        this.gameBoard = new GameBoard()
        this.scoreList = new ScoreList()
        this.gameSettings = new GameSettings()
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
        

        //Add on the board
        this.resetKeyInputs()//Set initial key inputs to false to avoid unwanted initial movement
        
    }

    static get baseUrl(){
        return 'http://localhost:3000'
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

    get currentUser(){
        return this.loginPortal.currentUser
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

    get gameSettings(){
        return this._gameSettingsObject
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

    get usersCurrentScore(){
        return this.gameBoard.userScore
    }

    //********************SETTERS********************
    set gameBoard(gbObject){
        this._gameBoardObject = gbObject
        this.displayMiddle.appendChild(this.gameBoard.element)
    }

    set gameSettings(gsObject){
        this._gameSettingsObject = gsObject
        this.displayLeft.appendChild(this.gameSettings.element)
    }

    set loginPortal(lpObject){
        this._loginPortalObject = lpObject
        this.displayMiddle.appendChild(this.loginPortal.element)
    }

    set scoreCounter(scObject){
        this._scoreCounterObject = scObject
        this.displayLeft.appendChild(this.scoreCounter.element)
    }

    set scoreDisplayValue(value){
        this.scoreCounter.score = value
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
        this.gameBoard.showAsFlex()
        this.userHud.showAsFlex()
        this.scoreCounter.showAsFlex()
        this.gameSettings.showAsFlex()        
        this.scoreList.showAsInline()
        this.scoreList.submitScoreAndUpdate(this.currentUser, 0)
        
        this.loginPortal.hide()
    }

    displayLogin(){
        this.gameBoard.hide()
        this.userHud.hide()
        this.scoreCounter.hide()
        this.scoreList.hide()
        this.gameSettings.hide()
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
        this.start();        
    }    

    showControlBox(){
        //this.controlBox.style.display = 'inline-flex'
    }

    showGameDisplay(){
        this.gameDisplay.showAsInline()
        this.hideLogin()
    }

    showLogin(){
        this.loginPortal.showAsFlex()
    }

    showScoreCounter(){
        this.scoreCounter.showAsFlex()
    }   

    start(){
        this.gameBoard.start()
        this.loop = setInterval(this.update.bind(this), 16)
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

    update(){
        if(this.gameBoard.userIsDestroyed()){
            this.gameBoard.endGame()
            this.scoreList.submitScoreAndUpdate(this.currentUser, this.usersCurrentScore)
            this.pause()
        } 
        else {            
            this.userHud.update(this.allPressedKeys)
            this.gameBoard.update(this.allPressedKeys)
            this.updateScoreCounter();     
        }
    }    

    updateScoreCounter(){
        this.scoreDisplayValue = this.usersCurrentScore
    }  

    //********************STATIC FUNCTIONS********************

    static get randomXCoordinate(){
        Math.floor(Math.random() * 475)
    }

    static get validInputs(){
        return ['w','a','s','d',' ', 'p']
    }

}