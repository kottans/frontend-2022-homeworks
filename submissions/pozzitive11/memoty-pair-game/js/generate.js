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

let counter = 0;
let arr = [];

function flipCard() {
  if (this && this.classList.contains("game__card")) {
    this.classList.add("flip");

    arr.push(this);
  }
  checkArrLength();

  winCOndition();
}

function checkArrLength() {
  if (arr.length % 2 === 0) {
    checkMatch();
  }
}

function checkMatch() {
  const match = arr[arr.length - 1].id === arr[arr.length - 2].id;

  if (match) {
    counter++;
    disableClick();
    setTimeout(() => {
      disableClick();
    }, 1000);
  } else {
    removeFlip();
  }
}

function removeFlip() {
  setTimeout(() => {
    arr[arr.length - 1].classList.remove("flip");
    arr[arr.length - 2].classList.remove("flip");
    arr.splice(0, 2);

    disableClick();

    winCOndition();
  }, 1000);
  disableClick();
}

function disableClick() {
  gameCards.forEach((item) => {
    item.classList.toggle("disableclick");
  });
}

function winCOndition() {
  if (arr.length === 12) {
    setTimeout(() => {
      gameCards.forEach((item) => {
        item.classList.remove("flip");
      });
      alert("U WIN!");
      arr.splice(0, arr.length);
      shuffle();
    }, 1000);
  }
}

function shuffle() {
  gameCards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}

shuffle();

gameCards.forEach((card) => card.addEventListener("click", flipCard));
