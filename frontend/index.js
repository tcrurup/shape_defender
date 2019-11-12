document.addEventListener("DOMContentLoaded", function(){
    addButtonListeners();
});

function createController(){
    let controller = new Controller
    controller.start()
}

function addButtonListeners(){
    document.querySelector('button#startGame').addEventListener('click', createController)
}




