const TILE_SIZE = {
  height: 83,
  width: 101,
};

const FILED_SIZE = {
  height: TILE_SIZE.height * 6,
  width: TILE_SIZE.width * 5,
};

const FIELD_SIZE_LIMIT = {
  height: FILED_SIZE.height - TILE_SIZE.height,
  width: FILED_SIZE.width - TILE_SIZE.width,
};

const PLAYER_CONF = {
  initialPosition: {
    x: 202,
    y: 401,
  },
  speed: {
    min: 72,
    max: 150,
  },
  step: 15,
  minDistanceToCollision: {
    height: 75,
    width: 80,
  },
  sprite: "images/char-boy.png",
};

const ENEMY_CONF = {
  initialPosition: {
    x: -TILE_SIZE.width,
    y: {
      enemy1: 63,
      enemy2: 147,
      enemy3: 230,
    },
  },
  sprite: "images/enemy-bug.png",
};

let score = 0;
// Enemies our player must avoid
const Enemy = function (x, y, player) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = x;
  this.y = y;
  this.player = player;
  this.speed = this.randomSpeed();
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = ENEMY_CONF.sprite;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.randomSpeed = function () {
  return (
    Math.floor(Math.random() * PLAYER_CONF.speed.max) + PLAYER_CONF.speed.min
  );
};

Enemy.prototype.update = function (dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += this.speed * dt;

  if (this.x > FILED_SIZE.width) {
    this.x = ENEMY_CONF.initialPosition.x;
    this.speed = this.randomSpeed();
  }

  this.collision();
};

Enemy.prototype.collision = function () {
  if (
    this.x + PLAYER_CONF.minDistanceToCollision.width > this.player.x &&
    this.x < this.player.x + PLAYER_CONF.minDistanceToCollision.width &&
    this.y + PLAYER_CONF.minDistanceToCollision.height > this.player.y &&
    this.y < this.player.y + PLAYER_CONF.minDistanceToCollision.height
  ) {
    score = 0;
    this.player.resetInitialPosition();
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
  this.sprite = PLAYER_CONF.sprite;
};

Player.prototype.update = function () {};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.resetInitialPosition = function () {
  this.x = PLAYER_CONF.initialPosition.x;
  this.y = PLAYER_CONF.initialPosition.y;
};

Player.prototype.handleInput = function (keyPressed) {
  if (keyPressed === "left" && this.x > 0) {
    this.x -= PLAYER_CONF.step;
  }
  if (keyPressed === "right" && this.x < FIELD_SIZE_LIMIT.width) {
    this.x += PLAYER_CONF.step;
  }
  if (keyPressed === "up" && this.y > 0) {
    this.y -= PLAYER_CONF.step;
  }
  if (keyPressed === "down" && this.y < FIELD_SIZE_LIMIT.height) {
    this.y += PLAYER_CONF.step;
  }
  if (this.y < 0) {
    setTimeout(function () {
      score += 1;
      alert(`Well done 🎉 Your score is ${score}!`);
      player.resetInitialPosition();
    }, 100);
  }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player(
  PLAYER_CONF.initialPosition.x,
  PLAYER_CONF.initialPosition.y
);

const allEnemies = [];

const allEnemiesInitialPositionsY = [
  ENEMY_CONF.initialPosition.y.enemy1,
  ENEMY_CONF.initialPosition.y.enemy2,
  ENEMY_CONF.initialPosition.y.enemy3,
];

allEnemiesInitialPositionsY.forEach(function (currentEnemyPositionY) {
  let enemy = new Enemy(
    ENEMY_CONF.initialPosition.x,
    currentEnemyPositionY,
    player
  );
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
