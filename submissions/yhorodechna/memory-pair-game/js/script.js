const MAIN = document.querySelector('#main');
const MAIN_GAME_BOARD_EL = document.querySelector('#main__game-board');
const MAIN_LEVEL = document.querySelector('#main__level');
const MAIN_WON_MESSAGE_EL = document.querySelector('#main__won-message');

const ESTATE = {
    question: 'question',
    number: 'number',
    hidden: 'hidden',
}

class Card {
    constructor({ num, id, state }) {
        this.num = num;
        this.id = id;
        this.state = state;
    };
    getClassName() {
        if (this.state === ESTATE.hidden) {
            return 'hidden';
        };
        if (this.state === ESTATE.number) {
            return 'active';
        };
        return '';
    };

    setState(newState) {
        if (this.state !== newState) {
            const currentEl = document.getElementById(this.id);
            if (currentEl.classList.contains(this.getClassName())) {
                currentEl.classList.remove(this.getClassName());
            };
            this.state = newState;
            if (this.getClassName()) {
                currentEl.classList.add(this.getClassName());
            };
        };
    };

    render() {
        return `
            <div id=${this.id} class="flip-container ${this.getClassName()}">
                <div class="flipper">
                    <div class="front">
                        <span class="card">?</span> 
                    </div>
                    <div class="back">
                        <span class="back__text">${this.num}</span> 
                    </div>
                </div>
            </div>
        `;
    };
};

class CardList {
    constructor({ size }) {
        this.size = size;
        this.cards = [];
    }
    init() {
        for (let i = 0; i < this.size; i++) {
            this.cards.push(new Card({
                num: Math.floor(i / 2),
                id: i.toString(),
                state: ESTATE.question
            }));
        };
        this.cards.sort(() => Math.random() - 0.5);
    };
    render() {
        return this.cards.map(card => card.render()).join('');
    };
    getCardsByState(state) {
        const filteredCards = this.cards.filter(card => card.state === state);
        return filteredCards;
    };
};

class Game {
    constructor(mainGameBoardEl) {
        this.mainGameBoardEl = mainGameBoardEl;
        this.size = 6;
        this.level = 1;
        this.activeCards = [];
        this.allMoves = 0;
        this.correctMoves = 0;
        this.accuracy = 100;
    };

    startGame() {
        this.allMoves = 0;
        this.correctMoves = 0;
        this.accuracy = 100;
        this.createLevelMessage();
        MAIN_WON_MESSAGE_EL.classList.add('hide');
        MAIN_GAME_BOARD_EL.classList.remove('hide');
        this.mainGameBoardEl.innerHTML = '';
        this.cardList = new CardList({ size: this.size, mainGameBoardEl: this.mainGameBoardEl });
        this.cardList.init();
        this.mainGameBoardEl.innerHTML = this.cardList.render();
    };

    createPlayerWonMessage() {
        MAIN_LEVEL.classList.add('hide');
        MAIN_WON_MESSAGE_EL.classList.remove('hide');
        this.accuracy = Math.floor((100 * this.correctMoves) / this.allMoves);
        const mainWonHtml = `
            <div class="won__message">
                <span class="won__level" >Level ${this.level} Completed!</span>
                <span class="won__moves" > You do ${this.allMoves} moves</span>
                <span class="won__accuracy" > Your accuracy ${this.accuracy}% </span>
                <button class="won__button" ><span class="won__button-text" >Go to the next level</span></button>
            </div>
            `;
        MAIN_GAME_BOARD_EL.classList.add('hide');
        MAIN_WON_MESSAGE_EL.innerHTML = mainWonHtml;
    };
    
    createLevelMessage() {
        MAIN_LEVEL.classList.remove('hide');
        const levelHtml = `
        <p class="main__level-text">Level ${this.level}</p>
        `;
        MAIN_LEVEL.innerHTML = levelHtml;
    };

    makeActiveCardsHidden() {
        this.activeCards.forEach(card => {
            card.setState(ESTATE.hidden);
        });
        this.activeCards = [];
        this.correctMoves++;
        this.allMoves++;
        let numberOfHiddenCards = this.cardList.getCardsByState(ESTATE.hidden).length;
        if (this.cardList.size == numberOfHiddenCards) {
            setTimeout(this.createPlayerWonMessage.bind(this), 500);
        };
    };

    makeActiveCardsVisibleWithQuestionSign() {
        this.activeCards.forEach(card => {
            card.setState(ESTATE.question);
        });
        this.activeCards = [];
        this.allMoves++;
    };

    onClick({ target }) {
        const flipContainer = target.closest('.flip-container');
        const wonButton = target.closest('.won__button');
        if (flipContainer && this.activeCards.length < 2) {
            const currentCard = this.cardList.cards.find(card => card.id === flipContainer.id);

            if (currentCard.state === ESTATE.question) {
                this.activeCards.push(currentCard);
                currentCard.setState(ESTATE.number);

                const [firstCard, secondCard] = this.activeCards;
                if (this.activeCards.length === 2 && firstCard.num === secondCard.num) {
                    setTimeout(this.makeActiveCardsHidden.bind(this), 500);
                    return;
                }
                else if (this.activeCards.length === 2 && firstCard.num !== secondCard.num) {
                    setTimeout(this.makeActiveCardsVisibleWithQuestionSign.bind(this), 500);
                    return;
                };
            };
        } else if (wonButton) {
            this.level++;
            if (this.size < 18) {
                this.size += 4;
            } else {
                this.size = 20;
            }
            this.startGame();
            return;
        };
    };
};

const GAME = new Game(MAIN_GAME_BOARD_EL);
GAME.startGame();
MAIN.addEventListener("click", GAME.onClick.bind(GAME));
