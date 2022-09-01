const doc = document;

const themesDataPath = "./themesData.json";

let themesData,
    themeIndex = 0,
    numberOfCards = 6,
    cardsSet,
    openedCards = [],
    findedPairs;

doc.querySelector(".game_field").addEventListener("click", (e) =>
    isClickOnCard(e.target)
);

makeMenuAndListeners(themesDataPath);

function gameStart() {
    renderGameField(numberOfCards);
    generateCardsSet(numberOfCards, themesData[themeIndex].pictures.length - 1);
    findedPairs = 0;
    switchMenuAndGameField();
}

function renderGameField(numberOfCards) {
    const gameField = doc.querySelector(".game_field");
    switch (numberOfCards) {
        case 6:
            gameField.setAttribute("style", "--cols: 3; --rows: 2");
            break;
        case 12:
            gameField.setAttribute("style", "--cols: 4; --rows: 3");
            break;
        default:
            break;
    }
    gameField.innerHTML = new Array(numberOfCards)
        .fill(0)
        .map(
            (newCard, i) => `
            <div class="game_card" data-card_id="${i}">
                <img src="./images/bg-hearts.png" alt="" class="card_face card_face_front">
                <img src="#" alt="" class="card_face card_face_back">
            </div>
        `
        )
        .join("");
}

function isClickOnCard(target) {
    if (target.classList.contains("card_face")) {
        cardFlip(target.parentNode);
    }
}

function cardFlip(card) {
    if (!card.classList.contains("flipped")) {
        card.classList.add("flipped");
        openedCards.push(card);
        card.querySelector(".card_face_back").src =
            themesData[themeIndex].pictures[cardsSet[+card.dataset.card_id]];
        checkPair();
    }
}

function checkPair() {
    if (openedCards.length % 2 === 0) {
        const firstCard = openedCards.pop(),
            secondCard = openedCards.pop();
        openedCards = [];
        if (
            cardsSet[firstCard.dataset.card_id] !==
            cardsSet[secondCard.dataset.card_id]
        ) {
            noMatchFound(firstCard, secondCard);
        } else {
            matchFound(firstCard, secondCard);
        }
    }
    isWin();
}

function noMatchFound(firstCard, secondCard) {
    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        setTimeout(() => {
            firstCard.querySelector(".card_face_back").src = "#";
            secondCard.querySelector(".card_face_back").src = "#";
        }, 500);
    }, 1000);
}

function matchFound(firstCard, secondCard) {
    firstCard.classList.add("pair");
    secondCard.classList.add("pair");
    findedPairs++;
}

function isWin() {
    if (findedPairs === cardsSet.length / 2) {
        setTimeout(() => {
            showWinWindow("show");
        }, 1000);
    }
}

function resetCardsStage() {
    document.querySelectorAll(".game_card").forEach((card) => {
        card.classList.remove("flipped");
        card.classList.remove("pair");
    });
}

function generateCardsSet(sizeOfSet, highestNumber) {
    let mixedSetOfPairs = [],
        setOfPairs = [];
    for (let i = 0; i < sizeOfSet / 2; i++) {
        const randomNumber = Math.floor(Math.random() * highestNumber);
        if (!setOfPairs.includes(randomNumber)) {
            setOfPairs.push(randomNumber, randomNumber);
        } else {
            i--;
        }
    }
    while (setOfPairs.length >= 1) {
        const index = Math.floor(Math.random() * (setOfPairs.length - 1));
        if (Math.random() < 0.5) {
            mixedSetOfPairs.push(setOfPairs[index]);
        } else {
            mixedSetOfPairs.unshift(setOfPairs[index]);
        }
        setOfPairs.splice(index, 1);
    }
    cardsSet = mixedSetOfPairs;
}
