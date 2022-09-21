const Field = function() {
  this.width = 400;
  this.height = 375;
  this.cellWidth = 100;
  this.cellHeight = 80;
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
  this.height = 40;
  this.width = 83;
  this.field = field;
}

Enemy.prototype.update = function(dt) {
  if (this.x >= this.field.width + this.width) {
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
    up: () => this.y -= this.field.cellHeight,
    down: () => {
      if (this.y < this.field.height) {
        this.y += this.field.cellHeight
      }
    },
    left: () => {
      if (this.x > 0) {
        this.x -= this.field.cellWidth;
      }
    },
    right: () => {
      if (this.x < this.field.width) {
        this.x += this.field.cellWidth;
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

const generateRandomEnemies = (count, field) => {
  return Array(count)
    .fill()
    .map((_, i) => {
      const getRandom = (min, max) => Math.round(min - 0.5 + Math.random() * (max - min + 1));
      const startColumn = [-1, -2, -3][i <= 2 ? i : getRandom(0, 2)];
      const row = [1, 2, 3][i <= 2 ? i : getRandom(0, 2)];
      const speed = [200, 300, 400][i <= 2 ? i : getRandom(0, 2)];

      const x = startColumn * field.cellWidth;
      const y = row * field.cellHeight;
      
      return new Enemy(field, x, y, speed, player);
    });
}

const allEnemies = generateRandomEnemies(3, field);

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
