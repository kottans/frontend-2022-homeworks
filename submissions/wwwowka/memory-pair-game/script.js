const partPair = [
  {
    cardId: "01",
    image: "img/acorn.svg"
  },
  {
    cardId: "02",
    image: "img/autumn-tree.svg"
  },
  {
    cardId: "03",
    image: "img/dry-leaf.svg"
  },
  {
    cardId: "04",
    image: "img/hedgehog.svg"
  },
  {
    cardId: "05",
    image: "img/pumpkin.svg"
  },
  {
    cardId: "06",
    image: "img/squirrel.svg"
  },
]

function createPair({ cardId, image }) {
  return (
    `   <div class="scene scene--card">
    <div id="${cardId}" class="card">
        <div class="card__face card__face--front">
        </div>
        <div class="card__face card__face--back">
            <img class="card__img"  src="${image}" alt="">
        </div>
    </div>
  </div> `
  );
};

partPair.push(...partPair);
partPair.sort(function () { return 0.5 - Math.random() });

game.innerHTML = partPair.map(createPair).join('');

const cards = document.querySelectorAll('.card');
let foundCards = 0;

[...cards].forEach((card) => {
  card.addEventListener('click', () => {
    card.classList.toggle('is-flipped');
    checkCards();
  });
});

const checkCards = () => {
  const flippedCards = document.querySelectorAll('.is-flipped');

  if (flippedCards.length === 2) {

    if (
      flippedCards[0].getAttribute("id") ===
      flippedCards[1].getAttribute("id")

    ) {
      flippedCards.forEach((card) => {
        card.classList.replace('is-flipped', 'found-pair');
        foundCards++;
      });

    } else {
      setTimeout(() =>
        [...cards].forEach((card) => {
          card.classList.remove('is-flipped');
        })
        , 500)
    }
  }
  if (foundCards === 12) {
    setTimeout(() => document.getElementById("title").innerHTML = 'You win!!!', 1500);
    setTimeout(() => document.getElementById("conteiner").classList.toggle('conteiner-leaf-fall'), 2500)
    setTimeout(() => document.getElementById("glass").classList.toggle('leaf-fall'), 3500);
  }
}
