class Environment {
  constructor() {
    this.tileWidth = 101;
    this.tileHeight = 83;
    this.tilesInRow = 5;
    this.fieldMinX = 0;
    this.fieldMinY = -10;
    this.fieldMaxX = this.tileWidth * this.tilesInRow;
    this.fieldMaxY = 415;
    this.isGameOn = true;
    this.directions = ['left', 'right'];
  }
  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  getRandomDirection() {
    return this.directions[Math.floor(Math.random() * this.directions.length)];
  }
}

class ScoreBoard {
  constructor(highScoreHolder, messageHolder, currentScoreHolder) {
    this.currentScore = 0;
    this.highScoreHolder = document.querySelector(highScoreHolder);
    this.messageHolder = document.querySelector(messageHolder);
    this.welcomeMessage = "Let's go!";
    this.winMessage = 'You win!';
    this.loseMessage = 'You lose!';
    this.highScore = localStorage.getItem('highScore') ?? 0;
    this.currentScoreHolder = document.querySelector(currentScoreHolder);
  }
  updateGameInfo(message) {
    this.currentScoreHolder.innerText = `Current score: ${this.currentScore}`;
    this.highScoreHolder.innerText = `High score: ${this.highScore}`;
    this.messageHolder.innerText = `${message}`;
  }
  incrementScore() {
    this.currentScore += 1;
    if (this.currentScore > this.highScore) {
      this.highScore = this.currentScore;
      this.saveHighScore(this.highScore);
    }
  }
  saveHighScore(score) {
    localStorage.setItem('highScore', score);
  }
  resetScore() {
    this.currentScore = 0;
  }
}

class Player {
  constructor(env, scoreBoard) {
    this.env = env;
    this.scoreBoard = scoreBoard;
    this.sprite = 'images/char-boy.png';
    this.startX = this.env.tileWidth * 2;
    this.startY = this.env.fieldMinY + this.env.tileHeight * 5;
    this.currX = this.startX;
    this.currY = this.startY;
    this.resetDelay = 1000;
  }

  update(newX = this.currX, newY = this.currY) {
    if (!this.env.isGameOn) {
      return;
    }
    (this.currX = newX), (this.currY = newY);
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.currX, this.currY);
  }

  handleInput(code) {
    if (!this.env.isGameOn) {
      return;
    }
    switch (code) {
      case 'ArrowLeft':
        if (this.currX - this.env.tileWidth < this.env.fieldMinX) return;
        this.currX -= this.env.tileWidth;
        break;
      case 'ArrowRight':
        if (this.currX + this.env.tileWidth >= this.env.fieldMaxX) return;
        this.currX += this.env.tileWidth;
        break;
      case 'ArrowUp':
        if (this.currY - this.env.tileHeight < this.env.fieldMinY) return;
        this.currY -= this.env.tileHeight;
        break;
      case 'ArrowDown':
        if (this.currY + this.env.tileHeight >= this.env.fieldMaxY) return;
        this.currY += this.env.tileHeight;
        break;
      default:
        break;
    }
    this.update(this.currX, this.currY);
    if (this.currY === this.env.fieldMinY) {
      this.env.isGameOn = false;
      this.scoreBoard.incrementScore();
      this.scoreBoard.updateGameInfo(this.scoreBoard.winMessage);
      setTimeout(() => {
        this.env.isGameOn = true;
        this.scoreBoard.updateGameInfo(this.scoreBoard.welcomeMessage);
        this.update(this.startX, this.startY);
      }, this.resetDelay);
    }
  }
}

class Enemy {
  constructor(startY, player, env, scoreBoard) {
    this.scoreBoard = scoreBoard;
    this.env = env;
    this.directions = ['left', 'right'];
    this.direction = this.env.getRandomDirection();
    this.sprite = `images/enemy-bug-${this.direction}.png`;
    this.minX = -this.env.tileWidth;
    this.maxX = this.env.fieldMaxX + this.env.tileWidth;
    this.startX = this.direction === 'right' ? this.minX : this.maxX;
    this.startY = startY;
    this.currX = this.startX;
    this.currY = this.startY;
    this.minSpeed = 150;
    this.maxSpeed = 300;
    this.mult =
      this.direction === 'right'
        ? this.env.getRandomNumber(this.minSpeed, this.maxSpeed)
        : -this.env.getRandomNumber(this.minSpeed, this.maxSpeed);
    this.player = player;
  }
  checkCollision() {
    if (this.player.currY !== this.currY) {
      return false;
    }
    if (
      (this.player.currX >= this.currX && this.player.currX <= this.currX + this.env.tileWidth) ||
      (this.player.currX + this.env.tileWidth >= this.currX &&
        this.player.currX + this.env.tileWidth <= this.currX + this.env.tileWidth)
    ) {
      return true;
    }
    return false;
  }
  update(dt) {
    if (this.checkCollision()) {
      this.scoreBoard.resetScore();
      this.scoreBoard.updateGameInfo(this.scoreBoard.loseMessage);
      this.player.update(this.player.startX, this.player.startY);
      setTimeout(() => {
        this.scoreBoard.updateGameInfo(this.scoreBoard.welcomeMessage);
      }, 500);
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

const env = new Environment();
const scoreBoard = new ScoreBoard('.high', '.message', '.current');
const player = new Player(env, scoreBoard);
const firstEnemyY = env.fieldMinY + env.tileHeight;
const secondEnemyY = env.fieldMinY + env.tileHeight * 2;
const thirdEnemyY = env.fieldMinY + env.tileHeight * 3;
const allEnemies = [
  new Enemy(firstEnemyY, player, env, scoreBoard),
  new Enemy(secondEnemyY, player, env, scoreBoard),
  new Enemy(thirdEnemyY, player, env, scoreBoard),
];

document.addEventListener('keyup', function ({ code }) {
  const allowedKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
  if (allowedKeys.includes(code)) player.handleInput(code);
});

document.addEventListener('DOMContentLoaded', () => {
  scoreBoard.updateGameInfo(scoreBoard.welcomeMessage);
});
