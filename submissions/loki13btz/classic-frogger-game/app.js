const cellWidth = 101;
const cellHeigth = 83;

// Enemies our player must avoid
var Enemy = function (col, row) {
  this.sprite = "images/enemy-bug.png";
  this.reset(col, row);
};

Enemy.prototype.reset = function (col, row) {
  this.x = col * cellWidth - 150;
  this.y = row * cellHeigth - 25;
  this.speed = Math.random() * 50 + 300;
};

Enemy.prototype.update = function (dt) {
  if (this.x > 505) {
    this.reset(0, parseInt(Math.random() * 3 + 1));
  }
  this.x = this.x + dt * this.speed;
  this.render();
};

Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const Player = function (col, row) {
  this.sprite = "images/char-boy.png";
  this.x = col * cellWidth;
  this.y = row * cellHeigth - 25;
};

Player.prototype.reset = function(){
  player.x = 2 * cellWidth;
  player.y = 5 * cellHeigth - 25;
}

Player.prototype.update = function () {
  if (this.y === -25) {
    this.reset();
  }
};

Player.prototype.render = function (dt) {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (input) {
  switch (input) {
    case "left":
      if (this.x > 0) {
        this.x -= cellWidth;
      }
      break;
    case "up":
      if (this.y > 0) {
        this.y -= cellHeigth;
      }
      break;
    case "right":
      if (this.x < cellWidth * 4) {
        this.x += cellWidth;
      }
      break;
    case "down":
      if (this.y < cellHeigth * 4) {
        this.y += cellHeigth;
      }
      break;
  }
};

const allEnemies = [new Enemy(1, 2), new Enemy(2, 3), new Enemy(3, 1)];
const player = new Player(2, 5);

function checkCollisions(enemies, player) {
  enemies.forEach((enemy) => {
    if (
      enemy.x - 50 < player.x &&
      player.x < enemy.x + 50 &&
      enemy.y === player.y
    ) {
      player.reset()
    }
  });
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
