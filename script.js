
let userScore = 0;
let computerScore = 0;
let round = 0;
let gameOver = false;
const MAXROUNDS = 5;
const MOVES = ['rock', 'paper', 'scissors'];

const rockButton = document.getElementById('rock');
const paperButton = document.getElementById('paper');
const scissorsButton = document.getElementById('scissors');

const gameLogUI = document.getElementById('game-log');
const roundNumberUI = document.getElementById('round-number');
const userScoreUI = document.getElementById('user-score');
const computerScoreUI = document.getElementById('computer-score');
const toggleButtons = document.getElementsByClassName('toggle');
const resetButton = document.getElementById('reset');

rockButton.addEventListener('click', () => playRound('rock'));
paperButton.addEventListener('click', () => playRound('paper'));
scissorsButton.addEventListener('click', () => playRound('scissors'));
resetButton.addEventListener('click', () => resetGame());

function resetGame() {
    userScore = 0;
    computerScore = 0;
    round = 0;
    gameOver = false;
    gameLogUI.textContent = '';
    Array.from(toggleButtons).forEach(element => element.toggleAttribute('disabled'));
    userScoreUI.textContent = `User: ${userScore}`;
    computerScoreUI.textContent = `Computer: ${computerScore}`;
    roundNumberUI.textContent = `Round 1`;
}

function playRound(userMove) {
    const computerMove = getComputerMove();
    const roundResults = calcRoundWinner(userMove, computerMove);
    updateGameState(roundResults);
    checkForWinner();

    function getComputerMove() {
        return MOVES[Math.floor(Math.random() * 3)];
    }

    function timestamp() {
        return new Date().toLocaleTimeString();
    }

    function calcRoundWinner(userMove, computerMove) {
        const userMoveIndex = MOVES.indexOf(userMove);
        const computerMoveIndex = MOVES.indexOf(computerMove);

        if (userMoveIndex === computerMoveIndex) {
            return {roundEndedInTie: true, userWonRound: null, userMove: userMove, computerMove: computerMove};
        }

        // 1 = user won, 2 = computer won
        const result = (3 + userMoveIndex - computerMoveIndex) % 3;

        if (result === 1) {
            return {roundEndedInTie: false, userWonRound: true, userMove: userMove, computerMove: computerMove};
        } else {
            return {roundEndedInTie: false, userWonRound: false, userMove: userMove, computerMove: computerMove};
        }
    }

    function updateGameState(roundResults) {
        const userMove = roundResults.userMove;
        const computerMove = roundResults.computerMove;

        if (roundResults.roundEndedInTie) {
            updateGameLogUI(`${timestamp()} — tie! repeat...`);
        } else if (roundResults.userWonRound) {
            userScore++;
            updateGameLogUI(`${timestamp()} — user plays ${userMove}, computer plays ${computerMove}. 👨‍💻 user wins round!`);
            updateGameStateUI();
        } else {
            computerScore++;
            updateGameLogUI(`${timestamp()} — user plays ${userMove}, computer plays ${computerMove}. 🖥 computer wins round :(`);
            updateGameStateUI();
        }
    }

    function updateGameLogUI(message) {
        const p = document.createElement('p');
        p.textContent = message;
        gameLogUI.appendChild(p);
    }

    function updateGameStateUI(gameOver = false) {
        if (gameOver) {
            roundNumberUI.textContent += ' — End of Game!'
            Array.from(toggleButtons).forEach(element => element.toggleAttribute('disabled'));
            return;
        }
        if (!gameOver) {
            round++;
        }
        userScoreUI.textContent = `User: ${userScore}`;
        computerScoreUI.textContent = `Computer: ${computerScore}`;
        roundNumberUI.textContent = `End of Round ${round}`;
    }

    function checkForWinner() {
        if (userScore === computerScore) {
            return;
        }
        if (round === MAXROUNDS) {
            if (userScore > computerScore) {
                endGame('user');
            } else {
                endGame('computer');
            }
        }
    }

    function endGame(winner) {
        gameOver = true;
        if (winner === 'user') {
            updateGameLogUI(`${timestamp()} — 🥳 you win! ${winner} wins game!!!`);
        } else {
            updateGameLogUI(`${timestamp()} — 😭 you lose! ${winner} wins game :( :(`);
        }
        updateGameStateUI(gameOver);
    }
}



