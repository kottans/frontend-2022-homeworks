const config = {
  widthCell: 101,
  heightCell: 83,
};

let score = 0;

class Enemy {
  constructor(x, y, speed, player) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 40;
    this.speed = speed;
    this.player = player;
  }
  update(dt) {
    this.x += this.speed * dt;
    if (this.x > ctx.canvas.width) {
      this.x = -config.widthCell;
    }
    this.collisions();
  }
  collisions() {
    if (
      this.player.x + this.width > this.x &&
      this.player.x < this.x + this.width &&
      this.player.y + this.height > this.y &&
      this.player.y < this.y + this.height
    ) {
      this.player.toStart();
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
        if (this.x > 0) this.x -= config.widthCell;
        break;

      case 'up':
        if (this.y > 0) this.y -= config.heightCell;
        break;

      case 'right':
        if (this.x < ctx.canvas.width - config.widthCell)
          this.x += config.widthCell;
        break;

      case 'down':
        if (this.y < ctx.canvas.height - config.heightCell * 2 - 35)
          this.y += config.heightCell;
        break;

      default:
        break;
    }
  }
  toStart() {
    this.x = config.widthCell * 2;
    this.y = ctx.canvas.height - config.heightCell * 2 - 35;
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

let player = new Player(202, 405);

const enemyConf = [
  {
    x: 0,
    y: 220,
    speed: 150,
    player,
  },
  {
    x: 0,
    y: 140,
    speed: 200,
    player,
  },
  {
    x: 0,
    y: 50,
    speed: 300,
    player,
  },
];
let allEnemies = enemyConf.map(
  ({ x, y, speed, player }) => new Enemy(x, y, speed, player)
);

document.addEventListener('keyup', function (e) {
  const allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
