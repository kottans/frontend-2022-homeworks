const cardsList = document.querySelector(".cards__list");
let clicksStorage = [];

const startGame = () => {
  let cards = [
    {
      imgId: "fool",
      src: "fool.jpg",
    },
    {
      imgId: "lovers",
      src: "lovers.jpg",
    },
    {
      imgId: "magician",
      src: "magician.jpg",
    },
    {
      imgId: "priestess",
      src: "priestess.jpg",
    },
    {
      imgId: "star",
      src: "star.jpg",
    },
    {
      imgId: "sun",
      src: "sun.jpg",
    },
    {
      imgId: "hanged",
      src: "hanged.jpg",
    },
    {
      imgId: "justice",
      src: "justice.jpg",
    },
  ];
  cards = shuffleCards([...cards, ...cards]);

  let cardListInnerHtml = ``;
  let i = 0;
  cards.forEach((obj) => {
    cardListInnerHtml += createCard(obj, i++);
  });
  cardsList.innerHTML = cardListInnerHtml;
};
const shuffleCards = (cards) => cards.sort(() => Math.random() - 0.5);
let arr = [];
const createCard = ({ imgId, src }, i) => {
  return `
    <li class="card__container">
          <div class="card card-back">
              <img src="./img/${src}" id="${imgId}${i}">
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
  if (
    !(
      clicksStorage[0].id.replace(/\d+/g, "") ===
      clicksStorage[1].id.replace(/\d+/g, "")
    )
  )
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
