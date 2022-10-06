const fieldWidth = 505,
  fieldHeight = 606,
  columnsNumber = 5,
  rowNumber = 7,
  cellWidth = fieldWidth / columnsNumber,
  cellHeight = fieldHeight / rowNumber,
  startPlayerX = fieldWidth / 2 - cellWidth / 2,
  startPlayerY = fieldHeight / 2 + cellHeight,
  leftBorder = 0,
  rightBorder = fieldWidth - cellWidth,
  topBorder = 0;

// Enemies our player must avoid

var Enemy = function (x, y) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  this.x = x;
  this.y = y;
  this.speed = Math.random() * 200 + 200;

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
  if (this.x > ctx.canvas.width) {
    this.x = 0;
  }

  this.collision(player);
};

Enemy.prototype.collision = function (player) {
  this.player = player;
  if (
    Math.abs(this.x - this.player.x) < 40 &&
    Math.abs(this.y - this.player.y) < 40
  ) {
    this.player.resetPlayer();
  }
};

// Draw the enemy on the screen, required method for game6

Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function (x, y) {
  this.resetPlayer();
  this.sprite = "images/char-boy.png";
};

Player.prototype.resetPlayer = function () {
  this.x = startPlayerX;
  this.y = startPlayerY;
};

Player.prototype.update = function () {
  if (this.y < topBorder) {
    this.resetPlayer();
  }
};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (key) {
  switch (key) {
    case "left":
      if (this.x > leftBorder) {
        this.x -= cellWidth;
      }
      break;
    case "right":
      if (this.x < rightBorder) {
        this.x += cellWidth;
      }
      break;
    case "up":
      this.y -= cellHeight;
      break;
    case "down":
      if (this.y < startPlayerY) {
        this.y += cellHeight;
      }
      break;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const player = new Player();

const allEnemies = [];

//Creating enemies

const firstEnemyLine = 60;
const secondEnemyLine = 140;
const thirdEnemyLine = 230;

function createEnemies() {
  var enemyPositionX;
  const posEnemY = [firstEnemyLine, secondEnemyLine, thirdEnemyLine];
  posEnemY.map((line) => {
    enemyPositionX = Math.random() * fieldWidth;
    allEnemies.push(new Enemy(enemyPositionX, line));
  });
}

createEnemies();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function (e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

