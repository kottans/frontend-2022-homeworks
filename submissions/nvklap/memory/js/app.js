const cardsData = [
  {
    id: 1,
    imgSrc: './img/cards/wizard.png'
  },
  {
    id: 2,
    imgSrc: './img/cards/bouncer.png'
  },
  {
    id: 3,
    imgSrc: './img/cards/shane.png'
  },
  {
    id: 4,
    imgSrc: './img/cards/elliott.png'
  },
  {
    id: 5,
    imgSrc: './img/cards/sandy.png'
  },
  {
    id: 6,
    imgSrc: './img/cards/marnie.png'
  },
  {
    id: 7,
    imgSrc: './img/cards/sam.png'
  },
  {
    id: 8,
    imgSrc: './img/cards/robin.png'
  }
];

const contentWrapper = document.querySelector('.content');
const gameMessageWrapper = document.querySelector('.game-message-wrapper');
const gameMessage = document.querySelector('.game-message');
const btnRestart = document.querySelector('.btn-restart');

const cardDeck = [...cardsData, ...cardsData];
const cardsQueue = [];
const MAX_QUEUE_LENGTH = 2;
const MESSAGE_WIN = 'You win!';
let foundMatch = 0;

showCardBoard(cardDeck);

btnRestart.addEventListener('click', () => {
  gameMessageWrapper.classList.toggle('visible');
  restartGame();
});

contentWrapper.addEventListener('click', openCard);

function openCard({ target }) {
  if (
    target.closest('.card') &&
    cardsQueue.length < MAX_QUEUE_LENGTH &&
    !target.closest('.card').className.includes('open')
  ) {
    const chosenCard = target.closest('.card');
    chosenCard.classList.add('open');

    cardsQueue.push(chosenCard);

    if (cardsQueue.length === MAX_QUEUE_LENGTH) {
      compareChosenCards(cardsQueue);
    }
  }
}

function compareChosenCards(queue) {
  queue[0].dataset.set === queue[1].dataset.set
    ? manageChosenCards(queue, 'found', true)
    : manageChosenCards(queue, 'open');
}

function manageChosenCards(queue, className, doMatch) {
  setTimeout(() => {
    queue.forEach((card) => card.classList.toggle(className));
    queue.splice(0, queue.length);

    if (doMatch) {
      foundMatch++;
      checkGameStatus();
    }
  }, 500);
}

function checkGameStatus() {
  if (foundMatch === cardsData.length) {
    gameMessageWrapper.classList.toggle('visible');
    showMessage(MESSAGE_WIN);
  }
}

function showMessage(message) {
  gameMessage.textContent = message;
}

function createHtmlElement(tagName, className) {
  const htmlElement = document.createElement(tagName);
  htmlElement.classList.add(className);
  return htmlElement;
}

function createCard(id, src) {
  const cardWrapper = createHtmlElement('li', 'card-container');
  const card = createHtmlElement('div', 'card');
  card.setAttribute('data-set', id);
  const cardFront = createHtmlElement('img', 'card-front');
  cardFront.setAttribute('src', src);
  const cardBack = createHtmlElement('div', 'card-back');
  card.append(cardFront, cardBack);
  cardWrapper.append(card);
  return cardWrapper;
}

function createCardBoard(deckData) {
  const cardBoard = createHtmlElement('ul', 'card-board');
  deckData.forEach(({ id, imgSrc }) => {
    const card = createCard(id, imgSrc);
    cardBoard.append(card);
  });

  return cardBoard;
}

function shuffleCardDeck(deck) {
  deck.sort(() => 0.5 - Math.random());
}

function showCardBoard(deck) {
  shuffleCardDeck(deck);
  const cardBoard = createCardBoard(deck);
  contentWrapper.append(cardBoard);
}

function restartGame() {
  foundMatch = 0;
  contentWrapper.innerHTML = '';
  showCardBoard(cardDeck);
}
