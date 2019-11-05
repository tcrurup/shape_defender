

document.addEventListener("DOMContentLoaded", function(){
    console.log("DOM Loaded")
    addButtonListeners();
});

function addButtonListeners(){
    console.log("Adding button listeners")
    document.querySelector('button#startGame').addEventListener('click', startGame)
}

function startGame(event){
    event.preventDefault();
    new Game
}

