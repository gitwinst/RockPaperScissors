
function rockPaperScissors() {
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
            return 'Invalid move - Quitting game.';
        }
        getComputersMove();
        calcRoundWinner();
    }
    printGameWinner();

    // GAME LOGIC
    function getUsersMove() {
        usersMove = prompt('Rock, paper, or scissors?');
        usersMove = usersMove.toLowerCase();
    }

    function checkValidMove() {
        if (usersMove === 'rock') {
            return true;
        } else if (usersMove === 'paper') {
            return true;
        } else if (usersMove === 'scissors') {
            return true;
        } else if (usersMove === 'scissor') {
            usersMove = 'scissors';
            return true;
        } else {
            return false;
        }
    }

    // 0 = rock, 1 = paper, 2 = scissors
    function getComputersMove() {
        computersMove = Math.floor(Math.random()*3);
    }

    function calcRoundWinner() {
        // if computer plays rock
        if (computersMove === 0) {
            if (usersMove === 'scissors') {
                updateGameState('computer', 'Rock', 'scissors');
                return;
            } else if (usersMove === 'paper') {
                updateGameState('user', 'Paper', 'rock');
                return;
            } else {
                console.log(`It's a tie! Repeat round ${round}.`);
            }
        }
        // if computer plays paper
        if (computersMove === 1) {
            if (usersMove === 'rock') {
                updateGameState('computer', 'Paper', 'rock');
                return;
            } else if (usersMove === 'scissors') {
                updateGameState('user', 'Scissors', 'paper');
                return;
            } else {
                console.log(`It's a tie! Repeat round ${round}.`);
            }
        }
        // if computer plays scissors
        if (computersMove === 2) {
            if (usersMove === 'paper') {
                updateGameState('computer', 'Scissors', 'paper');
                return;
            } else if (usersMove === 'rock') {
                updateGameState('user', 'Rock', 'paper');
                return;
            } else {
                console.log(`It's a tie! Repeat round ${round}.`);
            }
        }
    }

    function updateGameState(roundWinner, winningMove, losingMove) {
        if (roundWinner === 'computer') {
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
        console.log(`End of round ${round}. User: ${usersScore}. Computer: ${computersScore}.`);
    }

    function printWelcomeMessage() {
        console.log(`✊ 👋 ✌️ Let's play Rock, Paper, Scissors. Best of 3 - GO!`);
    }

    function printGameWinner() {
        if (computersScore > usersScore) {
            console.log(`😭 You lose! Computer is our winner!`);
        } else {
            console.log(`🥳 You win! User is our winner!!`);
        }
    }
}