function getComputerPlay() {
    let computerChoice;
    let Random3Id = Math.floor(Math.random() * Math.floor(3)); 
    switch (Random3Id) {
        case 0 :
            computerChoice = "Rock";
            break;
        case 1 :
            computerChoice = "Paper";
            break;
        case 2 :
            computerChoice = "Scissors";
            break;
    }
    return computerChoice;
}
function playRound(playerSelection, computerSelection) { 
    const playerChoice = playerSelection.toLowerCase(); // case insensitive
    const computerChoice = computerSelection.toLowerCase(); // case insensitive
    const playerHandIcon = document.querySelector(`#${playerChoice}`).cloneNode(true);
    if (playerHand.hasChildNodes()) {
        playerHand.removeChild(playerHand.firstChild);
    }
    playerHandIcon.classList.add('handIcon');
    playerHand.appendChild(playerHandIcon);
    const robotoHandIcon = document.querySelector(`#${computerChoice}`).cloneNode(true);
        if (robotoHand.hasChildNodes()) {
            robotoHand.removeChild(robotoHand.firstChild);
        }
        robotoHandIcon.classList.add('handIcon');
        robotoHand.appendChild(robotoHandIcon);

    if (playerChoice === "rock" || playerChoice === "paper" || playerChoice === "scissors") {
        if ((playerChoice === "rock" && computerChoice === "paper") ||
            (playerChoice === "scissors" && computerChoice === "rock") ||
            (playerChoice === "paper" && computerChoice === "scissors")) {
                declaration.textContent = "You lose this round!\n His " + computerChoice + " is better than your " + playerChoice;
                declaration.style.color = "rgb(158, 4, 4)";
                computerPoints.parentElement.style.backgroundColor =  "rgb(158, 4, 4)";
                playerPoints.parentElement.style.backgroundColor =  "rgb(112, 57, 9)";
                playerLose ++;
            } else if (playerChoice === computerChoice) {
                declaration.textContent = "Equality !\nHis " + computerChoice + " is equal to your " + playerChoice;
                declaration.style.color = "rgb(78, 17, 9)";
                playerPoints.parentElement.style.backgroundColor = "rgb(112, 57, 9)";
                computerPoints.parentElement.style.backgroundColor = "rgb(112, 57, 9)";
                equality ++;
            } else {
                declaration.textContent = "You win this round!\nYour " + playerChoice + " is better than his " + computerChoice;
                declaration.style.color = "rgb(4, 105, 0)";
                playerPoints.parentElement.style.backgroundColor = "rgb(4, 105, 0)";
                computerPoints.parentElement.style.backgroundColor = "rgb(112, 57, 9)";
                playerWin ++;
        }
    }
    return declaration;
}
function playTheGame(e) {
        playRound(e.currentTarget.attributes.getNamedItem('data-option').value, getComputerPlay());
        playerPoints.textContent = playerWin;
        computerPoints.textContent = playerLose;
        if (playerLose == 5) {
            winner.textContent = "Computer win the game!\nYou win " + playerWin + " times and lose " + playerLose + " times and there was " + equality + " equality";
            options.forEach(option => {
                option.setAttribute('disabled', true);
                option.classList.toggle('disabledButton');
                option.classList.toggle('button');
            });
        } else if (playerWin == 5) {
            winner.textContent = "You win the game!\nYou win " + playerWin + " times and lose " + playerLose + " times and there was " + equality + " equality";
            options.forEach(option => {
                option.setAttribute('disabled', true);
                option.classList.toggle('disabledButton');
                option.classList.toggle('button');
            });
        }
}
    
const options = document.querySelectorAll(".button");
const declaration = document.querySelector('#declarationText');
const winner = document.querySelector('#winnerText');
const playerPoints = document.querySelector('#playerPoints');
const computerPoints = document.querySelector('#computerPoints');

const playerHand = document.querySelector('#playerHand');
const robotoHand = document.querySelector('#robotoHand');

let playerWin = 0;
let playerLose = 0;
let equality = 0;

options.forEach(option => option.addEventListener('click', playTheGame)); 
