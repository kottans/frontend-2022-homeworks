let matchedCard = 0;
let isFlipped = false;
let boardLocked = false;
let firstCard;
let secondCard;
const CARDS = document.querySelectorAll(".flipper");
const MAIN_BOARD = document.querySelector(".container");
const WIN_TABLE = document.querySelector(".winTable");
const WIN_BUTTON = document.querySelector(".winButton");

function getWinnerPage(){
  setTimeout(() => {
    WIN_TABLE.style.display = "grid";
  }, 1500);
};
WIN_BUTTON.addEventListener("click", () => WIN_TABLE.style.display = "none");

function flipCard(e){
  if(boardLocked === true){return}

  const TARGET = e.target.parentElement;

  if(TARGET === MAIN_BOARD){return}

  TARGET.classList.add("rotated");

  if(isFlipped === false){
    isFlipped = true;
    firstCard = TARGET;
    firstCard.style.pointerEvents = "none";
  } else {
    secondCard = TARGET;
    firstCard.style.pointerEvents = "auto";

  checkForMatch();
  
  isFlipped = false;
 }
};

function checkForMatch(){
 const isEqual = firstCard.dataset.name === secondCard.dataset.name
  isEqual ? disableCards() : unflipCards();
};

function disableCards(){
  firstCard.style.pointerEvents = "none";
  secondCard.style.pointerEvents = "none";
 
  matchedCard++
  if (matchedCard === 8) {
      setTimeout(() => { 
        CARDS.forEach(card => {
          card.style.pointerEvents = "auto";
        })
        return refreshCards(); 
      }, 2000);
    return getWinnerPage();
  }
};

  function unflipCards(){

    boardLocked = true;
                    
    setTimeout(() => {
      firstCard.classList.remove("rotated");
      secondCard.classList.remove("rotated");
       isFlipped = false;
      boardLocked = false; 
    }, 1000);
  };

function refreshCards() {
  matchedCard = 0;
  boardLocked = false;
  
  CARDS.forEach(card => {
    card.addEventListener("click", flipCard);
    card.classList.remove("rotated");
  
    const RANDOM_ORDER = Math.floor(Math.random() * CARDS.length)
    card.style.order = RANDOM_ORDER;
  });  
}; 
refreshCards();
