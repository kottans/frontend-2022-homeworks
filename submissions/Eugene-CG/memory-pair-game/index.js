const cardsList = document.querySelector(".cards__list");
let clicksStorage = [];
const startGame = () => {
  const cards = [
    {
      cardId: "fool",
      src: "fool.jpg",
    },
    {
      cardId: "lovers",
      src: "lovers.jpg",
    },
    {
      cardId: "magician",
      src: "magician.jpg",
    },
    {
      cardId: "priestess",
      src: "priestess.jpg",
    },
    {
      cardId: "star",
      src: "star.jpg",
    },
    {
      cardId: "sun",
      src: "sun.jpg",
    },
    {
      cardId: "hanged",
      src: "hanged.jpg",
    },
    {
      cardId: "justice",
      src: "justice.jpg",
    },
  ];
  addCardListContent(shuffleCards([...cards, ...cards]));
};
const addCardListContent = (cards) => {
  let cardListInnerHtml = ``;
  cards.forEach((obj) => {
    cardListInnerHtml += createCard(obj);
  });
  cardsList.innerHTML = cardListInnerHtml;
};
const shuffleCards = (cards) => cards.sort(() => Math.random() - 0.5);
const createCard = ({ cardId, src }) => {
  return `
    <li class="card__container">
          <div class="card card-back" data-card-id="${cardId}">
              <img src="./img/${src}">
          </div>
      </li>`;
};
const checkMatch = () => {
  if (!(clicksStorage[0].dataset.cardId === clicksStorage[1].dataset.cardId)) {
    switchCardState(clicksStorage[0].closest(".card"));
    switchCardState(clicksStorage[1].closest(".card"));
  }
  clicksStorage = [];
};
const switchCardState = (target) => {
  target.classList.toggle("card-back");
  target.classList.toggle("open");
};
cardsList.addEventListener("click", ({ target }) => {
  if (!(clicksStorage.length === 2) && target.closest(".card")) {
    clicksStorage = [...clicksStorage, target];
    switchCardState(target);

    if (clicksStorage.length === 2) {
      setTimeout(() => {
        checkMatch();
      }, 1000);
    }
  }
});
window.addEventListener("DOMContentLoaded", startGame);
