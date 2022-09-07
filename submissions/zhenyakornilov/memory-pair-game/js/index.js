import cards from "./cards.js";

const cardsMenu = document.getElementById("game-cards");
const totalTriesCounter = document.getElementById("total-flips");
const states = {
  cardsMatches: 0,
  firstFlippedCard: null,
  secondFlippedCard: null,
  currentCardPair: [],
  totalTries: 0,
};
const allGameCards = shuffleCards([...cards, ...cards]);
renderCards(allGameCards, cardsMenu);

function shuffleCards(cardsArr) {
  for (let i = cardsArr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let swap = cardsArr[i];
    cardsArr[i] = cardsArr[j];
    cardsArr[j] = swap;
  }

  return cardsArr;
}

function renderCards(cardsObj, cardsList) {
  let cardsHTML = cardsObj
    .map(({ name, imageSrc }) => {
      return `
      <li class="game-card">
        <div class="card-inner">
          <div class="card-front">
            <img class="card-img-front" src="images/treble_clef.webp" alt="image of treble clef">
          </div>
          <div class="card-back">
            <img class="card-img" src="${imageSrc}" alt="image of ${name}">
            <p class="card-desc">${name}</p>
          </div>
        </div>
      </li>
      `;
    })
    .join("");

  cardsList.innerHTML = cardsHTML;
}

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function flipBack(currentCardPair) {
  currentCardPair.forEach((card) => {
    if (!card.classList.contains("matched")) {
      card.closest(".game-card").classList.remove("flipped");
    }
  });
}

function checkCardsMatch() {
  return states.firstFlippedCard.isEqualNode(states.secondFlippedCard);
}

function restartGame() {
  location.reload();
}

let cardsBlocked = false;

cardsMenu.addEventListener("click", async function flipCards({ target }) {
  const currentCard = target.closest(".game-card");

  if (currentCard && !cardsBlocked) {
    if (!currentCard.classList.contains("flipped")) {
      states.currentCardPair.push(currentCard);
    }
    currentCard.classList.add("flipped");

    if (states.currentCardPair.length === 2) {
      [states.firstFlippedCard, states.secondFlippedCard] =
        states.currentCardPair;
      cardsBlocked = true;

      if (!checkCardsMatch()) {
        await sleep(600).then(() => flipBack(states.currentCardPair));
        states.totalTries++;
      } else {
        await sleep(600).then(() => {
          states.firstFlippedCard.classList.add("matched");
          states.secondFlippedCard.classList.add("matched");
        });
        states.cardsMatches++;
        states.totalTries++;
      }
      cardsBlocked = false;
      states.currentCardPair = [];
      totalTriesCounter.innerHTML = `Total tries: ${states.totalTries}`;
    }

    if (states.cardsMatches === cards.length) {
      await sleep(1000).then(() =>
        alert(`You found all pairs in ${states.totalTries} tries!`)
      );
      restartGame();
    }
  }
});
