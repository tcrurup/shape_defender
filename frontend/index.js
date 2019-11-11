const GAME_DISPLAY = 

document.addEventListener("DOMContentLoaded", function(){
    console.log("DOM Loaded")
    addButtonListeners();
});


function addButtonListeners(){
    console.log("Adding button listeners")
    document.querySelector('button#startGame').addEventListener('click', startGame)
}

function startGame(event){
    let controller = new Controller
    controller.start()
    this.style.display = 'none';
}

function spawnTestEnemy(){
    console.log('spawning enemy')
}



