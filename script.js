const board = document.querySelector('.board');
let currentPlayer = 'X';
const cells = Array(9).fill(null);

const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

function checkWinner() {
  for (let [a, b, c] of winningCombos) {
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }
  return null;
}

function handleClick(index) {
  if (cells[index] || checkWinner()) return;

  cells[index] = currentPlayer;
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  render();

  const winner = checkWinner();
  if (winner) {
    setTimeout(() => alert(`${winner} wins!`), 100);
    setTimeout(resetGame, 200);
  } else if (!cells.includes(null)) {
    setTimeout(() => alert("It's a tie!"), 100);
    setTimeout(resetGame, 200);
  }
}

function render() {
  board.innerHTML = '';
  cells.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.textContent = cell || '';
    cellElement.addEventListener('click', () => handleClick(index));
    board.appendChild(cellElement);
  });
}

function resetGame() {
  cells.fill(null);
  currentPlayer = 'X';
  render();
}

render();
