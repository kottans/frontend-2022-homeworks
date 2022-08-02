const playerStart = {
  x: 210,
  y: 390,
};

const charactersSize = {
  charboy: 50,
  bug: 35,
  sizeDiff: 12,
};

const tile = {
  width: 101,
  height: 85,
};

const board = {
  top: 0,
  right: tile.width * 5,
  bottom: tile.height * 6,
  left: 0,
};
class Enemy {
  constructor(y, speed) {
    this.sprite = "images/enemy-bug.png";
    this.x = 0;
    this.y = y;
    this.speed = speed;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  collision() {
    if (this.x + tile.width > player.x && this.x + tile.width < player.x + tile.width && this.y > player.y && this.y < player.y + tile.height ) {
      setTimeout(() => {
        player.startPosition();
      }, 100);
    }
  }

  update(dt) {
    this.x += this.speed * dt;
    if (this.x > board.right) this.x = -tile.width;
    this.collision();
  }
}
class Player {
  constructor() {
    this.startPosition();
    this.sprite = "images/char-boy.png";
  }

  startPosition() {
    this.x = tile.width * 2;
    this.y = tile.height * 5 - charactersSize.charboy;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  reset() {
    if (this.y < board.top) {
      this.startPosition();
    }
  }

  handleInput(key) {
    switch (key) {
      case "left":
        if (this.x > board.left) {
          this.x -= tile.width;
        }
        break;
      case "right":
        if (this.x < board.right - tile.width) {
          this.x += tile.width;
        }
        break;
      case "up":
        if (this.y > board.top) {
          this.y -= tile.height;
        }
        break;
      case "down":
        if (this.y < board.bottom - tile.height * 2) {
          this.y += tile.height;
        }
        break;
    }
    this.reset();
  }

  update() {}
}

const allEnemies = [
  new Enemy(tile.height * 3 - charactersSize.bug, 90),
  new Enemy(tile.height * 2 - charactersSize.bug, 150),
  new Enemy(tile.height * 1 - charactersSize.bug, 100),
];

const player = new Player();

document.addEventListener("keyup", function (e) {
  const allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
