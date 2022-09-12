'use strict';

const CARDS = [
  {
    number: 'cat1',
    src: './assets/img/cat1.png'
  },
  {
    number: 'cat2',
    src: './assets/img/cat2.png',
  },
  {
    number: 'cat3',
    src: './assets/img/cat3.png',
  },
  {
    number: 'cat4',
    src: './assets/img/cat4.png',
  },
  {
    number: 'cat5',
    src: './assets/img/cat5.png',
  },
  {
    number: 'cat6',
    src: './assets/img/cat6.png'
  }
];

const GAME_FIELD = document.querySelector('.game');
const OVERLAY = document.querySelector('.overlay');
const MODAL = document.querySelector('.modal');
const MODAL_CLOSE = document.querySelector('[data-close]');
const TIMEOUT = 500;

let hasFlipedCard = false;
let boardLocked = false;
let firstCard = null;
let secondCard = null;

const defaultSettings = () => {
  hasFlipedCard = false;
  boardLocked = false;
  firstCard = null;
  secondCard = null;
};

function createCards (myCards) {   
  GAME_FIELD.innerHTML = ``;

  const doubleCards = [...myCards, ...myCards];
  const cards = doubleCards
  .sort(() => 0.5 - Math.random())
  .map((card) => 
    `<div class="card" data-card="${card.number}">
        <img src="${card.src}" alt="" class="front">
        <img src="./assets/img/background.png" alt="" class="back">
      </div>`
  )
  .join('');
  
  GAME_FIELD.innerHTML = cards;
}

function openCards () {  
  boardLocked = true; 
  const MY_CARDS = document.querySelectorAll('.card'); 
  MY_CARDS.forEach(card => {
    card.classList.add('flip');    
  });

  MY_CARDS.forEach((card, i) => {
    setTimeout(() => {    
    card.classList.remove('flip');    
    }, TIMEOUT * (i+1));
  });    
  
  setTimeout(() => {
    boardLocked = false;    
  }, TIMEOUT * MY_CARDS.length); 
}

function showModal () {
  OVERLAY.style.display = 'block';
  MODAL.style.display = 'block';
}

function closeModal () {  
  OVERLAY.style.display = 'none';
  MODAL.style.display = 'none';
  setTimeout(() => {
    createCards(CARDS);
    openCards();        
  }, 300);  
}

OVERLAY.addEventListener('click', (e) => {
  if (e.target === OVERLAY) {
    closeModal();
  }
});

MODAL_CLOSE.addEventListener('click', closeModal);

const restartTurn = () => {
  boardLocked = true;  
  setTimeout(() => {    
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    defaultSettings();
  }, TIMEOUT);
};

const checkedPairs = () => {
  firstCard.removeEventListener('click', flipCards);
  secondCard.removeEventListener('click', flipCards);
  boardLocked = true;
  setTimeout( () => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    firstCard.classList.add('hide');
    secondCard.classList.add('hide');
    firstCard.style.pointerEvents = 'none';
    secondCard.style.pointerEvents = 'none'; 
    defaultSettings();  
    congratsWinner();     
  }, TIMEOUT);         
};

const congratsWinner = () => {
  const HIDE_CARDS = document.querySelectorAll('div.card.hide');
    
  if (HIDE_CARDS.length === 12) {
    showModal();                
  }
};

const checkedWinner = () => {
  firstCard.dataset.card === secondCard.dataset.card 
  ? checkedPairs() 
  : restartTurn();   
};

function flipCards ({target}) {  
  if (!target.closest('.card') || boardLocked) return 
  
  const selectedCard = target.parentNode;  
  
  selectedCard.classList.add('flip');    
  
  if (selectedCard === firstCard) return

  if (!hasFlipedCard) {
    hasFlipedCard = true;
    firstCard = selectedCard;
  } else {
    hasFlipedCard = false;
    secondCard = selectedCard;

  checkedWinner();   
  }    
}  

createCards(CARDS);

openCards();

GAME_FIELD.addEventListener('click', flipCards);  
