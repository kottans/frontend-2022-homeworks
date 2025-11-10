let timer = function () {
  const hour = document.getElementById("hour");
  const mins = document.getElementById("mins");
  const secs = document.getElementById("secs");
  let S = "00",
    M = "00",
    H = "00";

  setInterval(function () {
    // '+' before a line converts str into a number
    S = +S + 1;
    // if result is less than 10, add '0' to the beginning
    if (S < 10) {
      S = "0" + S;
    }
    if (S == 60) {
      S = "00";
      // as soon as the seconds == 60, add +1 to the minutes
      M = +M + 1;
      // If result is less than 10, add '0' to the beginning
      if (M < 10) {
        M = "0" + M;
      }
      if (M == 60) {
        // as soon as the minutes == 60, add +1 to the hours
        M = "00";
        H = +H + 1;
        if (H < 10) {
          H = "0" + H;
        }
      }
    }
    secs.innerText = S;
    mins.innerText = M;
    hour.innerText = H;
  }, 1000);
};

document.addEventListener("DOMContentLoaded", () => {
  const cardsArr = [
    {
      name: "blogs",
      img: "images/kottans-mail.png",
    },
    {
      name: "files",
      img: "images/kottans-map.png",
    },
    {
      name: "mail",
      img: "images/kottans-mars.png",
    },
    {
      name: "map",
      img: "images/kottans-photo.png",
    },
    {
      name: "mars",
      img: "images/kottans-translate.png",
    },
    {
      name: "news",
      img: "images/kottans-videos.png",
    },
  ];

  const doubleCardsArr = [...cardsArr, ...cardsArr];

  // get random arr sort from https://css-tricks.com/snippets/javascript/shuffle-array/
  doubleCardsArr.sort(function () {
    return 0.5 - Math.random();
  });

  const field = document.querySelector(".field");
  let flippedCards = [];
  let flippedCardsId = [];
  let cardsWon = [];

  function newGame() {
    for (let i = 0; i < doubleCardsArr.length; i++) {
      let card = document.createElement("img");
      card.setAttribute("src", "images/kottans-black.png");
      card.setAttribute("card-id", i);
      card.addEventListener("click", flipcard);
      field.appendChild(card);
    }
  }

  function checkForEquality() {
    let cards = document.querySelectorAll("img");
    const optionOneId = flippedCardsId[0];
    const optionTwoId = flippedCardsId[1];
    if (flippedCards[0] === flippedCards[1]) {
      if (optionOneId === optionTwoId) {
        // if clicked on the same card
        cards[optionOneId].setAttribute("src", "images/kottans-black.png");
        cards[optionTwoId].setAttribute("src", "images/kottans-black.png");
      } else if (flippedCards[0] === flippedCards[1]) {
        // if found a match
        cards[optionOneId].setAttribute("src", "images/kottans-white.png");
        cards[optionTwoId].setAttribute("src", "images/kottans-white.png");
        cards[optionOneId].removeEventListener("click", flipcard);
        cards[optionTwoId].removeEventListener("click", flipcard);
        cardsWon.push(flippedCards);
      }
    } else {
      // if not match
      cards[optionOneId].setAttribute("src", "images/kottans-black.png");
      cards[optionTwoId].setAttribute("src", "images/kottans-black.png");
    }
    flippedCards = [];
    flippedCardsId = [];
    if (cardsWon.length === doubleCardsArr.length / 2) {
      setTimeout(() => {
        let t = document.querySelector(".time");
        alert(`You found all pairs! Your ${t.innerText.toLocaleLowerCase()}`);
        setTimeout(window.location.reload.bind(window.location), 250);
      }, 550);
    }
  }

  function flipcard() {
    let k = document.querySelector(".time");
    if (k.innerText === "Time: 00:00:00") {
      timer();
    }
    let cardId = this.getAttribute("card-id");
    flippedCards.push(doubleCardsArr[cardId].name);
    flippedCardsId.push(cardId);
    this.setAttribute("src", doubleCardsArr[cardId].img);
    if (flippedCards.length === 2) {
      setTimeout(checkForEquality, 500);
    }
  }

  newGame();
});
