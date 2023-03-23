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
let gameSpeed = 125;
let storedScore = JSON.parse(localStorage.getItem('slitherHighScore')) || 0;

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
  // check if an element is touchin
  let elementY = element.style.gridColumnStart;
  let elementX = element.style.gridRowStart;
  
  let snakeHead = document.querySelector(".snake-node");
  let snakeY = snakeHead.style.gridColumnStart;
  let snakeX = snakeHead.style.gridRowStart;
  
  if (elementY === snakeY && elementX === snakeX) return true;
  return false;
}

export function isWhereSnakeIs(xCoordinate, yCoordinate) {
  return snakeArray.some((node) => {
    let { x: snakeX, y: snakeY } = node;
    snakeX == xCoordinate && snakeY === yCoordinate;
  });
} 

function snakeFeeds() {
  let nibble = document.querySelector(".nibble");
  if (isTouchingSnakeHead(nibble)) {
    eatNibbles();
    updateScores();
    snakeGrows();
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

// game play //////////////////////////////////
////////////////////////////////////////////////////
function deathLoop() {
  gameBoard.style.backgroundColor = "red";
  isRunning = true;
  setTimeout(() => {
    location.reload();
  }, 500);
}

function calculateGameSpeed() {
  if (currentScore % 2 === 0) {
    gameSpeed = gameSpeed + 0.85;
    console.log(gameSpeed);
  }
}

function newFrame() {
  if (!isRunning) return deathLoop();
  snakeSlithers(trekDirection);
  snakeFeeds();
  snakeDies();
  setTimeout(() => {
    newFrame();
  }, gameSpeed);
}

// track scores //////////////////////////////////////
/////////////////////////////////////////////////////
function setHighScore(score){
  localStorage.setItem('slitherHighScore', JSON.stringify(score));
}

function displayScores() {
  let playerScore = document.getElementById("current-score");
  playerScore.textContent = `Your Score: ${currentScore}`;

  let highScore = document.getElementById('high-score');
  highScore.textContent = `High Score: ${storedScore}`;
}

function updateScores() {
  currentScore++;
  if(storedScore <= currentScore) setHighScore(currentScore);
  calculateGameSpeed();
  displayScores();
}

// initialise page /////////////////////
///////////////////////////////////////
displayScores();
renderNibbles();
// newFrame();