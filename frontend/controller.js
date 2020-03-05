class Controller{

    constructor(){

        //Game elements on display
        this.allProjectiles = [];
        this.allEnemies = [];
        this.userUnit = new UserUnit(225, 700, this.spawnProjectile.bind(this))
        
        //User HUD elements
        this.scoreList = new ScoreList()
        this.scoreCounter = new ScoreCounter()
        this.userHud = new userHUD()
        this.loginPortal = new AppPortal()        
        
        //Initial Settings
        this.isPaused = false;
        this.userPoints = 0;
        this.spawnCooldown = 0;
        this.spawnDelay = 1;
        //this.speedIncreaseFactor = 1.5;  //max % enemy speed will increase upon cyclying    

        //Add event listeners
        
        this.addInputListeners()

        

    

        //document.querySelector('a#debug').addEventListener('click', this.debugMode.bind(this))
        document.querySelector('button#startGame').addEventListener('click', this.restartLevel.bind(this))
        document.querySelector('a#logout').addEventListener('click', this.logoutUser.bind(this))
        document.querySelector('a#toggleLink').addEventListener('click', this.toggleLoginAndSignUp.bind(this))

        //Add on the board
        this.clearDisplay()
        this.appendToDisplay(this.userUnit.element)

        this.resetKeyInputs()//Set initial key inputs to false to avoid unwanted initial movement
        
    }

    //********************GETTERS********************

    get allObjects(){
        return [...this.allEnemies, ...this.allProjectiles]
    }

    get allPressedKeys(){
        let pressedInputs = []

        Object.keys(this.pressedKeys).forEach( key => {
            if(this.pressedKeys[key] == true){
                pressedInputs.push(key)
            }
        });

        return pressedInputs
    }

    get controlBox(){
        return document.querySelector('div.userInputContainer')
    }

    get gameDisplay(){
        return document.querySelector('div.gameScreen');
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

    get loginMenu(){
        return document.querySelector('div.login');
    }

    get loginPortal(){
        return this.loginPortalObject
    }

    get formSubmitType(){
        return this.loginPortal.submitType
    }

    get scoreCounter(){
        return this.scoreCounterObject
    }

    get scoreList(){
        return this.scoreListObject
    }

    get userHud(){
        return this.userHudObject
    }

    get userIsLoggedIn(){
        return this.currentUser != undefined && this.currentUser != ""
    }

    //********************SETTERS********************

    set formSubmitType(type){
        if(type === 'login' || type === 'signup'){
            document.querySelector('input#submitType').value = type
        }
    }
    set formButtonText(text){
        document.querySelector('button#formSubmit').innerHTML = text
    }

    set loginPortal(lpObject){
        this.loginPortalObject = lpObject
        this.displayMiddle.appendChild(this.loginPortal.element)
    }

    set scoreCounter(scObject){
        this.scoreCounterObject = scObject
        this.displayLeft.appendChild(this.scoreCounter.element)
    }

    set scoreList(slObject){
        this.scoreListObject = slObject
        this.displayRight.appendChild(this.scoreList.element)
    }

    set userHud(uhObject){
        this.userHudObject = uhObject
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

    appendToDisplay(element){
        this.gameDisplay.appendChild(element)
    }

    checkCollision(){
        //Check collisions between enemy units and projectiles, marks both as destroyed if found
        this.allProjectiles.forEach( projectile => {
                
                let hitEnemies = this.allEnemies.filter( 
                    enemy => {
                        return projectile.intersectOnX(enemy)
                    }
                ).filter( 
                    enemyOnIntersect => {
                        return projectile.intersectOnY(enemyOnIntersect)
                    }
                )
                if(hitEnemies.length > 0){
                    projectile.isDestroyed = true;
                    hitEnemies.forEach( enemy => { 
                        enemy.isDestroyed = true
                        this.userPoints += enemy.pointValue
                    })
                }
        })

        //Check enemy collision against the main player, marks both as destroyed if found
        this.allEnemies.filter( enemy => { return this.userUnit.intersectOnY(enemy) } ).forEach( enemy => {
            if (this.userUnit.intersectOnX(enemy)){
                this.userUnit.isDestroyed = true;
            }
        })
    }
    
    clearDisplay(){
        this.gameDisplay.querySelectorAll('canvas').forEach( x => {
            x.parentNode.removeChild(x)
        })
    }

    cycleEnemiesAtBottom(){
        this.allEnemies.filter( x => { return x.atBottom === true } ).forEach( enemy => {
            enemy.y = 0;
            enemy.atBottom = false;
            this.spawnEnemy(enemy.clone())
        });
    }

    debugMode(event){
        event.preventDefault()
        this.hideLogin();
        this.showGameDisplay();
        this.showControlBox();
    }

    deleteDestroyedObjects(){
        this.allEnemies = this.allEnemies.filter( x => { return x.isDestroyed === false } )
        this.allProjectiles = this.allProjectiles.filter( x => { return x.isDestroyed === false } )
    }

    hideAll(){
    }

    hideControlBox(){
        this.controlBox.style.display = 'none'
    }

    hideGameDisplay(){
        this.gameDisplay.style.display = 'none'
    }

    hideLogin(){
        this.loginMenu.style.display = 'none'
    }

    hideMenu(){
        document.querySelector('div.gameMenu').style.display = 'none'
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

    removeDestroyedElementsFromDOM(){
        this.removeDestroyedEnemiesFromDOM();
        this.removeDestroyedProjectilesFromDOM();
    }

    removeDestroyedEnemiesFromDOM(){
        this.allEnemies.filter( enemy => {
            return enemy.isDestroyed
        }).forEach( destroyedEnemy => {
            destroyedEnemy.breaksInto().forEach( newEnemy => {
                this.spawnEnemy(newEnemy)
            })
            destroyedEnemy.destroy()
        })
    }

    removeDestroyedProjectilesFromDOM(){
        this.allProjectiles.forEach( projectile => { 
            if(projectile.isDestroyed === true){ 
                projectile.destroy() 
            } 
        })
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
        this.userUnit.isDestroyed = false;
        this.allEnemies = [];
        this.allProjectiles = [];
        this.userPoints = 0;
        this.draw()              
        this.unpause();        
    }

    showControlBox(){
        //this.controlBox.style.display = 'inline-flex'
    }

    showGameDisplay(){
        this.gameDisplay.style.display = 'inline-flex'
    }

    showLogin(){
        this.loginPortal.show()
    }

    showMenu(){
        document.querySelector('div.gameMenu').style.display = 'flex'
    }

    showSignUp(event){
        this.loginMenu.style.display = 'flex'
        this.formSubmitType = 'signup'
        this.formButtonText = 'Sign Up'
    }
    
    spawnEnemy(enemy){
        this.allEnemies.push(enemy)
        this.appendToDisplay(enemy.element)
    }

    spawnProjectile(x, y){
        let projectile = new Projectile(x, y)
        this.appendToDisplay(projectile.element)
        this.allProjectiles.push(projectile)        
    }

    start(){
        this.hideMenu();
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

    toggleLoginAndSignUp(event){
        event.preventDefault();
        if(this.formSubmitType == 'login'){
            this.showSignUp()
            this.formSubmitType = 'signup'            
        } else {
            this.showLogin()
            this.formSubmitType = 'login'   
        }
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

        if(this.userUnit.isDestroyed){
            this.clearDisplay()
            this.pause()
            this.submitScore()
        } 
        else {            
            this.userHud.update(this.allPressedKeys)
            this.checkCollision()
            this.removeDestroyedElementsFromDOM()  
            this.deleteDestroyedObjects()   
            this.cycleEnemiesAtBottom()
            this.updateAllObjects();
            this.updateScoreCounter();
            this.updateSpawner();     
        }
    }

    updateAllObjects(){
        this.userUnit.update(this.allPressedKeys)
        this.allObjects.forEach( object => { object.update() } )     
    }

    updateScoreList(){

    }

    updateScoreCounter(){
        this.scoreCounter.score = this.userPoints
    }

    updateSpawner(){
        if(this.spawnCooldown > 0){ 
            this.spawnCooldown-- 
        }
        else if(this.spawnCooldown === 0){
            let enemy;
            switch(Math.ceil(Math.random() * 3)){
                case 3:
                    enemy = new LargeEnemy();
                    break;
                case 2:
                    enemy = new MediumEnemy();
                    break;
                case 1:
                    enemy = new SmallEnemy();
                    break;                     
            }
            this.spawnEnemy(enemy)
            this.spawnCooldown = this.spawnDelay * 60;
        }        
    }

    //********************STATIC FUNCTIONS********************

    static get randomXCoordinate(){
        Math.floor(Math.random() * 475)
    }

    static get validInputs(){
        return ['w','a','s','d',' ', 'p']
    }

}