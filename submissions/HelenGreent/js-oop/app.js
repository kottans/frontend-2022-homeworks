const canvas = {
  width: 101,
  height: 82,
  number_of_blocks_x: 5,
  number_of_blocks_y: 6,
  padding_bottom: 62,
};

const enemyConfiguration = {
  min_speed: 100,
  top_initial_y: 60,
  middle_initial_y: 145,
  bottom_initial_y: 230,
  padding: 50,
};

const playerConfiguration = {
  initial_x: 200,
  initial_y: 400,
};

const water_edge = 52;
const initial_enemy_x = -canvas.width;
const edge_x = canvas.width * canvas.number_of_blocks_x;
const edge_y =
  canvas.height * canvas.number_of_blocks_y - canvas.padding_bottom;

// Enemies our player must avoid
const Enemy = function (y) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  const random_speed = Math.floor(Math.random() * 200);
  this.x = initial_enemy_x;
  this.y = y;
  this.speed = enemyConfiguration.min_speed + random_speed;

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = "images/enemy-bug.png";
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.

  this.x += this.speed * dt;
  if (this.x > edge_x) {
    this.x = -canvas.width;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function (x, y) {
  this.x = x;
  this.y = y;
  this.sprite = "images/char-boy.png";
};

Player.prototype.update = function () {
  this.checkCollision();
};

Player.prototype.checkCollision = function () {
  allEnemies.forEach(function (enemy) {
    if (
      this.y - enemyConfiguration.padding < enemy.y &&
      this.y + enemyConfiguration.padding > enemy.y &&
      this.x - enemyConfiguration.padding < enemy.x &&
      this.x + enemyConfiguration.padding > enemy.x
    ) {
      this.lose();
    }
  }, this);
};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (keyCode) {
  if (this.y >= 0 && keyCode === "up") {
    this.y -= canvas.height;
  }
  if (this.y < edge_y - canvas.height && keyCode === "down") {
    this.y += canvas.height;
  }
  if (this.x > 0 && keyCode === "left") {
    this.x -= canvas.width;
  }
  if (this.x < edge_x - canvas.width && keyCode === "right") {
    this.x += canvas.width;
  }
  if (this.y < water_edge) {
    this.wins();
  }
};

Player.prototype.resetPosition = function () {
  this.x = playerConfiguration.initial_x;
  this.y = playerConfiguration.initial_y;
};

Player.prototype.wins = function () {
  setTimeout(() => {
    alert("You win! Congratulation");
    this.resetPosition();
  }, 100);
};

Player.prototype.lose = function () {
  setTimeout(() => {
    this.resetPosition();
  }, 100);
  alert("Game over. Try again!");
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const allEnemies = [
  new Enemy(enemyConfiguration.top_initial_y),
  new Enemy(enemyConfiguration.middle_initial_y),
  new Enemy(enemyConfiguration.bottom_initial_y),
];

const player = new Player(
  playerConfiguration.initial_x,
  playerConfiguration.initial_y
);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
function handleClick(e) {
  const allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };

  player.handleInput(allowedKeys[e.keyCode]);
}

document.addEventListener("keyup", handleClick);
