const sectionElement = document.querySelector(".memory-game");

const carCards = [{
    brand: "audi",
    image: "assets/image/audi.png",
}, {
    brand: "infinity",
    image: "assets/image/infinity.png",
}, {
    brand: "lambo",
    image: "assets/image/lambo.png",
}, {
    brand: "ferrari",
    image: "assets/image/ferrari.png",
}, {
    brand: "lexus",
    image: "assets/image/lexus.png",
}, {
    brand: "maserati",
    image: "assets/image/maserati.png",
}, {
    brand: "bentley",
    image: "assets/image/bentley.png",
}, {
    brand: "porsche",
    image: "assets/image/porsche.png",
}];

let sortedCards = [];

const mixCards = (carCards) => (sortedCards = carCards.sort(() => 0.5 - Math.random()));
mixCards([...carCards, ...carCards]);

sortedCards.forEach((car) => createCardElement(car));

function createCardElement({ brand, image }) {
    return sectionElement.insertAdjacentHTML("beforeend", `
    <div class="card" data-card-brand=${brand}>
        <img src="assets/image/front-bg-flipper.jpeg" alt="car" class="card_front">
        <img src=${image} alt=${brand} class="card_back">
    </div>`
    )
};

let first, second;
let lock = false;
let clickedCardsArray = [];

function startGame() {
    sectionElement.addEventListener("click", ({ target }) => {
        if (target.closest(".card") == null || target.closest(".card") == undefined)
            return;

        flipCard(target.closest(".card"));
        clickedCardsArray.push(target.closest(".card"));

        first = clickedCardsArray[0];
        second = clickedCardsArray[1];

        if (clickedCardsArray.length == 2) {
            matchCards();
        };
    });
};

startGame();

const countOfCards = 16;
let turnedCards = [];

function flipCard(clickedElement) {
    if (lock) return;
    clickedElement.classList.add("flip", "disableCard");

    turnedCards = document.querySelectorAll(".flip");
    if (turnedCards.length === countOfCards) {
        showModalWindowStartGame();
    }
};

function matchCards() {
    first.dataset.cardBrand === second.dataset.cardBrand ? disableDuplicateCards() : flipCardBack();
};

function flipCardBack() {
    lock = true;
    setTimeout(() => {
        first.classList.remove("flip", "disableCard");
        second.classList.remove("flip", "disableCard");
        lock = false;
        clickedCardsArray = [];
    }, 800);
}

function disableDuplicateCards() {
    first.removeEventListener('click', startGame);
    second.removeEventListener('click', startGame);
    clickedCardsArray = [];
};

function createModalWindowStartGame() {
    const parentElement = document.querySelector('.wrapper');
    parentElement.insertAdjacentHTML('afterbegin', `
    <div class="modal">
        <div class="modal_title"> My congratulations! </div>
        <p class="modal_text"> You won the game and found all pair of car brands </p>
        <button class="modal_btn">Restart game</button>
    </div>`
    )
    const btn = document.querySelector(".modal_btn");
    btn.addEventListener("click", restartGame);
};

createModalWindowStartGame();

const modal = document.querySelector(".modal");

function restartGame() {
    modal.classList.remove("modal_show");
    turnedCards.forEach(card => {
        card.classList.remove("flip", "disableCard");
        startGame();
    })
};

function showModalWindowStartGame() {
    modal.classList.add("modal_show");
}
