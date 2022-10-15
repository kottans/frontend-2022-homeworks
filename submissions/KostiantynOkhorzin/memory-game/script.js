'use strict';

const gameBody = document.querySelector('.game__body');
let playerSteps = 0;
const cardProcessingTime = 1500;

const dataImgs = [
    { imgSrc: "img/ananas.png", name: "ananas" },
    { imgSrc: "img/apple.png", name: "apple" },
    { imgSrc: "img/avocado.png", name: "avocado" },
    { imgSrc: "img/banana.png", name: "banana" },
    { imgSrc: "img/kiwi.png", name: "kiwi" },
    { imgSrc: "img/lime.png", name: "lime" }
];

const imgItems = [...dataImgs, ...dataImgs];

const styleList = {
    card: 'game__card',
    flippedCard: 'game__card_flipped',
    selectedCard: 'game__card_selected',
    hiddenCard: 'game__card_hidden',
    frontCard: 'game__card-front',
    backCard: 'game__card-back'
}

class GameCard {
    constructor(img, name) {
        this.img = img;
        this.name = name;
    }

    render() {
        gameBody.insertAdjacentHTML('beforeend', `
            <button class=${styleList.card} data-name=${this.name}>
                <span class=${styleList.frontCard}></span>
                <img class=${styleList.backCard} src=${this.img} alt=${this.name}>
            </button>
        `);
    }
};

const randomlyMixArrayElem = () => {
    return imgItems.sort(() => Math.random() - 0.5);
};

const renderCards = () => {
    randomlyMixArrayElem().map(({ imgSrc, name }) => new GameCard(imgSrc, name).render());
};

const handleCardFlip = ({ target }) => {
    if (!target.classList.contains(styleList.card)) return;
    target.classList.add(styleList.selectedCard, styleList.flippedCard);
    const flippedCards = document.querySelectorAll(`.${styleList.flippedCard}`);
    const selectedCards = document.querySelectorAll(`.${styleList.selectedCard}`);
    if (selectedCards.length === 2) {
        selectedCards.forEach((card) => {
            card.classList.remove(styleList.selectedCard);
            card.style.pointerEvents = 'none';
            if (selectedCards[0].dataset.name === selectedCards[1].dataset.name) {
                setTimeout(() => card.classList.add(styleList.hiddenCard), cardProcessingTime);
            } else {
                setTimeout(() => {
                    card.style.pointerEvents = 'all';
                    card.classList.remove(styleList.flippedCard)
                }, cardProcessingTime);
            };
        });
        playerSteps++;
    };
    if (flippedCards.length === 12) {
        restart();
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

gameBody.addEventListener('click', handleCardFlip);
