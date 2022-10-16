const doc = document;

const themesDataPath = "./themesData.json";

let themesData,
    themeIndex = 0,
    numberOfCards = 6,
    cardsSet,
    openedCards = [],
    foundPairs;

doc.querySelector(".game_field").addEventListener("click", (e) => {
    if (e.target.classList.contains("card_face")) {
        cardFlip(e.target.parentNode);
    }
});

makeMenuAndListeners();

function gameStart() {
    foundPairs = 0;
    renderGameField(numberOfCards);
    generateCardsSet(numberOfCards, themesData[themeIndex].pictures.length - 1);
    switchMenuAndGameField();
}

function renderGameField(numberOfCards) {
    const gameField = doc.querySelector(".game_field");
    gameField.classList.remove("field3x2");
    gameField.classList.remove("field4x3");
    switch (numberOfCards) {
        case 6:
            gameField.classList.add("field3x2");
            break;
        case 12:
            gameField.classList.add("field4x3");
            break;
        default:
            break;
    }
    gameField.innerHTML = new Array(numberOfCards)
        .fill(0)
        .reduce((innerhtml, curr, i) => {
            return (innerhtml += `<div class="game_card" data-card_id="${i}">
                <img src="./images/bg-hearts.png" alt="" class="card_face card_face_front">
                <img src="#" alt="" class="card_face card_face_back">
            </div>
        `);
        }, "");
}

function cardFlip(card) {
    if (!card.classList.contains("flipped")) {
        card.classList.add("flipped");
        openedCards.push(card);
        changeCardFace(card);
        checkPair();
    }
}

function checkPair() {
    if (openedCards.length === 2) {
        const firstCard = openedCards.at(-1),
            secondCard = openedCards.at(-2);
        if (
            cardsSet[firstCard.dataset.card_id] !==
            cardsSet[secondCard.dataset.card_id]
        ) {
            noMatchFound(firstCard, secondCard);
        } else {
            matchFound(firstCard, secondCard);
        }
    }
    winCheck();
}

function noMatchFound(firstCard, secondCard) {
    openedCards = [];
    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        setTimeout(() => {
            changeCardFace(firstCard);
            changeCardFace(secondCard);
        }, 500);
    }, 1000);
}

function matchFound(firstCard, secondCard) {
    openedCards = [];
    firstCard.classList.add("pair");
    secondCard.classList.add("pair");
    foundPairs++;
}

function winCheck() {
    if (foundPairs === cardsSet.length / 2) {
        setTimeout(() => {
            toggleWinWindow();
        }, 1000);
    }
}

function resetCardsStage() {
    document.querySelectorAll(".game_card").forEach((card) => {
        card.classList.remove("flipped");
        card.classList.remove("pair");
    });
}

function generateCardsSet(sizeOfSet, size) {
    let mixedSetOfPairs = [],
        setOfPairs = [];
    for (let i = 0; i < sizeOfSet / 2; i++) {
        const randomNumber = Math.floor(Math.random() * size);
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

function changeCardFace(card) {
    if (card.classList.contains("flipped")) {
        card.querySelector(".card_face_back").src =
            themesData[themeIndex].pictures[cardsSet[+card.dataset.card_id]];
    } else {
        card.querySelector(".card_face_back").src = "#";
    }
}
