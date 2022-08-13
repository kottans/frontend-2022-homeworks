const tileSize = {
  width: 101,
  height: 85,
};

const enemySpeed = {
  first: 90,
  second: 230,
  third: 150,
};

const boardSize = {
  top: 0,
  right: tileSize.width * 5,
  bottom: tileSize.height * 6,
  left: 0,
};

const startPlayerPosition = {
  x: tileSize.width * 2,
  y: tileSize.height * 5 - tileSize.width / 2,
};

class instancesOfCharacter {
  constructor(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  update() {}
}
class Enemy extends instancesOfCharacter {
  constructor(y, speed) {
    super(0, y, "images/enemy-bug.png");
    this.speed = speed;
    this.enemyCenter = 35;
  }

  checkCollision() {
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
    this.checkCollision();
  }
}
class Player extends instancesOfCharacter {
  constructor(x, y) {
    super(x, y, "images/char-boy.png");
  }

  moveToStartPosition() {
    this.x = startPlayerPosition.x;
    this.y = startPlayerPosition.y;
  }

  resetToStartPosition() {
    if (this.y < boardSize.top) {
      this.moveToStartPosition();
    }
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
}

const player = new Player(startPlayerPosition.x, startPlayerPosition.y);
const enemy = new Enemy();

const allEnemies = [
  new Enemy(tileSize.height * 3 - enemy.enemyCenter, enemySpeed.first),
  new Enemy(tileSize.height * 2 - enemy.enemyCenter, enemySpeed.second),
  new Enemy(tileSize.height * 1 - enemy.enemyCenter, enemySpeed.third),
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
