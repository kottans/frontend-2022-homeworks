// Enemies our player must avoid
const NUM_COLUMNS = 5;
const PLAYING_FIELD_WIDTH = 505;
const PLAYING_FIELD_HEIGHT = 606;
const POSITION_PLAYER_X = 203;
const POSITION_PLAYER_Y = PLAYING_FIELD_HEIGHT - 216;
const POSITION_FIRST_ENEMY_Y = 62;
const POSITION_ENEMIES_X = -200;
const BLOCK_HEIGHT = 83;
const BLOCK_WIDTH = 101;
const POINT_CONTACT_Y = 50;
const POINT_CONTACT_X = 75;
const MIN_SPEED = 100;
const MAX_SPEED = 300;
const MAX_NUM_STEPS_X = NUM_COLUMNS * BLOCK_WIDTH - BLOCK_WIDTH;

var Enemy = function (x, y, user) {
  this.x = x;
  this.y = y;
  this.user = user;
  this.speed = this.randomInteger();
  this.sprite = "images/enemy-bug.png";
};

Enemy.prototype.update = function (dt) {
  this.x += this.speed * dt;

  if (this.x > PLAYING_FIELD_WIDTH) {
    this.x = POSITION_ENEMIES_X;
    this.speed = this.randomInteger();
  }

  if (
    this.user.y < this.y + POINT_CONTACT_Y &&
    this.user.y + POINT_CONTACT_Y > this.y &&
    this.user.x < this.x + POINT_CONTACT_X &&
    this.user.x + POINT_CONTACT_X > this.x
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

const getEnemyPositionY = (numberEnemies) => {
  const enemyPositionsY = [];
  for (let i = 0; i < numberEnemies; i += 1) {
    const enemyPositionY = BLOCK_HEIGHT * i + POSITION_FIRST_ENEMY_Y;
    enemyPositionsY.push(enemyPositionY);
  }
  return enemyPositionsY;
};

const enemyPositionsY = getEnemyPositionY(3);
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

  if (keyPressed === "down" && this.y < POSITION_PLAYER_Y) {
    this.y += BLOCK_HEIGHT;
  }

  if (keyPressed === "left" && this.x > 1) {
    this.x -= BLOCK_WIDTH;
  }

  if (keyPressed === "right" && this.x < MAX_NUM_STEPS_X) {
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
