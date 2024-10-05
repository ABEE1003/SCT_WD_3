const cells = document.querySelectorAll('.cell');
const statusDisplay = document.querySelector('.status');
const restartButton = document.querySelector('.restart-btn');

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellPlayed = (clickedCell, clickedCellIndex) => {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
};

const handlePlayerChange = () => {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = `Player ${currentPlayer}'s turn`;
};

const checkForWinner = () => {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = `Player ${currentPlayer} has won!`;
        isGameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        statusDisplay.innerHTML = `It's a draw!`;
        isGameActive = false;
        return;
    }

    handlePlayerChange();
};

const handleCellClick = (event) => {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== "" || !isGameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    checkForWinner();
};

const handleRestartGame = () => {
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = `Player X's turn`;
    isGameActive = true;

    cells.forEach(cell => cell.innerHTML = "");
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', handleRestartGame);
