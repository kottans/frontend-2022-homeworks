const X_START_PLAYER = 200;
const Y_START_PLAYER = 400;
const Y_LINE_VICTORY = 0;
const CELL = {
  width: 100,
  height: 85,
};
const VISIBLE_BORDER = {
  width: 500,
  height: 400,
};

const ENEMY_SPEED = {
  minSpeed: 60,
  maxSpeed: 200,
};

const ROW_FOR_ENEMIES = {
  one: 230,
  two: 145,
  three: 60
}

let count = 0;
let counter = document.createElement("div");
document.body.append(counter);

const Player = function (x, y, count) {
  this.x = x;
  this.y = y;
  this.sprite = "images/char-boy.png";
  this.count = count;
};

Player.prototype.update = function () {
  if (this.y < Y_LINE_VICTORY) {
    alert("You WINNER!");
    this.x = X_START_PLAYER;
    this.y = Y_START_PLAYER;
    allEnemies.forEach((el) => (el.xMove = el.x));
    this.count++;
    counter.innerHTML = `Counter: ${this.count}`;
  }
};

Player.prototype.render = function () {
  counter.innerHTML = `Counter: ${this.count}`;
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (key) {
  if (key === "left" && this.x > 0) {
    this.x -= CELL.width;
  }
  if (key === "right" && this.x < VISIBLE_BORDER.width - CELL.width) {
    this.x += CELL.width;
  }
  if (key === "up" && this.y > 0) {
    this.y -= CELL.height;
  }
  if (key === "down" && this.y < VISIBLE_BORDER.height) {
    this.y += CELL.height;
  }
};

const Enemy = function (x, y, speed, player) {
  this.x = x;
  this.xMove = this.x;
  this.y = y;
  this.sprite = "images/enemy-bug.png";
  this.speed = speed;
  this.player = player;
};

let player = new Player(X_START_PLAYER, Y_START_PLAYER, count);

Enemy.prototype.update = function (dt) {
  this.xMove += this.speed * dt;

  if (this.xMove > VISIBLE_BORDER.width) {
    this.xMove = this.xMove - VISIBLE_BORDER.width - CELL.width;
    this.speed = this.randomSpeed(ENEMY_SPEED.minSpeed, ENEMY_SPEED.maxSpeed);
  }
  this.collision();
};

Enemy.prototype.collision = function () {
  if (
    this.player.x < this.xMove + CELL.width &&
    this.xMove - CELL.width < this.player.x &&
    this.y + CELL.height / 2 > this.player.y &&
    this.y - CELL.height / 2 < this.player.y
  ) {
    alert("Game over!");
    this.xMove = this.x;
    this.player.x = X_START_PLAYER;
    this.player.y = Y_START_PLAYER;
  }
};

Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.xMove, this.y);
};

Enemy.prototype.randomSpeed = function (min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

function randomX(min = -150, max = 0) {
    let randomX = min + Math.random() * (max + 1 - min);
  return Math.floor(randomX);
}

let allEnemies = [ROW_FOR_ENEMIES.one, ROW_FOR_ENEMIES.two, ROW_FOR_ENEMIES.three].map(
  (enemyLine) => new Enemy(randomX(), enemyLine, ENEMY_SPEED.minSpeed, player)
);

document.addEventListener("keyup", function (e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
