function getComputerPlay() {
  let computerChoice;
  let random3Id = Math.floor(Math.random() * Math.floor(3));
  switch (random3Id) {
    case 0:
      computerChoice = 'Rock';
      break;
    case 1:
      computerChoice = 'Paper';
      break;
    case 2:
      computerChoice = 'Scissors';
      break;
  }
  return computerChoice;
}
function playRound(playerSelection, computerSelection) {
  const playerChoice = playerSelection.toLowerCase(); // case insensitive
  const computerChoice = computerSelection.toLowerCase(); // case insensitive
  const playerHandIcon = document
    .querySelector(`#${playerChoice}`)
    .cloneNode(true);
  if (playerHand.hasChildNodes()) {
    playerHand.removeChild(playerHand.firstChild);
  }
  playerHand.appendChild(playerHandIcon);
  playerHandIcon.classList.add('icon');

  const robotoHandIcon = document
    .querySelector(`#${computerChoice}`)
    .cloneNode(true);
  if (robotoHand.hasChildNodes()) {
    robotoHand.removeChild(robotoHand.firstChild);
  }
  robotoHand.appendChild(robotoHandIcon);
  robotoHandIcon.classList.add('icons');

  if (
    (playerChoice === 'rock' && computerChoice === 'paper') ||
    (playerChoice === 'scissors' && computerChoice === 'rock') ||
    (playerChoice === 'paper' && computerChoice === 'scissors')
  ) {
    declaration.textContent = `You lose this round!\nHis ${computerChoice} is better than your ${playerChoice}`;
    computerPoints.parentElement.style.backgroundColor = 'rgb(227, 9, 9)';
    playerPoints.parentElement.style.backgroundColor = 'rgb(112, 57, 9)';
    playerLose++;
  } else if (playerChoice === computerChoice) {
    declaration.textContent = `Equality!\nHis ${computerChoice} is equal to your ${playerChoice}`;
    playerPoints.parentElement.style.backgroundColor = 'rgb(112, 57, 9)';
    computerPoints.parentElement.style.backgroundColor = 'rgb(112, 57, 9)';
    equality++;
  } else {
    declaration.textContent = `You win this round!\nYour ${playerChoice} is better than his ${computerChoice}`;
    playerPoints.parentElement.style.backgroundColor = 'rgb(40, 148, 7)';
    computerPoints.parentElement.style.backgroundColor = 'rgb(112, 57, 9)';
    playerWin++;
  }

  optionsBtns.forEach((option) => {
    option.blur(); // remove focus state
  });

  declaration.classList.remove('visible');
  setTimeout(() => {
    declaration.classList.add('visible');
  }, 0500);
}
function playTheGame(e) {
  playRound(
    e.currentTarget.attributes.getNamedItem('data-option').value,
    getComputerPlay()
  );
  playerPoints.textContent = playerWin;
  computerPoints.textContent = playerLose;

  const WinEndText = {
    player: 'You win the game!',
    roboto: 'Computer win the game!',
  };

  if (playerLose === 5 || playerWin === 5) {
    winner.textContent = `${
      playerWin === 5 ? WinEndText.player : WinEndText.roboto
    }\nYou win ${playerWin} times and lose ${playerLose} times and there was ${equality} equality`;

    optionsBtns.forEach((option) => {
      option.setAttribute('disabled', true);
      option.classList.toggle('disabled-button');
      option.classList.toggle('button');
    });

    newGameButton.classList.toggle('visible');
  }
}

const newGame = () => {
  console.log('newGame');
  playerWin = 0;
  playerLose = 0;
  equality = 0;

  winner.textContent = 'Choose a option';
  playerPoints.parentElement.style.backgroundColor = 'rgb(112, 57, 9)';
  computerPoints.parentElement.style.backgroundColor = 'rgb(112, 57, 9)';

  optionsBtns.forEach((option) => {
    option.removeAttribute('disabled');
    option.classList.toggle('disabled-button');
    option.classList.toggle('button');
  });

  if (robotoHand.hasChildNodes()) {
    robotoHand.removeChild(robotoHand.firstChild);
  }

  if (playerHand.hasChildNodes()) {
    playerHand.removeChild(playerHand.firstChild);
  }

  newGameButton.classList.toggle('visible');
};

const optionsBtns = document.querySelectorAll('.button');
const declaration = document.querySelector('#declaration-text');
const winner = document.querySelector('#winner-text');
const playerPoints = document.querySelector('#player-points');
const computerPoints = document.querySelector('#computer-points');
const newGameButton = document.querySelector('#new-game-btn');

const playerHand = document.querySelector('#player-hand');
const robotoHand = document.querySelector('#roboto-hand');

let playerWin = 0;
let playerLose = 0;
let equality = 0;

optionsBtns.forEach((option) => option.addEventListener('click', playTheGame));
newGameButton.addEventListener('click', newGame);
