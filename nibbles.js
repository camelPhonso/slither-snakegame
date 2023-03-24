import { gameBoard, createNibble, isTouchingSnakeBody } from "./main.js";

// render nibbles on screen ////////////////////////////
///////////////////////////////////////////////////////
let randomOneToFifty = () => Math.floor(Math.random() * 49 + 1);

export function renderNibbles() {
  let xCoordinate = randomOneToFifty();
  let yCoordinate = randomOneToFifty();
  if (isTouchingSnakeBody(xCoordinate, yCoordinate)) return renderNibbles();

  let nibble = createNibble();
  gameBoard.append(nibble);

  nibble.style.gridColumnStart = xCoordinate;
  nibble.style.gridRowStart = yCoordinate;
}

export function eatNibbles() {
  let oldNibble = document.querySelector(".nibble");
  oldNibble.remove();

  renderNibbles();
}
