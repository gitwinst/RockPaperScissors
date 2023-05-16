
// rock paper scissors game

// 2 players, user vs computer

// 3 possible moves each player can use per turn: rock, paper, or scissors

// it's best out of 3, so there has to be some score keeping system

// rock beats scissors; scissors beats paper; paper beats rock; same answers are ties

// score keeping, testing if game should continue or if it's been won
// random machine that gives computer it's guess, input machine that takes user guess

// 1. rewrite the problem
// Create a Rock Paper Scissors game. The user will submit their move, after which it will be compared to the computer's move. the winner of the round is decided by traditional rock paper scissors rules. if it's a tie, they redo the round. then repeat until best of 3.
// No UI (console program for now). Inputs? A user's guess, which we test to see if its rock paper scissors. Anything else we say error. Outputs? We need to ask the user for their guess. The winner of the round is printed to the console. The winner of the game is printed to the console.

// 2. plan your solution (w/ pseudocode afterward too)
// user runs game. game calls get user move. game checks if move is valid. if not, quit game.
// the user submits a choice: either rock paper or scissors. anything else is rejected
// that guess is tested against the computer's choice
// whoever wins the round has a point added to their score
// if the round ends in a tie, no point is added
// start next round (see first instruction)
// if round === 3, compare scores and announce the winner
// 
// 

// 3. 
// break the problem into subproblems and solve one by one

// todo: push to github
// todo: write post-mortem (don't let perfect be the enemy of good!)
// task, avoiding assignment notes (always best AND more fun to see if you can figure it out yourself without extra help–use the notes as hints if you get stuck), thinking and writing before coding (thinking about the game a bit, writing a few throwaway notes, then rewriting the problem in my own words, thinking through UI, necessary inputs, necessary outputs, what needs to happen to go from a to b, then planning my solution by writing high-level pseudocode instructions step by step for what happens at each step of the game.), starting with logic of how to test winner, building out components individually and testing them, turning everything into a function so the game loop is clean, trying to make functions do only one thing (i.e. splitting out lots of the repetitive logic from calcRoundWinner() into a new function updateGameState())

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