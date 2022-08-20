let highScore = localStorage.getItem('highScore') ?? 0;
let currentScore = 0;
const highHolder = document.querySelector('.high');
const currentHolder = document.querySelector('.current');
const infoHolder = document.querySelector('.info');

const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min) + min);

const directions = ['left', 'right'];

const getRandomDirection = () =>
  directions[Math.floor(Math.random() * directions.length)];

canvas = {
  width: 505,
  height: 606,
};

class Enemy {
  constructor(startY, mult) {
    this.width = 101;
    this.height = 171;
    this.direction = getRandomDirection();
    this.sprite = `images/enemy-bug-${this.direction}.png`;
    this.minX = -this.width;
    this.maxX = canvas.width + this.width;
    this.startX = this.direction === 'right' ? this.minX : this.maxX;
    this.startY = startY;
    this.currX = this.startX;
    this.currY = this.startY;
    this.mult = this.direction === 'right' ? mult : -mult;
  }
  update(dt) {
    if (
      player.currX >= this.currX &&
      player.currX <= this.currX + this.width &&
      player.currY >= this.currY &&
      player.currY <= this.currY + 85
    ) {
      infoHolder.innerText = `You lost`;
      currentScore = 0;
      currentHolder.innerText = `Current score: ${currentScore}`;
      setTimeout(() => {
        player.update(player.startX, player.startY);
        infoHolder.innerText = `Let's go!`;
      }, 1000);
      player.update(player.startX, player.startY);
    }
    if (this.currX >= this.maxX) {
      this.mult *= -1;
      this.direction = 'left';
      this.sprite = `images/enemy-bug-${this.direction}.png`;
    } else if (this.currX <= this.minX) {
      this.mult *= -1;
      this.direction = 'right';
      this.sprite = `images/enemy-bug-${this.direction}.png`;
    }
    this.currX = this.currX + dt * this.mult;
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.currX, this.currY);
  }
}

class Player {
  constructor() {
    this.sprite = 'images/char-boy.png';
    this.width = 101;
    this.height = 171;
    this.startX = 203;
    this.startY = 404;
    this.currX = this.startX;
    this.currY = this.startY;
    this.minX = 0;
    this.maxX = canvas.width;
    this.stepX = this.width;
    this.minY = -50;
    this.maxY = 450;
    this.stepY = 82;
  }

  update(newX = this.currX, newY = this.currY) {
    (this.currX = newX), (this.currY = newY);
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.currX, this.currY);
  }

  getHighcore() {
    return localStorage.getItem('highScore') || 0;
  }

  handleInput(code) {
    switch (code) {
      case 'ArrowLeft':
        if (this.currX - this.stepX <= this.minX) return;
        this.currX -= this.stepX;
        break;
      case 'ArrowRight':
        if (this.currX + this.stepX >= this.maxX) return;
        this.currX += this.stepX;
        break;
      case 'ArrowUp':
        if (this.currY - this.stepY <= this.minY) return;
        this.currY -= this.stepY;
        break;
      case 'ArrowDown':
        if (this.currY + this.stepY >= this.maxY) return;
        this.currY += this.stepY;
        break;
      default:
        break;
    }
    this.update(this.currX, this.currY);
    if (this.currY === -6) {
      infoHolder.innerText = `You won`;
      currentScore += 1;
      currentHolder.innerText = `Current score: ${currentScore}`;
      setTimeout(() => {
        player.update(this.startX, this.startY);
        infoHolder.innerText = `Let's go!`;
      }, 1000);
      if (currentScore > highScore) {
        highScore = currentScore;
        localStorage.setItem('highScore', highScore);
        highHolder.innerText = `High score: ${highScore}`;
      }
    }
  }
}

const allEnemies = [
  new Enemy(65, getRandomNumber(150, 300)),
  new Enemy(150, getRandomNumber(150, 300)),
  new Enemy(235, getRandomNumber(150, 300)),
];
const player = new Player();

document.addEventListener('keyup', function (e) {
  const allowedKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
  if (allowedKeys.includes(e.code)) player.handleInput(e.code);
});

document.addEventListener('DOMContentLoaded', () => {
  currentHolder.innerText = `Current score: ${currentScore}`;
  highHolder.innerText = `High score: ${highScore}`;
});
