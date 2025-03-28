const FIELD_SIZE = 4;
const PERCENTS_PER_CARD = 100 / FIELD_SIZE;
const FLIP_DURATION = 400;
const PAUSE_FOR_MEMORIZATION = 400;
const CARD_LAYING_INTERVAL = 100;
const CARD_ANIMATION_DURATION = 300;

const positions = Array.from(new Array(FIELD_SIZE), (el, row) => {
  return Array.from(new Array(FIELD_SIZE), (el, col) => {
    return {row, col};
  });
}).flat();

const faces = [
  {cardName: 'a', link: './img/au.jpg'},
  {cardName: 'a', link: './img/au.jpg'},
  {cardName: 'b', link: './img/hg.jpg'},
  {cardName: 'b', link: './img/hg.jpg'},
  {cardName: 'c', link: './img/cu.jpg'},
  {cardName: 'c', link: './img/cu.jpg'},
  {cardName: 'd', link: './img/ag.jpg'},
  {cardName: 'd', link: './img/ag.jpg'},
  {cardName: 'e', link: './img/fe.jpg'},
  {cardName: 'e', link: './img/fe.jpg'},
  {cardName: 'f', link: './img/sn.jpg'},
  {cardName: 'f', link: './img/sn.jpg'},
  {cardName: 'g', link: './img/pb.jpg'},
  {cardName: 'g', link: './img/pb.jpg'},
  {cardName: 'h', link: './img/u.jpg'},
  {cardName: 'h', link: './img/u.jpg'},
];
const shirt = './img/shirt.jpg';

function shuffle(array) {
  const shaffledArray = array.slice();
  for (let i = shaffledArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shaffledArray[i], shaffledArray[randomIndex]] = [shaffledArray[randomIndex], shaffledArray[i]];
  }
  return shaffledArray;
}

function openCard($card) {
  $card.classList.add('flipped');
}

function closeCard($card) {
  $card.classList.remove('flipped');
}

function animateCard($card, direction) {
  const row = $card.dataset.row;
  const col = $card.dataset.col;
  const animation = [
    {top: `-${PERCENTS_PER_CARD}%`, left: `-${PERCENTS_PER_CARD}%`},
    {top: `${row * PERCENTS_PER_CARD}%`, left: `${col * PERCENTS_PER_CARD}%`}
  ];
  $card.animate(animation, {duration: CARD_ANIMATION_DURATION, direction: direction, fill: 'forwards'});
}

class Table {
  constructor() {
    this.$table = document.querySelector('.table');
    this.startScreen = new StartScreen();
    this.$firstCard = null;
    this.$secondCard = null;
    this.hiddenCards = 0;
    this.clicks = 0;
  }

  resetGame() {
    this.clicks = 0;
    this.hiddenCards = 0;
    this.startScreen.hide();
    let currentLayout = shuffle(faces);
    let currentOrder = shuffle(positions);
    this.createCards(currentLayout, currentOrder);
    this.startGame();
  }

  createCards(cards, order) {
    this.$table.innerHTML = '';
    cards.forEach(({cardName, link}, i) => {
      this.$table.insertAdjacentHTML('beforeend', `
        <div class="card" data-card-name="${cardName}" data-row="${order[i].row}" data-col="${order[i].col}">
          <div class="card__shirt">
            <img src="${shirt}" alt="" class="card__img">
          </div>
          <div class="card__face">
            <img src="${link}" alt="" class="card__img">
          </div>
        </div>
      `);
    })
  }

  async startGame(){
    const $cards = document.querySelectorAll('.card');
    for (let $card of $cards) {
      await new Promise(resolve => 
        setTimeout(() => {
          animateCard($card, 'normal');
          resolve();
        }, CARD_LAYING_INTERVAL))
    }
    this.$table.addEventListener('click', this.makeTurn.bind(this));
    this.$table.addEventListener('mousedown', (event) => event.preventDefault());
  }

  makeTurn({target}) {
    const $currentCard = target.closest('.card');
    if (!$currentCard) return;
    if (!this.$firstCard) {
      this.$firstCard = $currentCard;
      openCard($currentCard);
      this.clicks++;
    } else if (!this.$secondCard) {
      if ($currentCard != this.$firstCard) {
        this.$secondCard = $currentCard;
        openCard($currentCard);
        this.clicks++;
        setTimeout(this.compareCards.bind(this), FLIP_DURATION);      
      }
    }
  }

  compareCards() {
    if (this.$firstCard.dataset.cardName == this.$secondCard.dataset.cardName) {
      animateCard(this.$firstCard, 'reverse');
      animateCard(this.$secondCard, 'reverse');
      this.$firstCard = null;
      this.$secondCard= null;
      this.hiddenCards += 2;
      if (this.hiddenCards == 16) {
        this.startScreen.show(this.clicks);
      }
    } else {
      setTimeout(() => {
        closeCard(this.$firstCard);
        closeCard(this.$secondCard);
        this.$firstCard = null;
        this.$secondCard= null;
      }, PAUSE_FOR_MEMORIZATION);
    }
  }
}

class StartScreen {
  constructor() {
    this.$screen = document.querySelector('.start-screen');
    this.$title = document.querySelector('.start-screen__title');
    this.$text = document.querySelector('.start-screen__text');
    this.$button = document.querySelector('.start-screen__button');
  }

  show(clicks) {
    this.$title.textContent = 'YOU WIN!'
    this.$text.textContent = `You did it in ${clicks} clicks`;
    this.$screen.classList.remove('hidden');
  }

  hide() {
    this.$screen.classList.add('hidden');
  }
}

const table = new Table();
table.startScreen.$button.addEventListener('click', table.resetGame.bind(table));
