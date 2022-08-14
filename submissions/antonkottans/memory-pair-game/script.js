const pipe = (...arrayOfFunctions) => {
    if (arrayOfFunctions.length === 0) return undefined;
    else if (arrayOfFunctions.length === 1) return arrayOfFunctions[0]();
    return arrayOfFunctions.reduce((prev, func) => {
        return func(prev);
    }, undefined);
};
let timerId = null;

const state = {
    timerId: null,
    guessedPairsAmount: 0,
    flipped: false,
    guessedPairs: [],
    guessedIds: new Set(),
    notGuessedIds: new Set(),
    cardContainers: [],
    bodyNode: null,
    timerNode: null,
};

const startTimer = () => {
    let minutes = 0;
    let seconds = 0;

    const increaseTimer = () => {
        seconds++;
        if (seconds === 60) {
            minutes++;
            seconds = 0;
        }
    };

    const getFormattedTimer = ({ minutes, seconds }) => {
        const addPriorZero = (number) => {
            if (number < 10) return "0" + number;
            else return +number;
        };
        return addPriorZero(minutes) + ":" + addPriorZero(seconds);
    };

    timerId = setInterval(() => {
        increaseTimer();
        state.timerNode.textContent = getFormattedTimer({ minutes, seconds });
    }, 1000);
};

const antiCheat = () => {
    if (state.cardContainers.length === 0)
        state.cardContainers = Array.from(
            document.querySelectorAll(".card-container")
        );
    state.cardContainers.forEach((node) => {
        if (
            state.guessedIds.has(
                node
                    .getAttribute("class")
                    .split(" ")
                    .find((clas) => {
                        return clas.includes("card_");
                    })
            )
        )
            node.classList.add("guessed");
        else node.classList.remove("guessed");
    });
};

const getCardName = (node) => {
    return node.getAttribute("src").slice(9, -4) || undefined;
};

const clickHandler = ({ target }) => {
    if (
        target.matches(".back") &&
        target.parentNode.childElementCount === 2 &&
        !target.closest('*[class*="card_"].flip-to-face')
    ) {
        target.closest('*[class*="card_"]').classList.add("flip-to-face");

        setTimeout(() => {
            const currentCardContainer = target.closest('*[class*="card_"]');
            const currentCardFace =
                target.closest('*[class*="card_"]').children[1];

            if (!state.flipped) {
                state.flipped = {
                    container: currentCardContainer,
                    face: currentCardFace,
                };
            } else {
                if (
                    getCardName(state.flipped.face) ===
                    getCardName(currentCardFace)
                ) {
                    currentCardContainer.classList.remove("flip-to-face");
                    state.flipped.container.classList.remove("flip-to-face");
                    state.guessedIds.add(state.flipped.face.getAttribute("id"));
                    state.guessedIds.add(currentCardFace.getAttribute("id"));
                    state.flipped = false;
                    state.guessedPairsAmount++;
                    if (state.guessedPairsAmount === 6) {
                        state.guessedPairsAmount = 0;
                        stopGame("win");
                    }
                } else {
                    currentCardContainer.classList.remove("flip-to-face");
                    state.flipped.container.classList.remove("flip-to-face");

                    state.flipped = false;
                }
            }
            antiCheat();
        }, 1000);
    }
};

const startGame = () => {
    clearInterval(timerId);
    state.guessedPairs = 0;
    state.guessedIds = new Set();
    document
        .querySelectorAll(".guessed")
        .forEach((elem) => elem.classList.remove("guessed"));
    setTimeout(() => {
        const cardImageNodes = getDoubledRandomImageNodes(6);
        state.notGuessedIds = new Set(
            cardImageNodes.map((node) => node.getAttribute("id"))
        );
        moveCardsIntoDOM(cardImageNodes);
        startTimer();
    }, 1000);
};

const stopGame = (result = "win") => {
    clearInterval(timerId);
    const span = document.createElement("span");
    span.classList.add("result");
    span.textContent =
        result === "win"
            ? `You won! You time:${state.timerNode.textContent}`
            : "You lost!";
    state.bodyNode.appendChild(span);
    span.addEventListener("click", () => {
        state.bodyNode.removeChild(span);
    });
};

const getDoubledRandomImageNodes = (amountOfElements) => {
    if (amountOfElements <= 0) return [];

    const getCardNames = (amount) => {
        return () => {
            const cardNames = [
                "ace_1",
                "ace_2",
                "ace_3",
                "ace_4",
                "king_1",
                "king_2",
                "king_3",
                "king_4",
                "queen_1",
                "queen_2",
                "queen_3",
                "queen_4",
            ];
            const result = [];
            while (result.length < amount) {
                const nameIndex = Math.floor(Math.random() * amountOfElements);
                if (!result.includes(cardNames[nameIndex]))
                    result.push(cardNames[nameIndex]);
            }
            return result;
        };
    };

    const convertNamesToNodes = (arrayOfNames) => {
        const result = [];
        arrayOfNames.forEach((name, i) => {
            const img = document.createElement("img");
            img.setAttribute("src", `./images/${name}.gif`);
            img.setAttribute("id", `card_${i + 1}`);
            img.classList.add("face");
            result.push(img);
        });
        return result;
    };

    const doubleAndShuffle = (arr) => {
        const doubledArr = [...arr, ...arr];
        const result = [];
        while (doubledArr.length > 0) {
            const randomIndex = Math.floor(Math.random() * doubledArr.length);
            result.push(doubledArr.splice(randomIndex, 1)[0]);
        }
        return result;
    };

    return pipe(
        getCardNames(amountOfElements),
        doubleAndShuffle,
        convertNamesToNodes
    );
};

const moveCardsIntoDOM = (cards) => {
    const cardContainers = document.querySelectorAll("div.card-container");
    if (cardContainers[0].childElementCount === 1)
        cardContainers.forEach((cardContainer, i) => {
            cardContainer.insertAdjacentElement("beforeend", cards[i]);
        });
    else
        cardContainers.forEach((cardContainer, i) => {
            cardContainer.replaceChild(cards[i], cardContainer.lastChild);
        });
};

const initialField = (amountOfCardOnField) => {
    const container = document.createElement("div");
    container.classList.add("field");
    for (let i = 1; i <= amountOfCardOnField; i++) {
        const perspectiveContainer = document.createElement("div");
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("card-container", `card_${i}`);
        const img = document.createElement("img");
        img.setAttribute("src", "./images/back.gif");
        img.setAttribute("alt", "");
        img.classList.add("back");
        perspectiveContainer.classList.add("perspective-container");
        perspectiveContainer.appendChild(cardContainer);
        cardContainer.appendChild(img);
        container.appendChild(perspectiveContainer);
    }
    return container;
};

document.addEventListener("DOMContentLoaded", () => {
    state.bodyNode = document.querySelector(".body");
    state.timerNode = document.querySelector(".timer");
    state.bodyNode.appendChild(initialField(12));
    document
        .querySelector("#game-button")
        .addEventListener("click", (event) => {
            event.preventDefault();
            startGame();
        });
    document.querySelector(".field").addEventListener("click", clickHandler);
});

