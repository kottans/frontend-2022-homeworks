const body = document.querySelector("body");
const startPage = document.querySelector(".start-page");
const gamePage = document.querySelector(".game-page");
const popup = document.querySelector(".popup");
const allDetails = document.querySelectorAll(".details");
const detailsButtons = document.querySelectorAll(".details__button");
const popupButtons = document.querySelectorAll(".popup__button");
const cards = document.querySelectorAll(".card");
const cardsInner = document.querySelectorAll(".card__inner");
const cardsBacks = document.querySelectorAll(".card__back");
const cardsFronts = document.querySelectorAll(".card__front");
const cardsIcons = document.querySelectorAll(".card__img");
const gameTime = document.querySelector(".game__time");
const gameMoves = document.querySelector(".game__moves");
const scorePopup = document.querySelector(".popup__score");

let theme = "",
    matches = 0,
    moves = 0;
let isEndGame = false,
    secondsCounter = 0,
    minutesCounter = 0,
    minutes = "00",
    seconds = "00";
let firstCard = [],
    secondCard = [],
    isLock = false,
    isFlipped = false,
    isStartGame = true;

const CARD_IMG = {
    SOURSE: "./assets/img/",
    QUANTITY: 8,
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

        seconds = secondsCounter < 10 ? "0" + secondsCounter : secondsCounter;
        minutes = minutesCounter < 10 ? "0" + minutesCounter : minutesCounter;

        if (secondsCounter === 59) {
            secondsCounter = 0;
            minutesCounter++;
        }

        gameTime.innerHTML = `Time: ${minutes}.${seconds}`;
        setTimeout(countTime, TIMEOUT.TIMER);
    }
}

function addCardsImages() {
    let frontImage = theme === "gothic" ? "※" : "★";

    for (let i = 0; i < CARD_IMG.QUANTITY * 2; i++) {
        cardsFronts[i].innerHTML = frontImage;
        cardsIcons[i].src =
            CARD_IMG.SOURSE + theme + "/" + cardsIcons[i].id + CARD_IMG.TYPE;
    }
}

function changeCardsOrders() {
    cards.forEach((card) => {
        card.style.order = Math.floor(Math.random() * 16);
    });
}

function changeTheme(event) {
    body.className = event.target.id;
    theme = event.target.id;
    gamePage.classList.remove("hidden");
    startPage.classList.add("hidden");
    allDetails.forEach((details) => {
        details.open = false;
    });
    addCardsImages();
    changeCardsOrders();
}

function returnMenu() {
    startPage.classList.remove("hidden");
    gamePage.classList.add("hidden");
    popup.classList.add("hidden");
    cardsFronts.innerHTML = "";
    cardsInner.forEach((card) => {
        card.classList.remove("flipped");
        card.addEventListener("click", flipCard);
    });
}

function restartGame() {
    cardsInner.forEach((card) => {
        card.classList.remove("flipped");
        card.addEventListener("click", flipCard);
        setTimeout(() => {
            changeCardsOrders();
            popup.classList.add("hidden");
        }, TIMEOUT.CARD_UNFLIPPED);
    });
}

function finishGame(event) {
    event.target.id === "menu" ? returnMenu() : restartGame();

    matches = 0, moves = 0, secondsCounter = 0, minutesCounter = 0;
    (isEndGame = false), (isStartGame = true);
    gameTime.innerHTML = `Time: 00.00`;
    gameMoves.innerHTML = `Moves: 0`;
}

function flipCard() {
    if (isStartGame) {
        setTimeout(countTime, TIMEOUT.TIMER);
        isStartGame = false;
    }

    if (isLock) return;
    if (this === firstCard) return;

    this.classList.add("flipped");

    if (!isFlipped) {
        isFlipped = true;
        firstCard = this;
    } else {
        isFlipped = false;
        secondCard = this;

        moves++;
        gameMoves.innerHTML = `Moves: ${moves}`;

        checkMatches();
    }
}

function checkMatches() {
    if (firstCard.id === secondCard.id) {
        matches++;
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);

        if (matches === CARD_IMG.QUANTITY) {
            isEndGame = true;
            scorePopup.innerHTML = `Time: ${minutes}.${seconds} Moves: ${moves}`;
            setTimeout(() => {
                popup.classList.remove("hidden");
            }, TIMEOUT.SHOW_POPUP);
        }
        firstCard = [], secondCard = [];
    } else {
        isLock = true;
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            isLock = false;
            firstCard = [], secondCard = [];
        }, TIMEOUT.CARD_UNFLIPPED);
    }
}

detailsButtons.forEach((button) => {
    button.addEventListener("click", changeTheme);
});

popupButtons.forEach((button) => {
    button.addEventListener("click", finishGame);
});

cardsInner.forEach((card) => {
    card.addEventListener("click", flipCard);
});
