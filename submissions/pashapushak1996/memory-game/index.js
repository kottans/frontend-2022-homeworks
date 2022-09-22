const pictures = [
    {
        "id": 1,
        "name": "Rick Sanchez",
        "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
    },
    {
        "id": 2,
        "name": "Morty Smith",
        "image": "https://rickandmortyapi.com/api/character/avatar/2.jpeg"
    },
    {
        "id": 3,
        "name": "Summer Smith",
        "image": "https://rickandmortyapi.com/api/character/avatar/3.jpeg"
    },
    {
        "id": 4,
        "name": "Beth Smith",
        "image": "https://rickandmortyapi.com/api/character/avatar/4.jpeg"
    },
    {
        "id": 5,
        "name": "Jerry Smith",
        "image": "https://rickandmortyapi.com/api/character/avatar/5.jpeg"
    },
    {
        "id": 6,
        "name": "Abadango Cluster Princess",
        "image": "https://rickandmortyapi.com/api/character/avatar/6.jpeg"
    },
    {
        "id": 7,
        "name": "Abradolf Lincler",
        "image": "https://rickandmortyapi.com/api/character/avatar/7.jpeg"
    },
    {
        "id": 8,
        "name": "Adjudicator Rick",
        "image": "https://rickandmortyapi.com/api/character/avatar/8.jpeg"
    }
];

const gameBox = document.querySelector('.game-box');

const shuffleArray = (arr) => {
    const arrayCopy = JSON.parse(JSON.stringify(arr));

    return arrayCopy.sort(() => 0.5 - Math.random());
};

const createCards = (array) => array.map((picture) => {
    const cardContainer = document.createElement('div');
    cardContainer.classList = "card-container";
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

let cards;
let count = 0;
let isFlippedCard = false;
let firstCard;
let secondCard;

const countText = document.querySelector('.count');
const popup = document.querySelector('.popup');
const popupButton = document.querySelector('.popup_btn');

const startGame = () => {
    const shuffledArrayOne = shuffleArray(pictures);
    const shuffledArrayTwo = shuffleArray(pictures);

    gameBox
        .append(...createCards(shuffledArrayOne), ...createCards(shuffledArrayTwo));

    cards = document.querySelectorAll('.card-container');

    count = 0;

    countText.innerText = `Number of moves - ${ count }`;

    addEventListenerToCard(cards);
};

startGame();

const toggleCssClasses = (item, classNames) => classNames.forEach((className) => item.classList.toggle(className));

const removeCssClasses = (item, classNames) => {
    classNames.forEach((className) => {
        if (item.classList.contains(className)) {
            item.classList.remove(className);
        }
    })
};

const checkPair = (firstCard, secondCard) => {
    const firstCardDataset = firstCard.dataset['character'];
    const secondCardDataset = secondCard.dataset['character'];

    if (firstCardDataset === secondCardDataset) {
        toggleCssClasses(firstCard, ['none']);
        toggleCssClasses(secondCard, ['none']);
    } else {
        setTimeout(() => {
            toggleCssClasses(firstCard, ['flipped']);
            toggleCssClasses(secondCard, ['flipped']);
        }, 1000);
    }

    isFlippedCard = false;
}

const checkBoard = () => {
    const isBoardClear =
        [...cards].every(card => card.classList.contains('flipped') && card.classList.contains('none'));

    if (isBoardClear) {
        setTimeout(() => {
            toggleCssClasses(popup, ['visible']);
        }, 50);
    }
};
const checkFlippedCards = () => {
    const flippedCards = [...document.querySelectorAll('.card-container')]
        .filter((card) => card.classList.contains('flipped'));

    return flippedCards.length >= 2
};

const flipCard = (card) => {
    toggleCssClasses(card, ['flipped']);

    if (!isFlippedCard) {
        isFlippedCard = true;
        firstCard = card;

        return;
    }

    secondCard = card;

    if (firstCard === secondCard) {
        removeCssClasses(card, ['flipped']);

        isFlippedCard = false;

        return;
    }

    count++;

    countText.innerText = `Number of moves - ${ count }`;

    checkPair(firstCard, secondCard);

    checkBoard();
};

function addEventListenerToCard(arrayOfCards) {
    arrayOfCards.forEach((card) => {
        card.addEventListener('click', () => {
            const isFlipped = checkFlippedCards();

            if (!isFlipped) {
                flipCard(card);
            }
        });
    });
}

popupButton.addEventListener('click', () => {
        toggleCssClasses(popup, ['visible']);

        cards.forEach((card) => {
            card.remove();
        });

        startGame();
    }
);
