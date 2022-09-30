// Enemies our player must avoid
const POSITION_PLAYER_X = 203;
const POSITION_PLAYER_Y = 390;
const POSITION_ENEMIES_X = -200;
const BLOCK_HEIGHT = 83;
const BLOCK_WIDTH = 101;
const MIN_SPEED = 100;
const MAX_SPEED = 400;

var Enemy = function (x, y, user) {
  this.x = x;
  this.y = y;
  this.user = user;
  this.speed = this.randomInteger();
  this.sprite = "images/enemy-bug.png";
};

Enemy.prototype.update = function (dt) {
  this.x += this.speed * dt;

  if (this.x > 500) {
    this.x = POSITION_ENEMIES_X;
    this.speed = this.randomInteger();
  }

  if (
    this.user.y < this.y + 50 &&
    this.user.y + 50 > this.y &&
    this.user.x < this.x + 75 &&
    this.user.x + 75 > this.x
  ) {
    this.user.initialPositionPlayer();
  }
};

Enemy.prototype.randomInteger = function () {
  return Math.floor(MIN_SPEED + Math.random() * (MAX_SPEED + 1 - MIN_SPEED));
};

Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function (x, y) {
  this.x = x;
  this.y = y;
  this.sprite = "images/char-boy.png";
};

const player = new Player(POSITION_PLAYER_X, POSITION_PLAYER_Y);

const enemyPositionsY = [62, 145, 228];
const allEnemies = enemyPositionsY.map(
  (positionY) => new Enemy(POSITION_ENEMIES_X, positionY, player)
);

Player.prototype.initialPositionPlayer = function () {
  this.x = POSITION_PLAYER_X;
  this.y = POSITION_PLAYER_Y;
};

Player.prototype.update = function (dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (keyPressed) {
  if (keyPressed === "up" && this.y > 0) {
    this.y -= BLOCK_HEIGHT;
  }

  if (keyPressed === "down" && this.y < 390) {
    this.y += BLOCK_HEIGHT;
  }

  if (keyPressed === "left" && this.x > 1) {
    this.x -= BLOCK_WIDTH;
  }

  if (keyPressed === "right" && this.x < 405) {
    this.x += BLOCK_WIDTH;
  }

  if (this.y < 0) {
    setTimeout(() => {
      this.initialPositionPlayer();
    }, 500);
  }
};

document.addEventListener("keyup", function (e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
