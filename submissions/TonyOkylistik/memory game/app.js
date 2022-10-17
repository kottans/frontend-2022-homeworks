"use strict";

const ulList = document.querySelector(".game-box");
const div = document.createElement("div");
const banner = document.querySelector(".result");

const imgBack = document.createElement("img");
imgBack.src = "./img/back.jpg";

let cards = [1, 2, 3, 4, 5, 6];
cards = [...cards, ...cards];
let pairCards = [];

const generateCard = (num, id) => {
  const card = `
  <li class="game-item">
<div class="flipper" data-item=${id}>
    <div class="front">
        <img src="./img/${num}.jpg" alt="">
    </div>
    <div class="back">
    <img src="./img/back.jpg" alt="">
    </div>
</div>
</li>
`;
  return card;
};

const startGame = () => {
  banner.classList.add("popup");
  random();
  reset();
  let id = 0;
  const cardsOnBoard = (i) =>
    ulList.insertAdjacentHTML("beforeend", generateCard(i, id++));
  cards.forEach((card) => cardsOnBoard(card));
};

ulList.addEventListener("click", onClick);

function reset() {
  while (ulList.firstChild) {
    ulList.removeChild(ulList.firstChild);
  }
}

function random() {
  let j, temp;
  cards.forEach((i) => {
    j = Math.floor(Math.random() * cards.length);
    temp = cards[j];
    cards[j] = cards[i];
    cards[i] = temp;
  });
}

function checkCards(pathCard) {
  return pathCard.querySelector(".front").img;
}

function onClick(e) {
  if (openedCard().length < 2) {
    const thisCard = e.target.closest(".flipper");
    thisCard.classList.add("flip");

    if (thisCard.dataset.item !== pairCards[0]) {
      pairCards.push(thisCard.dataset.item);
    }

    if (pairCards.length >= 2) {
      sameCard(pairCards[0], pairCards[1]);
      return (pairCards = []);
    }
  }
}

function openedCard() {
  return ulList.querySelectorAll(".flip");
}

function clothedCard() {
  openedCard().forEach((i) => i.classList.remove("flip"));
}

function sameCard(first, second) {
  const pData = document.getElementsByTagName("dataset.id");

  if (cards[first] === cards[second]) {
    delay(killPair);
  } else {
    delay(clothedCard);
  }
}

function delay(fn, time = 1000) {
  return setTimeout(() => fn(), time);
}

function killPair() {
  openedCard().forEach((card) => {
    card.classList.add("hide");
    card.classList.remove("flip");
  });
  emptyFlow();
}

function emptyFlow() {
  const hideListCards = document.querySelectorAll(".hide");
  if (hideListCards.length === 12) {
    reset();
    return banner.classList.remove("popup");
  }
}
startGame();
