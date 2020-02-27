class Controller{

    constructor(game={}){

       //This is an option to load a saved game that is a json file, otherwise it just creates new
        if(Object.keys(game).length > 0){
            this.game = game
        } else {
            this.game = new Game(this)
        }

        //Everything that you will see on display
        this.allProjectiles = [];
        this.allEnemies = []; 
        this.display = document.querySelector('div.gameScreen');
        this.isPaused = false;
        this.userPoints = 0;
        this.userHUD = new userHUD(this)
        this.userUnit = new UserUnit(225, 700, this.spawnProjectile.bind(this))
        this.pressedKeys = {
            'w': false,
            'a': false,
            's': false,
            'd': false,
            ' ': false
        } 
        this.spawnCooldown = 0; 
        //this.speedIncreaseFactor = 1.5;  //max % enemy speed will increase upon cyclying    

        //Add event listeners
        this.addInputListeners()

        document.querySelector('div.userInputContainer').appendChild(this.userHUD.draw())
        document.querySelector('a#debug').addEventListener('click', this.debugMode.bind(this))
        document.querySelector('button#startGame').addEventListener('click', this.restartLevel.bind(this))
        document.querySelector('button#formSubmit').addEventListener('click', this.submitForm.bind(this))
        document.querySelector('a#logout').addEventListener('click', this.logoutUser.bind(this))
        document.querySelector('a#signUpLink').addEventListener('click', this.toggleLoginAndSignUp.bind(this))

        //Add on the board
        this.draw()
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

    get loginMenu(){
        return document.querySelector('div.login');
    }

    get formSubmitType(){
        return document.querySelector('input#submitType').value
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
        this.display.appendChild(element)
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
        this.display.querySelectorAll('canvas').forEach( x => {
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

    draw(){
        this.clearDisplay()
        this.appendToDisplay(this.userUnit.element)
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
        this.showControlBox();
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

    processFormSubmit(config){
        let controller = this
        const url = `http://localhost:3000/${this.formSubmitType}`
        fetch(url, config)
            .then(response => response.json())
            .then( (object) => {
                if(object.errors){
                    alert(object.errors)
                }
                else{
                    controller.logInUserAndShowGame(object.username)
                }
            })
        .catch( error => alert(error)) 
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

    restartLevel(){
        this.userUnit.isDestroyed = false;
        this.game.resetCurrentSeed();
        this.allEnemies = [];
        this.allProjectiles = [];
        this.draw()              
        this.unpause();        
    }

    showControlBox(){
        this.controlBox.style.display = 'inline-flex'
    }

    showGameDisplay(){
        this.gameDisplay.style.display = 'inline-flex'
    }

    showLogin(){
        this.loginMenu.style.display = 'flex'
        this.formSubmitType = 'login'
        this.formButtonText = 'Login'
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

    submitForm(event){
        event.preventDefault()

        let formData = {
            username: document.querySelector('div.login input#username').value,
            password: document.querySelector('div.login input#password').value
        }

        let config = {
            method: "POST",
            body: JSON.stringify(formData),
            headers:{
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            }
        }

        this.processFormSubmit(config) 
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
        } 
        else {            
            this.userHUD.update()
            this.checkCollision()
            this.removeDestroyedElementsFromDOM()  
            this.deleteDestroyedObjects()   
            this.cycleEnemiesAtBottom()
            this.updateAllObjects();
            this.updateSpawner();     
        }
    }

    updateAllObjects(){
        this.userUnit.update(this.allPressedKeys)
        this.allObjects.forEach( object => { object.update() } )     
    }

    updateSpawner(){
        if(this.spawnCooldown > 0){ 
            this.spawnCooldown-- 
        }
        else if(this.spawnCooldown === 0 && this.game.currentSeed.length > 0){
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
            this.spawnCooldown = this.game.spawnDelay * 60;
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