const Field = function() {
  this.width = 400;
  this.height = 375;
}

const field = new Field();


const Enemy = function(field, initialX, initialY, speed, player){
  this.sprite = "images/enemy-bug.png";
  this.initialX = initialX;
  this.initialY = initialY;
  this.x = initialX;
  this.y = initialY;
  this.speed = speed;
  this.player = player;
  this.enemyHeight = 40;
  this.enemyWidth = 83;
  this.field = field;
}

Enemy.prototype.update = function(dt) {
  if (this.x >= this.field.height + this.enemyWidth) {
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
    fromX: this.player.x,
    toX: this.player.x + this.player.width,
    fromY: this.player.y,
    toY: this.player.y + this.player.height,
  };
  if (
    this.x >= playerZone.fromX &&
    this.x <= playerZone.toX &&
    this.y >= playerZone.fromY &&
    this.y <= playerZone.toY
  ) {
    this.player.reset();
  }
}


const Player = function(field) {
  this.sprite = "images/char-boy.png";
  this.field = field;
  this.initialX = this.field.width / 2;
  this.initialY = this.field.height;
  this.y = this.initialY;
  this.x = this.initialX;
  this.speed = 100;
  this.width = 40;
  this.height = 40;
}

Player.prototype.update = function (dt) {
  if (this.y < 0) this.reset();
};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (key) {
  const actions = {
    up: () => this.y -= 80,
    down: () => {
      if (this.y < this.field.height) {
        this.y += 80
      }
    },
    left: () => {
      if (this.x > 0) {
        this.x -= 100
      }
    },
    right: () => {
      if (this.x < this.field.width) {
        this.x += 100
      }
    },
  };

  actions[key]();
};

Player.prototype.reset = function () {
  this.x = this.initialX;
  this.y = this.initialY;
};

const player = new Player(field);

const allEnemies = [
  new Enemy(field, -100, 60, 200, player),
  new Enemy(field, -100, 140, 250, player),
  new Enemy(field, -100, 225, 300, player),
];

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
