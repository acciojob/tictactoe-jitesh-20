document.getElementById("submit").addEventListener("click", function() {
    let player1 = document.getElementById("player-1").value.trim();
    let player2 = document.getElementById("player-2").value.trim();

    if (player1 === "" || player2 === "") {
        alert("Both players must enter their names!");
        return;
    }

    // Store player names
    window.player1 = player1;
    window.player2 = player2;

    // Hide input form and show game board
    document.getElementById("player-form").style.display = "none";
    document.getElementById("game-board").style.display = "block";

    // Initialize game state
    startGame();
});

function startGame() {
    let currentPlayer = player1;
    let currentSymbol = "X";
    let boardState = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    // Display first player's turn
    document.querySelector(".message").textContent = `${currentPlayer}, you're up!`;

    // Add event listeners to cells
    document.querySelectorAll(".cell").forEach((cell, index) => {
        cell.textContent = ""; // Clear previous game
        cell.addEventListener("click", function handleClick() {
            if (boardState[index] === "" && gameActive) {
                // Update cell and board state
                cell.textContent = currentSymbol;
                boardState[index] = currentSymbol;

                // Check for win or draw
                if (checkWin(boardState, currentSymbol)) {
                    document.querySelector(".message").textContent = `${currentPlayer} congratulations, you won! 🎉`;
                    gameActive = false;
                    document.getElementById("reset").style.display = "block";
                    return;
                }

                if (boardState.every(cell => cell !== "")) {
                    document.querySelector(".message").textContent = "It's a draw!";
                    document.getElementById("reset").style.display = "block";
                    return;
                }

                // Switch turn
                currentPlayer = currentPlayer === player1 ? player2 : player1;
                currentSymbol = currentSymbol === "X" ? "O" : "X";
                document.querySelector(".message").textContent = `${currentPlayer}, you're up!`;
            }
        });
    });

    // Restart game button
    document.getElementById("reset").addEventListener("click", function() {
        startGame(); // Restart the game logic
        document.getElementById("reset").style.display = "none";
    });
}

// Function to check for a win
function checkWin(board, symbol) {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    return winningCombos.some(combination => 
        combination.every(index => board[index] === symbol)
    );
}
