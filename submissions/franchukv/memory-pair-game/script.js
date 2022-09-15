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
const numberOfCards = 12;

let gameData;
let mainPopupBtn;
let isFlipped = false;
let lockBoard = false;
let firstCard, secondCard;
let matchCounter = 0;
let clickCounter = 0;

function getShuffledCards(cards, numberOfCards) {
    let temporaryArray = [...cards].sort(() => 0.5 - Math.random());
    let resultArray = [];

    for (let i = 0; i < (numberOfCards / 2); i++) {
        resultArray.push(temporaryArray[i]);
    }

    return [...resultArray, ...resultArray].sort(() => 0.5 - Math.random()).map((title) => ({ title }));
}

function addEventListenerToPopupBtn() {
    mainPopupBtn = document.querySelector('.popup__btn');
    mainPopupBtn.addEventListener('mouseup', initializeGame);
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

    restoreGameBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('memory-card--flipped');
        secondCard.classList.remove('memory-card--flipped');

        restoreGameBoard();
    }, 1000);
}

function restoreGameBoard() {
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

function createHeader() {
    popup.classList.add('popup--non-active');
    popup.innerHTML = '';

    header.innerHTML = `
    <div class="header__container">
        <h2 class="header__title">"Those who cannot remember the past are condemned to repeat it."</h2>
        <p class="header__subtitle">George Santayana</p>
    </div>
    `;
}

function createCardsBoard(numberOfCards) {
    const memoryCardsBoard = document.createElement('div');
    memoryCardsBoard.classList.add('memory-board');

    for (let i = 0; i < numberOfCards; i++) {
        memoryCardsBoard.innerHTML += `
        <div class="memory-card" data-civilization="${gameData[i].title}">
            <img class="backside" src="${backsideImg}">
            <div class="frontside">
                <img class="frontside-img" src="img/${gameData[i].title}.webp">
                <span class="frontside-title">${gameData[i].title}</span>
            </div>
        </div>
        `;
    }

    memoryGame.append(memoryCardsBoard);
}

function initializeGame() {
    if (popupBg.classList.contains('transparent-bg')) {
        popupBg.classList.remove('transparent-bg');
        resetGameBoard();
    }

    gameData = getShuffledCards(data, numberOfCards);

    createHeader();

    createCardsBoard(numberOfCards);

    const memoryCards = document.querySelectorAll('.memory-card');
    memoryCards.forEach(card => card.addEventListener('mouseup', flipCards));
}

function finishTheGame() {
    popup.classList.remove('popup--non-active');
    popupBg.classList.add('transparent-bg');
    popup.innerHTML = `
        <h1 class="popup__title">Victory!</h1>
        <p class="popup__click-counter">You won this game for ${clickCounter} clicks.</p>
        <span class="popup__btn">Start New Game</span>
    `;

    addEventListenerToPopupBtn();
}

(() => {
    popup.innerHTML = `
        <h1 class="popup__title">Memory - Pair Game inspired by Civilization 5</h1>
        <span class="popup__btn">Start Game</span>
    `;

    addEventListenerToPopupBtn();
})();
