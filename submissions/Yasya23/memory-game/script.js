"use strict";

const cards = document.querySelectorAll(".game__card");
const winMessage = document.querySelector(".game__win");
const newGameButton = document.querySelector(".game__button");
const linkSteakersSite = document.querySelector(".link");

let flippedCard = false;
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let cardSum = 0;

function flipCard() {
  removeLink();

  if (this === firstCard || lockBoard === true) {
    return;
  }

  this.classList.add("flip");

  if (!flippedCard) {
    flippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function removeLink() {
  linkSteakersSite.classList.add("hide");
}

function checkForMatch() {
  const card1 = firstCard.dataset.framework;
  const card2 = secondCard.dataset.framework;
  card1 === card2 ? removeCards() : unflipCards();
}

function removeCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.add("hide");
    secondCard.classList.add("hide");
    cardSum += 2;
    if (cardSum === 16) {
      openWinMesage(cardSum);
    }
    resetHistory();
  }, 500);
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetHistory();
  }, 500);
}

function resetHistory() {
  flippedCard = false;
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function openWinMesage() {
  setTimeout(() => {
    winMessage.classList.add("block");
  }, 500);
}

function restartGame() {
  setTimeout(() => {
    winMessage.classList.remove("block");
    cards.forEach((card) => card.classList.remove("hide", "flip"));
    linkSteakersSite.classList.remove("hide");
    cardSum=0;
    mixCards();
  }, 500);
}

function mixCards() {
  cards.forEach((card) => {
    const position = Math.floor(Math.random() * 12);
    card.style.order = position;
  });
};

mixCards();

cards.forEach((card) => card.addEventListener("click", flipCard));
newGameButton.addEventListener("click", restartGame);

