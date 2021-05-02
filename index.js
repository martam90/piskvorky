'use strict';

let isPlaying = 'circle';
const grid = document.querySelector('.grid');
const playerCircle = document.querySelector('.circle--large');
const playerCross = document.querySelector('.cross--large');

for (let i = 0; i < 100; i++) {
  let btn = document.createElement('button');
  btn.className = 'btn';
  btn.addEventListener('click', () => {
    const currentPlayer = isPlaying;
    if (isPlaying === 'circle') {
      btn.classList.add('board__field--circle');
      btn.disabled = true;
      playerCircle.classList.remove('active');
      playerCross.classList.add('active');
      isPlaying = 'cross'; 
    } else if (isPlaying === 'cross') {
      btn.classList.add('board__field--cross');
      btn.disabled = true;
      playerCircle.classList.add('active');
      playerCross.classList.remove('active');
      isPlaying = 'circle'; 
    }
    if (isWinningMove(btn)) {
      setTimeout(() => {
        if (confirm(`${currentPlayer} has won. Start new game?`)) {
          location.reload();
        } else {
          disableButtons();
        }
      }, 200);
    }
  });
  grid.appendChild(btn);
}

const disableButtons = () => {
  for (let i = 0; i < grid.children.length; i++) {
    grid.children[i].disabled = true;
  }
}

const getSymbol = (field) => {
  if (field.classList.contains('board__field--cross')) {
    return 'cross';
  } else if (field.classList.contains('board__field--circle')) {
    return 'circle';
  } else {
    return undefined;
  }
};

// 10 je sirka hraci plochy
const boardSize = 10;
const getField = (row, column) => {
  return grid.children[row * boardSize + column];
};

const getPosition = (field) => {
  for (let i = 0; i < grid.children.length; i++) {
    if (grid.children[i] === field) {
      const row = Math.floor(i / boardSize);
      const column = i % boardSize;
      return {row, column};
    }
  }
};

const countSymbols = (symbol, position, direction) => {
  let counter = 0;
  let row = position.row;
  let column = position.column;
  let field = getField(row, column);
  let currentSymbol = getSymbol(field);
  
  while (currentSymbol === symbol) {
    counter++;
    row += direction.row;
    column += direction.column;
    if (row < 0 || row >= boardSize || column < 0 || column >= boardSize) {
      break;
    }
    field = getField(row, column);
    currentSymbol = getSymbol(field);
  }

  return counter;
};

const winningSymbols = 5;
const isWinningMove = (field) => {
  const currentPosition = getPosition(field);
  const playerSymbol = getSymbol(field);
  const rowSymbols = countSymbols(playerSymbol, currentPosition, {row: 0, column: 1})
    + countSymbols(playerSymbol, currentPosition, {row: 0, column: -1}) - 1;
  const columnSymbols = countSymbols(playerSymbol, currentPosition, {row: 1, column: 0})
    + countSymbols(playerSymbol, currentPosition, {row: -1, column: 0}) - 1;
  const diagonalSymbols1 = countSymbols(playerSymbol, currentPosition, {row: -1, column: 1})
    + countSymbols(playerSymbol, currentPosition, {row: 1, column: -1}) - 1;

  const diagonalSymbols2 = countSymbols(playerSymbol, currentPosition, {row: -1, column: -1})
    + countSymbols(playerSymbol, currentPosition, {row: 1, column: 1}) - 1;
  
  return rowSymbols >= winningSymbols
    || columnSymbols >= winningSymbols 
    || diagonalSymbols1 >= winningSymbols 
    || diagonalSymbols2 >= winningSymbols;
}
