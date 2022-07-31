import { cardImages } from './cardImages.js';
import { getShuffledImages } from './getShuffledImages.js';
import { addGameCard } from './addGameCard.js';
import { createGameCard } from './createGameCard.js';

const gameContent = document.querySelector('[data-game-content]');

const cardImagePath = './assets/images';

const shuffledImages = getShuffledImages(cardImages, cardImagePath);

shuffledImages
  .map((item) => createGameCard(item))
  .forEach((card) => addGameCard(gameContent, card));

let currentSelectedCard = '';
let previousSelectedCard = '';
let isActive = true;

function handleClick(event) {
  if (isActive) {
    if (!event.target.closest('.game__card')) return;

    if (!currentSelectedCard) {
      currentSelectedCard = event.target.closest('.game__card');
      currentSelectedCard.dataset.gameCardIsOpened = true;
      return;
    }

    if (currentSelectedCard) {
      previousSelectedCard = event.target.closest('.game__card');
      previousSelectedCard.dataset.gameCardIsOpened = true;
      isActive = false;

      const { gameCardName: currName } = currentSelectedCard.dataset;
      const { gameCardName: prevName } = previousSelectedCard.dataset;

      if (currName !== prevName) {
        setTimeout(() => {
          currentSelectedCard.dataset.gameCardIsOpened = false;
          previousSelectedCard.dataset.gameCardIsOpened = false;

          currentSelectedCard = '';
          previousSelectedCard = '';
          isActive = true;
          return;
        }, 1000);
      }

      if (currName === prevName) {
        currentSelectedCard = '';
        previousSelectedCard = '';
        isActive = true;
        return;
      }
    }
  }
}

gameContent.addEventListener('click', handleClick);
