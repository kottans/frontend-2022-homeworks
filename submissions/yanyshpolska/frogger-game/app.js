"use strict";

const CELL_WIDTH = 101;
const CELL_HEIGHT = 83;

const NUMBER_OF_COLUMNS = 5;
const NUMBER_OF_ROWS = 5;

const FIELD_WIDTH = CELL_WIDTH * NUMBER_OF_COLUMNS;
const FIELD_HEIGHT = CELL_HEIGHT * NUMBER_OF_ROWS;

const PLAYER_START_POSITION = {
  x: CELL_WIDTH * Math.floor(NUMBER_OF_COLUMNS / 2),
  y: CELL_HEIGHT * NUMBER_OF_ROWS,
  rowPosition: NUMBER_OF_ROWS,
};

const minEnemySpeed = 100;
const speedIncrease = 70;

const ENEMY_POSITION_CORRECTION = 62;
const STAR_POSITION_CORRECTION = 72;
const NUMBER_OF_DANGER_ROWS = 3;

const getRandomNumber = (a) => Math.floor(Math.random() * a);
const getItemRowPosition = (numberOfRows) =>
  CELL_HEIGHT * getRandomNumber(numberOfRows);

// for better calculation of the collision between the player and enemies -
// due to the fact that the player's picture is narrower than the size of the cell
const PLAYER_WIDTH_CORRECTION = 80;
//for better positioning of the player in the cell. depends on the picture of player.
const PLAYER_POSITION_CORRECTION = 3;

// ===========SCORE block ====================================================
const bestScore = document.createElement("div");
document.body.append(bestScore);
bestScore.style.cssText = `
font-size: 1.7rem;
font-family: Arial;
width: 505px;
margin: 0px auto 20px;
display: flex;
justify-content: space-around;`;
let bestLevel = 1;
let bestStars = 0;

const score = document.createElement("div");
document.body.append(score);
score.style.cssText = `
font-size: 2rem;
font-family: Arial;
width: 505px;
margin: auto;
display: flex;
justify-content: space-around;`;
let level = 1;
let stars = 0;
const updateScore = function (bestStars, bestLevel, stars, level) {
  bestScore.innerHTML = `<span>BEST SCORE: ${bestStars}</span><span>LEVEL: ${bestLevel}</span>`;
  score.innerHTML = `<span>SCORE: ${stars}</span><span>LEVEL: ${level}</span>`;
};
// ===========ENEMY================================================================
const Enemy = function (x, y, speed, player) {
  this.speed = speed;
  this.x = x;
  this.y = y;
  this.player = player;

  this.rowPosition = (this.y - ENEMY_POSITION_CORRECTION) / CELL_HEIGHT + 1;
  this.sprite = "images/enemy-bug.png";
};
Enemy.prototype.update = function (dt) {
  this.x = this.x + this.speed * dt;
  if (this.x > FIELD_WIDTH) {
    this.x = -CELL_WIDTH;
    this.y =
      getItemRowPosition(NUMBER_OF_DANGER_ROWS) + ENEMY_POSITION_CORRECTION;
    this.rowPosition = (this.y - ENEMY_POSITION_CORRECTION) / CELL_HEIGHT + 1;
    this.speed = getRandomNumber(speedIncrease) + minEnemySpeed;
  }

  this.checkCollision();
};
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Enemy.prototype.checkCollision = function () {
  if (this.player.y > 0) {
    const startCollision = this.player.x - PLAYER_WIDTH_CORRECTION;
    const stopCollision = this.player.x + PLAYER_WIDTH_CORRECTION;

    if (
      this.rowPosition === this.player.rowPosition &&
      this.x >= startCollision &&
      this.x <= stopCollision
    ) {
      initialisation(true);
      bestStars = stars > bestStars ? stars : bestStars;
      bestLevel = level > bestLevel ? level : bestLevel;
      stars = 0;
      level = 1;
      updateScore(bestStars, bestLevel, stars, level);
    }
  }
};
// ======================Player====================================
const Player = function () {
  this.sprite = "images/char-cat-girl.png";
};
Player.prototype.setStartPosition = function (position) {
  this.rowPosition = position.rowPosition;
  this.x = position.x;
  this.y = position.y - PLAYER_POSITION_CORRECTION * this.rowPosition;
};
Player.prototype.update = function (dt) {
  //  reached right/left borders
  if (this.x > FIELD_WIDTH - CELL_WIDTH) {
    this.x = FIELD_WIDTH - CELL_WIDTH;
  } else if (this.x < 0) {
    this.x = 0;
  }
  //  reached the water or bottom border
  if (this.y > FIELD_HEIGHT) {
    this.y = FIELD_HEIGHT - PLAYER_POSITION_CORRECTION * this.rowPosition;
  }
  if (this.y === 0 && doesReachWater === false) {
    level += 1;
    updateScore(bestStars, bestLevel, stars, level);
    doesReachWater = true;
    setTimeout(initialisation, 500);
  }
};
Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function (pressedKey) {
  if (doesReachWater) {
    return;
  }
  switch (pressedKey) {
    case "right":
      this.x += CELL_WIDTH;
      break;
    case "left":
      this.x -= CELL_WIDTH;
      break;
    case "up":
      this.y -= CELL_HEIGHT - PLAYER_POSITION_CORRECTION;
      this.rowPosition -= 1;
      break;
    case "down":
      this.y += CELL_HEIGHT - PLAYER_POSITION_CORRECTION;
      this.rowPosition =
        this.rowPosition < NUMBER_OF_ROWS
          ? (this.rowPosition += 1)
          : this.rowPosition;
      break;
  }
};
Player.prototype.getPosition = function () {
  return [this.x, this.rowPosition];
};

const Star = function (player) {
  this.player = player;
  this.sprite = "images/Star.png";
};
Star.prototype.update = function (dt) {
  this.checkCollision();
};
Star.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Star.prototype.newPosition = function () {
  this.x = getRandomNumber(NUMBER_OF_COLUMNS) * CELL_WIDTH;
  this.y = getItemRowPosition(NUMBER_OF_DANGER_ROWS) + STAR_POSITION_CORRECTION;
  this.rowPosition = (this.y - STAR_POSITION_CORRECTION) / CELL_HEIGHT + 1;
};
Star.prototype.checkCollision = function () {
  if (
    this.rowPosition === this.player.rowPosition &&
    this.x === this.player.x
  ) {
    this.x = -CELL_WIDTH;
    stars += 1;
    updateScore(bestStars, bestLevel, stars, level);
  }
};

const player = new Player();
const star = new Star(player);
const allEnemies = [];
let doesReachWater = false;

function initialisation(newGame) {
  updateScore(bestStars, bestLevel, stars, level);
  doesReachWater = false;
  star.newPosition();
  player.setStartPosition(PLAYER_START_POSITION);
  createNewEnemy(player);
  if (newGame) {
    allEnemies.splice(1);
  }
}

initialisation();

function createNewEnemy(player) {
  const x = getRandomNumber(FIELD_WIDTH);
  const y =
    getItemRowPosition(NUMBER_OF_DANGER_ROWS) + ENEMY_POSITION_CORRECTION;
  const speed = getRandomNumber(speedIncrease) + minEnemySpeed;
  const newEnemy = new Enemy(x, y, speed, player);
  allEnemies.push(newEnemy);
}

document.addEventListener("keyup", function (e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };
  player.handleInput(allowedKeys[e.keyCode]);
});
