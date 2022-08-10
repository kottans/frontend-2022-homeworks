const cards = [
  {
    front: "images/front.jpg",
    back: "images/sleepy-cat.jpg",
    name: "sleepy",
  },
  {
    front: "images/front.jpg",
    back: "images/cat.jpg",
    name: "cat",
  },
  {
    front: "images/front.jpg",
    back: "images/frightened-cat.jpg",
    name: "frightened",
  },
  {
    front: "images/front.jpg",
    back: "images/brutal-cat.jpg",
    name: "brutal",
  },
  {
    front: "images/front.jpg",
    back: "images/rock-cat.jpg",
    name: "rock",
  },
  {
    front: "images/front.jpg",
    back: "images/cute-cat.jpg",
    name: "cute",
  },
];

function createCard(front, back, name) {
  return `<div class="game__card" id="${name}">
             <img class="front__img" src="${front}" alt="">
             <img class="back__img" src="${back}" alt="">
           </div>
           <div class="game__card" id="${name}">
             <img class="front__img" src="${front}" alt="">
             <img class="back__img" src="${back}" alt="">
           </div>`;
}

const gameCards = cards.map(({ front, back, name }) =>
  createCard(front, back, name)
);

const gameContainer = document.querySelector(".game__container");
gameContainer.innerHTML = gameCards.join("");
const allGameCards = document.querySelectorAll(".game__card");

let numberOfMatches = 0;
let flippedCards = [];

gameContainer.addEventListener("click", ({ target }) => {
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
  const match = flippedCards[0].id === flippedCards[1].id;

  if (match) {
    numberOfMatches++;
    addingDisableClass();
    flippedCards = [];
    setTimeout(() => {
      addingDisableClass();
    }, 1000);
  } else {
    removeFlip();
  }
}

function removeFlip() {
  setTimeout(() => {
    flippedCards[0].classList.remove("flip");
    flippedCards[1].classList.remove("flip");
    flippedCards = [];

    addingDisableClass();

    checkForWin();
  }, 1000);
  addingDisableClass();
}

function addingDisableClass() {
  allGameCards.forEach((item) => {
    item.classList.toggle("disableclick");
  });
}

function checkForWin() {
  if (numberOfMatches === 6) {
    setTimeout(() => {
      allGameCards.forEach((item) => {
        item.classList.remove("flip");
      });
      alert("U WIN!");
      flippedCards = [];
      shuffleCards();
      numberOfMatches = 0;
    }, 1000);
  }
}

function shuffleCards() {
  allGameCards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}

shuffleCards();
