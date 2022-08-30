const charactersSize = {
  charboy: 50,
  bug: 35,
  sizeDiff: 15,
};
const tileSize = {
  width: 101,
  height: 85,
};
const startPlayerPosition = {
  x: tileSize.width * 2,
  y: tileSize.height * 4 - charactersSize.charboy,
};
const gameBoard = {
  left: 0,
  top: 0,
  right: tileSize.width * 5,
  bottom: tileSize.height * 6,
};
class Character {
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
class Enemy extends Character {
  constructor(x, y, speed) {
    super(x, y, "images/enemy-bug.png");
    this.speed = speed;
  }
  checkCollision() {
    if (
      this.x +
        tileSize.width -
        charactersSize.charboy +
        charactersSize.sizeDiff >
        player.x &&
      this.x - charactersSize.charboy - charactersSize.sizeDiff < player.x &&
      this.y === player.y + charactersSize.sizeDiff
    ) {
      setTimeout(() => {
        player.x = tileSize.width * 2;
        player.y = tileSize.height * 4 - charactersSize.charboy;
      }, 100);
    }
  }
  update(dt) {
    this.x += this.speed * dt;
    if (this.x > tileSize.width * 5) this.x = -tileSize.width;
    this.checkCollision();
  }
}
class Player extends Character {
  constructor(x, y) {
    super(x, y, "images/char-boy.png");
  }
  resetToStartPosition() {
    if (this.y < tileSize.height - charactersSize.charboy) {
      setTimeout(() => {
        alert("You won");
        this.y = startPlayerPosition.y;
        this.x = startPlayerPosition.x;
      }, 100);
    }
  }
  handleInput(direction) {
    if (direction === "left" && this.x > gameBoard.left) {
      this.x -= tileSize.width;
    }
    if (direction === "up" && this.y > gameBoard.top) {
      this.y -= tileSize.height;
    }
    if (direction === "right" && this.x < gameBoard.right - tileSize.width) {
      this.x += tileSize.width;
    }
    if (
      direction === "down" &&
      this.y < gameBoard.bottom - tileSize.height * 2
    ) {
      this.y += tileSize.height;
    }
    this.resetToStartPosition();
  }
}

const enemyLocationY = [
  tileSize.height - charactersSize.bug,
  tileSize.height * 2 - charactersSize.bug,
  tileSize.height * 3 - charactersSize.bug,
];
const allEnemies = enemyLocationY.map((location) => {
  return new Enemy(100, location, (Math.random() + 1) * 100);
});
const player = new Player(startPlayerPosition.x, startPlayerPosition.y);

document.addEventListener("keyup", function (e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
