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
let allCards = shuffleCards([...cards, ...cards]);
renderCards(allCards, cardsMenu);

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
      <li class="game-card" name="${name}">
        <div class="card-inner">
          <div class="card-front">
            <img class="card-img-front" src="images/treble_clef.webp" alt="image of treble clef">
          </div>
          <div class="card-back">
            <img class="card-img-back" src="${imageSrc}" alt="image of ${name}">
            <p class="card-desc">${name}</p>
          </div>
        </div>
      </li>
      `;
    })
    .join("");

  cardsList.innerHTML = cardsHTML;
}

function timeout(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function flipBack(currentCardPair) {
  currentCardPair.forEach((card) => {
    if (!card.classList.contains("matched")) {
      card.closest(".game-card").classList.remove("flipped");
    }
  });
}

function isEqualCard(first, second) {
  return first.attributes['name'].value === second.attributes['name'].value;
}

function restartGame() {
  states.cardsMatches = 0;
  states.firstFlippedCard = null;
  states.secondFlippedCard = null;
  states.totalTries = 0;
  totalTriesCounter.innerHTML = `Total tries: ${states.totalTries}`
  allCards = shuffleCards([...cards, ...cards]);
  renderCards(allCards, cardsMenu);
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

      if (!isEqualCard(states.firstFlippedCard, states.secondFlippedCard)) {
        await timeout(600).then(() => flipBack(states.currentCardPair));
        states.totalTries++;
      } else {
        await timeout(600).then(() => {
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
      await timeout(1000).then(() =>
        alert(`You found all pairs in ${states.totalTries} tries!`)
      );
      restartGame();
    }
  }
});
