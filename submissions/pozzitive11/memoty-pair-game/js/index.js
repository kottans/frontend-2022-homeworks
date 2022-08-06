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

const createCard = (front, back, name) => {
  return `<div class="game__card" id="${name}">
            <img class="front__img" src="${front}" alt="">
            <img class="back__img" src="${back}" alt="">
          </div>
          <div class="game__card" id="${name}">
            <img class="front__img" src="${front}" alt="">
            <img class="back__img" src="${back}" alt="">
          </div>`;
};

const gameCard = cards.map(({ front, back, name }) =>
  createCard(front, back, name)
);
const gameContainer = document.querySelector(".game__container");
gameContainer.innerHTML = gameCard.join("");
const gameCards = document.querySelectorAll(".game__card");

let numberOfMatches = 0;
let ArrayOfFlippedCards = [];

gameCards.forEach((card) =>
  card.addEventListener("click", ({ target }) => {
    const parentTarget = target.parentElement;
    if (parentTarget && parentTarget.classList.contains("game__card")) {
      parentTarget.classList.add("flip");

      ArrayOfFlippedCards.push(parentTarget);
    }
    checkArrayOfFlippedCardsLength();
    checkForWin();
  })
);

function checkArrayOfFlippedCardsLength() {
  if (ArrayOfFlippedCards.length % 2 === 0) {
    checkMatch();
  }
}

function checkMatch() {
  const match =
    ArrayOfFlippedCards[ArrayOfFlippedCards.length - 1].id ===
    ArrayOfFlippedCards[ArrayOfFlippedCards.length - 2].id;

  if (match) {
    numberOfMatches++;
    addingDisableClass();
    setTimeout(() => {
      addingDisableClass();
    }, 1000);
  } else {
    removeFlip();
  }
}

function removeFlip() {
  setTimeout(() => {
    ArrayOfFlippedCards[ArrayOfFlippedCards.length - 1].classList.remove(
      "flip"
    );
    ArrayOfFlippedCards[ArrayOfFlippedCards.length - 2].classList.remove(
      "flip"
    );
    ArrayOfFlippedCards.splice(0, 2);

    addingDisableClass();

    checkForWin();
  }, 1000);
  addingDisableClass();
}

function addingDisableClass() {
  gameCards.forEach((item) => {
    item.classList.toggle("disableclick");
  });
}

function checkForWin() {
  if (ArrayOfFlippedCards.length === 12) {
    setTimeout(() => {
      gameCards.forEach((item) => {
        item.classList.remove("flip");
      });
      alert("U WIN!");
      ArrayOfFlippedCards.splice(0, ArrayOfFlippedCards.length);
      shuffleCards();
    }, 1000);
  }
}

function shuffleCards() {
  gameCards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}

shuffleCards();
