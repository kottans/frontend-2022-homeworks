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
const clicksBoard = document.querySelector('.clicks_qty');
const resetBtn = document.querySelector('.reset_btn');
const playBtns = document.querySelectorAll('.play_btn');
const winMessage = document.querySelector('.win_message');
const startMessage = document.querySelector('.start_message');
const clickQty = document.querySelector('.click_counter');

let isBoardLocked = true;
let flippedCardsNames = [];
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
    gameBoard.addEventListener('click', ({ target }) => {
        if (isBoardLocked || target === gameBoard) return;

        if (flippedCards.length < 2) {
            const currentCard = target.closest('.card_container');
            const cardName = currentCard.getAttribute('data-name');

            currentCard.classList.add('flipped_card', 'locked');
            flippedCards.push(currentCard);
            flippedCardsNames.push(cardName);
            
            clickCounter++;
            clicksBoard.innerText = `${clickCounter}`;
        };

        if (flippedCards.length === 2) {
            isBoardLocked = true;
            setTimeout(checkMatch, 500);
        };
    });
};

flipCard();

function checkMatch() {
    if (flippedCardsNames[0] !== flippedCardsNames[1]) {
        setTimeout(() => 
        flippedCards.forEach(card => card.classList.remove('flipped_card', 'locked')), 200);
        setTimeout(resetBoard, 200);
        return;
    };

    if (flippedCardsNames[0] === flippedCardsNames[1]) {
        flippedCards.forEach(card => card.classList.add('found_locked'));
        foundCardsQty++;
        checkWin();        
        resetBoard();
        return;
    };
};

function resetBoard() {
    flippedCardsNames = [];
    flippedCards = [];
    isBoardLocked = false;
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
    clicksBoard.innerText = `${clickCounter}`;
    gameBoard.innerHTML = '';
    generateCards();
    generateCards(cards.length);
};

resetBtn.addEventListener('click', () => {
    resetGame();
});

playBtns.forEach(btn => btn.addEventListener('click', () => {
    resetGame();
    startMessage.classList.remove('show_message');
    winMessage.classList.remove('show_message');
}));
