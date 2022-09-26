import arr from './json.js';

const main = document.querySelector('.main');
const doubleArray = [...arr, ...arr];

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

const renderCards = (arr) => {
    const card = arr.sort(() => 0.5 - Math.random()).map(createCard);
    main.append(...card);
};

renderCards(doubleArray);

const toggleCards = document.querySelectorAll('.flipper');
const hiddenCards = document.querySelectorAll('.card');
let ArrayCards = [];
let flipCards = 0;

const flipCard = ({target}) => {
    const targetCard = target.closest('.card');
    if (!target.closest('.flip')){
        targetCard.classList.add('flip');
        ArrayCards.push(targetCard);
    }

    if (ArrayCards.length === 2) {
        hiddenCard();
    }
};

const hiddenCard = () => {
    let oneCard = ArrayCards[0].dataset.dataid;
    let twoCard = ArrayCards[1].dataset.dataid;
    if(oneCard === twoCard){
        ArrayCards.forEach((card) => card.style.visibility = "hidden");
        flipCards += 2;
    } else{
        notHiddenCard();
    }
    ArrayCards = [];
    fullCards();
};

const notHiddenCard = () => {
    setTimeout(() => {
        for (let i = 0; i < hiddenCards.length; i++) {
            hiddenCards[i].classList.remove('flip');
        }
        ArrayCards = []
    }, 500)
};

const fullCards = () => {
    if (flipCards === 12) {
        setTimeout(() => {
            alert('YOU WIN!');
            document.location.reload();
            flipCards = 0
        }, 1200);
    }
};

toggleCards.forEach(card => card.addEventListener('click', flipCard));
