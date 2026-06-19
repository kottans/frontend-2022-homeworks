const cards = [
  {
    id: 1,
    text: "out there",
    desc: "very extreme or unusual",
  },
  {
    id: 2,
    text: "dazzling",
    desc: "very impressive and beautiful",
  },
  {
    id: 3,
    text: "out-of-the-box",
    desc: "innovative, creative",
  },
  {
    id: 4,
    text: "exquisite",
    desc: "extremely beautiful",
  },
  {
    id: 5,
    text: "far-fetched",
    desc: "unlikely to be true",
  },
  {
    id: 6,
    text: "sophisticated",
    desc: "more advanced or complex than usual",
  },
  {
    id: 7,
    text: "unorthodox",
    desc: "different from generally accepted",
  },
  {
    id: 8,
    text: "surreal",
    desc: "strange, grotesque",
  },
  {
    id: 9,
    text: "controversial",
    desc: "causing a lot of discussion",
  },
  {
    id: 10,
    text: "moving",
    desc: "makes you feel sadness, sympathy",
  },
];

const allCards = [...cards, ...cards];
const shuffledCards = allCards.sort(() => {
  return 0.5 - Math.random();
});
const cardsWrapper = document.querySelector("#cards-wrapper");
const delayTime = 1200;
let numberOfMatches = 0;
let cardPairsArray = [];

const cardsContainer = document.createDocumentFragment();
shuffledCards.forEach((card) => {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("flip-card");
  cardDiv.innerHTML = `
      <div class='flip-card-inner'>
          <div class='flip-card-front'>
              <img src='image/cat_cover.png' id='${card.id}' class='cover-img'/>
          </div>
          <div class='flip-card-back' id='flip-card-back'>
          <p class='words'>${card.text} <span class='word-description'> - ${card.desc}</span></p>
          </div>
      </div>
  `;
  cardsContainer.appendChild(cardDiv);
});
cardsWrapper.append(cardsContainer);

cardsWrapper.addEventListener("click", function checkCard({ target }) {
  const clickedCard = target.closest(".flip-card");
  if (clickedCard) {
    if (!isCardFlipped(clickedCard)) {
      cardPairsArray.push(target.id);
      [firstCard, secondCard] = cardPairsArray;
    }
    flip(clickedCard);

    if (cardPairsArray.length === 2) {
      pauseEventListener(cardsWrapper, checkCard, delayTime);
      if (isCardsMatch()) {
        hideMatchedCards();
        numberOfMatches++;
      } else {
        setTimeout(() => flipCardsBack(), delayTime);
      }
      cleanArr(cardPairsArray);
    }
    if (numberOfMatches === cards.length) {
      setTimeout(() => {
        alert(`You win!`);
        reloadGame();
      }, delayTime);
    }
  }
});

const reloadGame = () => document.location.reload();
const flip = (card) => card.classList.add("flip-card_flipped");
const cleanArr = (arr) => (arr.length = 0);
const isCardFlipped = (card) => card.classList.contains("flip-card_flipped");
const hideMatchedCards = () =>
  document
    .querySelectorAll(`[id='${firstCard}']`)
    .forEach((card) => card.closest(".flip-card").classList.add("hide"));
const flipCardsBack = () =>
  document
    .querySelectorAll(".flip-card_flipped")
    .forEach((card) =>
      card.closest(".flip-card").classList.remove("flip-card_flipped")
    );
const isCardsMatch = () => firstCard === secondCard;
const pauseEventListener = (target, func, time) => {
  target.removeEventListener("click", func);
  setTimeout(() => target.addEventListener("click", func), time);
};
