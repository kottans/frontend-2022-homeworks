const cards = document.querySelectorAll(".memory-card");
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedPairs = 0;

shuffleCards();

function flipCard() {
  if (lockBoard || this === firstCard) return;
  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
  } else {
    hasFlippedCard = false;
    secondCard = this;
    checkForMatch();
  }
}

function checkForMatch() {
  firstCard.id === secondCard.id ? disableCards() : unflipCards();
}

function disableCards() {
  setTimeout(() => {
    hideMatchedCards();
  }, 500);
  deactivateMatchedCards();
  matchedPairs += 1;
  checkMatchedPairs();
}

function hideMatchedCards() {
  firstCard.classList.add("hidden");
  secondCard.classList.add("hidden");
}

function deactivateMatchedCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    lockBoard = false;
  }, 1000);
}

function shuffleCards() {
  cards.forEach((card) => {
    let randomPosition = Math.floor(Math.random() * 16);
    card.style.order = randomPosition;
  });
}

function checkMatchedPairs() {
  if (matchedPairs === 8) {
    setTimeout(() => {
      reloadGame();
    }, 750);
  } else {
    setTimeout(() => {
      printMatchedPairs();
    }, 750);
  }
}

function reloadGame() {
  alert("YOU WON, CONGRATULATIONS!");
  window.location.reload();
  return;
}

function printMatchedPairs() {
  document.querySelector(
    ".wins-counter"
  ).innerHTML = `You have ${matchedPairs} matched pairs.`;
}

cards.forEach((card) => card.addEventListener("click", flipCard));

