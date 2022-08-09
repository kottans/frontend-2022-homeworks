const FIELD_WIDTH = 505,
  START_X = 202,
  START_Y = 404;
CELL_WIDTH = 101;
CELL_HEIGHT = 83;
let count = 0;
var Enemy = function (x, y, speed, player) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.player = player;

  this.sprite = "images/enemy-bug.png";
};

const Player = function (x, y) {
  this.x = x;
  this.y = y;
  this.sprite = "images/char-boy.png";
};
Enemy.prototype.update = function (dt) {
  if (this.x < FIELD_WIDTH) {
    this.x += this.speed * dt;
  } else {
    this.x += -FIELD_WIDTH;
  }
  if (this.checkCollision()) player.resetPosition();
};
Enemy.prototype.checkCollision = function () {
  return (
    this.y + CELL_HEIGHT > this.player.y &&
    this.player.x < this.x + CELL_WIDTH &&
    this.player.x > this.x - CELL_WIDTH
  );
};
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function () {
  if (this.y > START_Y) {
    this.y = START_Y;
  }
  if (this.y < 0) {
    this.y = START_Y;
    count++;
  }

  if (this.x > FIELD_WIDTH - CELL_WIDTH) {
    this.x -= FIELD_WIDTH;
  }
  if (this.x < 0) {
    this.x = FIELD_WIDTH - CELL_WIDTH;
  }
};
Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.resetPosition = function () {
  player.x = START_X;
  player.y = START_Y;
  count = 0;
};
Player.prototype.handleInput = function (key) {
  switch (key) {
    case "up":
      this.y -= CELL_HEIGHT;
      break;
    case "down":
      this.y += CELL_HEIGHT;
      break;
    case "left":
      this.x -= CELL_WIDTH;
      break;
    case "right":
      this.x += CELL_WIDTH;
      break;

    default:
      break;
  }
};

let player = new Player(START_X, START_Y),
  enemy1 = new Enemy(0, 60, 50, player),
  enemy2 = new Enemy(0, 143, 25, player),
  enemy3 = new Enemy(0, 228, 77, player),
  allEnemies = [enemy1, enemy2, enemy3];

document.addEventListener("keyup", function (e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
