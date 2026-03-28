import cardsData from "./data/data.json" assert { type: "json" };

const randomSorting = (cards) => {
  return cards.sort(() => Math.random() - 0.5);
};

const cardsBox = document.querySelector(".card-box-list");

const renderCards = (cards) => {
  randomSorting(cards);

  cardsBox.innerHTML = cards
    .map(
      (card) => `<li class="card-box-list-item" name="${card.name}">
                   <img class="card-box-face-image" src="${card.imageSrc}" alt="${card.name}" name="${card.name}">
                   <img class="card-box-back-image" src="./images/question-mark.png" alt="question-mark">
                 </li>`
    )
    .join("");

  const listCards = document.querySelectorAll(".card-box-list-item");

  listCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      card.classList.toggle("toggleCard");

      flipCard(e);
    });
  });
};

renderCards(cardsData);

const flipCard = ({ target }) => {
  const clickedCard = target;
  clickedCard.classList.add("current");

  const clickedCards = document.querySelectorAll(".current");

  clickedCards.forEach((card) => {
    clickedCards.length < 2
      ? (card.style.pointerEvents = "none")
      : clickedCards.length === 2
      ? (card.style.pointerEvents = "auto")
      : clickedCards;
  });

  const toggledCards = document.querySelectorAll(".toggleCard");

  clickedCards.forEach((clickedCard) => {
    if (clickedCards.length === 2) {
      clickedCards[0].getAttribute("name") ===
      clickedCards[1].getAttribute("name")
        ? (clickedCard.classList.remove("current"),
          (clickedCard.style.pointerEvents = "none"))
        : (clickedCard.classList.remove("current"),
          setTimeout(() => {
            clickedCard.classList.remove("toggleCard");
          }, 600));
    }

    if (toggledCards.length === 18) {
      setTimeout(() => {
        renderCards(cardsData);
      }, 1000);
    }
  });
};
