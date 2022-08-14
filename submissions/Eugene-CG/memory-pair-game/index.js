const cardsList = document.querySelector(".cards__list");
let clicksStorage = [];

const startGame = () => {
  let cards = [
    {
      imgClass: "fool",
      src: "fool.jpg",
    },
    {
      imgClass: "lovers",
      src: "lovers.jpg",
    },
    {
      imgClass: "magician",
      src: "magician.jpg",
    },
    {
      imgClass: "priestess",
      src: "priestess.jpg",
    },
    {
      imgClass: "star",
      src: "star.jpg",
    },
    {
      imgClass: "sun",
      src: "sun.jpg",
    },
    {
      imgClass: "hanged",
      src: "hanged.jpg",
    },
    {
      imgClass: "justice",
      src: "justice.jpg",
    },
  ];
  cards = shuffleCards([...cards, ...cards]);

  let cardListInnerHtml = ``;
  cards.forEach((obj) => {
    cardListInnerHtml += createCard(obj);
  });
  cardsList.innerHTML = cardListInnerHtml;
};
const shuffleCards = (cards) => cards.sort(() => Math.random() - 0.5);
let arr = [];
const createCard = ({ imgClass, src }) => {
  return `
    <li class="card__container">
          <div class="card card-back">
              <img src="./img/${src}" class="${imgClass}">
          </div>
      </li>`;
};
const flipCard = (target) => {
  if (target.closest(".card")) {
    clicksStorage = [...clicksStorage, target.firstElementChild];
    target.classList.remove("card-back");
    target.classList.add("hide", "open");

    if (clicksStorage.length === 2) {
      setTimeout(() => {
        checkMatch();
      }, 1000);
    }
  }
};
const checkMatch = () => {
  if (!(clicksStorage[0].classList === clicksStorage[1].classList))
    checkUnmatch();
  clicksStorage = [];
};
const checkUnmatch = () => {
  clicksStorage.forEach((target) => {
    target.closest(".card").classList.add("card-back");
    target.closest(".card").classList.remove("hide", "open");
  });
  clicksStorage = [];
};

cardsList.addEventListener("click", (event) => {
  if (!(clicksStorage.length === 2)) flipCard(event.target);
});
window.addEventListener("DOMContentLoaded", startGame);
