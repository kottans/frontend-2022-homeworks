
const gameProperties = {
  cellHeight: 83,
  cellWidth: 100,
  playerXStart: 200,
  playerYStart: 383,
  up: 0,
  down: 383,
  left: 0,
  right: 400,
  collisionX: 50,
  collisionY: 40,
  frontierForEnemiesLeft:-150,
  frontierForEnemiesRight:500,
};

class Game {
    constructor({
      cellHeight,
      cellWidth,
      playerXStart,
      playerYStart,
      up,
      down,
      left,
      right,
      collisionX,
      collisionY,
      frontierForEnemiesLeft,
      frontierForEnemiesRight
    }) {
      this._level = 1;
      this.isStop = false;
      this.isGameOver = false;
      this.CELL_HEIGHT = cellHeight;
      this.CELL_WIDTH = cellWidth;
      this.PLAYER_X_START = playerXStart;
      this.PLAYER_Y_START = playerYStart;
      this.up = up;
      this.down = down;
      this.left = left;
      this.right = right;
      this.collisionX = collisionX;
      this.collisionY = collisionY;
      this.frontierForEnemiesLeft=frontierForEnemiesLeft;
      this.frontierForEnemiesRight=frontierForEnemiesRight;
    }
  
    setLevel() {
      this._level = 1;
    }
    getLevel() {
      return this._level;
    }
    incLevel() {
      this._level++;
    }
    gameStart() {}
  }
  
class Enemy {
  constructor({ x, y, speed }) {
    this.sprite = "images/enemy-bug.png";
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  update(dt) {
    this.x +=
      dt * (this.speed + 0.4 * this.speed * game.getLevel()) * !game.isStop;
    if (this.x > game.frontierForEnemiesRight) {
      this.x = game.frontierForEnemiesLeft;
    }
    if (this.isCollision()) {
      player.start();
      game.setLevel();
    }
  }

  isCollision() {
    if (
      this.x > player.x - game.collisionX &&
      this.x < player.x + game.collisionX &&
      this.y > player.y - game.collisionY &&
      this.y < player.y + game.collisionY
    ) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

class Player {
  constructor() {
    this.sprite = "images/char-boy.png";
    this.x = game.PLAYER_X_START;
    this.y = game.PLAYER_Y_START;
  }

  handleInput(key) {
    switch (key) {
      case "up":
        if (this.y > game.up) {
          this.y -= game.CELL_HEIGHT;
        }
        break;
      case "down":
        if (this.y < game.down) {
          this.y += game.CELL_HEIGHT;
        }
        break;
      case "left":
        if (this.x > game.left) {
          this.x -= game.CELL_WIDTH;
        }
        break;
      case "right":
        if (this.x < game.right) {
          this.x += game.CELL_WIDTH;
        }
        break;
      default:
        break;
    }
    if (this.isWin()) {
      this.renderLevel();
    }
  }

  renderLevel() {
    const body = document.querySelector(".message");
    let div = `<div class="class__modal">You LEVEL${game.getLevel()}!</div>`;
    game.isStop = true;
    game.incLevel();
    this.start();
    document.removeEventListener("keyup", playerMove);
    body.innerHTML = div;
    setTimeout(() => {
      game.isStop = false;
      document.addEventListener("keyup", playerMove);
      body.innerHTML = "";
    }, 1500);
  }

  isWin() {
    if (this.y <= 0) {
      return true;
    } else {
      return false;
    }
  }

  update() {}
  start() {
    this.x = game.PLAYER_X_START;
    this.y = game.PLAYER_Y_START;
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

const game = new Game(gameProperties);
const bug1 = new Enemy({ x: 0, y: 140, speed: 100 });
const bug2 = new Enemy({ x: 0, y: 50, speed: 50 });
const bug3 = new Enemy({ x: 0, y: 230, speed: 200 });
const allEnemies = [bug1, bug2, bug3];
const player = new Player();

function playerMove(e) {
  const allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };
  player.handleInput(allowedKeys[e.keyCode]);
}

document.addEventListener("keyup", playerMove);