// console.log(`Hi! Want to play Rock Paper Scissors via console?? WELL NOW YOU CAN! Simply type rps() and press enter, and let the games begin...`)
function rps() {
    let usersMove;
    let computersMove;
    let usersScore = 0;
    let computersScore = 0;
    let round = 1;

    // GAME LOOP
    printWelcomeMessage();
    while (round <= 3 && noGameWinner()) {
        getUsersMove();
        if (!checkValidMove()) {
            return "🔹 🔹 🔹 Invalid move - Quitting game.";
        }
        getComputersMove();
        calcRoundWinner();
    }
    printGameWinner();

    // GAME LOGIC
    function getUsersMove() {
        usersMove = prompt("🔹🔹🔹 Rock, paper, or scissors?");
    }

    function checkValidMove() {
        if (usersMove === null) {
            return false;
        }
        usersMove = usersMove.toLowerCase();
        if (usersMove === "rock") {
            return true;
        } else if (usersMove === "paper") {
            return true;
        } else if (usersMove === "scissors") {
            return true;
        } else if (usersMove === "scissor") {
            usersMove = "scissors";
            return true;
        } else {
            return false;
        }
    }

    // 0 = rock, 1 = paper, 2 = scissors
    function getComputersMove() {
        computersMove = Math.floor(Math.random() * 3);
    }

    function calcRoundWinner() {
        // if computer plays rock
        if (computersMove === 0) {
            if (usersMove === "scissors") {
                updateGameState("computer", "Rock", "scissors");
                return;
            } else if (usersMove === "paper") {
                updateGameState("user", "Paper", "rock");
                return;
            } else {
                console.log(`🔹 🔹 🔹 It's a tie! Repeat round ${round}...`);
            }
        }
        // if computer plays paper
        if (computersMove === 1) {
            if (usersMove === "rock") {
                updateGameState("computer", "Paper", "rock");
                return;
            } else if (usersMove === "scissors") {
                updateGameState("user", "Scissors", "paper");
                return;
            } else {
                console.log(`🔹 🔹 🔹 It's a tie! Repeat round ${round}...`);
            }
        }
        // if computer plays scissors
        if (computersMove === 2) {
            if (usersMove === "paper") {
                updateGameState("computer", "Scissors", "paper");
                return;
            } else if (usersMove === "rock") {
                updateGameState("user", "Rock", "paper");
                return;
            } else {
                console.log(`🔹 🔹 🔹 It's a tie! Repeat round ${round}...`);
            }
        }
    }

    function updateGameState(roundWinner, winningMove, losingMove) {
        if (roundWinner === "computer") {
            computersScore++;
            console.log(`🖥 Computer wins! ${winningMove} beats ${losingMove}.`);
        } else {
            usersScore++;
            console.log(`👨‍💻 User wins! ${winningMove} beats ${losingMove}.`);
        }
        printScores();
        round++;
    }

    function noGameWinner() {
        if (usersScore === 2 || computersScore === 2) {
            return false;
        }
        return true;
    }

    function printScores() {
        console.log(
            `🔹 🔹 🔹 End of round ${round}. User: ${usersScore}. Computer: ${computersScore}.`
        );
    }

    function printWelcomeMessage() {
        console.log(
            `✊ 👋 ✌️ Let's play Rock, Paper, Scissors. Best of 3 - GO!`
        );
    }

    function printGameWinner() {
        if (computersScore > usersScore) {
            console.log(`😭 You lose! Computer is our winner!`);
        } else {
            console.log(`🥳 You win! User is our winner!!`);
        }
    }
}
