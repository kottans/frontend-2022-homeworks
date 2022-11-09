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
    `)

    return cards
}

const shuffleCards = (arr) => {
    const card = arr.sort(() => 0.5 - Math.random()).map(createCard);
    mainField.append(...card);
};

shuffleCards(doubleNumbers);

const toggleCards = document.querySelectorAll('.flipper');
const hiddenCards = document.querySelectorAll('.card');
let ArrayCards = [];
let countFlipCards = 0;

const flipCard = ({target}) => {
    const targetCard = target.closest('.card');
    if (ArrayCards.length < 2) {
        if (!target.closest('.flip')){
            targetCard.classList.add('flip');
            ArrayCards.push(targetCard);
        }
    }
    if (ArrayCards.length === 2) {
        const oneCard = ArrayCards[0].dataset.dataid;
        const twoCard = ArrayCards[1].dataset.dataid;
        if(oneCard === twoCard){
            ArrayCards.forEach((card) => card.style.visibility = "hidden");
            countFlipCards += 2;
            ArrayCards = [];
        } else{
            setTimeout(() => {
                for (let i = 0; i < hiddenCards.length; i++) {
                    hiddenCards[i].classList.remove('flip');
                }
                ArrayCards = []
            }, 500)
        }
        if (countFlipCards === 12) {
            setTimeout(() => {
                alert('YOU WIN!')
                document.location.reload();
                countFlipCards = 0
            }, 1200);
        }
    }
}

toggleCards.forEach(card => card.addEventListener('click', flipCard));

