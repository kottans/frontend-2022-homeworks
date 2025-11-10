const mainContainer = document.querySelector(".container");
const modal = document.querySelector(".modal__container");
const gameboard = document.querySelector(".gameboard");
const scoreCount = document.querySelector(".score__container");

let score = 0;
let guessedCardPairs = [];
let hasFlipped = false;
let lockBoard = false;
let firstCard, secondCard;

// creating Modal window
const modalWrapper = document.createElement("div");
modalWrapper.classList.add("modal__wrapper");
const modalTitle = document.createElement("p");
modalTitle.classList.add("modal__title");

const modalBtn = document.createElement("button");
modalBtn.classList.add("modal__btn");

modalBtn.addEventListener("click", startGame);
const closeBtn = document.createElement("button");
closeBtn.classList.add("modal__btn");
closeBtn.textContent = "NO, THANKS";
closeBtn.addEventListener("click", hideModal);

modalWrapper.append(modalTitle);
modalWrapper.append(modalBtn);
modalWrapper.append(closeBtn);

modal.append(modalWrapper);

// creating Score table
const scoreSpan = document.createElement("span");
scoreSpan.classList.add("score__span");
scoreSpan.textContent = `Number of tries: ${score}`;
const resetBtn = document.createElement("button");
resetBtn.addEventListener("click", () =>
  renderModal("Are you sure, you want to restart the game?", "RESET")
);
resetBtn.classList.add("reset__btn");
resetBtn.textContent = "RESTART";
scoreCount.append(scoreSpan);
scoreCount.append(resetBtn);

renderModal(
  "You are welcome, my friend ! Wanna play some memory game to endure your mind and become more powerfull ? Try to find pairs of cards as fast as you can! Tap the button to begin... ",
  "START THE GAME"
);

function updateScore() {
  scoreSpan.textContent = `Number of tries: ${score}`;
}

function renderModal(titleText, btnText) {
  modalTitle.textContent = titleText;
  modalBtn.textContent = btnText;
  modal.classList.add("shown");
}

function hideModal() {
  modal.classList.remove("shown");
}

function startGame() {
  guessedCardPairs = [];
  gameboard.innerHTML = "";
  score = 0;
  updateScore();
  hideModal();
  prepareGameBoardLayOut();
  gameboard.addEventListener("click", cardsHandler);
}

function prepareGameBoardLayOut() {
  const cardsArray = [
    {
      name: "beast",
      path: "img/Beast.jpg",
    },
    {
      name: "death",
      path: "img/Death.jpg",
    },
    {
      name: "fire",
      path: "img/Fire.jpg",
    },
    {
      name: "life",
      path: "img/Life.jpg",
    },
    {
      name: "light",
      path: "img/Light.jpg",
    },
    {
      name: "metal",
      path: "img/Metal.jpg",
    },
  ];
  const shuffled = [...cardsArray, ...cardsArray];
  shuffled.sort(function () {
    return 0.5 - Math.random();
  });

  renderCards(shuffled);

  function renderCards(arr) {
    const cardWrapper = document.createElement("div");
    cardWrapper.classList.add("card__wrapper");

    arr.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.setAttribute("data-name", item.name);
      const frontPage = document.createElement("img");
      frontPage.classList.add("front__page");
      frontPage.setAttribute("src", item.path);
      const backPage = document.createElement("img");
      backPage.classList.add("back__page");
      backPage.setAttribute("src", "img/backside.jpeg");

      card.append(frontPage);
      card.append(backPage);
      cardWrapper.append(card);
    });
    gameboard.append(cardWrapper);
  }
}

function cardsHandler({ target }) {
  const clickedCard = target.closest(".card");
  if (!clickedCard || guessedCardPairs.includes(clickedCard.dataset.name))
    return;
  flipCard(clickedCard);

  function flipCard(card) {
    if (lockBoard) return;
    if (card === firstCard) return;

    card.classList.add("flip");

    if (!hasFlipped) {
      hasFlipped = true;
      firstCard = card;
    } else {
      secondCard = card;
      compareCards();
    }
  }

  function compareCards() {
    score++;
    updateScore();
    firstCard.dataset.name === secondCard.dataset.name
      ? disableCards()
      : unFlipCards();
  }

  function disableCards() {
    lockBoard = true;

    setTimeout(() => {
      firstCard.classList.add("disabled");
      secondCard.classList.add("disabled");

      guessedCardPairs = [...guessedCardPairs, firstCard.dataset.name];

      resetBoard();

      if (guessedCardPairs.length === 6) {
        renderModal(
          "Good job my friend! You became even stronger! Want to start one more time?",
          "RESET"
        );
      }
    }, 1000);
  }

  function unFlipCards() {
    lockBoard = true;

    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");

      resetBoard();
    }, 1000);
  }

  function resetBoard() {
    [hasFlipped, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }
}
