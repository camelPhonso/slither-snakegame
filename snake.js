import { gameBoard, createSnakeNode } from "./main.js";

// initial snake object ///////////////////////////////
//////////////////////////////////////////////////////
export const snakeArray = [
  {
    x: 25,
    y: 25,
  },
  {
    x: 24,
    y: 25,
  },
  {
    x: 23,
    y: 25,
  },
];

// render the snake on screen ///////////////////////
////////////////////////////////////////////////////
export function renderSnake() {
  let oldSnake = document.querySelectorAll(".snake-node");
  oldSnake.forEach((node) => node.remove());

  snakeArray.forEach((node) => {
    let { x, y } = node;
    let snake = createSnakeNode();
    snake.style.gridColumnStart = x;
    snake.style.gridRowStart = y;
    gameBoard.append(snake);
  });
}

// move the snake around the gameboad /////////////
//////////////////////////////////////////////////
function moveSnakeHead(direction) {
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
}

function moveSnakeBody() {
  for (let i = snakeArray.length - 1; i > 0; i--) {
    let currentNode = snakeArray[i];
    let nextNode = snakeArray[i - 1];

    currentNode.x = nextNode.x;
    currentNode.y = nextNode.y;
  }
}

export function snakeSlithers(direction) {
  moveSnakeHead(direction);
  moveSnakeBody();
  renderSnake();
}

// edit snake object to grow ///////////////////////////
///////////////////////////////////////////////////////
export function snakeGrows(number) {
  let { x: xCoordinate, y: yCoordinate } = snakeArray[2];

  while (number > 0) {
    snakeArray.push({ x: xCoordinate, y: yCoordinate });
    number--;
  }
}
