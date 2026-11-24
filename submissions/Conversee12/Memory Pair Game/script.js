const cards = document.querySelectorAll(".memory__card");

let isFlipped = false;
let lockFlip = false;
let firstCard;
let secondCard;
let matchCards = [];
const buttonRestart = document.querySelector('.button');
const winMessage = document.querySelector('.game__win');

function flipCard() {
  if (lockFlip) return;
  if (this === firstCard) return;
  this.classList.add('flip');
  if (!isFlipped) {
    isFlipped = true;
    firstCard = this;
    return;
  }
  isFlipped = false;
  secondCard = this;

  checkMatchCards();
}

function checkMatchCards() {
  if (firstCard.dataset.card === secondCard.dataset.card) {
    lockFlip = true;
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    matchCards.push(firstCard.dataset.card);
    winGame();
    resetBoard();
  } else {
    lockFlip = true;
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      resetBoard();
    }, 700)
  }
}

function shuffleCards() {
  cards.forEach(card => {
    let randomPosition = Math.floor(Math.random() * 12);
    card.style.order = randomPosition;
  })
};

function winGame() {
  if (matchCards.length === 6) {
    setTimeout(() => {
      winMessage.style.display = "block";
    }, 500);
  }
};

function restartGame() {
  setTimeout(() => {
    winMessage.style.display = "none";
    cards.forEach((card) => {
      card.classList.remove("flip");
      card.addEventListener('click', flipCard)
    });
    matchCards.length = 0;
    shuffleCards();
  }, 300);
}

function resetBoard() {
  [isFlipped, lockFlip] = [false, false];
  [firstCard, secondCard] = [null, null];
};

buttonRestart.addEventListener("click", restartGame);

cards.forEach(card => {
  card.addEventListener("click", flipCard);
});

shuffleCards();
