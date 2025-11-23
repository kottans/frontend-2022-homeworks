document.addEventListener("DOMContentLoaded", () => {
  const cardArray = [
    {
      name: "terorist",
      img: "images/terorist.png",
    },
    {
      name: "terorist",
      img: "images/terorist.png",
    },
    {
      name: "teroristA",
      img: "images/terorist2.png",
    },
    {
      name: "teroristA",
      img: "images/terorist2.png",
    },
    {
      name: "teroristB",
      img: "images/terorist3.png",
    },
    {
      name: "teroristB",
      img: "images/terorist3.png",
    },
    {
      name: "ct",
      img: "images/ct.png",
    },
    {
      name: "ct",
      img: "images/ct.png",
    },
    {
      name: "ctA",
      img: "images/ct2.png",
    },
    {
      name: "ctA",
      img: "images/ct2.png",
    },
    {
      name: "ctB",
      img: "images/ct3.png",
    },
    {
      name: "ctB",
      img: "images/ct3.png",
    },
  ];

  cardArray.sort(() => 0.5 - Math.random());
  const grid = document.querySelector(".grid");
  const resultDisplay = document.querySelector("#result");
  var cardsChosen = [];
  var cardsChosenId = [];
  var cardsWon = [];

  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      var card = document.createElement("img");
      card.setAttribute("src", "images/card.png");
      card.setAttribute("data-id", i);
      card.addEventListener("click", flipCard);
      grid.appendChild(card);
    }
  }

  function checkForMatch() {
    var cards = document.querySelectorAll("img");
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];
    if (cardsChosen[0] === cardsChosen[1] && optionOneId !== optionTwoId) {
      cards[optionOneId].setAttribute("src", "images/white.png");
      cards[optionTwoId].setAttribute("src", "images/white.png");
      cardsWon.push(cardsChosen);
      cards[optionOneId].style.visibility = "hidden";
      cards[optionTwoId].style.visibility = "hidden";
    } else {
      cards[optionOneId].setAttribute("src", "images/card.png");
      cards[optionTwoId].setAttribute("src", "images/card.png");
    }
    cardsChosen = [];
    cardsChosenId = [];
    resultDisplay.textContent = cardsWon.length;
    if (cardsWon.length === cardArray.length / 2) {
      resultDisplay.textContent = "You found all match 6";
      setTimeout(() => {
        document.location.reload();
      }, 5000);
    }
  }

  function flipCard() {
    var cardId = this.getAttribute("data-id");
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    this.setAttribute("src", cardArray[cardId].img);
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 150);
    }
  }
  createBoard();
});
