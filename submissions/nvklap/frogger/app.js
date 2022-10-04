// Game Settings
const BOARD_SETTINGS = {
  TOP_Y: -35,
  BOTTOM_Y: 390,
  LEFT_X: 0,
  RIGTH_X: 404,
};

const ENEMY_SETTINGS = {
  SPEED_MIN: 50,
  SPEED_MAX: 200,
  WIDTH: 80,
  START_X: -101,
  END_X: 500,
  START_Y: 50,
  STEP_Y: 85,
  ROWS_QUANTITY: 3,
};

const PLAYER_SETTINGS = {
  START_X: 202,
  START_Y: 390,
  STEP_X: 101,
  STEP_Y: 85,
  WIDTH: 65,
};

// Basic Character Class
const Character = function (x, y, sprite) {
  this.x = x;
  this.y = y;
  this.sprite = sprite;
};

Character.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Character.prototype.update = function () {};

// Enemy Class
const Enemy = function (x, y, speed, player) {
  Character.call(this, x, y, 'images/enemy-bug.png');
  this.speed = speed;
  this.player = player;
};

Enemy.prototype = Object.create(Character.prototype);

Enemy.prototype.update = function (dt) {
  this.checkPosition();
  this.checkCollision();
  this.x += this.speed * dt;
};

Enemy.prototype.checkCollision = function () {
  if (
    this.player.x < this.x + ENEMY_SETTINGS.WIDTH &&
    this.x < this.player.x + PLAYER_SETTINGS.WIDTH &&
    this.y === this.player.y
  ) {
    this.player.resetToInitPosition();
  }
};

Enemy.prototype.checkPosition = function () {
  if (this.x > ENEMY_SETTINGS.END_X) {
    this.speed = randomizeSpeed(ENEMY_SETTINGS);
    this.resetToInitPosition();
  }
};

Enemy.prototype.resetToInitPosition = function () {
  this.x = ENEMY_SETTINGS.START_X;
};

// Player Class
const Player = function (x, y) {
  Character.call(this, x, y, 'images/char-boy.png');
};

Player.prototype = Object.create(Character.prototype);

Player.prototype.resetToInitPosition = function () {
  this.x = PLAYER_SETTINGS.START_X;
  this.y = PLAYER_SETTINGS.START_Y;
};

Player.prototype.handleInput = function (direction) {
  switch (direction) {
    case 'left':
      if (this.x > BOARD_SETTINGS.LEFT_X) this.x -= PLAYER_SETTINGS.STEP_X;
      break;
    case 'up':
      if (this.y > BOARD_SETTINGS.TOP_Y) {
        this.y -= PLAYER_SETTINGS.STEP_Y;
      }
      if (this.y === BOARD_SETTINGS.TOP_Y) {
        setTimeout(() => {
          alert('You win!');
          this.resetToInitPosition();
        }, 40);
      }
      break;
    case 'right':
      if (this.x < BOARD_SETTINGS.RIGTH_X) this.x += PLAYER_SETTINGS.STEP_X;
      break;
    case 'down':
      if (this.y < BOARD_SETTINGS.BOTTOM_Y) this.y += PLAYER_SETTINGS.STEP_Y;
      break;
  }
};

// Now instantiate your objects.
function randomizeSpeed({ SPEED_MAX, SPEED_MIN }) {
  return Math.floor(Math.random() * SPEED_MAX) + SPEED_MIN;
}

function getEnemyRows({ ROWS_QUANTITY, START_Y, STEP_Y }) {
  return Array(ROWS_QUANTITY)
    .fill(START_Y)
    .map((row, rowIndex) => {
      return row + rowIndex * STEP_Y;
    });
}

const player = new Player(PLAYER_SETTINGS.START_X, PLAYER_SETTINGS.START_Y);

const allEnemies = getEnemyRows(ENEMY_SETTINGS).map(
  (startY) =>
    new Enemy(
      ENEMY_SETTINGS.START_X,
      startY,
      randomizeSpeed(ENEMY_SETTINGS),
      player
    )
);

document.addEventListener('keyup', function (e) {
  const allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
