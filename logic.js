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
  // divide the round result in two table for mobile
  if (round > 9) {
    let currentTableSlot = round - 10;
    playerPlays2Tds[currentTableSlot].append(playerHandIcon);
    robotoPlays2Tds[currentTableSlot].append(robotoHandIcon);

    if (playerHandIcon.classList.contains('win-cell')) {
      playerPlays2Tds[currentTableSlot].classList.add('win-cell');
    } else if (robotoHandIcon.classList.contains('win-cell')) {
      robotoPlays2Tds[currentTableSlot].classList.add('win-cell');
    }
  } else {
    playerPlays1Tds[round].append(playerHandIcon);
    robotoPlays1Tds[round].append(robotoHandIcon);

    if (playerHandIcon.classList.contains('win-cell')) {
      playerPlays1Tds[round].classList.add('win-cell');
    } else if (robotoHandIcon.classList.contains('win-cell')) {
      robotoPlays1Tds[round].classList.add('win-cell');
    }
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
    roundResultText.textContent = `You lose this round!\nHis ${robotoSelection} is better than your ${playerSelection}`;
    robotoPoints.parentElement.classList.add('winner-point');
    playerPoints.parentElement.classList.remove('winner-point');
    robotoPicture.classList.add('winner-img');
    robotoHandIcon.classList.add('win-cell');
    setTimeout(() => {
      robotoPicture.classList.remove('winner-img');
    }, 1000);
    robotoWin++;
  } else if (playerSelection === robotoSelection) {
    roundResultText.textContent = `Equality!\nHis ${robotoSelection} is equal to your ${playerSelection}`;
    playerPoints.parentElement.classList.remove('winner-point');
    robotoPoints.parentElement.classList.remove('winner-point');
    equality++;
  } else {
    roundResultText.textContent = `You win this round!\nYour ${playerSelection} is better than his ${robotoSelection}`;
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

  roundResultText.classList.remove('visible');
  setTimeout(() => {
    roundResultText.classList.add('visible');
  }, 0100);
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
  roundResultText.textContent = 'Choose a option:';
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

  playerPlays1Tds.forEach((td) => {
    // removeChild trow an error (argument 1 not an object) if in the loop without the hasChildNodes() as a condition
    if (td.hasChildNodes()) {
      td.removeChild(td.firstChild);
    }
    td.classList.remove('win-cell');
  });
  robotoPlays1Tds.forEach((td) => {
    if (td.hasChildNodes()) {
      td.removeChild(td.firstChild);
    }
    td.classList.remove('win-cell');
  });
  playerPlays2Tds.forEach((td) => {
    if (td.hasChildNodes()) {
      td.removeChild(td.firstChild);
    }
    td.classList.remove('win-cell');
  });
  robotoPlays2Tds.forEach((td) => {
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
const roundResultText = document.querySelector('#round-result-text');
const roundsTable1 = document.querySelector('#rounds-table1');
const roundsTable2 = document.querySelector('#rounds-table2');
const playerPlays1 = roundsTable1.querySelector('.player-plays');
const playerPlays2 = roundsTable2.querySelector('.player-plays');
const playerPlays1Tds = [...playerPlays1.querySelectorAll('td')];
const playerPlays2Tds = [...playerPlays2.querySelectorAll('td')];
const robotoPlays1 = roundsTable1.querySelector('.roboto-plays');
const robotoPlays2 = roundsTable2.querySelector('.roboto-plays');
const robotoPlays1Tds = [...robotoPlays1.querySelectorAll('td')];
const robotoPlays2Tds = [...robotoPlays2.querySelectorAll('td')];

// init some variables
let round = 0;
let playerWin = 0;
let robotoWin = 0;
let equality = 0;
