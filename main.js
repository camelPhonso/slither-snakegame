const isRunning = true;
const gameBoard = document.getElementById("game-board");
const snakeArray = [
  {
    x: 25,
    y: 25,
  },
  {
    x: 24,
    y: 25,
  },
  {
    x:23,
    y:25,
  }
];
let trekDirection = "right";

// templates ////////////////////////////////////////
////////////////////////////////////////////////////
function printTemplate(input) {
  let template = document.createElement("template");
  template.innerHTML = input.trim();
  return template.content.firstElementChild;
}

function createSnakeNode() {
  return printTemplate(`
  <div class="snake-node"></div>
  `);
}

function createNibble() {
  return printTemplate(`
  <div class="nibble"></div>
  `);
}

// render the snake on screen ///////////////////////
////////////////////////////////////////////////////
function renderSnake() {
  let oldSnake = document.querySelectorAll('.snake-node');
  oldSnake.forEach(node => node.remove());

  snakeArray.forEach((node) => {
    let { x, y } = node;
    let snake = createSnakeNode();
    snake.style.gridColumnStart = x;
    snake.style.gridRowStart = y;
    gameBoard.append(snake);
  });
}

function slitherOnScreen(direction) {
  let snakeHead = snakeArray[0];
  switch (direction) {
    case "right":
      snakeHead.x = snakeHead.x + 1;
      snakeHead.y = snakeHead.y;
      break;
    case "down":
      snakeHead.x = snakeHead.x;
      snakeHead.y = snakeHead.y + 1;
      break;
    case "left":
      snakeHead.x = snakeHead.x - 1;
      snakeHead.y = snakeHead.y;
      break;
    case "up":
      snakeHead.x = snakeHead.x;
      snakeHead.y = snakeHead.y - 1;
  }
  
  for (let i = snakeArray.length - 1; i > 0; i--) {
    let currentNode = snakeArray[i];
    let nextNode = snakeArray[i-1];
    
    currentNode.x = nextNode.x;
    currentNode.y = nextNode.y;
  }
  
  renderSnake();
}

// render nibbles on screen ////////////////////////////
///////////////////////////////////////////////////////
function renderNibbles() {
  let nibble = createNibble();
  gameBoard.append(nibble);
  nibble.style.gridColumnStart = Math.floor(Math.random() * 50);
  nibble.style.gridRowStart = Math.floor(Math.random() * 50);
}

function eatNibbles(){
  let oldNibble = document.querySelector('.nibble');
  oldNibble.remove();
  
  renderNibbles();
}

function wasEaten(){
  let nibble = document.querySelector('.nibble');
  let nibbleY = nibble.style.gridColumnStart;
  let nibbleX = nibble.style.gridRowStart;

  let snakeHead = document.querySelector('.snake-node');
  let snakeY = snakeHead.style.gridColumnStart;
  let snakeX = snakeHead.style.gridRowStart

  if (nibbleY === snakeY && nibbleX === snakeX) return true;
  return false;
}

// event listeners ////////////////////////////////////
//////////////////////////////////////////////////////
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown" && trekDirection !== "up")
    return (trekDirection = "down");
  if (e.key === "ArrowUp" && trekDirection !== "down")
    return (trekDirection = "up");
  if (e.key === "ArrowRight" && trekDirection !== "left")
    return (trekDirection = "right");
  if (e.key === "ArrowLeft" && trekDirection !== "right")
    return (trekDirection = "left");
});

// start game play //////////////////////////////////
////////////////////////////////////////////////////
function newFrame() {
  if (!isRunning) return;
  setTimeout(() => {
    console.log("running");
    slitherOnScreen(trekDirection);
    if(wasEaten()) eatNibbles();
    newFrame();
  }, 125);
}

renderNibbles();
// newFrame()