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
const pairsInfo = document.createElement("p");
pairsInfo.classList.add("text__info");
wrap.before(pairsInfo);

const rulesBtn = document.querySelector(".rules__btn");
rulesBtn.addEventListener("click", closeRules);
const winBtn = document.querySelector(".win__btn");
winBtn.addEventListener("click", closeWinWindow);

function newGame() {
  showGameStatus();
  const shuffleDeck = shuffle(deckMoneyHeist).slice(0, 6);
  const gameDeck = [...shuffleDeck, ...shuffleDeck];
  playArea.append(...makePlayArea(gameDeck));
}

function showGameStatus() {
  pairsInfo.innerHTML = `Pairs found: ${numberOfPairs} / ${maxPairs} Attempt: ${attempt}`;
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
      if (selectedCards.length === 2 && selectedCards[0] === selectedCards[1]) {
        getPairCards();
      } else if (
        selectedCards.length === 2 &&
        selectedCards[0] !== selectedCards[1]
      ) {
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

function showWhoAreYou(getName) {
  const nameCharacter = getName;
  const [{ openCard }] = deckMoneyHeist.filter(
    (character) => character.name === nameCharacter
  );

  const winArea = document.querySelector(".win__window");
  winArea.style.visibility = "visible";
  winArea.style.opacity = "1";
  const winOverlay = document.querySelector(".win__overlay");
  winOverlay.style.visibility = "visible";
  winOverlay.style.opacity = "1";
  const winTitle = document.querySelector(".win__title");
  winTitle.innerHTML = `Congratulations!<br/>All pairs founded! Used attempts: ${attempt}`;
  const winText = document.querySelector(".win__text");
  winText.innerHTML = `You&rsquo;re "&laquo;${nameCharacter}"&raquo;`;
  const winImg = document.querySelector(".win__img");
  winImg.src = openCard;
}

function closeRules() {
  const rulesArea = document.querySelector(".rules");
  rulesArea.style.visibility = "hidden";
  rulesArea.style.opacity = "0";
  const rulesOverlay = document.querySelector(".rules__overlay");
  rulesOverlay.style.visibility = "hidden";
  rulesOverlay.style.opacity = "0";
  newGame();
}

function closeWinWindow() {
  const winArea = document.querySelector(".win__window");
  winArea.style.visibility = "hidden";
  winArea.style.opacity = "0";
  const winOverlay = document.querySelector(".win__overlay");
  winOverlay.style.visibility = "hidden";
  winOverlay.style.opacity = "0";
  newGame();
}
