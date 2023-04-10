const body = document.querySelector("body");
const mainInner = document.querySelector(".main__inner");
const numberOfCards = 8;

let theme = "";
let matches = 0;
let moves = 0;
let isEndGame = false;
let secondsCounter = 0;
let minutesCounter = 0;
let minutes = "00";
let seconds = "00";
let firstCard;
let secondCard;
let isLock = false;
let isFlipped = false;
let isStartGame = true;

const CARD_IMG = {
    SOURSE: "./assets/img/",
    TYPE: ".svg"
};

const TIMEOUT = {
    CARD_UNFLIPPED: 1000,
    TIMER: 1000,
    SHOW_POPUP: 800
};

function countTime() {
    if (!isEndGame) {
        secondsCounter++;

        if (secondsCounter === 59) {
            secondsCounter = 0;
            minutesCounter++;
        }

        const getTimeValue = (timeValue) => timeValue < 10 ? "0" + timeValue :  timeValue;

        seconds = getTimeValue(secondsCounter);
        minutes = getTimeValue(minutesCounter);

        document.querySelector(".game__time").innerHTML = `Time: ${minutes}.${seconds}`;
        setTimeout(countTime, TIMEOUT.TIMER);
    }
}

function checkMatches() {
    if (firstCard.dataset.card === secondCard.dataset.card) {
        matches++;
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);

        if (matches === numberOfCards) {
            isEndGame = true;
            setTimeout(() => {
                generatePopup();
            }, TIMEOUT.SHOW_POPUP);
        }

        firstCard = undefined, secondCard = undefined;

    } else {
        isLock = true;

        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            isLock = false, firstCard = undefined, secondCard = undefined;
        }, TIMEOUT.CARD_UNFLIPPED);
    }
}

function flipCard() {
    if (isStartGame) {
        isEndGame = false, isStartGame = false;
        setTimeout(countTime, TIMEOUT.TIMER);
    }

    if (isLock) return;
    if (this === firstCard) return;

    this.classList.add("flipped");

    if (!isFlipped) {
        isFlipped = true, firstCard = this;
    } else {
        isFlipped = false, secondCard = this, moves++;
        document.querySelector(".game__moves").innerHTML = `Moves: ${moves}`;
        checkMatches();
    }
}

function generateStartPage() {
    mainInner.innerHTML = `<div class="start-page">
                                <div class="start-page__inner">
                                    <h1 class="start-page__title">Welcome to memory game!</h1>
                                    <p class="start-page__text">The game starts with all the cards face down and player take turn over two cards. If the two cards have the same picture, then the player keep the cards, otherwise they turn the cards face down again. The winner is the one who found all cards matches.</p>
                                    <p class="start-page__subtitle">Select theme to play game</p>
                                    <div class="details-group">
                                        <details class="details">
                                            <summary class="details__summary">
                                                <p class="details__text">Sailor Moon theme</p>
                                                <button class="details__button" id="sailor-moon">select</button>                   
                                            </summary>
                                            <p class="details__content">The theme is devoted to anime sailor moon. It will appeal to anime lovers, and not only, because the design is lovely.</p>
                                        </details>
                                        <details class="details">
                                            <summary class="details__summary">
                                                <p class="details__text">Daily Life theme</p>
                                                <button class="details__button" id="daily-life">select</button>
                                            </summary>
                                            <p class="details__content">A bright theme, reminiscent of the summer. Cards with cute icons of food, animals and cactus are also not forgotten...</p>
                                        </details>
                                        <details class="details">
                                            <summary class="details__summary">
                                                <p class="details__text">Gothic theme</p>
                                                <button class="details__button" id="gothic">select</button>
                                            </summary>
                                            <p class="details__content">Gothic, cold theme, cards with images of the Middle Ages.</p>
                                        </details>
                                    </div>
                                    <p class="start-page__subtitle start-page__copyright">&copy Ariadna Kravchuk 2022</p>
                                </div>
                            </div>`;

    document.querySelectorAll(".details__button").forEach((button) => {
        button.addEventListener("click", (event) => {
            body.className = event.target.id;
            theme = event.target.id;
            generateGame();
        });
    });
}

function generateCards() {
    const frontImage = theme === "gothic" ? "※" : "★";
    let cards = "";
    
    let cardsData = new Array(numberOfCards).fill(0).map((elem, index) => elem = index + 1);
    cardsData = cardsData.concat(cardsData).sort(() => 0.5 - Math.random());

    cardsData.forEach((cardData) => {
        cards += `<div class="card">
                      <div class="card__inner" data-card="${cardData}">
                          <div class="card__front">${frontImage}</div>
                          <div class="card__back">
                              <img src="${CARD_IMG.SOURSE + theme + "/" + cardData + CARD_IMG.TYPE}" alt="" class="card__img">
                          </div>
                      </div>
                  </div>`;
    });

    document.querySelector(".game__board").innerHTML = cards;
}

function generateGame() {
    mainInner.innerHTML = `<div class="game-page">
                                <h1 class="game-page__title">Memory Game</h1>
                                <div class="game-page__inner">
                                    <section class="game">
                                        <div class="game__board"></div>
                                        <div class="game__status-board">
                                            <p class="game__time">Time: 00.00</p>
                                            <p class="game__moves">Moves: 0</p>
                                        </div>
                                    </section>
                                </div>
                            </div>`;

    generateCards();

    document.querySelectorAll(".card__inner").forEach((card) => {
        card.addEventListener("click", flipCard);
    });
}

function generatePopup() {
    mainInner.innerHTML += `<div class="popup">
                                <div class="popup__inner">
                                    <p class="popup__title">Victory!</p>
                                    <p class="popup__text">Your score:</p>
                                    <p class="popup__text popup__score">Time: ${minutes}.${seconds} Moves: ${moves}</p>
                                    <div class="popup__buttons">
                                        <button class="popup__button" id="repeat">Repeat</button>
                                        <button class="popup__button" id="menu">Back to menu</button>
                                    </div>
                                </div>
                            </div>`;

    document.querySelectorAll(".popup__button").forEach((button) => {
        button.addEventListener("click", (event) => {
            event.target.id === "menu" ? generateStartPage() : generateGame();
            matches = 0, moves = 0, secondsCounter = 0, minutesCounter = 0, isStartGame = true;
        });
    });
}

generateStartPage();
