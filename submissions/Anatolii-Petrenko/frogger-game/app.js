const START_POINT = 0;
const END_POINT = 405;

const ENEMY_START = -101;
const ENEMY_END = 505;
const ENEMY_SPEED_MIN = 100;
const ENEMY_SPEED_MAX = 350;
const ENEMY_ROW_1 = 65;
const ENEMY_ROW_2 = 145;
const ENEMY_ROW_3 = 230;

const X_STEP = 100;
const Y_STEP = 83;

const PLAYER_X_START = 200;
const PLAYER_Y_START = 320;
const PLAYER_HEIGHT = 50;

let levelCount = 1;
let winScore = 0;
let loseScore = 0;

const level = document.createElement("div");
document.body.append(level);
level.style.cssText = `
font-size: 2rem;
width: 505px;
margin: 20px auto 5px;`;

const score = document.createElement("div");
document.body.append(score);
score.style.cssText = `
font-size: 1.5rem;
letter-spacing: 3px;
width: 505px;
margin: 5px auto -30px;
display: flex;
justify-content: space-between;`;

const updateScore = function (vins, looses, levelNum) {
  level.innerHTML = `<span>Level ${levelNum}</span>`;
  score.innerHTML = `<span style="color:green">PASSED: ${vins}</span><span style="color:red">FAILED: ${looses}</span>`;
};
updateScore(winScore, loseScore, levelCount);

let Enemy = function (x, y, speed, player) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.sprite = "images/enemy-bug.png";
  this.player = player;
};

const Player = function (x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.player = "images/char-boy.png";
};

Enemy.prototype.checkCollisions = function () {
  if (
    this.player.x < this.x + this.player.width &&
    this.player.x + this.player.width > this.x &&
    this.player.y < this.y + this.player.height &&
    this.player.height + this.player.y > this.y
  ) {
    this.player.x = PLAYER_X_START;
    this.player.y = PLAYER_Y_START;
    levelCount++;
    loseScore++;
    updateScore(winScore, loseScore, levelCount);
  }
};

Enemy.prototype.update = function (dt) {
  this.checkCollisions();
  this.x += this.speed * dt;
  if (this.x > ENEMY_END) {
    this.x = ENEMY_START;
    this.speed = ENEMY_SPEED_MIN + Math.floor(Math.random() * ENEMY_SPEED_MAX);
  }
};

Player.prototype.update = function () {};

Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

Player.prototype.reset = function () {
  this.x = PLAYER_X_START;
  this.y = PLAYER_Y_START;
  console.log(`x = ${this.x} / y = ${this.y}`);
};

Player.prototype.handleInput = function (keyPress) {
  switch (keyPress) {
    case "left":
      if (this.x > START_POINT) {
        this.x -= X_STEP;
      }
      break;
    case "right":
      if (this.x < END_POINT - X_STEP) {
        this.x += X_STEP;
      }
      break;
    case "up":
      if (this.y > START_POINT) {
        this.y -= Y_STEP;
        console.log(this.y);
      }
      break;
    case "down":
      if (this.y < END_POINT - Y_STEP) {
        this.y += Y_STEP;
      }
      break;
    default:
      this.x = PLAYER_X_START;
      this.y = PLAYER_Y_START;
  }
  if (this.y < START_POINT) {
    setTimeout(function () {
      player.reset();
    }, 150);
    levelCount++;
    winScore++;
    updateScore(winScore, loseScore, levelCount);
    return;
  }
};

const player = new Player(
  PLAYER_X_START,
  PLAYER_Y_START,
  Y_STEP,
  PLAYER_HEIGHT
);

const allEnemies = [];
const enemyLocation = [ENEMY_ROW_1, ENEMY_ROW_2, ENEMY_ROW_3];

enemyLocation.forEach((y) => {
  let enemy = new Enemy(0, y, ENEMY_SPEED_MIN, player);
  allEnemies.push(enemy);
});

document.addEventListener("keyup", function (e) {
  let allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
