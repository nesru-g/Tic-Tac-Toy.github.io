const players = [
   {
      name:'',
      symbole: 'X'
   },
   {
      name: '',
      symbole: 'O'
   },
];

let counter1 = 0;
let counter2 = 0;

const game = [
   [0, 0, 0],
   [0, 0, 0],
   [0, 0, 0],
];

let edittingPlayer = 0;
let activePlayer = 0;
let currentRound = 1;
let gameIsOver = false;

// Header Section
const headerSection = document.querySelector('.heading-section');

// Buttons
const editPlayer1BtnElement = document.querySelector('.edit-btn-1');
const editPlayer2BtnElement = document.querySelector('.edit-btn-2');
const startBtnElement = document.querySelector('.start-btn');


// Form Element
const formElemnt =  document.querySelector('form');
const inputError = document.querySelector('.input-error');

// BackDrop Sections
const backDropOverLayElement = document.querySelector('.backdrop-overlay');
const backDropSectionElement = document.querySelector('.backdrop-section');
   // backDrop Section Buttons
const cancelBtnElement = document.querySelector('.cancel');
const confirmBtnElement = document.querySelector('.confirm');

// Winning Section
const winningSection = document.querySelector('.winning-section');
const winnerName = document.querySelector('.winning-section span');
// Game Area
const gameAreaElement = document.querySelector('.game-section');
  //Game Borde list
const gameListElement = document.querySelectorAll('.game-section li');
const playerName = document.querySelector('#player-turn');

// Short Form
const playerNameElement1 = document.querySelector('.v1');
const counterElement1 = document.querySelector('.v11');
const counterElement2 = document.querySelector('.v22');
const playerNameElement2 = document.querySelector('.v2');
const shortFormSection = document.querySelector('.short-form');
const editSection = document.querySelector('.edit-section');

// Buttons EventListner
editPlayer1BtnElement.addEventListener('click', openConfig);
editPlayer2BtnElement.addEventListener('click', openConfig);
startBtnElement.addEventListener('click', startGame);
for(const list of gameListElement) {
   list.addEventListener('click', gamePlay);
}

// backDrop EventListner 
backDropOverLayElement.addEventListener('click', closeConfig);
cancelBtnElement.addEventListener('click', closeConfig);

// Form EventListner
formElemnt.addEventListener('submit', savePlayerConfig);