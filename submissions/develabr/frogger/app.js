let score = 0;

class Enemy {
  constructor(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 80;
    this.speed = speed;
  }
  update(dt) {
    this.x += this.speed * dt;

    if (this.x > 510) {
      this.x = -70;
    }

    if (
      player.x + this.width > this.x &&
      player.x < this.x + this.width &&
      player.y + this.height > this.y &&
      player.y < this.y + this.height
    ) {
      player.toStart();
    }
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

class Player {
  constructor(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
  }
  update(dt) {
    if (this.y <= 0) {
      player.toStart();
      score++;
    }
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    scoreBoard();
  }
  handleInput(key) {
    switch (key) {
      case 'left':
        if (this.x > 0) this.x -= 101;
        break;

      case 'up':
        if (this.y > 0) this.y -= 83;
        break;

      case 'right':
        if (this.x < 404) this.x += 101;
        break;

      case 'down':
        if (this.y < 405) this.y += 83;
        break;

      default:
        break;
    }
  }
  toStart() {
    this.x = 202;
    this.y = 405;
  }
}

function scoreBoard() {
  ctx.fillStyle = 'black';
  ctx.strokeStyle = 'black';
  ctx.font = '15px Verdana';
  ctx.strokeText('Score', 265, 15);
  ctx.font = '40px Verdana';
  ctx.fillText(score, 270, 50);
}

const enemyConf = [
  {
    x: 0,
    y: 220,
    speed: 150,
  },
  {
    x: 0,
    y: 140,
    speed: 200,
  },
  {
    x: 0,
    y: 50,
    speed: 300,
  },
];
let allEnemies = enemyConf.map(({ x, y, speed }) => new Enemy(x, y, speed));

let player = new Player(202, 405);

document.addEventListener('keyup', function (e) {
  const allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
