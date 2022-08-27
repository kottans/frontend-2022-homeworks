const entity = {
  width: 80,
  height: 60,
};

const Enemy = function (yAxisPosition, moveSpeed, width, height) {
  this.xAxisPosition = -80;
  this.yAxisPosition = yAxisPosition;
  this.moveSpeed = moveSpeed;
  this.width = width;
  this.height = height;
  this.sprite = "images/enemy-bug.png";
};

Enemy.prototype.update = function (dt) {
  this.xAxisPosition += this.moveSpeed * dt;

  if (this.xAxisPosition >= ctx.canvas.width) {
    this.xAxisPosition = -80;
  }

  this.checkCollision();
};

Enemy.prototype.render = function () {
  ctx.drawImage(
    Resources.get(this.sprite),
    this.xAxisPosition,
    this.yAxisPosition
  );
};

Enemy.prototype.checkCollision = function () {
  if (
    player.xAxisPosition < this.xAxisPosition + this.width &&
    player.width + player.xAxisPosition > this.xAxisPosition &&
    player.yAxisPosition < this.yAxisPosition + this.height &&
    player.yAxisPosition + player.height > this.yAxisPosition
  ) {
    player.score = 0;
    scoreTitle.textContent = `Current score is: ${player.score}`;
    player.respawn();
  }
};

const enemyStats = [
  {
    yAxisPosition: 60,
    moveSpeed: 180,
  },
  {
    yAxisPosition: 140,
    moveSpeed: 140,
  },
  {
    yAxisPosition: 220,
    moveSpeed: 100,
  },
];

const Player = function (xAxisPosition, yAxisPosition) {
  this.xAxisPosition = xAxisPosition;
  this.yAxisPosition = yAxisPosition;
  this.moveXAxis = 100;
  this.moveYAxis = 90;
  this.sprite = "images/char-boy.png";
  this.score = 0;
  this.scoreMax = 0;
};

Player.prototype = entity;

Player.prototype.update = function () {
  if (player.yAxisPosition < 0) {
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
  ctx.drawImage(
    Resources.get(this.sprite),
    this.xAxisPosition,
    this.yAxisPosition
  );
};

Player.prototype.handleInput = function () {};

Player.prototype.respawn = function () {
  this.xAxisPosition = 200;
  this.yAxisPosition = 400;
};

Player.prototype.handleInput = function (key) {
  switch (key) {
    case "up":
      this.yAxisPosition -= this.moveYAxis;
      break;
    case "down":
      this.yAxisPosition += this.moveYAxis;
      if (this.yAxisPosition > 450) {
        this.yAxisPosition = 400;
      }
      break;
    case "left":
      this.xAxisPosition -= this.moveXAxis;
      if (this.xAxisPosition < 0) {
        this.xAxisPosition = 0;
      }
      break;
    case "right":
      this.xAxisPosition += this.moveXAxis;
      if (this.xAxisPosition > 450) {
        this.xAxisPosition = 400;
      }
      break;
  }
};

const allEnemies = enemyStats.map(
  ({ yAxisPosition, moveSpeed }) =>
    new Enemy(yAxisPosition, moveSpeed, entity.width, entity.height)
);

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
