const pictures = [
    {
        "name": "Rick Sanchez",
        "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
    },
    {
        "name": "Morty Smith",
        "image": "https://rickandmortyapi.com/api/character/avatar/2.jpeg"
    },
    {
        "name": "Summer Smith",
        "image": "https://rickandmortyapi.com/api/character/avatar/3.jpeg"
    },
    {
        "name": "Beth Smith",
        "image": "https://rickandmortyapi.com/api/character/avatar/4.jpeg"
    },
    {
        "name": "Jerry Smith",
        "image": "https://rickandmortyapi.com/api/character/avatar/5.jpeg"
    },
    {
        "name": "Abadango Cluster Princess",
        "image": "https://rickandmortyapi.com/api/character/avatar/6.jpeg"
    },
    {
        "name": "Abradolf Lincler",
        "image": "https://rickandmortyapi.com/api/character/avatar/7.jpeg"
    },
    {
        "name": "Adjudicator Rick",
        "image": "https://rickandmortyapi.com/api/character/avatar/8.jpeg"
    }
];

const countText = document.querySelector('.count');
const popup = document.querySelector('.popup');
const popupButton = document.querySelector('.popup_btn');
const gameBox = document.querySelector('.game-box');

let cards;
let count = 0;
let isFlippedCard = false;
let firstCard;
let secondCard;


const shuffleArray = (arr) => {
    const arrayCopy = JSON.parse(JSON.stringify(arr));

    return arrayCopy.sort(() => 0.5 - Math.random());
};

const createCards = (array) => array.map((picture) => {
    const cardContainer = document.createElement('div');

    cardContainer.className = "card-container";

    cardContainer.setAttribute('data-character', picture.name);

    cardContainer.innerHTML = `
                    <div class="flipper">
                      <div class="front"></div>
                      <div class="back">
                        <img src="${ picture.image }" alt="picture">
                      </div>
                    </div>`

    return cardContainer;
});

const startGame = () => {
    const shuffledArrayOne = shuffleArray(pictures);
    const shuffledArrayTwo = shuffleArray(pictures);

    gameBox
        .append(...createCards(shuffledArrayOne), ...createCards(shuffledArrayTwo));

    cards = document.querySelectorAll('.card-container');

    count = 0;

    countText.innerText = `Number of moves - ${ count }`;

    gameBox.addEventListener('click', cardOnClick);
};

startGame();

const toggleCssClass = (item, className) => item.classList.toggle(className);

const checkPair = (firstCard, secondCard) => {
    const firstCardDataset = firstCard.dataset['character'];
    const secondCardDataset = secondCard.dataset['character'];

    if (firstCardDataset === secondCardDataset) {
        toggleCssClass(firstCard, 'none');
        toggleCssClass(secondCard, 'none');
    } else {
        setTimeout(() => {
            toggleCssClass(firstCard, 'flipped');
            toggleCssClass(secondCard, 'flipped');
        }, 1000);
    }

    isFlippedCard = false;
}

const checkBoard = () => {
    const isBoardClear =
        [...cards].every(card => card.classList.contains('flipped') && card.classList.contains('none'));

    if (isBoardClear) {
        setTimeout(() => {
            toggleCssClass(popup, 'visible');
        }, 50);
    }
};

const checkFlippedCards = () => {
    const flippedCards = [...document.querySelectorAll('.card-container')]
        .filter((card) => card.classList.contains('flipped') && !card.classList.contains('none'));

    return flippedCards.length >= 2
};

const flipCard = (card) => {
    if (!isFlippedCard) {
        isFlippedCard = true;
        firstCard = card;

        toggleCssClass(card, 'flipped');

        return;
    }

    secondCard = card;

    if (firstCard !== secondCard) {
        toggleCssClass(card, 'flipped');

        count++;

        countText.innerText = `Number of moves - ${ count }`;

        checkPair(firstCard, secondCard);

        checkBoard();
    }
};

function cardOnClick({ target }) {
    const card = target.closest('.card-container');

    if (!card) {
        return;
    }

    const isFlipped = checkFlippedCards();

    if (!isFlipped) {
        flipCard(card);
    }
}

function popupBtnOnClick() {
    toggleCssClass(popup, 'visible');

    gameBox.innerHTML = '';

    gameBox.removeEventListener('click', cardOnClick);

    startGame();
}

popupButton.addEventListener('click', popupBtnOnClick);
