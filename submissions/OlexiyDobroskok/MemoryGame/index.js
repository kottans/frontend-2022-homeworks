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
rulesBtn.addEventListener("click", closePopupWindow);
const winBtn = document.querySelector(".win__btn");
winBtn.addEventListener("click", closePopupWindow);

function newGame() {
  showGameStatus();
  playArea.append(...makePlayArea(makeGameDeck(deckMoneyHeist)));
}

function makeGameDeck(deck) {
  if (deck.length < 6) {
    return;
  }
  const initialDeck = shuffle(deck).slice(0, 6);
  const doubleDeck = [...initialDeck, ...initialDeck];
  return shuffle(doubleDeck);
}

function showGameStatus() {
  gameStatusInfo.innerHTML = `Pairs found: ${numberOfPairs} / ${maxPairs} Attempt: ${attempt}`;
}

function shuffle(deck) {
  return deck.sort(function () {
    return 0.5 - Math.random();
  });
}

function makePlayArea(deck) {
  return deck.map((card) => {
    const gameCard = document.createElement("li");
    gameCard.classList.add("card__item");
    const openCard = document.createElement("img");
    openCard.classList.add("opened__card");
    openCard.draggable = false;
    openCard.src = card.openCard;
    gameCard.append(openCard);
    const closeCard = document.createElement("img");
    closeCard.classList.add("closed__card");
    closeCard.draggable = false;
    closeCard.src = card.closeCard;
    gameCard.append(closeCard);
    gameCard.addEventListener("click", searchPair);
    return gameCard;
  });
}

function searchPair({ target }) {
  let chosenCard = target.closest("li");
  if (previousCard !== chosenCard && sumFlippedCards < 2) {
    chosenCard.classList.add("flipped");
    sumFlippedCards++;
    if (selectedCards.length < 2) {
      selectedCards.push(chosenCard.firstChild.src);
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
        gameCard.classList.add("check");
        gameCard.removeEventListener("click", searchPair);
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
  winOverlay.classList.toggle("hide__popup");
  const winTitle = document.querySelector(".win__title");
  winTitle.innerHTML = `Congratulations!<br/>All pairs founded! Used attempts: ${attempt}`;
  const winText = document.querySelector(".win__text");
  winText.innerHTML = `You&rsquo;re &laquo;${nameCharacter}&raquo;`;
  const winImg = document.querySelector(".win__img");
  winImg.src = characterFace;
}

function closePopupWindow({ target }) {
  const popupOverlay = target.closest("div");
  popupOverlay.classList.toggle("hide__popup");
  newGame();
}
