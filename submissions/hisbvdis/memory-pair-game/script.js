const startBtn = document.querySelector("[data-start-btn]");
const boardInner = document.querySelector("[data-board-inner]")
const boardGrid = document.querySelector("[data-board-grid]");
const options = ["honda", "jeep", "kia", "mercedes", "acura", "bmw", "chevrolet", "ferrari"];
const flippedCards = [];
let score = 0;

document.addEventListener("click", forStartBtn_onDocument_Click_Handler);
boardGrid.addEventListener("click", forCardFront_onBoardGrid_Click_Handler);


function changeBoardSide() {
  boardInner.classList.toggle("flipper__inner--flipped");
}


function startNewGame() {
  boardGrid.innerHTML = "";
  renderGrid();
  const cardFlippers = Array.from(boardGrid.querySelectorAll(".flipper__inner"));
  cardFlippers.forEach((cardInner) => flipCard(cardInner));
  setTimeout(() => {
    cardFlippers.forEach((cardInner) => flipCard(cardInner));
  }, 2000);
}


function renderGrid() {
  shuffleArray(options.concat(options)).forEach((option) => {
    boardGrid.insertAdjacentHTML(
      "beforeend",
      `<li class="card  flipper">
        <div class="card__inner  flipper__inner" data-card-inner>
          <div class="card__side  card__side--front  flipper__side  flipper__side--front"  data-card-front>
            ?
          </div>
          <div class="card__side  card__side--back  flipper__side  flipper__side--back">
            <img class="card__img" src="img/${option}.png" width="100" height="100" alt="${option}"/>
          </div>
        </div>
      </li>`
    );
  });
}


function flipCard(cardInner) {
  cardInner.classList.toggle("flipper__inner--flipped");
}


function checkFlippedCards() {
  score++;

  const isSame = flippedCards
    .map((card) => card.querySelector(".card__img").src)
    .every((src, _, arr) => src === arr[0]);
  
  setTimeout(() => {
    if (isSame) {
      flippedCards.forEach((cardInner) => resolveCard(cardInner));
      checkGameOver();
    }
    flippedCards.forEach((cardInner) => flipCard(cardInner));
    flippedCards.length = 0;
  }, 1000);
  
}


function resolveCard(cardInner) {
  cardInner.classList.add("card__inner--resolved");
}


function checkGameOver() {
  const resolvedCards = Array.from(
    boardGrid.querySelectorAll(".card__inner--resolved")
  );

  if (resolvedCards.length === options.length * 2) {
    changeBoardSide();

    const boardFront = document.querySelector(".board__side--front");
    boardFront.innerHTML = `
      <h1 class="board__title">You win</h1>
      <p class="board__desc">It took you ${score} gueses</p>
      <button class="btn  board__btn" data-start-btn>Try again</button>
    `;
  }
}


function forCardFront_onBoardGrid_Click_Handler(evt) {
  if (!evt.target.matches("[data-card-front]")) return;
  if (flippedCards.length >= 2) return;

  const cardInner = evt.target.closest("[data-card-inner]");
  
  flipCard(cardInner);
  flippedCards.push(cardInner);
  if (flippedCards.length === 2) {
    checkFlippedCards();
  }
}


function forStartBtn_onDocument_Click_Handler(evt) {
  if (!evt.target.matches("[data-start-btn]")) return;

  changeBoardSide();
  startNewGame();
}


function shuffleArray(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};
