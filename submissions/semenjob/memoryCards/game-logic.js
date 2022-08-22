"use strict";
import { memoryCardImages, memoryCardFrontImage } from "./constant.js";

document.addEventListener("DOMContentLoaded", (event) => {
  startGame();
});

const startGameBtn = document.querySelector(".start");
const titleGame = document.querySelector(".start_game");
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
    titleGame.style.display = "none";
    cardBlocked.forEach((card) => {
      card.classList.remove("block");
    });
  };

  startGameBtn.addEventListener("click", (event) => {
    const target = event.target;
    if (target) removeClassBlock();
  });

  let firstCards = null;

  cards.addEventListener("click", ({ target }) => {
    const selectedCard = target.closest(".memory_card");

    if (!selectedCard) return;
    toggleFlip(selectedCard);

    if (!firstCards) {
      firstCards = selectedCard;
    } else {
      dubleCheckCards(selectedCard);
    }
  });

  function dubleCheckCards(secondCards) {
    const isEqual = secondCards.dataset.cardId === firstCards.dataset.cardId;
    if (!isEqual) {
      setTimeout(() => {
        toggleFlip(secondCards);
        toggleFlip(firstCards);
        firstCards = null;
      }, 500);
    } else {
      secondCards.classList.add("flip");
      firstCards.classList.add("flip");
      firstCards = null;
      winGame += 1;
    }

    if (winGame === cardsLength) {
      alert("You win");
    }
  }

  resetGame.addEventListener("click", () => {
    reset();
  });

  const reset = () => {
    const cards = document.querySelector(".memory_cards");
    cards.innerHTML = null;
    startGame();
  };
}
