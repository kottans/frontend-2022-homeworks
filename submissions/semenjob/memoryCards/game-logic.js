"use strict";
import { memoryCardImages, memoryCardFrontImage } from "./constant.js";

document.addEventListener("DOMContentLoaded", (event) => {
  startGame();
});

const startGameBtn = document.querySelector(".start");
const resetGame = document.querySelector(".reset");

const toggleFlip = (card) => {
  if (card !== null) {
    card.classList.toggle("flip");
  }
  return;
};

let winGame = 0;

const initMemoryCardIndexes = (n) => {
  return Array(n)
    .fill()
    .map((_, idx) => 0 + idx)
    .flatMap((num) => [num, num])
    .sort(() => Math.random() - 0.5);
};

function startGame() {
  const createMemoryCard = (id, front, back) => {
    const flipperTemplate = `
    <div class="flipper">
      <div class="front-view"><img src="${front}" alt="Card front view"></div>
      <div class="back-view"><img src="${back.img}" alt="${back.alt}"></div>
    </div>
    `;

    const card = document.createElement("div");
    card.classList.add("memory_card", "block");
    card.innerHTML = flipperTemplate;
    card.dataset.cardId = id;
    return card;
  };

  const cards = document.querySelector(".memory_cards");
  const cardsLength = 6;
  const cardIndexes = initMemoryCardIndexes(cardsLength);

  for (let i = 0; i < cardIndexes.length; i++) {
    const cardId = cardIndexes[i];
    const backgroundImage = memoryCardImages[cardId];
    const card = createMemoryCard(
      cardId,
      memoryCardFrontImage,
      backgroundImage
    );
    cards.append(card);
  }

  const cardBlocked = document.querySelectorAll(".memory_card");

  const removeClassBlock = () => {
    cardBlocked.forEach((card) => {
      card.classList.remove("block");
    });
  };

  startGameBtn.addEventListener("click", (event) => {
    const target = event.target;
    if (target) removeClassBlock();
  });

  let winGame = 0;
  class PairCards {
    constructor() {
      this.cards = [];
    }

    get isFull() {
      return this.cards.length === 2;
    }

    addCard(card) {
      this.cards.push(card);
    }

    check() {
      const cardId = this.cards[0].dataset.cardId;
      const isEqual = this.cards.every(
        (card) => card.dataset.cardId === cardId
      );
      if (isEqual) {
        winGame += 1;
        console.log("winGame");
        addClassBlock(this.cards);
        this.cards = [];
      }
      return isEqual;
    }

    reset() {
      setTimeout(() => {
        this.cards.forEach((cards) => {
          cards.classList.remove("flip");
        });
        this.cards = [];
      }, 1000);
    }
  }

  const winGameAutoReset = () => {
    cardBlocked.forEach((card) => {
      card.classList.remove("flip");
      card.classList.remove("block");
      cards.innerHTML = "";
      startGame();
    });
  };

  resetGame.addEventListener("click", () => {
    winGameAutoReset();
  });

  const addClassBlock = (cards) => {
    cards.forEach((card) => {
      card.classList.add("block");
    });
  };

  const pair = new PairCards();

  const processClickOnCard = ({ target }) => {
    const selectedCard = target.closest(".memory_card");
    if (!selectedCard) return;
    toggleFlip(selectedCard);
    pair.addCard(selectedCard);
    if (pair.isFull) {
      cards.removeEventListener("click", processClickOnCard);
      setTimeout(() => {
        cards.addEventListener("click", processClickOnCard);
      }, 500);
      const isEquel = pair.check();
      if (!isEquel) pair.reset();
    }
    if (winGame === cardsLength) {
      setTimeout(() => {
        alert("You win");
        winGameAutoReset();
      }, 1500);
    }
  };
  cards.addEventListener("click", processClickOnCard);
}
