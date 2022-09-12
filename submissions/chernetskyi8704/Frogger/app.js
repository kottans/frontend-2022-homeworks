const TILE_WIDTH = 101;
const TILE_HEIGHT = 83;

const FILED_WIDTH = TILE_WIDTH * 5;
const FILED_HEIGHT = TILE_HEIGHT * 6;

const PLAYER_WIDTH = 66;
const PLAYER_HEIGHT = 75;

const PLAYER_START_X = 202;
const PLAYER_START_Y = 395;

const ENEMY_START_LOCATION = -TILE_WIDTH;
const MIN_DISTANCE_TO_COLLISION = 80;

const PLAYER_STEP = 15;
const MIN_SPEED = 100;
const MAX_SPEED = 150;

const FIELD_LIMIT_HEIGHT = FILED_WIDTH - PLAYER_WIDTH - PLAYER_STEP;
const FILED_LIMIT_WIDTH = FILED_HEIGHT - PLAYER_HEIGHT - PLAYER_STEP;

let score = 0;
// Enemies our player must avoid
let Enemy = function (x, y) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = x;
  this.y = y;
  this.speed = this.randomSpeed();
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = "images/enemy-bug.png";
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.randomSpeed = function () {
  return Math.floor(Math.random() * MAX_SPEED) + MIN_SPEED;
};

Enemy.prototype.update = function (dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += this.speed * dt;

  if (this.x > FILED_WIDTH) {
    this.x = ENEMY_START_LOCATION;
    this.speed = this.randomSpeed();
  }

  this.collision();
};

Enemy.prototype.collision = function () {
  if (
    this.x + MIN_DISTANCE_TO_COLLISION > player.x &&
    this.x < player.x + MIN_DISTANCE_TO_COLLISION &&
    this.y + MIN_DISTANCE_TO_COLLISION > player.y &&
    this.y < player.y + MIN_DISTANCE_TO_COLLISION
  ) {
    score = 0;
    player.x = PLAYER_START_X;
    player.y = PLAYER_START_Y;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function (x, y) {
  this.x = x;
  this.y = y;
  this.sprite = "images/char-boy.png";
};

Player.prototype.update = function () {};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (keyPressed) {
  if (keyPressed === "left" && this.x > 0) {
    this.x -= PLAYER_STEP;
  }
  if (keyPressed === "right" && this.x < FILED_LIMIT_WIDTH) {
    this.x += PLAYER_STEP;
  }
  if (keyPressed === "up" && this.y > 0) {
    this.y -= PLAYER_STEP;
  }
  if (keyPressed === "down" && this.y < FIELD_LIMIT_HEIGHT) {
    this.y += PLAYER_STEP;
  }
  if (this.y < 0) {
    setTimeout(function () {
      score += 1;
      alert(`Well done 🎉 Your score is ${score}!`);
      player.x = PLAYER_START_X;
      player.y = PLAYER_START_Y;
    }, 300);
  }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player(PLAYER_START_X, PLAYER_START_Y);

let allEnemies = [];

const allEnemyLocations = [63, 147, 230];

allEnemyLocations.forEach(function (currentEnemyLocation) {
  let enemy = new Enemy(ENEMY_START_LOCATION, currentEnemyLocation);
  allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function (e) {
  const allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };
  player.handleInput(allowedKeys[e.keyCode]);
});
