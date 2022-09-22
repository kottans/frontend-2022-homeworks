const positions = [
  'c1r1',
  'c2r1',
  'c3r1',
  'c4r1',
  'c1r2',
  'c2r2',
  'c3r2',
  'c4r2',
  'c1r3',
  'c2r3',
  'c3r3',
  'c4r3',
  'c1r4',
  'c2r4',
  'c3r4',
  'c4r4'
];
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

const FLIP_DURATION = 600;
const PAUSE_FOR_MEMORIZATION = 800;
const CARD_LAYING_INTERVAL = 100;

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

function hideCard($card) {
  const className = $card.dataset.cardPosition;
  $card.classList.remove(className);
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
    this.createCards(currentLayout);
    this.startGame(currentOrder);
  }

  createCards(cards) {
    this.$table.innerHTML = '';
    cards.forEach(({cardName, link}) => {
      this.$table.insertAdjacentHTML('beforeend', `
        <div class="card" data-card-name="${cardName}">
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

  async startGame(order){
    const $cards = document.querySelectorAll('.card');
    for (let i = 0; i < $cards.length; i++) {
      await new Promise(resolve => 
        setTimeout(() => {
          $cards[i].classList.add(order[i]);
          $cards[i].setAttribute('data-card-position', order[i]);
          resolve();
        }, CARD_LAYING_INTERVAL))
    }
    this.$table.addEventListener('click', this.makeTurn.bind(this));
    this.$table.addEventListener('mousedown', (event) => event.preventDefault());
  }

  async makeTurn({target}) {
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
        await new Promise(resolve => {
          setTimeout(this.compareCards.bind(this), FLIP_DURATION);
          resolve();
        });      
      }
    }
  }

  compareCards() {
    if (this.$firstCard.dataset.cardName == this.$secondCard.dataset.cardName) {
      hideCard(this.$firstCard);
      hideCard(this.$secondCard);
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
