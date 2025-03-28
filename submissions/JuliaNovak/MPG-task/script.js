const cardArray = [
   {
      id: 1,
      name: "bear",
      img: "images/bear.png",
   },
   {
      id: 2,
      name: "bee",
      img: "images/bee.png",
   },
   {
      id: 3,
      name: "crow",
      img: "images/crow.png",
   },
   {
      id: 4,
      name: "fox",
      img: "images/fox.png",
   },
   {
      id: 5,
      name: "hedgehog",
      img: "images/hedgehog.png",
   },
   {
      id: 6,
      name: "deer",
      img: "images/deer.png",
   },
   {
      id: 7,
      name: "bear",
      img: "images/bear.png",
   },
   {
      id: 8,
      name: "bee",
      img: "images/bee.png",
   },
   {
      id: 9,
      name: "crow",
      img: "images/crow.png",
   },
   {
      id: 10,
      name: "fox",
      img: "images/fox.png",
   },
   {
      id: 11,
      name: "hedgehog",
      img: "images/hedgehog.png",
   },
   {
      id: 12,
      name: "deer",
      img: "images/deer.png",
   },
];

const grid = document.querySelector(".grid");

function startNewGame() {
   cardArray.sort(() => 0.5 - Math.random());
   cardArray.forEach((card) => {
      grid.innerHTML += `
      <div class="flip-container"  id='${card.id}' name='${card.name}'>
         <div class="flipper">
            <div class="front">
               <img src="images/blank.png"  id='${card.id}' name='${card.name}' alt="">
            </div>
            <div class="back">
               <img src="images/${card.name}.png" alt="${card.name}" >
            </div>
         </div>
      </div>`;
   });
}
startNewGame();

const flipContainer = document.querySelectorAll(".flip-container");
let clickedCards = [];
let clickedCardsForWin = [];

function flipCard(e) {
   clickedCards.push({ name: e.target.name, id: e.target.id });
   if (clickedCards.length <= 2) {
      let elWithClassName = document.getElementById(`${e.target.id}`);

      if (elWithClassName === null) {
         elWithClassName = clickedCards[0];
      } else {
         elWithClassName.classList.toggle("flipped");
      }
      flipBack(e);
   }
}

function flipBack(e) {
   if (
      clickedCards.length === 2 &&
      clickedCards[0].name === clickedCards[1].name
   ) {
      clickedCards = [];
      clickedCardsForWin.push({ name: e.target.name, id: e.target.id });
   } else if (
      clickedCards.length === 2 &&
      clickedCards[0].name !== clickedCards[1].name
   ) {
      setTimeout(() => {
         clickedCards.map((el) => {
            let elWithClassName = document.getElementById(`${el.id}`);
            if (elWithClassName === null) {
               elWithClassName = clickedCards[0];
            } else {
               elWithClassName.classList.remove("flipped");
            }
         });
         clickedCards = [];
      }, 1000);
   }
   if (clickedCardsForWin.length === 6) {
      setTimeout(() => {
         popWinWindow();
      }, 300);
   }
}

function popWinWindow() {
   let result = alert("You won!");
   console.log(result);
   startNewGame();
   window.location.reload();
}

flipContainer.forEach((card) => card.addEventListener("click", flipCard));
