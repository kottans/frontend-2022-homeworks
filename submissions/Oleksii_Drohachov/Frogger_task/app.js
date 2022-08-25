const Enemy = function (y, speed) {
  this.x = -80;
  this.y = y;
  this.speed = speed;
  this.width = 80;
  this.height = 60;
  this.sprite = "images/enemy-bug.png";
};

Enemy.prototype.update = function (dt) {
  this.x += this.speed * dt;

  if (this.x >= ctx.canvas.width) {
    this.x = -80;
  }

  this.checkCollision();
};

Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollision = function () {
  if (
    player.x < this.x + this.width &&
    player.width + player.x > this.x &&
    player.y < this.y + this.height &&
    player.y + player.height > this.y
  ) {
    player.score = 0;
    scoreTitle.textContent = `Current score is: ${player.score}`;
    player.respawn();
  }
};

const enemyStats = [
  {
    y: 60,
    speed: 180,
  },
  {
    y: 140,
    speed: 140,
  },
  {
    y: 220,
    speed: 100,
  },
];

const Player = function (x, y) {
  this.x = x;
  this.y = y;
  this.moveX = 100;
  this.moveY = 90;
  this.width = 80;
  this.height = 60;
  this.sprite = "images/char-boy.png";
  this.score = 0;
  this.scoreMax = 0;
};

Player.prototype.update = function () {
  if (player.y < 0) {
    player.respawn();
    player.win();
  }
};

Player.prototype.win = function () {
  scoreTitle.textContent = `Current score is: ${(this.score += 1)}`;

  if (this.score > this.scoreMax) {
    this.scoreMax = this.score;
    maxScoreTitle.textContent = `Your max score is: ${this.scoreMax}`;
  }
};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function () {};

Player.prototype.respawn = function () {
  this.x = 200;
  this.y = 400;
};

Player.prototype.handleInput = function (key) {
  switch (key) {
    case "up":
      this.y -= this.moveY;
      break;
    case "down":
      this.y += this.moveY;
      if (this.y > 450) {
        this.y = 400;
      }
      break;
    case "left":
      this.x -= this.moveX;
      if (this.x < 0) {
        this.x = 0;
      }
      break;
    case "right":
      this.x += this.moveX;
      if (this.x > 450) {
        this.x = 400;
      }
      break;
  }
};

const allEnemies = enemyStats.map(({y, speed }) => new Enemy(y, speed));

const player = new Player(200, 400);

document.addEventListener("keyup", function (e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

const scoreWrapper = document.createElement("div");
scoreWrapper.classList.add("score__wrapper");
const scoreTitle = document.createElement("span");
const maxScoreTitle = document.createElement("span");
maxScoreTitle.textContent = `Your max score is: ${player.scoreMax}`;
scoreTitle.textContent = `Current score is: ${player.score}`;

scoreWrapper.append(scoreTitle);
scoreWrapper.append(maxScoreTitle);
document.body.append(scoreWrapper);
