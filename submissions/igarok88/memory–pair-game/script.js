(function () {
  function fruitCards() {
    function Shuffle(o) {
      for (
        var j, x, i = o.length;
        i;
        j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
      );
      return o;
    }
    const shuffleArr = Shuffle([1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6]);

    const gameContainer = document.querySelector(".game__container");
    gameContainer.innerHTML = "";

    shuffleArr.forEach((item) => {
      const gameСard = `
      <div class="game__card-container flip-container" data-value='${item}'>
        <div class="flipper">
          <div class="game__item front"></div>
          <div class="game__item back">
            <img class='game__img' src="img/${item}.jpg"  alt="${item}" />  
          </div>
        </div>
      </div>
    `;
      gameContainer.innerHTML += gameСard;
    });

    let gameCards = document.querySelectorAll(".game__card-container");

    let selectedCards = [];
    let timeout;

    const openCards = function (e) {
      if (e.target.closest(".game__card-container")) {
        const currentCard = e.target.closest(".game__card-container");
        currentCard.classList.add("selected");
        selectedCards.push(currentCard.getAttribute("data-value"));
      }

      if (selectedCards.length > 1 && selectedCards[0] === selectedCards[1]) {
        gameCards.forEach((item) => {
          if (item.getAttribute("data-value") === selectedCards[0]) {
            timeout = setTimeout(() => {
              item.replaceWith(document.createElement("div"));

              if (isFinishGame()) {
                alert("Congratulation. You Win!");
                fruitCards();
              }
            }, 1200);
          }
        });

        selectedCards = [];
      }

      if (selectedCards.length > 1 && selectedCards[0] !== selectedCards[1]) {
        gameContainer.removeEventListener("click", openCards);

        selectedCards = [];

        timeout = setTimeout(closeCards, 800);
      }
    };

    function isFinishGame() {
      gameCards = document.querySelectorAll(".game__card-container");
      if (gameCards.length === 0) {
        return true;
      }
      return false;
    }

    function closeCards() {
      gameCards.forEach((item) => {
        item.classList.remove("selected");
      });
      clearTimeout(timeout);
      gameContainer.addEventListener("click", openCards);
    }
    gameContainer.addEventListener("click", openCards);
  }
  fruitCards();
})();
