const logos = [
  { src: "img/specialized.jpg", name: "specialized" },
  { src: "img/GT Bicycles.jpg", name: "gt" },
  { src: "img/rock shox.jpg", name: "rock shox" },
  { src: "img/Cannondale Bicycle.jpg", name: "cannondale" },
  { src: "img/SRAM.jpg", name: "sram" },
  { src: "img/marzocchi.jpg", name: "marzocchi" },
  { src: "img/mavic.jpg", name: "mavic" },
  { src: "img/rockMachine.jpg", name: "rock machine" },
];

const getLogos = () => {
  return [...logos, ...logos].sort(() => Math.random() - 0.5);
};

const board = document.createDocumentFragment();
const section = document.querySelector("section");
section.classList.add("card-board");
let cardLogos = getLogos();

cardLogos.forEach((logo) => {
  const card = document.createElement("div");
  const face = document.createElement("img");
  const back = document.createElement("img");
  card.classList.add("card");
  card.setAttribute("brand", logo.name);
  face.classList.add("face");
  face.setAttribute("alt", logo.name);
  back.classList.add("back");
  back.setAttribute("alt", "card back");
  face.src = logo.src;
  back.src = "img/back.jpg";
  card.appendChild(face);
  card.appendChild(back);
  section.appendChild(card);
});
section.appendChild(board);

const cardBoard = document.querySelector(".card-board");
const cards = document.querySelectorAll(".card");
let isBoardFrezed = false;

const getFlipCard = ({ target }) => {
  if (target.nodeName !== "IMG") return;
  if (isBoardFrezed) return;
  const card = target.parentElement;
  card.classList.add("flipped");
  const flippedCards = document.querySelectorAll(".flipped");
  if (flippedCards.length === 2) {
    let [flippedCardFirst, flippedCardSecond] = flippedCards;
    let brandFirst = flippedCardFirst.attributes[1].textContent;
    let brandSecond = flippedCardSecond.attributes[1].textContent,
      isBoardFrezed = true;
    setTimeout(() => {
      if (brandFirst === brandSecond) {
        flippedCards.forEach((card) => {
          card.classList.add("hidden"), card.classList.remove("flipped");
        });
        isBoardFrezed = false;
        restartGame();
      }
      isBoardFrezed = false;
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
      });
    }, 800);
  }
};
const restartGame = () => {
  const allHiddenCards = Array.from(document.querySelectorAll(".hidden"));
  if (allHiddenCards.length === 16) {
    setTimeout(() => {
      alert("You win");
      setTimeout(window.location.reload.bind(window.location), 250);
    }, 250);
  }
};
cardBoard.addEventListener("click", getFlipCard);
