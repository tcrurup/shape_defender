const GAME_DISPLAY = document.querySelector('div.gameScreen');

document.addEventListener("DOMContentLoaded", function(){
    console.log("DOM Loaded")
    addButtonListeners();
});

function allPressedKeys(){
    
}

function addButtonListeners(){
    console.log("Adding button listeners")
    document.querySelector('button#startGame').addEventListener('click', startGame)
    document.querySelector('button#spawnTestEnemy').addEventListener('click', spawnTestEnemy)
}

function startGame(event){
    let controller = new Controller
    controller.start()
}

function spawnTestEnemy(){
    console.log('spawning enemy')
}



