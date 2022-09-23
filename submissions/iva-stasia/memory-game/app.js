'use strict';

const cards = [
    {
        name: 'sock1',
        img: 'images/sock1.png'
    },
    {
        name: 'sock2',
        img: 'images/sock2.png'
    },
    {
        name: 'sock3',
        img: 'images/sock3.png'
    },
    {
        name: 'sock5',
        img: 'images/sock5.png'
    },
    {
        name: 'sock6',
        img: 'images/sock6.png'
    },
    {
        name: 'sock7',
        img: 'images/sock7.png'
    }
];

const gameBoard = document.querySelector('.game_board');
const clickBoard = document.querySelector('.clicks_qty');
const resetBttn = document.querySelector('.reset_bttn');
const playBttns = document.querySelectorAll('.play_bttn');
const winMessage = document.querySelector('.win_message');
const startMessage = document.querySelector('.start_message');
const clickQty = document.querySelector('.click_counter');

let boardLocked = true;
let flippedCardsName = [];
let flippedCards = [];
let foundCardsQty = 0;
let clickCounter = 0;

function shuffleCards() {
    return cards.sort(() => 0.5 - Math.random());
};

function generateCards(cardsExist = 0) {
    shuffleCards();

    cards.forEach(card => {
        gameBoard.insertAdjacentHTML('beforeend',
        `
            <div class='card_container' data-id='${cards.indexOf(card) + cardsExist}' data-name='${card.name}'>
                <img class='face' src=${card.img} data-id='${cards.indexOf(card) + cardsExist}' />
                <div class='back' data-id='${cards.indexOf(card) + cardsExist}'></div>
            </div>
        `);
    });
};

generateCards();
generateCards(cards.length);

function flipCard() {
    gameBoard.addEventListener('click', (event) => {
        if (boardLocked || event.target === gameBoard) return;

        if (flippedCards.length < 2) {
            const currentCard = event.target.closest('.card_container');
            const cardName = currentCard.getAttribute('data-name');

            currentCard.classList.add('flipped_card', 'locked');
            flippedCards.push(currentCard);
            flippedCardsName.push(cardName);
            
            clickCounter++;
            clickBoard.innerText = `${clickCounter}`;
        };

        if (flippedCards.length === 2) {
            boardLocked = true;
            setTimeout(checkMatch, 500);
        };
    });
};

flipCard();

function checkMatch() {
    if (flippedCardsName[0] !== flippedCardsName[1]) {
        setTimeout(() => 
        flippedCards.forEach(card => card.classList.remove('flipped_card', 'locked')), 200);
        setTimeout(resetBoard, 200);
        return;
    };

    if (flippedCardsName[0] === flippedCardsName[1]) {
        flippedCards.forEach(card => card.classList.add('found_locked'));
        foundCardsQty++;
        checkWin();        
        resetBoard();
        return;
    };
};

function resetBoard() {
    flippedCardsName = [];
    flippedCards = [];
    boardLocked = false;
};

function checkWin() {
    if (foundCardsQty === cards.length) {
        clickQty.innerText  = `${clickCounter}`;
        setTimeout(() => 
        winMessage.classList.add('show_message'), 1000);
    };
};

function resetGame() {
    const allCards = document.querySelectorAll('.card_container');
    allCards.forEach(card => card.classList.remove('flipped_card', 'found_locked'));
    resetBoard();
    foundCardsQty = 0;
    clickCounter = 0;
    clickBoard.innerText = `${clickCounter}`;
    gameBoard.innerHTML = '';
    generateCards();
    generateCards(cards.length);
};

resetBttn.addEventListener('click', () => {
    resetGame();
});

playBttns.forEach(bttn => bttn.addEventListener('click', () => {
    resetGame();
    startMessage.classList.remove('show_message');
    winMessage.classList.remove('show_message');
}));
