const defaultFruits = [
    "fruit-1",
    "fruit-2",
    "fruit-3",
    "fruit-4",
    "fruit-5",
    "fruit-6",
    "fruit-7",
    "fruit-8",
    "fruit-9",
    "fruit-10",
    "fruit-11",
    "fruit-12",
    "fruit-13",
    "fruit-14",
    "fruit-15",
    "fruit-16",
    "fruit-17",
    "fruit-18",
    "fruit-19",
    "fruit-20",
  ];
  const maxFruits = 6; // count of fruits will be get from array of fruits
  const counts = 2; // count of which you have to choose
  const maxIds = counts; // maximum cards for compare
  const fruits = document.querySelector("#fruits");
  
  let ids = []; // id of cards which we chose. len = counts
  let fruitsOnTheTable = []; // array of new fruits from arrFruits
  let chosenFruits = []; // elements which we chose. len = counts
  let cards = 0; // sum of correct cards
  
  const getNumber = (min, max) => Math.round(Math.random() * (max - min) + min);
  
  game(); // run the game
  
  function game() {
    let randomFruits = []; // list of our chosen fruits
  
    // if we decided to choose less fruits than array has.
    if (maxFruits < defaultFruits.length) {
      const number = getNumber(0, defaultFruits.length - 1);
      if (number + maxFruits > defaultFruits.length) {
        const num1 = defaultFruits.length - number;
        const num2 = maxFruits - num1;
  
        randomFruits = [
          ...defaultFruits.splice(number, num1),
          ...defaultFruits.splice(0, num2),
        ];
      } else {
        randomFruits = defaultFruits.splice(number, maxFruits);
      }
    } else {
      // used slice for copy, not just for link
      randomFruits = defaultFruits.slice();
    }
    // -----
  
    // fill the array from which we will be generating the table of fruits
    fruitsOnTheTable = [];
    for (let i = 0; i < maxFruits * counts; i++) {
      const fruit = randomFruits[getNumber(0, randomFruits.length - 1)];
  
      if (!fruitsOnTheTable.length) {
        fruitsOnTheTable.push(fruit);
        continue;
      }
  
      if (
        fruitsOnTheTable.filter((item) => item === fruit).length <=
        counts - 1
      ) {
        fruitsOnTheTable.push(fruit);
      } else {
        if (randomFruits.length > 1) {
          randomFruits.splice(randomFruits.indexOf(fruit), 1);
          i--;
        }
      }
    }
  
    const cardOfFruits = generateCards();
    fruits.appendChild(cardOfFruits);
  }
  
  // ---------------
  
  function generateCards() {
    return fruitsOnTheTable.reduce((fragment, current) => {
      const div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `
              <div class="cardBlockInside">    
                  <div class="${current}"></div>
                  <div class="back" data-id="${/[0-9]+/.exec(current)[0]}"></div>
              </div>
          `;
  
      fragment.appendChild(div);
      return fragment;
    }, document.createDocumentFragment());
  }
  
  // ---------------
  
  fruits.addEventListener("click", (e) => {
    const elem = e.target;
    if (!elem.dataset.id || ids.length === maxIds) return;
  
    elem.parentNode.classList.add("flip");
  
    const id = elem.dataset.id;
    if (ids.length < maxIds) {
      ids.push(id);
      chosenFruits.push(elem.parentNode);
    }
  
    if (ids.length === maxIds) {
      const firstIds = ids[0];
      const result = ids.every((id) => firstIds === id);
  
      sameCard(result, won);
    }
  });
  
  function won(cardsLen) {
    setTimeout(() => {
      if (cardsLen === fruitsOnTheTable.length) {
        alert("Congratulations!\r\nYou won.");
  
        cards = 0;
        fruits.innerHTML = "";
        game();
      }
    }, 100);
  }
  
  function sameCard(state, callback) {
    setTimeout(function () {
      chosenFruits.forEach((card) => {
        if (state) {
          card.parentNode.classList.add("same");
          card.parentNode.removeChild(card);
        } else {
          card.classList.remove("flip");
        }
      });
  
      chosenFruits = [];
      ids = [];
  
      if (state) {
        cards += maxIds;
        if (cards === fruitsOnTheTable.length) callback(cards);
      }
    }, 1000);
  }
  