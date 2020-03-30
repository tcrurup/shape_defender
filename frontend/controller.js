class Controller{

    constructor(){

        //User HUD elements
        this.gameBoard = new GameBoard()
        this.scoreList = new ScoreList()
        this.gameSettings = new GameSettings(this.savePresets.bind(this))
        this.scoreCounter = new ScoreCounter()
        this.userHud = new userHUD()
        this.loginPortal = new AppPortal(this.displayGame.bind(this))  
        this.pressedKeys = {}
        
        //Add elements to the document
        this.drawAllElements()
        this.addInputListeners()    
        
    }

    static get baseUrl(){return 'http://localhost:3000'}
    static get leftDivId(){return 'div.screenLeft'}
    static get middleDivId(){return 'div.screenMiddle'}
    static get rightDivId(){return 'div.screenRight'}

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

    get currentUser(){ return this.loginPortal.currentUser }
    get currentSettings(){ return this.gameSettings.currentSettings }
    get usersCurrentScore(){ return this.gameBoard.userScore }

    get gameObjects(){
        return [
            this.gameBoard,
            this.userHud,
            this.scoreCounter,
            this.gameSettings,
            this.scoreList
        ]
    }
    //********************SETTERS********************

    set scoreDisplayValue(value){ this.scoreCounter.score = value }

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

        document.querySelector('button#startGame').addEventListener('click', this.restartLevel.bind(this))    
    }    

    displayGame(userPresets){ 
        this.gameSettings.userPresets = userPresets
        this.scoreList.submitScoreAndUpdate(this.currentUser, 0)
        this.showGameElements()        
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

    drawAllElements(){
        const leftElements = [            
            this.gameSettings.element,
            this.userHud.element
        ]
        const middleElements = [
            this.loginPortal.element,
            this.gameBoard.element
        ]
        const rightElements = [
            this.scoreCounter.element,
            this.scoreList.element
        ]

        const appendElement = (divName, element) => {
            document.querySelector(divName).appendChild(element)
        }
        
        leftElements.forEach( element => appendElement(Controller.leftDivId, element) )
        middleElements.forEach( element => appendElement(Controller.middleDivId, element) )
        rightElements.forEach( element => appendElement(Controller.rightDivId, element) )
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
        this.loginPortal.show()
    }

    inputIsValid(input){
        return Controller.validInputs.includes(input)
    }

    isPressed(key){
        return this.allPressedKeys.includes(key)
    }

    pause(){
        clearInterval(this.loop)
        this.gameBoard.showMenu();
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
    
    savePresets(presets){
        this.loginPortal.savePresets(presets)
    }

    showGameElements(){
        this.gameObjects.forEach( obj => obj.show() )
    }

    showScoreCounter(){
        this.scoreCounter.showAsFlex()
    }   

    start(){
        const settings = this.currentSettings
        this.loop = setInterval(this.update.bind(this), (1000 / settings.frameRate))
        this.gameBoard.start(settings)
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