const xStartPlayer = 200;
const yStartPlayer = 400;
const yLineforVictory = 0;
const cell = {
  width: 100,
  height: 90,
};
const visibleBorder = {
  width: 500,
  height: 400,
};

const enemySpeed = {
  minSpeed: 60,
  maxSpeed: 200,
};

let counter = document.createElement("div");
let count = 0;
counter.innerHTML = `Counter: ${count}`;
document.body.append(counter);

const Player = function (x, y) {
  this.x = x;
  this.y = y;
  this.sprite = "images/char-boy.png";
};

Player.prototype.update = function () {
  if (this.y < yLineforVictory) {
    alert("You WINNER!");
    this.x = xStartPlayer;
    this.y = yStartPlayer;
    allEnemies.forEach((el) => (el.xMove = el.x));
    count++;
    counter.innerHTML = `Counter: ${count}`;
  }
};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (key) {
  if (key === "left" && this.x > 0) {
    this.x -= 100;
  }
  if (key === "right" && this.x < visibleBorder.width - cell.width) {
    this.x += 100;
  }
  if (key === "up" && this.y > 0) {
    this.y -= 85;
  }
  if (key === "down" && this.y < visibleBorder.height) {
    this.y += 85;
  }
};

const Enemy = function (x, y, speed) {
  this.x = x;
  this.xMove = this.x;
  this.y = y;
  this.sprite = "images/enemy-bug.png";
  this.speed = speed;
};

let player = new Player(xStartPlayer, yStartPlayer);

Enemy.prototype.update = function (dt) {
  this.xMove += this.speed * dt;

  if (this.xMove > visibleBorder.width) {
    this.xMove = this.xMove - visibleBorder.width - cell.width;
    this.speed = this.randomSpeed(enemySpeed.minSpeed, enemySpeed.maxSpeed);
  }
  this.collision(player);
};

Enemy.prototype.collision = function (player) {
  if (
    player.x < this.xMove + cell.width &&
    this.xMove - cell.width < player.x &&
    this.y + cell.height / 2 > player.y &&
    this.y - cell.height / 2 < player.y
  ) {
    alert("Game over!");
    this.xMove = this.x;
    player.x = xStartPlayer;
    player.y = yStartPlayer;
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

let allEnemies = [230, 145, 60].map(
  (enemyLine) => new Enemy(randomX(), enemyLine, enemySpeed.minSpeed)
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
