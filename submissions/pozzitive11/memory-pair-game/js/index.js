const cards = [
  {
    back: "images/sleepy-cat.jpg",
    name: "sleepy",
  },
  {
    back: "images/cat.jpg",
    name: "cat",
  },
  {
    back: "images/frightened-cat.jpg",
    name: "frightened",
  },
  {
    back: "images/brutal-cat.jpg",
    name: "brutal",
  },
  {
    back: "images/rock-cat.jpg",
    name: "rock",
  },
  {
    back: "images/cute-cat.jpg",
    name: "cute",
  },
];

let lockBoard = false;

const gameCards = cards.map(
  ({ back, name }) =>
    `<div class="game__card" data-card-name="${name}">
      <img class="front__img" src="images/front.jpg" alt="">
      <img class="back__img" src="${back}" alt="">
    </div>`
);

function shuffleCards(card) {
  return card.sort(function () {
    return 0.5 - Math.random();
  });
}

shuffleCards(gameCards);

const gameContainer = document.querySelector(".game__container");
gameContainer.innerHTML = gameCards.concat(gameCards).join("");

const allGameCards = document.querySelectorAll(".game__card");

let numberOfMatches = 0;
let flippedCards = [];

gameContainer.addEventListener("click", ({ target }) => {
  if (lockBoard) return;
  const parentTarget = target.closest(".game__card");
  if (parentTarget !== null) {
    parentTarget.classList.add("flip");

    flippedCards.push(parentTarget);
    checkArrayOfFlippedCardsLength();
    checkForWin();
  }
});

function checkArrayOfFlippedCardsLength() {
  if (flippedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  const match =
    flippedCards[0].dataset.cardName === flippedCards[1].dataset.cardName;

  if (match) {
    numberOfMatches++;
    flippedCards = [];
  } else {
    removeFlip();
  }
}

function removeFlip() {
  setTimeout(() => {
    flippedCards[0].classList.remove("flip");
    flippedCards[1].classList.remove("flip");
    flippedCards = [];

    lockBoard = false;
    checkForWin();
  }, 1000);
  lockBoard = true;
}

function checkForWin() {
  if (numberOfMatches === 6) {
    setTimeout(() => {
      allGameCards.forEach((item) => {
        item.classList.remove("flip");
      });
      alert("U WIN!");
      flippedCards = [];
      numberOfMatches = 0;
    }, 1000);
  }
}
