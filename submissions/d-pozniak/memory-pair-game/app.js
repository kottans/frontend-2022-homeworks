const UNIQUE_CARDS = [
    "big-slice",
    "circle-slice",
    "full-plus-slice",
    "slightly-cut",
    "triangle-slice",
    "uncut",
];
const CARD_ARRAY = UNIQUE_CARDS.concat(UNIQUE_CARDS);

const gameField = document.getElementById("game-field");
let firstSelectedElem, secondSelectedElem;
let totalSelectedAmount = 0,
    totalAmount = CARD_ARRAY.length;

function shuffleCards(cardArr) {
    return cardArr.slice(0).sort(() => 0.5 - Math.random());
}
function createTempEl(tag, classNames) {
    const tempElem = document.createElement(tag);
    tempElem.className = classNames;
    return tempElem;
}
function createTempWrappedImg(wrapClass, imgClass, path) {
    const tempWrap = createTempEl("div", wrapClass),
        tempImg = createTempEl("img", imgClass);
    tempImg.setAttribute("src", "img/" + path + ".png");
    tempImg.setAttribute("alt", "watermelon " + path);
    tempWrap.append(tempImg);
    return tempWrap;
}
function createTempCardEl(card) {
    const tempCard = createTempEl("div", "game-card");
    tempCard.append(
        createTempEl("div", "front"),
        createTempWrappedImg("back", "card-img", card)
    );
    return tempCard;
}
function checkSimilarity(elem1, elem2) {
    return (
        elem1.parentElement.querySelector(".card-img").getAttribute("src") ===
        elem2.parentElement.querySelector(".card-img").getAttribute("src")
    );
}
function handleClicks(e) {
    if (
        e.target.id !== gameField.id &&
        !e.target.parentElement.parentElement.classList.contains("active") &&
        !e.target.parentElement.classList.contains("active")
    ) {
        totalSelectedAmount++;
        if (totalSelectedAmount === 1) {
            firstSelectedElem = e.target;
            changeCardTo("active", firstSelectedElem);
        } else if (totalSelectedAmount === 2) {
            secondSelectedElem = e.target;
            changeCardTo("active", secondSelectedElem);
            if (checkSimilarity(firstSelectedElem, secondSelectedElem)) {
                setTimeout(() => {
                    changeCardTo("matched", firstSelectedElem, secondSelectedElem);
                    totalAmount -= 2;
                    monitorGameEnd();
                }, 1000);
            }
            setTimeout(() => {
                totalSelectedAmount = 0;
                revertCards(firstSelectedElem, secondSelectedElem);
            }, 1000);
        }
    }
}
function changeCardTo(classToAdd) {
    const [className, ...args] = [...arguments];
    args.forEach((e) => e.parentElement.classList.add(className));
}
function revertCards() {
    [...arguments].forEach((e) => {
        e.parentElement.classList.remove("active");
        e = undefined;
    });
}
function startGame(area) {
    area.addEventListener("click", (e) => handleClicks(e));
}
function monitorGameEnd() {
    if (totalAmount === 0) {
        const winMessage = document.querySelector(".win-message");
        winMessage.classList.add("show-win");
        winMessage
            .querySelector(".restart-button")
            .addEventListener("click", () => {
                restartGame(gameField, CARD_ARRAY);
                winMessage.classList.remove("show-win");
            });
    }
}
function restartGame(field, cards) {
    field.replaceChildren();
    setGame(field, cards);
}
function setGame(field, cards) {
    const cardSet = shuffleCards(cards);
    const tempElems = cardSet.map((card) => createTempCardEl(card));
    tempElems.forEach((elem) => field.appendChild(elem));
    startGame(field);
}
setGame(gameField, CARD_ARRAY);
