/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*************************************************************************************************************************/

let btnHold = document.querySelector('.btn-hold');
let btnRoll = document.querySelector('.btn-roll');
let btnNewGame = document.querySelector('.btn-new');
let playerPanel = document.querySelectorAll('.player-panel');
let playersCurrentScores = document.querySelectorAll('.player-current-score');
let playersTotalScores = document.querySelectorAll('.player-score');
let dice = document.querySelector('.dice');

function Player(currentScore, totalScore, isActive) {
  this.currentScore = currentScore;
  this.totalScore = totalScore;
  this.isActive = isActive;
}

let player1 = new Player(0, 0, true);
let player2 = new Player(0, 0, false);

btnHold.addEventListener('click', changePlayer);
btnHold.addEventListener('click', checkWinner);

function changePlayer(e) {
  if (player1.isActive) {
    player1.isActive = false;
    player2.isActive = true;
  }
  else {
    player1.isActive = true;
    player2.isActive = false;
  }

  calculateTotalScore();

  if (checkWinner()) {
    return;
  }
  else makePanelActive();
}

function makePanelActive() {
  playerPanel.forEach(panel => panel.classList.toggle('active'));
}

function calculateTotalScore() {
  if (!player1.isActive) {
    player1.totalScore += player1.currentScore;
    playersTotalScores[0].innerHTML = player1.totalScore;
    player1.currentScore = 0;
    playersCurrentScores[0].innerHTML = player1.currentScore;
  }
  else {
    player2.totalScore += player2.currentScore;
    playersTotalScores[1].innerHTML = player2.totalScore;
    player2.currentScore = 0;
    playersCurrentScores[1].innerHTML = player2.currentScore;
  }
}

btnRoll.addEventListener('click', rollDice);
function rollDice(e) {
  let randomNumber = Math.floor(Math.random() * 6 + 1);
  dice['src'] = `../img/dice-${randomNumber}.png`;
  dice.style.display = 'block';
  calculateCurrentScore(randomNumber);
  if (randomNumber === 1) {
    player1.currentScore = 0;
    player2.currentScore = 0;
    changePlayer();
  }
}

function calculateCurrentScore(randomNumber) {
  if (player1.isActive) {
    player1.currentScore += randomNumber;
    playersCurrentScores[0].innerHTML = player1.currentScore;
  }
  else {
    player2.currentScore += randomNumber;
    playersCurrentScores[1].innerHTML = player2.currentScore;
  }
}

function checkWinner(e) {
  let winningScore = 100;
  if (player1.totalScore >= winningScore) {
    playerPanel[0].classList.add('winner');
    document.getElementById('name-0').innerHTML = 'WINNER!';
  }
  if (player2.totalScore >= winningScore) {
    playerPanel[1].classList.add('winner');
    document.getElementById('name-1').innerHTML = 'WINNER!';
  }
  if (player1.totalScore >= winningScore || player2.totalScore >= winningScore) {
    dice.style.display = 'none';
    btnHold.style.display = 'none';
    btnRoll.style.display = 'none';
    return true;
  }
}

btnNewGame.addEventListener('click', startNewGame);

function startNewGame(e) {
  playerPanel.forEach(panel => panel.classList.remove('winner'));

  document.getElementById('name-0').innerHTML = 'PLAYER 1';
  document.getElementById('name-1').innerHTML = 'PLAYER 2';

  btnHold.style.display = 'block';
  btnRoll.style.display = 'block';
  dice.style.display = 'none';

  playerPanel[0].classList.add('active');
  playerPanel[1].classList.remove('active');

  player1.isActive = true;
  player2.isActive = false;

  clearAllScores();
}

function clearAllScores() {
  player1.currentScore = 0;
  player2.currentScore = 0;
  player1.totalScore = 0;
  player2.totalScore = 0;
  playersCurrentScores.forEach(currentScore => currentScore.innerHTML = 0);
  playersTotalScores.forEach(totalScore => totalScore.innerHTML = 0);
}
