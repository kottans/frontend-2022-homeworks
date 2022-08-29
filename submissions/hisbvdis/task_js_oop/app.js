const SIZES = {
  fieldWidth: 400,
  fieldHeight: 375,
  enemyHeight: 40,
  enemyWidth: 83,
  playerHeight: 40,
  playerWidth: 40,
};

const Enemy = function(initialX, initialY, speed){
  this.sprite = "images/enemy-bug.png";
  this.initialX = initialX;
  this.initialY = initialY;
  this.x = initialX;
  this.y = initialY;
  this.speed = speed;
}

Enemy.prototype.update = function(dt) {
  if (this.x >= SIZES.fieldHeight + SIZES.enemyWidth) {
    this.x = this.initialX;
  }

  this.x = this.x + this.speed * dt;

  this.checkCollision();
}

Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Enemy.prototype.checkCollision = function() {
  const playerZone = {
    fromX: player.x,
    toX: player.x + SIZES.playerWidth,
    fromY: player.y,
    toY: player.y + SIZES.playerHeight,
  };
  if (
    this.x >= playerZone.fromX &&
    this.x <= playerZone.toX &&
    this.y >= playerZone.fromY &&
    this.y <= playerZone.toY
  ) {
    player.reset();
  }
}


const Player = function() {
  this.sprite = "images/char-boy.png";
  this.initialX = SIZES.fieldWidth / 2;
  this.initialY = SIZES.fieldHeight;
  this.x = this.initialX;
  this.y = this.initialY;
  this.speed = 100;
}

Player.prototype.update = function (dt) {
  if (this.y < 0) this.reset();
};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (key) {
  const actions = {
    up: () => (this.y -= 80),
    down: () => (this.y += 80),
    left: () => (this.x -= 100),
    right: () => (this.x += 100),
  };

  actions[key]();
};

Player.prototype.reset = function () {
  this.x = this.initialX;
  this.y = this.initialY;
};

const allEnemies = [
  new Enemy(-100, 60, 200),
  new Enemy(-100, 140, 250),
  new Enemy(-100, 225, 300),
];

const player = new Player();

document.addEventListener("keydown", (evt) => {
  const allowedCodes = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
  };

  if (!Object.keys(allowedCodes).some((key) => key === evt.code)) return;

  player.handleInput(allowedCodes[evt.code]);
});
