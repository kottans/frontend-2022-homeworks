const data = [
    'America', 'Arabs', 'Assyria', 'Austria', 'Aztec', 'Babylon', 'Brazilia',
    'Byzantia', 'Carthage', 'Celts', 'China', 'Dania', 'Egypt', 'England',
    'Ethiopia', 'France', 'Germany', 'Greece', 'Hunnics', 'Incas', 'India',
    'Indonesia', 'Iroquoises', 'Japan', 'Korea', 'Mayan', 'Mongolia', 'Morocco',
    'Netherlands', 'Ottomans', 'Persian', 'Poland', 'Polynesia', 'Portugal',
    'Rome', 'Shoshone', 'Siam', 'Songhai', 'Spain', 'Sweden', 'Venice', 'Zulu',
    // russia was excluded
];
const header = document.querySelector('.header');
const memoryGame = document.querySelector('.memory-game');
const popup = document.querySelector('.popup');
const popupBg = document.querySelector('.popup-background');
const backsideImg = 'img/backside.png';

let gameData;
let mainPopupBtn;
let isFlipped = false;
let lockBoard = false;
let firstCard, secondCard;
let matchCounter = 0;
let clickCounter = 0;

(function createFirstSreen() {
    popup.innerHTML = '';

    const popupTitle = document.createElement('h1');
    popupTitle.classList.add('popup__title');
    popupTitle.textContent = 'Memory - Pair Game inspired by Civilization 5';
    popup.append(popupTitle);

    const popupBtn = document.createElement('span');
    popupBtn.classList.add('popup__btn');
    popupBtn.textContent = 'Start Game';
    popup.append(popupBtn);

    addEventListenerToPopupBtn();
})();

function finishTheGame() {
    popup.classList.remove('popup--non-active');
    popupBg.classList.add('transparent-bg');

    popup.innerHTML = '';

    const popupTitle = document.createElement('h1');
    popupTitle.classList.add('popup__title');
    popupTitle.textContent = 'Victory!';
    popup.append(popupTitle);

    const popupClickCounter = document.createElement('p');
    popupClickCounter.classList.add('popup__click-counter');
    popupClickCounter.textContent = `You won this game for ${clickCounter} clicks.`;
    popup.append(popupClickCounter);

    const popupBtn = document.createElement('span');
    popupBtn.classList.add('popup__btn');
    popupBtn.textContent = 'Start New Game';
    popup.append(popupBtn);

    addEventListenerToPopupBtn();
}

function addEventListenerToPopupBtn() {
    mainPopupBtn = document.querySelector('.popup__btn');
    mainPopupBtn.addEventListener('mouseup', initializeGame);
}

function getShuffledArray(arr) {
    let tempArr = [...arr].sort(() => 0.5 - Math.random());
    let resultArr = [];

    for (let i = 0; i < 6; i++) {
        resultArr.push(tempArr[i]);
    }

    return [...resultArr, ...resultArr].sort(() => 0.5 - Math.random()).map((title) => ({ title }));
}

function createHeader() {
    popup.classList.add('popup--non-active');
    popup.innerHTML = '';

    const headerContainer = document.createElement('div');
    headerContainer.classList.add('header__container');
    header.append(headerContainer);

    const headerTitle = document.createElement('h2');
    headerTitle.classList.add('header__title');
    headerTitle.textContent = '"Those who cannot remember the past are condemned to repeat it."';
    headerContainer.append(headerTitle);

    const headerSubtitle = document.createElement('p');
    headerSubtitle.classList.add('header__subtitle');
    headerSubtitle.textContent = 'George Santayana';
    headerContainer.append(headerSubtitle);
}

function addCardToBoard(card) {
    const memoryCard = document.createElement('div');
    memoryCard.classList.add('memory-card');
    memoryCard.setAttribute('data-civilization', gameData[card].title);
    memoryGame.append(memoryCard);

    const backside = document.createElement('img');
    backside.classList.add('backside');
    backside.setAttribute('src', backsideImg);
    memoryCard.append(backside);

    const frontsideBlock = document.createElement('div');
    frontsideBlock.classList.add('frontside');
    memoryCard.append(frontsideBlock);

    const frontsideImg = document.createElement('img');
    frontsideImg.classList.add('frontside-img');
    frontsideImg.setAttribute('src', `img/${gameData[card].title}.webp`);
    frontsideBlock.append(frontsideImg);

    const frontsideTitle = document.createElement('span');
    frontsideTitle.classList.add('frontside-title');
    frontsideTitle.innerHTML = gameData[card].title;
    frontsideBlock.append(frontsideTitle);
}

function checkForMatch() {
    const isMatch = firstCard.dataset.civilization === secondCard.dataset.civilization;

    if (isMatch) {
        matchCounter++;
        disableCards();
    } else {
        unflipCards();
    }

    checkWin();
}

function disableCards() {
    firstCard.removeEventListener('mouseup', flipCards);
    secondCard.removeEventListener('mouseup', flipCards);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('memory-card--flipped');
        secondCard.classList.remove('memory-card--flipped');

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [isFlipped, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function resetGameBoard() {
    [clickCounter, matchCounter] = [0, 0];
    [header.innerHTML, memoryGame.innerHTML] = ['', ''];
}

function flipCards() {
    if (lockBoard) return;

    clickCounter++;

    if (this === firstCard) return;

    this.classList.add('memory-card--flipped');

    if (!isFlipped) {
        isFlipped = true;
        firstCard = this;

        return;
    }

    secondCard = this;

    checkForMatch();
}

function checkWin() {
    if (matchCounter != 6) return;

    setTimeout(() => {
        finishTheGame();
    }, 1000);
}

function initializeGame() {
    if (popupBg.classList.contains('transparent-bg')) {
        popupBg.classList.remove('transparent-bg');
        resetGameBoard();
    }

    gameData = getShuffledArray(data);

    createHeader();

    for (let i = 0; i < 12; i++) {
        addCardToBoard(i);
    }

    const memoryCards = document.querySelectorAll('.memory-card');
    memoryCards.forEach(card => card.addEventListener('mouseup', flipCards));
}
