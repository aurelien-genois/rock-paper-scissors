const getComputerPlay = () => {
  let computerChoice;
  let random3Id = Math.floor(Math.random() * Math.floor(3));
  switch (random3Id) {
    case 0:
      computerChoice = 'rock';
      break;
    case 1:
      computerChoice = 'paper';
      break;
    case 2:
      computerChoice = 'scissors';
      break;
  }
  return computerChoice;
};

const populateResultTable = (playerHandIcon, robotoHandIcon) => {
  playerPlaysTds[round].append(playerHandIcon);
  robotoPlaysTds[round].append(robotoHandIcon);

  if (playerHandIcon.classList.contains('win-cell')) {
    playerPlaysTds[round].classList.add('win-cell');
  } else if (robotoHandIcon.classList.contains('win-cell')) {
    robotoPlaysTds[round].classList.add('win-cell');
  }
};

const setPlayerHand = (selection, hand) => {
  const choice = selection.toLowerCase(); // case insensitive
  const handIcon = document.querySelector(`#${choice}`).cloneNode(true);
  if (hand.hasChildNodes()) {
    hand.removeChild(hand.firstChild);
  }
  handIcon.classList.remove('button-icons');
  handIcon.classList.add('icons');
  hand.append(handIcon.cloneNode(true));

  return handIcon;
};

const playRound = (playerSelection, robotoSelection) => {
  const playerHandIcon = setPlayerHand(playerSelection, playerHand);
  const robotoHandIcon = setPlayerHand(robotoSelection, robotoHand);

  if (
    (playerSelection === 'rock' && robotoSelection === 'paper') ||
    (playerSelection === 'scissors' && robotoSelection === 'rock') ||
    (playerSelection === 'paper' && robotoSelection === 'scissors')
  ) {
    declaration.textContent = `You lose this round!\nHis ${robotoSelection} is better than your ${playerSelection}`;
    robotoPoints.parentElement.classList.add('winner-point');
    playerPoints.parentElement.classList.remove('winner-point');
    robotoPicture.classList.add('winner-img');
    robotoHandIcon.classList.add('win-cell');
    setTimeout(() => {
      robotoPicture.classList.remove('winner-img');
    }, 1000);
    robotoWin++;
  } else if (playerSelection === robotoSelection) {
    declaration.textContent = `Equality!\nHis ${robotoSelection} is equal to your ${playerSelection}`;
    playerPoints.parentElement.classList.remove('winner-point');
    robotoPoints.parentElement.classList.remove('winner-point');
    equality++;
  } else {
    declaration.textContent = `You win this round!\nYour ${playerSelection} is better than his ${robotoSelection}`;
    playerPoints.parentElement.classList.add('winner-point');
    robotoPoints.parentElement.classList.remove('winner-point');
    playerPicture.classList.add('winner-img');
    playerHandIcon.classList.add('win-cell');
    setTimeout(() => {
      playerPicture.classList.remove('winner-img');
    }, 1000);
    playerWin++;
  }

  populateResultTable(playerHandIcon, robotoHandIcon);

  declaration.classList.remove('visible');
  setTimeout(() => {
    declaration.classList.add('visible');
  }, 0500);
};

const playTheGame = (e) => {
  winner.parentElement.style.visibility = 'hidden';
  playRound(
    e.currentTarget.attributes.getNamedItem('data-option').value,
    getComputerPlay()
  );
  round++;
  playerPoints.textContent = playerWin;
  robotoPoints.textContent = robotoWin;

  const WinEndText = {
    player: 'You win the game!',
    roboto: 'Roboto win the game!',
    equality: "it' an equality!",
  };

  // end conditions
  if (robotoWin === 5 || playerWin === 5 || round >= 20) {
    // if someone wins, display the winner
    if (robotoWin === 5 || playerWin === 5) {
      winner.textContent = `${
        playerWin === 5 ? WinEndText.player : WinEndText.roboto
      }\nYou win ${playerWin} times\nand lose ${robotoWin} times\nand there was ${equality} equality`;
    } else {
      // if 20 rounds has passed, display the results
      let finalResult =
        robotoWin === playerWin
          ? `it' an equality,\nboth has ${robotoWin} wins!`
          : robotoWin > playerWin
          ? `Roboto has more wins\n with ${robotoWin} wins!`
          : `you have more wins\n with ${playerWin} wins!`;

      winner.textContent = `nobody get 5 wins\nafter ${round} rounds,\n${finalResult}`;
    }

    optionsBtns.forEach((option) => {
      option.setAttribute('disabled', true);
      option.classList.toggle('disabled-button');
      option.classList.toggle('button');
    });

    setTimeout(() => {
      winner.parentElement.style.visibility = 'visible';
      newGameButton.classList.toggle('visible');
    }, 1000);
  }
};

const newGame = () => {
  playerWin = 0;
  robotoWin = 0;
  equality = 0;
  round = 0;

  winner.textContent = 'Choose a option:';
  playerPoints.parentElement.classList.remove('winner-point');
  robotoPoints.parentElement.classList.remove('winner-point');
  playerPoints.textContent = playerWin;
  robotoPoints.textContent = robotoWin;

  optionsBtns.forEach((option) => {
    option.removeAttribute('disabled');
    option.classList.toggle('disabled-button');
    option.classList.toggle('button');
  });

  robotoHand.removeChild(robotoHand.firstChild);

  playerHand.removeChild(playerHand.firstChild);

  playerPlaysTds.forEach((td) => {
    // removeChild trow an error (argument 1 not an object) if in the loop without the hasChildNodes() as a condition
    if (td.hasChildNodes()) {
      td.removeChild(td.firstChild);
    }
    td.classList.remove('win-cell');
  });
  robotoPlaysTds.forEach((td) => {
    if (td.hasChildNodes()) {
      td.removeChild(td.firstChild);
    }
    td.classList.remove('win-cell');
  });

  newGameButton.classList.toggle('visible');
};

// game board selection
const playerPicture = document.querySelector('#player-profile .img-container');
const robotoPicture = document.querySelector('#roboto-profile .img-container');
const playerPoints = document.querySelector('#player-points');
const robotoPoints = document.querySelector('#roboto-points');
const playerHand = document.querySelector('#player-hand');
const robotoHand = document.querySelector('#roboto-hand');
const winner = document.querySelector('#winner-text');
const newGameButton = document.querySelector('#new-game-btn');
newGameButton.addEventListener('click', newGame);

// options btns selection
const optionsBtns = document.querySelectorAll('.button');
optionsBtns.forEach((option) => option.addEventListener('click', playTheGame));

// rounds result selection
const declaration = document.querySelector('#round-result-text');
const roundsTable = document.querySelector('#rounds-table');
const playerPlays = roundsTable.querySelector('#player-plays');
const playerPlaysTds = [...playerPlays.querySelectorAll('td')];
const robotoPlays = roundsTable.querySelector('#roboto-plays');
const robotoPlaysTds = [...robotoPlays.querySelectorAll('td')];

// init some variables
let round = 0;
let playerWin = 0;
let robotoWin = 0;
let equality = 0;
