// Enemies our player must avoid
const FIELDWIDTH = 505;
const FIELDHEIGHT = 606;
const playerStartX = 203;
const playerStartY = 300;
const playerStepY = 83;
const playerStepX = 101;
const field = {
  top: 0,
  bottom: 606,
  left: 0,
  right: 505,
};

class Enemy {
  constructor(x, y, speed, player) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.player = player;
    this.sprite = "images/enemy-bug.png";
  }

  update(dt) {
    if (this.x >= FIELDWIDTH) {
      this.x = -100;
    }
    this.x += this.speed * dt;
    this.handleCollision();
  }

  handleCollision() {
    if (
      Math.round(this.x) === player.x &&
      Math.round(this.y) === player.y &&
      Math.round(this.x) + playerStepX > player.x &&
      Math.round(this.y) + playerStepY > player.y
    ) {
      player.reset();
    }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = "images/char-boy.png";
  }
  update() {}

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(e) {
    switch (e) {
      case "up":
        this.y -= playerStepY;
        break;
      case "down":
        this.y += playerStepY;
        break;
      case "left":
        this.x -= playerStepX;
        break;
      case "right":
        this.x += playerStepX;
        break;
    }
    this.updateToStart();
  }

  reset() {
    this.y = playerStartY;
    this.x = playerStartX;
  }

  updateToStart() {
    if (
      this.y > field.bottom - playerStepY * 2 ||
      this.y < field.top ||
      this.x > field.right ||
      this.x < field.left
    ) {
      this.reset();
    }
  }
}

const player = new Player(playerStartX, playerStartY);
const enemyFirst = new Enemy(-100, 51, 50);
const enemySecond = new Enemy(-100, 134, 100);
const enemyThird = new Enemy(-100, 217, 80);
const allEnemies = [enemyFirst, enemySecond, enemyThird];

document.addEventListener("keyup", function (e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
