class Enemy {
  constructor({ x, y, speedX, fieldWidth, player }) {
    this.sprite = 'images/enemy-bug.png';
    this.fieldWidth = fieldWidth;
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.height = 40;
    this.width = 83;
    this.player = player;
  }

  checkCollision() {
    if (
      this.x + this.width > this.player.x &&
      this.player.x + this.player.width > this.x &&
      this.player.y > this.y - this.height &&
      this.player.y - this.player.height < this.y
    ) {
      this.player.resetPosition();
    }
  }

  update(dt) {
    this.checkCollision();

    if (this.x >= this.fieldWidth) {
      this.x = 0;
    }

    this.x += dt * this.speedX;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

class Player {
  constructor({ fieldWidth, fieldHeight, speedX, speedY }, score) {
    this.sprite = 'images/char-boy.png';
    this.fieldWidth = fieldWidth;
    this.fieldHeight = fieldHeight;
    this.x = this.fieldWidth / 2;
    this.y = this.fieldHeight;
    this.speedX = speedX;
    this.speedY = speedY;
    this.height = 40;
    this.width = 40;
    this.score = score;
  }

  update(dt) {
    if (this.y < 0) {
      this.score.update();
      this.resetPosition();
    }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(key) {
    switch (key) {
      case 'left':
        if (this.x > 0) this.x -= this.speedX;
        break;

      case 'up':
        if (this.y > 0) this.y -= this.speedY;
        break;

      case 'right':
        if (this.x < this.fieldWidth) this.x += this.speedX;
        break;

      case 'down':
        if (this.y < this.fieldHeight) this.y += this.speedY;
        break;

      default:
        break;
    }
  }

  resetPosition() {
    this.x = this.fieldWidth / 2;
    this.y = this.fieldHeight;
  }
}

class Score {
  constructor(element) {
    this.element = element;
    this.score = 0;
  }

  update() {
    this.element.innerHTML = `${++this.score}`;
  }
}

const playerConfiguration = {
  fieldWidth: 400,
  fieldHeight: 375,
  speedY: 80,
  speedX: 100,
};

const score = new Score(document.querySelector('.score__number'));

const player = new Player(playerConfiguration, score);

const enemy1Configuration = {
  x: 0,
  y: 50,
  speedX: 80,
  fieldWidth: 400,
  player,
};

const enemy2Configuration = {
  x: 0,
  y: 135,
  speedX: 100,
  fieldWidth: 400,
  player,
};

const enemy3Configuration = {
  x: 0,
  y: 215,
  speedX: 120,
  fieldWidth: 400,
  player,
};

const allEnemies = [
  new Enemy(enemy1Configuration),
  new Enemy(enemy2Configuration),
  new Enemy(enemy3Configuration),
];

function handleClick(e) {
  const allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
  };

  player.handleInput(allowedKeys[e.keyCode]);
}

document.addEventListener('keyup', handleClick);
