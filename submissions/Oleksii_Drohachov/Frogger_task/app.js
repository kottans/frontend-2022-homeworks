
const tileWidth = 100;
const tileHeight = 83;
const numberOfRows = 6;
const numberOfColumns = 5;
const fieldWidth = numberOfColumns * tileWidth;
const fieldHeight = numberOfRows * tileHeight;
const fieldBottomGap = 100;
const emenyRowsModifier = 0.66;

const firstEnemyRow = Math.round(tileHeight * emenyRowsModifier);
const secondEnemyRow = Math.round(tileHeight + tileHeight * emenyRowsModifier);
const thirdEnemyRow = Math.round(tileHeight * 2 + tileHeight * emenyRowsModifier);

const entityWidth = 80;
const entityHeight = 70;

const playerStartingPositionX = tileWidth * 2; 
const playerStartingPositionY = fieldHeight - fieldBottomGap;


const ScoreBoard = function(score, scoreMax) {
  this.score = score;
  this.scoreMax = scoreMax;
}

ScoreBoard.prototype.update = function () {
  scoreTitle.textContent = `Current score is: ${(this.score += 1)}`;

  if (this.score > this.scoreMax) {
    this.scoreMax = this.score;
    maxScoreTitle.textContent = `Your max score is: ${this.scoreMax}`;
  }
};

const scoreBoard = new ScoreBoard(0, 0);


const Entity = function (xAxisPosition, yAxisPosition, sprite) {
  this.xAxisPosition = xAxisPosition;
  this.yAxisPosition = yAxisPosition;
  this.width = entityWidth;
  this.height = entityHeight;
  this.sprite = sprite;
}

const Player = function (xAxisPosition, yAxisPosition, sprite, width, height) {
  Entity.call(this, xAxisPosition, yAxisPosition, sprite, width, height)
  this.moveXAxis = tileWidth;
  this.moveYAxis = tileHeight;
};

Player.prototype = Object.create(Entity.prototype);

Player.prototype.update = function () {
  if (player.yAxisPosition < 0) {
    this.respawn();
    scoreBoard.update();
  }
};

Player.prototype.render = function () {
  ctx.drawImage(
    Resources.get(this.sprite),
    this.xAxisPosition,
    this.yAxisPosition
  );
};

Player.prototype.respawn = function () {
  this.xAxisPosition = playerStartingPositionX;
  this.yAxisPosition = playerStartingPositionY;
};

Player.prototype.handleInput = function (key) {
  switch (key) {
    case "up":
      this.yAxisPosition -= this.moveYAxis;
      break;
    case "down":
      if (this.yAxisPosition + this.moveYAxis <= fieldHeight - fieldBottomGap) {
        this.yAxisPosition += this.moveYAxis;
      }
      break;
    case "left":
      if (this.xAxisPosition - this.moveXAxis >= 0) {
        this.xAxisPosition -= this.moveXAxis;
      }
      break;
    case "right":
      if (this.xAxisPosition + this.moveXAxis < fieldWidth) {
        this.xAxisPosition += this.moveXAxis;
      }
      break;
  }
};

const player = new Player(playerStartingPositionX, playerStartingPositionY, "images/char-boy.png");

const Enemy = function (xAxisPosition, yAxisPosition, sprite, moveSpeed, width, height, player) {
  Entity.call(this, xAxisPosition, yAxisPosition, sprite, width, height)
  this.moveSpeed = moveSpeed;
  this.player = player;
};

Enemy.prototype = Object.create(Entity.prototype);

Enemy.prototype.update = function (dt) {
  this.xAxisPosition += this.moveSpeed * dt;

  if (this.xAxisPosition >= fieldWidth) {
    this.xAxisPosition = -this.width;
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
    
    player.respawn();
    scoreBoard.score = 0;
    scoreTitle.textContent = `Current score is: ${scoreBoard.score}`;
  }
};

const enemyStats = [
  {
    yAxisPosition: firstEnemyRow,
    moveSpeed: 180,
  },
  {
    yAxisPosition: secondEnemyRow,
    moveSpeed: 150,
  },
  {
    yAxisPosition: thirdEnemyRow,
    moveSpeed: 120,
  },
];


const allEnemies = enemyStats.map(
  ({ yAxisPosition, moveSpeed }) =>
    new Enemy(-entityWidth, yAxisPosition, "images/enemy-bug.png", moveSpeed)
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

const scoreWrapper = document.createElement("div");
scoreWrapper.classList.add("score__wrapper");
const scoreTitle = document.createElement("span");
const maxScoreTitle = document.createElement("span");
maxScoreTitle.textContent = `Your max score is: ${scoreBoard.scoreMax}`;
scoreTitle.textContent = `Current score is: ${scoreBoard.score}`;

scoreWrapper.append(scoreTitle);
scoreWrapper.append(maxScoreTitle);
document.body.append(scoreWrapper);
