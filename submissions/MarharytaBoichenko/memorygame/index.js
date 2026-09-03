import data from "./data.json" assert { type: "json" };

const startButton = document.querySelector(".instruction__button");
const wrapper = document.querySelector(".wrapper");
const allCards = [];

const getCardsForGame = () => {
  const arrToGame = [...allCards, ...allCards].sort(function () {
    return 0.5 - Math.random();
  });
  return arrToGame;
};

const createCards = (arrToGame) => {
  const cards = arrToGame
    .map(
      ({ image, id }) => `<li class="flip-card cards__item" data-id='${id}' ">
          <div class="flipper">
            <div class="cards__item--front">
            </div>
            <div class="cards__item--back">
              <img class="cards__image" src='${image}' />
            </div>
          </div>
        </li>`
    )
    .join("");
  wrapper.innerHTML = `<ul class="cards">${cards}</ul>`;
};

const initGame = (data) => {
  while (allCards.length < 6) {
    const idx = Math.floor(Math.random() * 20);
    if (!allCards.includes(data[idx])) {
      allCards.push(data[idx]);
    }
  }
  createCards(getCardsForGame());
};

let prevCard = "";
let currentCard = "";
let openedPairs = 0;
let clickCount = 0;

startButton.addEventListener("click", () => {
  initGame(data);
});

const openCard = (e) => {
  if (e.target.className !== "cards__item--front") {
    return;
  }
  const cardToOpen = e.target.closest(".flip-card");
  if (prevCard && currentCard) {
    return;
  }
  if (!prevCard) {
    prevCard = cardToOpen;
    prevCard.classList.add("open");
    clickCount++;
  } else {
    currentCard = cardToOpen;
    currentCard.classList.add("open");
    matchCards();
  }
};

wrapper.addEventListener("click", openCard);

const matchCards = () => {
  if (prevCard?.dataset?.id !== currentCard?.dataset?.id) {
    closeCards();
  } else {
    prevCard.classList.add("hidden");
    currentCard.classList.add("hidden");
    openedPairs++;
    prevCard = "";
    currentCard = "";
    showCongrats();
  }
};

const closeCards = () => {
  setTimeout(() => {
    prevCard.classList.remove("open");
    currentCard.classList.remove("open");
    prevCard = "";
    currentCard = "";
  }, 1000);
};

const showCongrats = () => {
  setTimeout(() => {
    console.log("openedPairs", openedPairs);
    if (openedPairs === 6) {
      openedPairs = 0;
      wrapper.innerHTML = `<div class="congrats"><div class="congrats__text">Congratulations! You have flipped ${clickCount} pairs!
      </div>
      <button type="button" class="restart">Restart</button></div>`;
      const restartButton = document.querySelector(".restart");
      restartButton.addEventListener("click", initGame);
    }
  }, 500);
};
