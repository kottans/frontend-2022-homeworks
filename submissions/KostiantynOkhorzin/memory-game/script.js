'use strict';

const gameBody = document.querySelector('.game__body');
let playerSteps = 0;
const time = 1500;

const getData = () => [
    { imgSrc: "img/ananas.png", name: "ananas" },
    { imgSrc: "img/apple.png", name: "apple" },
    { imgSrc: "img/avocado.png", name: "avocado" },
    { imgSrc: "img/banana.png", name: "banana" },
    { imgSrc: "img/kiwi.png", name: "kiwi" },
    { imgSrc: "img/lime.png", name: "lime" },
    { imgSrc: "img/ananas.png", name: "ananas" },
    { imgSrc: "img/apple.png", name: "apple" },
    { imgSrc: "img/avocado.png", name: "avocado" },
    { imgSrc: "img/banana.png", name: "banana" },
    { imgSrc: "img/kiwi.png", name: "kiwi" },
    { imgSrc: "img/lime.png", name: "lime" },
];

const styleList = {
    card: 'game__card',
    flippedCard: 'game__card_flipped',
    selectedCard: 'game__card_selected',
    hiddenCard: 'game__card_hidden'
}

class GameCard {
    constructor(img, name) {
        this.img = img;
        this.name = name;
    }

    render() {
        gameBody.insertAdjacentHTML('beforeend', `
            <button class="game__card" data-name=${this.name}>
                <span class="game__card-front"></span>
                <img class="game__card-back" src=${this.img} alt=${this.name}>
            </button>
        `);
    }
};

const randomize = () => {
    return getData().sort(() => Math.random() - 0.5);
};

const renderCards = () => {
    randomize().map(({ imgSrc, name }) => new GameCard(imgSrc, name).render());
};

const disableCards = () => {
    const cards = document.querySelectorAll('.game__card');
    cards.forEach(card => {
        card.setAttribute('disabled', '');
        setTimeout(() => {
            card.removeAttribute('disabled');
        }, 3000);
    });
};

const flippingCards = (e) => {
    if (e.target.classList.contains(styleList.card)) {
        e.target.classList.add(styleList.selectedCard, styleList.flippedCard);
        const flippedCards = document.querySelectorAll(`.${styleList.flippedCard}`);
        const selectedCards = document.querySelectorAll(`.${styleList.selectedCard}`);
        if (selectedCards.length === 2) {
            disableCards();
            if (selectedCards[0].dataset.name === selectedCards[1].dataset.name) {
                selectedCards.forEach((card) => {
                    card.classList.remove(styleList.selectedCard);
                    setTimeout(() => card.classList.add(styleList.hiddenCard), time);
                })
            } else {
                selectedCards.forEach((card) => {
                    card.classList.remove(styleList.selectedCard);
                    setTimeout(() => card.classList.remove(styleList.flippedCard), time);
                });
                playerSteps++;
            };
        };
        if (flippedCards.length === 12) {
            restart();
        };
    };
};

const restart = () => {
    setTimeout(() => {
        alert(`you win in ${playerSteps} steps`);
        gameBody.innerHTML = '';
        playerSteps = 0;
        renderCards();
    }, 2000);
};

renderCards();

gameBody.addEventListener('click', flippingCards);


