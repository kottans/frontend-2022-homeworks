import arrayNumbers from './json.js';

const mainField = document.querySelector('.main');
const doubleNumbers = [...arrayNumbers, ...arrayNumbers];

const createCard = (arr) => {
    const {value, id} = arr;
    const cards = document.createElement('div');
    cards.className = 'card';
    cards.dataset.dataid = `${id}`;

    cards.insertAdjacentHTML('afterbegin', `
        <div id="${id}" class="flip-container">
            <div class="flipper">
                <div class="front">
                    <div class="front_card">You number</div>
                </div>
                <div class="back">
                    <div class="back_card">${value}</div>
                </div>
            </div>
        </div>
    `);

    return cards
};

const shuffleCards = (arr) => {
    const card = arr.sort(() => 0.5 - Math.random()).map(createCard);
    mainField.append(...card);
};

shuffleCards(doubleNumbers);

const toggleCards = document.querySelectorAll('.flipper');
let countFlipCards = 0;
let openedCardId = 0;
let awaitFlips = 0;
let oneCard;
let twoCard;

const flipCard = ({target}) => {
    if (awaitFlips === 1) return;
    if (openedCardId === 0){
        oneCard = target.closest('.card');
        openedCardId = oneCard.dataset.dataid;
        oneCard.classList.add('flip');
    } else {
        twoCard = target.closest('.card');
        if (twoCard === oneCard) return;
        awaitFlips = 1;
        if (openedCardId === twoCard.dataset.dataid) {
            openedCardId = 0;
            twoCard.classList.add('flip');
            oneCard.style.visibility = 'hidden';
            twoCard.style.visibility = 'hidden';
            setTimeout(() => {
                awaitFlips = 0;
            }, 800);
            countFlipCards += 2;
        } else{
            openedCardId = 0;
            twoCard.classList.add('flip');
            setTimeout(() => {
                oneCard.classList.remove('flip');
                twoCard.classList.remove('flip');
                awaitFlips = 0;
            }, 500)
        }
    }
    if (countFlipCards === 12) {
        setTimeout(() => {
            alert('YOU WIN!');
            document.location.reload();
            countFlipCards = 0
        }, 1200);
    }
};

toggleCards.forEach(card => card.addEventListener('click', flipCard));

