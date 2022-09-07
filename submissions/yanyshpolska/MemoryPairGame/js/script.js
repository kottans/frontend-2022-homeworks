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

let listOfCardsPositions;
let cardsArray = [];
let isSecondCard = false;
let lockGameProgress = false;
let firstCardID;

const newGame = function () {
  arrayOfCards.sort(function () {
    return 0.5 - Math.random();
  });

  const gameArea = document.querySelector(".game");
  gameArea.innerHTML = "";

  for (let card of arrayOfCards) {
    const gameCard = document.createElement("div");
    gameCard.classList.add("game__card");
    gameCard.style["transform"] = "rotateY(0deg)";
    const cardHolder = document.createElement("div");
    cardHolder.classList.add("game__card-container");

    const cardBack = document.createElement("img");
    cardBack.classList.add("game__card-back");
    cardBack.setAttribute("alt", `${card.alt}`);
    cardBack.setAttribute("src", `${card.link}`);

    const cardFront = document.createElement("img");
    cardFront.classList.add("game__card-front");
    cardFront.setAttribute("alt", "???");
    cardFront.setAttribute("src", "./img/back.jpg");
    cardFront.setAttribute("data-id", `${card.id}`);

    gameCard.append(cardBack);
    gameCard.append(cardFront);
    cardHolder.append(gameCard);
    gameArea.append(cardHolder);
  }

  listOfCardsPositions = document.querySelector(".game");

  cardsArray = Array.from(listOfCardsPositions.childNodes).map(
    (parent) => parent.firstChild
  );
  isSecondCard = false;
  lockGameProgress = false;
};

const pressButton = document.querySelector(".container__new-game");
pressButton.addEventListener("click", newGame);
newGame();

function flip(cardId) {
  cardsArray[cardId].style["transform"] =
    cardsArray[cardId].style["transform"] === "rotateY(-180deg)"
      ? "rotateY(0deg)"
      : "rotateY(-180deg)";
}

function clickCard(event) {
  if (lockGameProgress) {
    return;
  }

  if (event.target.dataset.id === undefined) {
    return;
  }

  if (event.target.parentElement.firstChild.style["opacity"] === "0.5") {
    return;
  }

  const currentCardId = Array.from(
    event.target.parentElement.parentElement.parentElement.children
  ).indexOf(event.target.parentElement.parentElement);

  if (isSecondCard) {
    flip(currentCardId);
    isSecondCard = false;
    lockGameProgress = true;

    if (compareCards(firstCardID, currentCardId)) {
      setTimeout(changeOpacity, 800);
    } else {
      setTimeout(flipBack, 800);
    }
  } else {
    isSecondCard = true;
    firstCardID = currentCardId;
    flip(currentCardId);
  }
}

function compareCards(firstCardID, currentCardId) {
  return cardsArray[firstCardID].lastChild.dataset.id ===
    cardsArray[currentCardId].lastChild.dataset.id
    ? true
    : false;
}
function changeOpacity() {
  cardsArray.map((child) => {
    if (child.style["transform"] === "rotateY(-180deg)") {
      child.firstChild.style["opacity"] = "0.5";
    }
  });
  lockGameProgress = false;
}

function flipBack() {
  cardsArray.map((child, index) => {
    if (
      child.style["transform"] === "rotateY(-180deg)" &&
      child.firstChild.style["opacity"] !== "0.5"
    ) {
      flip(index);
    }
  });
  lockGameProgress = false;
}

listOfCardsPositions.addEventListener("click", clickCard);
