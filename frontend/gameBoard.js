class GameBoard extends GameWindow{

    constructor(){
        super()

        this.allProjectiles = [];
        this.allEnemies = [];
        this.userUnit = new UserUnit(225, 700, this.spawnProjectile.bind(this))
        this.element = this.createElement()

        this.spawnCooldown = 0;
        this.spawnDelay = 1;
    }

    get allObjects(){
        return [...this.allEnemies, ...this.allProjectiles]
    }

    appendToDisplay(elem){
        this.element.appendChild(elem)
    }

    endGame(){
        this.clearDisplay()
        this.showMenu()
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
        this.element.querySelectorAll('canvas').forEach( x => {
            x.parentNode.removeChild(x)
        })
    }

    createElement(){

        let mainElem = document.createElement('div')
        mainElem.className = 'gameScreen'

        let subElem = document.createElement('div')
        subElem.className = 'gameMenu'

        let button = document.createElement('button')
        button.id = 'startGame'
        button.innerHTML = 'START'

        subElem.appendChild(button)        
        mainElem.appendChild(subElem)
        return mainElem
    }

    cycleEnemiesAtBottom(){
        this.allEnemies.filter( x => { return x.atBottom === true } ).forEach( enemy => {
            enemy.y = 0;
            enemy.atBottom = false;
            this.spawnEnemy(enemy.clone())
        });
    }

    deleteDestroyedObjects(){
        this.allEnemies = this.allEnemies.filter( x => { return x.isDestroyed === false } )
        this.allProjectiles = this.allProjectiles.filter( x => { return x.isDestroyed === false } )
    }

    hideMenu(){
        document.querySelector('div.gameMenu').style.display = 'none'
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
        this.clearDisplay()
        this.appendToDisplay(this.userUnit.element)
        this.userUnit.isDestroyed = false;
        this.allEnemies = [];
        this.allProjectiles = [];
    }

    showMenu(){
        document.querySelector('div.gameMenu').style.display = 'flex'
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
    }

    update(pressedKeys){
        this.checkCollision()
        this.removeDestroyedElementsFromDOM()
        this.deleteDestroyedObjects()
        this.cycleEnemiesAtBottom()
        this.updateAllObjects(pressedKeys); 
        this.updateSpawner();
    }

    updateAllObjects(pressedKeys){
        this.userUnit.update(pressedKeys)
        this.allObjects.forEach( object => { object.update() } )     
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

    userIsDestroyed(){
        return this.userUnit.isDestroyed
    }
}