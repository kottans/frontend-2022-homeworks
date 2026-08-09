class Card {
  constructor(img, number, id) {
    this.img = img;
    this.number = number;
    this.id = id;
  }

  render() {
    return `<div class="flip-container" >
        <div id="${this.id}" class="flipper" number="${this.number}">
            <div class="front">
                <img src="./img/Sky10.jpg" alt="" class="img__back">
            </div>
            <div class="back">
                <img src="./img/${this.img}.jpg" alt="" class="img__back">
            </div>
        </div>
    </div>`;
  }
}

class Game {
  constructor(maxNumberOfCards, classParent) {
    this.maxNumberOfCards = Math.floor(maxNumberOfCards / 2) * 2;
    this.numbersOfCard = [];
    this.game = document.querySelector(classParent);
    this.cardsPressed = [];
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  initNumbersOfCard() {
    for (let i = 2; i < this.maxNumberOfCards + 2; i++) {
      this.numbersOfCard.push(Math.floor(i / 2));
    }
  }

  createGamesField() {
    this.clicks = 0;
    this.game.innerHTML = "";
    while (this.numbersOfCard.length > 0) {
      let i = this.getRandomInt(this.numbersOfCard.length);
      let random = this.numbersOfCard[i];
      let card = new Card(
        `0${random}`,
        random,
        `id${this.numbersOfCard.length}`
      );
      this.game.insertAdjacentHTML("beforeend", card.render());
      this.numbersOfCard.splice(i, 1);
    }
  }

  isRemove(id1, id2, cardNumber1, cardNumber2) {
    return cardNumber1 === cardNumber2 && id1 !== id2;
  }

  cardsRemove(id1, id2) {
    setTimeout(() => {
      document.getElementById(id1).classList.add("hidden");
      document.getElementById(id2).classList.add("hidden");
      if (this.isWin()) {
        setTimeout(() => this.greetings(), 500);
      }
    }, 1000);
  }

  isRotate(cardNumber1, cardNumber2) {
    return cardNumber1 !== cardNumber2;
  }

  cardsRotate(id1, id2) {
    setTimeout(() => {
      document.getElementById(id1).classList.remove("round");
      document.getElementById(id2).classList.remove("round");
    }, 1000);
  }

  cardPressedProcessing() {
    while (this.cardsPressed.length > 1) {
      let { id: id1, number: number1 } = this.cardsPressed.shift();
      let { id: id2, number: number2 } = this.cardsPressed.shift();
      if (this.isRemove(id1, id2, number1, number2)) {
        this.cardsRemove(id1, id2);
      } else if (this.isRotate(number1, number2)) {
        this.cardsRotate(id1, id2);
      }
    } //while
  }

  greetings() {
    this.game.innerHTML = '<div class="modal">you win!</div>';
  }

  isWin() {
    let win = true;
    if (this.game.hasChildNodes) {
      this.game.childNodes.forEach((element) => {
        if (element.childNodes[1] != undefined) {
          win = win && element.childNodes[1].classList.contains("hidden");
        }
      });
    }
    return win;
  }

  start() {
    this.initNumbersOfCard();
    this.createGamesField();
  }
}

window.addEventListener("DOMContentLoaded", () => {
  let level = document.querySelector(".level"),
    button3 = document.querySelector(".three"),
    button4 = document.querySelector(".four"),
    buttonNumber = document.querySelector(".number"),
    number = 0,
    clicks = 0,
    myGame = new Game(0, ".game__wrap");

  function initGame(number) {
    clicks = 0;
    level.innerText = `click:${clicks}`;
    myGame.maxNumberOfCards = number;
    myGame.start();
  }

  button3.addEventListener("click", () => {
    initGame(12);
  });

  button4.addEventListener("click", () => {
    initGame(16);
  });

  buttonNumber.addEventListener("click", () => {
    let game = document.querySelector(".game__wrap");
    game.innerHTML =
      '<div class="game__number">Enter an even number < 16 (odd will be rounded down)<input class="game__number__input"></div>';
    let newGameInput = document.querySelector(".game__number__input");
    newGameInput.focus();
    newGameInput.addEventListener("change", () => {
      number = Math.floor(Number(newGameInput.value) / 2) * 2;
      initGame(number);
    });
  });

  function myListener(event) {
    let target = event.target;
    while (target != this.game && target.getAttribute("number") === null) {
      target = target.parentNode;
    } //while
    clicks++;
    level.innerText = `click:${clicks}`;
    let number = target.getAttribute("number");
    let id = target.getAttribute("id");
    this.cardsPressed.push({ number, id });
    if (target.getAttribute("number") != null) {
      target.classList.toggle("round");
    }
    this.cardPressedProcessing();
  }

  myGame.game.addEventListener("click", myListener.bind(myGame));
});
