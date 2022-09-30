const ROWS = 6;
const COLUMNS = 5;
const CORRELATION_INDEX = 1.25;
const FIELD_WIDTH = 500;
const FIELD_HEIGHT = FIELD_WIDTH;
const CELL_WIDTH = FIELD_WIDTH / COLUMNS;
const CELL_HEIGHT = Math.ceil(FIELD_HEIGHT / ROWS);
const TOP_BORDER = Math.trunc(-CELL_HEIGHT / (CORRELATION_INDEX * 4));
const X_START_POSITION_PLAYER = FIELD_WIDTH / (CORRELATION_INDEX * 2);
const Y_START_POSITION_PLAYER = FIELD_HEIGHT / CORRELATION_INDEX;
const X_START_POSITION_ENEMY = -CELL_WIDTH;
const Y_START_POSITION_ENEMY = FIELD_HEIGHT / 2 - CORRELATION_INDEX * 16;
const ENEMY_AVATAR = "images/enemy-bug.png";
const PLAYER_AVATAR = "images/char-boy.png";

const Character = function (x, y, sprite) {
  this.x = x;
  this.y = y;
  this.sprite = sprite;
};
Character.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// --------------------------------------ENEMY------------------------
const Enemy = function (x, y, speed, sprite, player) {
  Character.call(this, x, y, sprite);
  this.speed = speed;
  this.player = player;
};
Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.update = function (dt) {
  this.x =
    this.x > ctx.canvas.width
      ? X_START_POSITION_ENEMY
      : (this.x += this.speed * dt);
  this.checkCollision();
};
Enemy.prototype.checkCollision = function () {
  if (
    Math.trunc(this.x + CELL_WIDTH / 2) >= this.player.x &&
    Math.trunc(this.x) < this.player.x + CELL_WIDTH &&
    this.y + 2 === this.player.y
  ) {
    this.player.resetPosition();
  }
};
const allEnemies = [];
const _allEnemies = [];
let levelCounter = 0;

function resetEnemies() {
  if (levelCounter > 3) {
    allEnemies.length = 0;
    _allEnemies.length = 0;
    levelCounter = 0;
  }
}

// -------------------------Player-------------------------------------
const Player = function (x, y, sprite) {
  Character.call(this, x, y, sprite);
};
Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function () {
  if (this.y < TOP_BORDER) {
    setTimeout(() => {
      this.x = X_START_POSITION_PLAYER;
      this.y = Y_START_POSITION_PLAYER;
    }, 200);
  }
};
Player.prototype.resetPosition = function () {
  this.x = X_START_POSITION_PLAYER;
  this.y = Y_START_POSITION_PLAYER;
};
Player.prototype.handleInput = function (event) {
  switch (event) {
    case "ArrowUp":
      if (this.y > TOP_BORDER) this.y -= CELL_HEIGHT;
      break;
    case "ArrowDown":
      if (this.y < FIELD_HEIGHT / CORRELATION_INDEX) this.y += CELL_HEIGHT;
      break;
    case "ArrowRight":
      if (this.x < FIELD_WIDTH - CELL_WIDTH) this.x += CELL_WIDTH;
      break;
    case "ArrowLeft":
      if (this.x > 0) this.x -= CELL_WIDTH;
      break;
    case "Space":
      levelCounter++;
      createEnemies();
      resetEnemies();
      player.resetPosition();
      break;
  }
};

const player = new Player(
  X_START_POSITION_PLAYER,
  Y_START_POSITION_PLAYER,
  PLAYER_AVATAR
);

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function createEnemies() {
  let _y = Y_START_POSITION_ENEMY;
  let _x = X_START_POSITION_ENEMY;
  let enemy_speed = getRandomInt(30, 70);
  for (let i = 0; i < 3; i++) {
    _allEnemies.push(new Enemy(_x, _y, enemy_speed, ENEMY_AVATAR, player));
    enemy_speed += getRandomInt(10, 30);
    _x -= getRandomInt(30, 90);
    _y -= CELL_HEIGHT;
    allEnemies.push(..._allEnemies);
  }
}
document.addEventListener("keydown", function (event) {
  player.handleInput(event.code);
});
