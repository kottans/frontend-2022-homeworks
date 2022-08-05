// const cards = document.querySelectorAll(".game__card");

// let hasFlippedCard = false;
// let lockBoard = false;
// let firstCard, secondCard;

// function flipCard() {
//   if (lockBoard) return;
//   if (this === firstCard) return;

//   this.classList.add("flip");

//   if (!hasFlippedCard) {
//     hasFlippedCard = true;
//     firstCard = this;

//     return;
//   }

//   secondCard = this;
//   checkMatch();
// }

// function checkMatch() {
//   let match = firstCard.dataset.card === secondCard.dataset.card;

//   match ? disableClick() : removeFlip();
// }

// function disableClick() {
//   firstCard.removeEventListener("click", flipCard);
//   secondCard.removeEventListener("click", flipCard);

//   resetBoard();
// }

// function removeFlip() {
//   lockBoard = true;
  
//   setTimeout(() => {
//     firstCard.classList.remove("flip");
//     secondCard.classList.remove("flip");

//     resetBoard();
//   }, 1000);
// }

// function resetBoard() {
//   [hasFlippedCard, lockBoard] = [false, false];
//   [firstCard, secondCard] = [null, null];
//   document.querySelector("body").classList.add("win");
// }

// cards.forEach((card) => card.addEventListener("click", flipCard));

const cards = document.querySelectorAll(".game__card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  // this == card
  this.classList.add("flip");

  if (hasFlippedCard) {
    hasFlippedCard = false;
    firstCard = this;
  } else {
    hasFlippedCard = true;
    secondCard = this;
  }

  checkMatch();
}

function checkMatch() {
  let match = firstCard.dataset.card === secondCard.dataset.card;

  match ? disableClick() : removeFlip();
}

function disableClick() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
}

function removeFlip() {
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
  }, 1000);
}

cards.forEach((card) => card.addEventListener("click", flipCard));