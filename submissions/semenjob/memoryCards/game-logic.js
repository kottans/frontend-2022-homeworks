"use strict";
import { memoryCardImages, memoryCardFrontImage } from "./constant.js";

document.addEventListener("DOMContentLoaded", (event) => {
  startGame();
});

const createMemoryCard = (id, front, back) => {
  const flipperTemplate = `
  <div class="flipper">
    <div class="front-view"><img src="${front}" alt="Card front view"></div>
    <div class="back-view"><img src="${back.img}" alt="${back.alt}"></div>
  </div>
  `;

  const card = document.createElement("div");
  card.classList.add("memory_card");
  card.innerHTML = flipperTemplate;
  card.dataset.cardId = id;
  return card;
};

const toggleFlip = (card) => {
  if (card !== null) {
    card.classList.toggle("flip");
  }
  return;
};

const initMemoryCardIndexes = (n) => {
  return Array(n)
    .fill()
    .map((_, idx) => 0 + idx)
    .flatMap((num) => [num, num])
    .sort(() => Math.random() - 0.5);
};

function startGame() {
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
    }
  }
}
