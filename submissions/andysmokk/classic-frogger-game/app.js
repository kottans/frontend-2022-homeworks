// Enemies our player must avoid
const INITIAL_POSITION_PLAYER_X = 203;
const INITIAL_POSITION_ENEMIES_X = -200;
const INITIAL_POSITION_ENEMY_ONE_Y = 62;
const INITIAL_POSITION_ENEMY_TWO_Y = 145;
const INITIAL_POSITION_ENEMY_THREE_Y = 228;
const INITIAL_POSITION_PLAYER_Y = 390;
const BLOCK_HEIGHT = 83;
const BLOCK_WIDTH = 101;
const MIN_SPEED = 100;
const MAX_SPEED = 400;

var Enemy = function (x, y) {
  this.x = x;
  this.y = y;
  this.speed = this.randomInteger();
  this.sprite = "images/enemy-bug.png";
};

Enemy.prototype.update = function (dt) {
  this.x += this.speed * dt;

  if (this.x > 500) {
    this.x = INITIAL_POSITION_ENEMIES_X;
    this.speed = this.randomInteger();
  }

  if (
    player.y < this.y + 50 &&
    player.y + 50 > this.y &&
    player.x < this.x + 75 &&
    player.x + 75 > this.x
  ) {
    Player.prototype.initialPositionPlayer();
  }
};

Enemy.prototype.randomInteger = function () {
  return Math.floor(MIN_SPEED + Math.random() * (MAX_SPEED + 1 - MIN_SPEED));
};

Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const enemyOne = new Enemy(
  INITIAL_POSITION_ENEMIES_X,
  INITIAL_POSITION_ENEMY_ONE_Y
);
const enemyTwo = new Enemy(
  INITIAL_POSITION_ENEMIES_X,
  INITIAL_POSITION_ENEMY_TWO_Y
);
const enemyThree = new Enemy(
  INITIAL_POSITION_ENEMIES_X,
  INITIAL_POSITION_ENEMY_THREE_Y
);

const allEnemies = [enemyOne, enemyTwo, enemyThree];

var Player = function (x, y) {
  this.x = x;
  this.y = y;
  this.sprite = "images/char-boy.png";
};

Player.prototype.initialPositionPlayer = function () {
  player.x = INITIAL_POSITION_PLAYER_X;
  player.y = INITIAL_POSITION_PLAYER_Y;
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

const player = new Player(INITIAL_POSITION_PLAYER_X, INITIAL_POSITION_PLAYER_Y);

document.addEventListener("keyup", function (e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
