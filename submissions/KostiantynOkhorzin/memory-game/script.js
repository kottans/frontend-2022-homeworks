const gameBody = document.querySelector('.game__body');
let playerSteps = 0;

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
    randomize().forEach(({ imgSrc, name }) => new GameCard(imgSrc, name).render());
};

const checkCards = (e) => {
    if (e.target.classList.contains('game__card')) {
        e.target.classList.add('game__card_selected', 'game__card_flipped');
        const flippedCards = document.querySelectorAll('.game__card_flipped');
        const selectedCards = document.querySelectorAll('.game__card_selected');
        if (flippedCards.length === 2) {
            if (flippedCards[0].dataset.name === flippedCards[1].dataset.name) {
                flippedCards.forEach((card) => {
                    card.classList.remove('game__card_flipped');
                    setTimeout(() => card.classList.add('game__card_hidden'), 1000);
                })
            } else {
                flippedCards.forEach((card) => {
                    card.classList.remove('game__card_flipped');
                    setTimeout(() => card.classList.remove('game__card_selected'), 1000);
                });
                playerSteps++;
            };
        };
        if (selectedCards.length === 12) {
            restart();
        }
    };
};

const restart = () => {
    setTimeout(() => {
        alert(`you win in ${playerSteps} steps`);
        gameBody.innerHTML = '';
        renderCards();
    }, 2000);
};

renderCards();

gameBody.addEventListener('click', checkCards);


