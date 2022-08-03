const tileSize = {
  width: 101,
  height: 85,
};

const boardSize = {
  top: 0,
  right: tileSize.width * 5,
  bottom: tileSize.height * 6,
  left: 0,
};
class Enemy {
  constructor(y, speed) {
    this.sprite = "images/enemy-bug.png";
    this.x = 0;
    this.y = y;
    this.speed = speed;
    this.enemyCenter = 35;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  collision() {
    if (
      this.x + tileSize.width > player.x &&
      this.x < player.x &&
      this.y > player.y &&
      this.y < player.y + tileSize.height
    ) {
      player.moveToStartPosition();
    }
  }

  update(dt) {
    this.x += this.speed * dt;
    if (this.x > boardSize.right) {
      this.x = -tileSize.width;
    }
    this.collision();
  }
}
class Player {
  constructor() {
    this.moveToStartPosition();
    this.sprite = "images/char-boy.png";
  }

  moveToStartPosition() {
    this.x = tileSize.width * 2;
    this.y = tileSize.height * 5 - tileSize.width / 2;
  }

  resetToStartPosition() {
    if (this.y < boardSize.top) {
      this.moveToStartPosition();
    }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(key) {
    switch (key) {
      case "left":
        if (this.x > boardSize.left) {
          this.x -= tileSize.width;
        }
        break;
      case "right":
        if (this.x < boardSize.right - tileSize.width) {
          this.x += tileSize.width;
        }
        break;
      case "up":
        if (this.y > boardSize.top) {
          this.y -= tileSize.height;
        }
        break;
      case "down":
        if (this.y < boardSize.bottom - tileSize.height * 2) {
          this.y += tileSize.height;
        }
        break;
    }
    this.resetToStartPosition();
  }
  update() {}
}

const player = new Player();
const enemy = new Enemy();

const allEnemies = [
  new Enemy(tileSize.height * 3 - enemy.enemyCenter, 90),
  new Enemy(tileSize.height * 2 - enemy.enemyCenter, 150),
  new Enemy(tileSize.height * 1 - enemy.enemyCenter, 100),
];

document.addEventListener("keyup", function (e) {
  const allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
