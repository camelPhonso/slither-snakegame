// import //////////////////////////////////////////////////
///////////////////////////////////////////////////////////
import { snakeArray, snakeSlithers, snakeGrows } from "./snake.js";
import { renderNibbles, eatNibbles } from "./nibbles.js";

// export ////////////////////////////////////////////////
/////////////////////////////////////////////////////////
export const gameBoard = document.getElementById("game-board");

// global variables ////////////////////////////////////
///////////////////////////////////////////////////////
let isRunning = true;
let trekDirection = "right";
let currentScore = 0;
let gameSpeed = 130;
let storedScore = JSON.parse(localStorage.getItem("slitherHighScore")) || 0;
let snakeGrowthRate = Math.floor((currentScore / 100) * currentScore + 1);

// templates ////////////////////////////////////////
////////////////////////////////////////////////////
function printTemplate(input) {
  let template = document.createElement("template");
  template.innerHTML = input.trim();
  return template.content.firstElementChild;
}

export function createSnakeNode() {
  return printTemplate(`
  <div class="snake-node"></div>
  `);
}

export function createNibble() {
  return printTemplate(`
  <div class="nibble"></div>
  `);
}

// interactions ////////////////////////////////////////
///////////////////////////////////////////////////////
function isTouchingSnakeHead(element) {
  let elementY = element.style.gridColumnStart;
  let elementX = element.style.gridRowStart;

  let snakeHead = document.querySelector(".snake-node");
  let snakeY = snakeHead.style.gridColumnStart;
  let snakeX = snakeHead.style.gridRowStart;

  if (elementY === snakeY && elementX === snakeX) return true;
  return false;
}

export function isTouchingSnakeBody(givenX, givenY) {
  // considers the entire snake, INCLUDING the head
  return snakeArray.some((node) => node.x === givenX && node.y === givenY);
}

function snakeFeeds() {
  let nibble = document.querySelector(".nibble");
  if (isTouchingSnakeHead(nibble)) {
    eatNibbles();
    updateScores();
    snakeGrows(snakeGrowthRate);
  }
}

// check if game over ///////////////////////////////////
////////////////////////////////////////////////////////
function snakeTouchesItself() {
  let snakeBody = document.querySelectorAll(".snake-node");
  for (let i = 2; i < snakeBody.length; i++) {
    if (isTouchingSnakeHead(snakeBody[i])) return true;
  }
  return false;
}

function snakeTouchesTheWalls() {
  let { x, y } = snakeArray[0];
  if (x > 50 || x < 1 || y > 50 || y < 1) return true;
  return false;
}

function snakeDies() {
  if (snakeTouchesTheWalls()) isRunning = false;
  if (snakeTouchesItself()) isRunning = false;
}

// event listeners ////////////////////////////////////
//////////////////////////////////////////////////////
function turnSnake(direction) {
  switch (direction) {
    case "ArrowDown":
      if (trekDirection !== "up") trekDirection = "down";
      break;
    case "ArrowUp":
      if (trekDirection !== "down") trekDirection = "up";
      break;
    case "ArrowRight":
      if (trekDirection !== "left") trekDirection = "right";
      break;
    case "ArrowLeft":
      if (trekDirection !== "right") trekDirection = "left";
      break;
  }
}

let startButton = document.getElementById("start-button");
startButton.addEventListener("click", () => {
  startGame();
});

document.addEventListener("keydown", (e) => {
  e.key === 'Enter' ? startButton.click() : turnSnake(e.key);
});

// game play //////////////////////////////////
////////////////////////////////////////////////////
function deathScreen() {
  gameBoard.style.backgroundColor = "#f83800";
  isRunning = true;
  setTimeout(() => {
    location.reload();
  }, 500);
}

function calculateGameSpeed() {
  if (gameSpeed === 50) return;
  if (currentScore % 5 === 0) gameSpeed -= 5;
}

function newFrame() {
  if (!isRunning) return deathScreen();
  snakeSlithers(trekDirection);
  snakeFeeds();
  snakeDies();
  
  setTimeout(() => {
    newFrame();
  }, gameSpeed);
}

// track scores //////////////////////////////////////
/////////////////////////////////////////////////////
function setHighScore(score) {
  localStorage.setItem("slitherHighScore", JSON.stringify(score));
}

function displayScores() {
  let playerScore = document.getElementById("current-score");
  playerScore.textContent = `Your Score: ${currentScore}`;
  
  let highScore = document.getElementById("high-score");
  highScore.textContent = `High Score: ${storedScore}`;
}

function updateScores() {
  currentScore++;
  if (storedScore < currentScore) setHighScore(currentScore);
  calculateGameSpeed();
  displayScores();
}

// initialise page /////////////////////
///////////////////////////////////////
function disableButtonAndCursor(){
  startButton.style.display = "none";
  startButton.disabled = true;
  gameBoard.style.cursor = "none";
}

function startGame() {
  disableButtonAndCursor();
  displayScores();
  renderNibbles();
  newFrame();
}
