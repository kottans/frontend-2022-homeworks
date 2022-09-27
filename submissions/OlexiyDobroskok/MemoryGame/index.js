const deckMoneyHeist = [
  {
    name: "Berlin",
    openCard: "./img/berlin.jpg",
    closeCard: "./img/dali.jpg",
  },
  {
    name: "Lissabon",
    openCard: "./img/lissabon.jpg",
    closeCard: "./img/dali.jpg",
  },
  {
    name: "Professor",
    openCard: "./img/professor.jpg",
    closeCard: "./img/dali.jpg",
  },
  {
    name: "Rio",
    openCard: "./img/rio.jpg",
    closeCard: "./img/dali.jpg",
  },
  {
    name: "Stokholm",
    openCard: "./img/stokholm.jpg",
    closeCard: "./img/dali.jpg",
  },
  {
    name: "Tokio",
    openCard: "./img/tokio.jpg",
    closeCard: "./img/dali.jpg",
  },
  {
    name: "Alisia",
    openCard: "./img/alisia.jpg",
    closeCard: "./img/dali.jpg",
  },
  {
    name: "Arturo",
    openCard: "./img/arturo.jpg",
    closeCard: "./img/dali.jpg",
  },
  {
    name: "Denver",
    openCard: "./img/denver.jpg",
    closeCard: "./img/dali.jpg",
  },
  {
    name: "Helsinki",
    openCard: "./img/helsinki.jpg",
    closeCard: "./img/dali.jpg",
  },
];

const selectedCards = [];
let previousCard;
const maxPairs = 6;
let numberOfPairs = 0;
let sumFlippedCards = 0;
let attempt = 0;

const wrap = document.querySelector(".wrap");
const playArea = document.createElement("ul");
playArea.classList.add("card__list");
wrap.append(playArea);
const gameStatusInfo = document.createElement("p");
gameStatusInfo.classList.add("text__info");
wrap.before(gameStatusInfo);

const rulesBtn = document.querySelector(".rules__btn");
const winBtn = document.querySelector(".win__btn");
rulesBtn.addEventListener("click", popupHandler);
winBtn.addEventListener("click", popupHandler);
playArea.addEventListener("click", searchPair);

function newGame() {
  showGameStatus();
  playArea.innerHTML = makePlayArea(makeGameDeck(deckMoneyHeist)).join("");
}

function makeGameDeck(deck) {
  if (deck.length < 6) return;
  const initialDeck = shuffle(deck).slice(0, 6);
  const doubleDeck = [...initialDeck, ...initialDeck];
  return shuffle(doubleDeck);
}

function showGameStatus() {
  gameStatusInfo.textContent = `Pairs found: ${numberOfPairs} / ${maxPairs} Attempt: ${attempt}`;
}

function shuffle(deck) {
  return deck.sort(function () {
    return 0.5 - Math.random();
  });
}

function makePlayArea(deck) {
  return deck.map((card) => {
    return `
    <li class="card__item">
      <img src="${card.openCard}" alt="" class="opened__card" draggable="false">
      <img src="${card.closeCard}" alt="" class="closed__card" draggable="false">
    </li>`;
  });
}

function searchPair({ target }) {
  let chosenCard = target.closest("li");
  if (!chosenCard) return;
  if (previousCard !== chosenCard && sumFlippedCards < 2) {
    chosenCard.classList.add("flipped");
    sumFlippedCards++;

    if (selectedCards.length < 2) {
      selectedCards.push(chosenCard.firstElementChild.src);
      const [firstCard, secondCard] = selectedCards;
      if (selectedCards.length === 2 && firstCard === secondCard) {
        getPairCards();
      }
      if (selectedCards.length === 2) {
        resetPairCards();
        chosenCard = "";
      }
    }
    previousCard = chosenCard;
  }

  resetGame();
}

function getPairCards() {
  attempt++;
  numberOfPairs++;
  showGameStatus();
  selectedCards.length = 0;
  setTimeout(() => {
    for (let gameCard of playArea.children) {
      if (gameCard.classList.contains("flipped")) {
        gameCard.classList.remove("flipped");
        gameCard.classList.add("check", "disable__click");
        sumFlippedCards = 0;
        while (gameCard.firstChild) {
          gameCard.removeChild(gameCard.firstChild);
        }
      }
    }
  }, 1000);
}

function resetPairCards() {
  attempt++;
  showGameStatus();
  selectedCards.length = 0;
  setTimeout(() => {
    for (let gameCard of playArea.children) {
      if (gameCard.classList.contains("flipped")) {
        gameCard.classList.remove("flipped");
        sumFlippedCards = 0;
      }
    }
  }, 1000);
}

function resetGame() {
  if (numberOfPairs === maxPairs) {
    setTimeout(() => {
      showWhoAreYou(whoAreYou());
      selectedCards.length = 0;
      previousCard = "";
      numberOfPairs = 0;
      sumFlippedCards = 0;
      attempt = 0;
      while (playArea.firstChild) {
        playArea.removeChild(playArea.firstChild);
      }
    }, 1000);
  }
}

function whoAreYou() {
  if (attempt <= 12) {
    return "Professor";
  }
  if (12 < attempt && attempt <= 15) {
    return "Alisia";
  }
  if (15 < attempt && attempt <= 18) {
    return "Berlin";
  }
  if (18 < attempt && attempt <= 23) {
    return "Tokio";
  }
  if (23 < attempt && attempt <= 27) {
    return "Denver";
  }
  if (attempt > 27) {
    return "Arturo";
  }
}

function showWhoAreYou(nameCharacter) {
  const [{ openCard: characterFace }] = deckMoneyHeist.filter(
    (character) => character.name === nameCharacter
  );
  const winOverlay = document.querySelector(".win__overlay");
  const winTitle = document.querySelector(".win__title");
  const winText = document.querySelector(".win__text");
  const winImg = document.querySelector(".win__img");
  winOverlay.classList.toggle("hide__popup");
  winTitle.innerHTML = `Congratulations!<br/>All pairs founded! Used attempts: ${attempt}`;
  winText.innerHTML = `You&rsquo;re &laquo;${nameCharacter}&raquo;`;
  winImg.src = characterFace;
  winBtn.classList.remove("disable__click");
}

function popupHandler({ target }) {
  const btn = target.closest("button");
  if (!btn) return;
  const popupOverlay = target.closest("div");
  popupOverlay.classList.toggle("hide__popup");
  btn.classList.add("disable__click");
  newGame();
}
