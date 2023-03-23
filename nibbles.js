import {gameBoard, createNibble, isWhereSnakeIs} from './main.js'
// render nibbles on screen ////////////////////////////
///////////////////////////////////////////////////////
export function renderNibbles() {
  let xCoordinate = Math.floor((Math.random() * 49) + 1);
  let yCoordinate = Math.floor((Math.random() * 49) + 1);

  if(isWhereSnakeIs(xCoordinate, yCoordinate)) return renderNibbles();

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