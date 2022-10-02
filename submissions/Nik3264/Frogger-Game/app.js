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
  frontierForEnemiesLeft: -150,
  frontierForEnemiesRight: 500,
  startYForCreateEnemy: 50,
  stepYForCreateEnemy: 90,
  increaseSpeed: 70,
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
    frontierForEnemiesRight,
    startYForCreateEnemy,
    stepYForCreateEnemy,
    increaseSpeed,
  }) {
    this.level = 1;
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
    this.frontierForEnemiesLeft = frontierForEnemiesLeft;
    this.frontierForEnemiesRight = frontierForEnemiesRight;
    this.startYForCreateEnemy = startYForCreateEnemy;
    this.stepYForCreateEnemy = stepYForCreateEnemy;
    this.increaseSpeed = increaseSpeed;
  }
}

class Character {
  constructor(x, y, game) {
    this.x = x;
    this.y = y;
    this.game = game;
  }
}

class Enemy extends Character {
  constructor({ x, y, speed, game, player }) {
    super(x, y, game);
    this.sprite = "images/enemy-bug.png";
    this.speed = speed;
    this.player = player;
  }

  update(dt) {
    this.x +=
      dt *
      (this.speed + 0.4 * this.speed * this.game.level) *
      !this.game.isStop;
    if (this.x > this.game.frontierForEnemiesRight) {
      this.x = this.game.frontierForEnemiesLeft;
    }
    if (this.isCollision()) {
      this.player.start();
      this.game.level = 1;
    }
  }

  isCollision() {
    return (
      this.x > this.player.x - this.game.collisionX &&
      this.x < this.player.x + this.game.collisionX &&
      this.y > this.player.y - this.game.collisionY &&
      this.y < this.player.y + this.game.collisionY
    );
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

class Player extends Character {
  constructor(game) {
    super(1, 1, game);
    this.sprite = "images/char-boy.png";
    this.x = this.game.PLAYER_X_START;
    this.y = this.game.PLAYER_Y_START;
  }

  handleInput(key) {
    switch (key) {
      case "up":
        if (this.y > this.game.up) {
          this.y -= this.game.CELL_HEIGHT;
        }
        break;
      case "down":
        if (this.y < this.game.down) {
          this.y += this.game.CELL_HEIGHT;
        }
        break;
      case "left":
        if (this.x > this.game.left) {
          this.x -= this.game.CELL_WIDTH;
        }
        break;
      case "right":
        if (this.x < this.game.right) {
          this.x += this.game.CELL_WIDTH;
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
    let div = `<div class="class__modal">You LEVEL${this.game.level}!</div>`;
    this.game.isStop = true;
    this.game.level++;
    this.start();
    document.removeEventListener("keyup", playerMove);
    body.innerHTML = div;
    setTimeout(() => {
      this.game.isStop = false;
      document.addEventListener("keyup", playerMove);
      body.innerHTML = "";
    }, 1500);
  }

  isWin() {
    return this.y <= 0;
  }

  update() {}
  start() {
    this.x = this.game.PLAYER_X_START;
    this.y = this.game.PLAYER_Y_START;
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

const game = new Game(gameProperties);
const player = new Player(game);

const createEnemy = (numberOfEnemies) => {
  const arrOfEnemies = [];
  for (let i = 0; i < numberOfEnemies; i++) {
    arrOfEnemies.push(i);
  }
  return arrOfEnemies;
};

const allEnemies = createEnemy(3).map((number) => {
  return new Enemy({
    x: 0,
    y: game.startYForCreateEnemy + number * game.stepYForCreateEnemy,
    speed: game.increaseSpeed + number * game.increaseSpeed,
    game: game,
    player: player,
  });
});

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
