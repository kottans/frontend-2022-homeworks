"use strict";
const gameCards = [
  { id: 1, link: "./img/01.jpg", alt: "Black" },
  { id: 2, link: "./img/02.jpg", alt: "Raspberry" },
  { id: 3, link: "./img/03.jpg", alt: "Pu-erh" },
  { id: 4, link: "./img/04.jpg", alt: "Rooibos" },
  { id: 5, link: "./img/05.jpg", alt: "Lemon" },
  { id: 6, link: "./img/06.jpg", alt: "Hibiscus" },
];

const arrayOfCards = [...gameCards, ...gameCards];
const listOfCards = document.querySelector(".game");
listOfCards.addEventListener("click", clickCard);

const cardsArray = [];

let isSecondCard = false;
let lockGameProgress = false;
let firstCardID;
let numberOfAttempts = 0;

const modalWin = document.createElement("div");
modalWin.classList.add("modal");
const modalText = document.createElement("span");
modalText.classList.add("modal__text");
const modalBtn = document.createElement("span");
modalBtn.classList.add("modal__btn");
modalBtn.textContent = "OK";
modalBtn.addEventListener("click", () => {
  modalWin.style["display"] = "none";
});

modalWin.append(modalText);
modalWin.append(modalBtn);
document.querySelector(".container").prepend(modalWin);

const pressButton = document.querySelector(".container__new-game");
pressButton.addEventListener("click", newGame);
initGame();
newGame();

function initGame() {
  listOfCards.innerHTML = "";

  for (let card of arrayOfCards) {
    const gameCard = document.createElement("div");
    gameCard.classList.add("game__card");

    const cardBack = document.createElement("img");
    cardBack.classList.add("game__card-back");
    cardBack.setAttribute("alt", `card`);
    cardBack.setAttribute("draggable", "false");

    const cardFront = document.createElement("img");
    cardFront.classList.add("game__card-front");
    cardFront.setAttribute("alt", "???");
    cardFront.setAttribute("src", "./img/back.jpg");
    cardFront.setAttribute("draggable", "false");

    gameCard.append(cardBack);
    gameCard.append(cardFront);
    listOfCards.append(gameCard);

    cardsArray.push(gameCard);
  }
}

function newGame() {
  modalWin.style["display"] = "none";
  numberOfAttempts = 0;
  isSecondCard = false;
  lockGameProgress = false;

  const cardBack = cardsArray.map((card) => {
    return card.firstChild;
  });
  const cardFront = cardsArray.map((card) => {
    return card.lastChild;
  });

  cardsArray.forEach((card) => {
    card.style["transform"] = "rotateY(0deg)";
  });

  arrayOfCards.sort(function () {
    return 0.5 - Math.random();
  });

  setTimeout(() => {
    arrayOfCards.forEach((card, index) => {
      cardsArray[index].setAttribute("data-status", "closed");
      cardBack[index].style["opacity"] = "1";
      cardBack[index].setAttribute("alt", `${card.alt}`);
      cardBack[index].setAttribute("src", `${card.link}`);
      cardFront[index].setAttribute("data-id", `${card.id}`);
    });
  }, 300);
}

function clickCard(event) {
  if (
    lockGameProgress ||
    event.target.dataset.id === undefined ||
    event.target.parentElement.dataset.status === "opened"
  ) {
    return;
  }

  const currentCardId = cardsArray.indexOf(event.target.parentElement);

  if (isSecondCard) {
    flip(currentCardId);
    numberOfAttempts += 1;
    isSecondCard = false;
    lockGameProgress = true;

    if (compareCards(firstCardID, currentCardId)) {
      setTimeout(changeOpacity, 600);
    } else {
      setTimeout(flipBack, 600);
    }
  } else {
    isSecondCard = true;
    firstCardID = currentCardId;
    flip(currentCardId);
  }
}

function flip(cardId) {
  cardsArray[cardId].style["transform"] =
    cardsArray[cardId].style["transform"] === "rotateY(-180deg)"
      ? "rotateY(0deg)"
      : "rotateY(-180deg)";
}

function compareCards(firstCardID, currentCardId) {
  return cardsArray[firstCardID].lastChild.dataset.id ===
    cardsArray[currentCardId].lastChild.dataset.id
    ? true
    : false;
}
function changeOpacity() {
  cardsArray.map((card) => {
    if (card.style["transform"] === "rotateY(-180deg)") {
      card.firstChild.style["opacity"] = "0.5";
      card.dataset.status = "opened";
    }
  });

  if (
    cardsArray.every((card) => card.style["transform"] === "rotateY(-180deg)")
  ) {
    modalText.textContent = `You won in ${numberOfAttempts} turns!!! `;
    modalWin.style["display"] = "flex";
  }
  lockGameProgress = false;
}

function flipBack() {
  cardsArray.map((card, index) => {
    if (
      card.style["transform"] === "rotateY(-180deg)" &&
      card.dataset.status === "closed"
    ) {
      flip(index);
    }
  });
  lockGameProgress = false;
}
