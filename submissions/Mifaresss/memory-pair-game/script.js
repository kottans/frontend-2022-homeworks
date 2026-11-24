const buttonSwitch = document.querySelector('.switcher-theme__input');
buttonSwitch.addEventListener('click', toggleClass);

function toggleClass({ currentTarget }) {
  const inputStatus = currentTarget.checked;
  if (inputStatus) {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
  }
  localStorage.setItem('Theme', inputStatus);
}
function savesThemeSelection() {
  if (localStorage.getItem('Theme') == 'true') {
    document.body.classList.add('dark-theme');
    buttonSwitch.checked = 'true';
  }
}
savesThemeSelection();

const cards = document.querySelector('.cards');

function shuffleCards(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const cardsList = Array.from(cards.children);
shuffleCards(cardsList);
cardsList.forEach((card, index) => (card.style.order = index));

cards.addEventListener('click', handleCardClick);

const state = {
  flippedCards: [],
  hiddenCards: [],
};

function canFlipCard(card) {
  return card.classList.contains('flip') || card.classList.contains('cards') || card.classList.contains('cards__img');
}

function flipCard(card) {
  card.classList.add('flip');
  state.flippedCards.push(card);
}

function checkMatch(firstCard, secondCard) {
  if (firstCard.dataset.number === secondCard.dataset.number) {
    firstCard.classList.add('hidden');
    secondCard.classList.add('hidden');
    state.hiddenCards.push(firstCard, secondCard);
    resetGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
    }, 500);
  }
}

function handleCardClick({ target }) {
  if (canFlipCard(target)) return;
  flipCard(target);

  if (state.flippedCards.length === 2) {
    const [firstCard, secondCard] = state.flippedCards;
    checkMatch(firstCard, secondCard);
    state.flippedCards = [];
  }
}

function resetGame() {
  if (state.hiddenCards.length === 16) {
    setTimeout(() => {
      alert('Поздравляю, Вы прошли игру!');
      location.reload();
    }, 1000);
  }
}
