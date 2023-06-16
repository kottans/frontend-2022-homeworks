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
  card.setAttribute("tabindex", 0);
  card.classList.add("card");
  card.setAttribute("brand", logo.name);
  face.classList.add("face");
  face.setAttribute("alt", logo.name);
  face.setAttribute("draggable", "false");
  back.classList.add("back");
  back.setAttribute("alt", "card back");
  back.setAttribute("draggable", "false");
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
const getFlipCard = (event) => {
  let target = event.target;
  if (target.nodeName === "IMG" || target.nodeName === "DIV") {
    if (isBoardFrezed) return;
    const card = target.nodeName === "DIV" ? target : target.parentElement;
    card.classList.add("flipped");
    const flippedCards = document.querySelectorAll(".flipped");
    if (flippedCards.length === 2) {
      isBoardFrezed = true;
      let [flippedCardFirst, flippedCardSecond] = flippedCards;
      let brandFirst = flippedCardFirst.getAttribute("brand");
      let brandSecond = flippedCardSecond.getAttribute("brand");
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
  }
};
const restartGame = () => {
  const allHiddenCards = Array.from(document.querySelectorAll(".hidden"));
  console.log(allHiddenCards);
  if (allHiddenCards.length === 16) {
    setTimeout(() => {
      alert("You win");
      setTimeout(window.location.reload.bind(window.location), 250);
    }, 250);
  }
};
cardBoard.addEventListener("click", getFlipCard);

const switchElementsFocus = (event) => {
  let target = event.target;
  let nextSibling = target.nextSibling;
  let previousSibling = target.previousSibling;
  switch (event.code) {
    case "ArrowUp":
      if (previousSibling) {
        let fourStepsBack =
          target.previousSibling.previousSibling.previousSibling
            .previousSibling;
        target.setAttribute("tabindex", -1);
        fourStepsBack.focus();
      }
      break;
    case "ArrowDown":
      if (nextSibling) {
        let fourStepsForward =
          target.nextSibling.nextSibling.nextSibling.nextSibling;
        target.setAttribute("tabindex", -1);
        fourStepsForward.focus();
      }
      break;
    case "ArrowRight":
      if (nextSibling) {
        target.setAttribute("tabindex", -1);
        nextSibling.focus();
      }
      break;
    case "ArrowLeft":
      if (previousSibling) {
        target.setAttribute("tabindex", -1);
        previousSibling.focus();
      }
      break;
    case "Space":
      getFlipCard(event);
      break;
  }
};
cardBoard.addEventListener("keydown", switchElementsFocus);
