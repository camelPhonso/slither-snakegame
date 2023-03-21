// templates ////////////////////////////////////////
////////////////////////////////////////////////////
function printTemplate(input){
    let template = document.createElement('template');
    template.innerHTML = input.trim();
    return template.content.firstElementChild;
}

function createSnakeNode(){
    let gameBoard = document.getElementById('game-board');
    let snakeNode = printTemplate(`
        <div class="snake-node"></div>
    `);
    gameBoard.append(snakeNode);
}