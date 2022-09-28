const FIELD = {
    WIDTH: 505,
    HEIGHT: 475,
    EDGE: 0,
    CELL_WIDTH: 101,
    CELL_HEIGHT: 83,
    WATER_BLOCK_HEIGHT: 83,
  };
  
  const CHARACTER = {
    POSITION_X: 202,
    POSITION_Y: 392,
    STEP: {
      X: 101,
      Y: 83,
    },
    HEIGHT: 101,
    SPRITE: "images/char-boy.png",
  };
  
  const ENEMY_OPTIONS = {
    POSITION: [
      {
        X: -101,
        Y: 60,
      },
      {
        X: -101,
        Y: 143,
      },
      {
        X: -101,
        Y: 226,
      },
    ],
    SPEED: {
      MIN: 200,
      MAX: 500,
    },
    TRIGGER: {
      LEFT: 30,
      RIGHT: 30,
    },
    WIDTH: 101,
    SPRITE: "images/enemy-bug.png",
  };
  
  const Enemy = function (x, y, speed) {
    this.positionX = x;
    this.positionY = y;
    this.speed = speed;

    this.player = player;
  
    this.sprite = ENEMY_OPTIONS.SPRITE;
  };
  
  Enemy.prototype.update = function (dt) {
    if (this.positionX > FIELD.WIDTH) {
      this.positionX = -FIELD.CELL_WIDTH;
      this.positionY =
        ENEMY_OPTIONS.POSITION[
          randomNumber(0, ENEMY_OPTIONS.POSITION.length - 1)
        ].Y;
      this.speed = randomNumber(ENEMY_OPTIONS.SPEED.MIN, ENEMY_OPTIONS.SPEED.MAX);
    }
  
    this.positionX += this.speed * dt;
  
    this.collision();
  };
  
  Enemy.prototype.collision = function () {
    if (
      this.positionX + ENEMY_OPTIONS.WIDTH - ENEMY_OPTIONS.TRIGGER.RIGHT >
        this.player.positionX &&
      this.positionX - ENEMY_OPTIONS.TRIGGER.LEFT < this.player.positionX &&
      this.positionY - this.player.positionY === 0
    ) {
      this.player.positionX = CHARACTER.POSITION_X;
      this.player.positionY = CHARACTER.POSITION_Y;
    }
  };
  
  Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.positionX, this.positionY);
  };
  
  const Player = function (x, y) {
    this.positionX = x;
    this.positionY = y;
  
    this.sprite = CHARACTER.SPRITE;
  };
  
  Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.positionX, this.positionY);
  };
  
  Player.prototype.update = function () {
    if (this.positionY + CHARACTER.HEIGHT < FIELD.WATER_BLOCK_HEIGHT) {
      this.positionX = CHARACTER.POSITION_X;
      this.positionY = CHARACTER.POSITION_Y;
    }
  };
  
  Player.prototype.handleInput = function (keyCode) {
    if (keyCode === "left" && this.positionX > FIELD.EDGE) {
      this.positionX -= CHARACTER.STEP.X;
    }
    if (keyCode === "right" && this.positionX < FIELD.WIDTH - FIELD.CELL_WIDTH) {
      this.positionX += CHARACTER.STEP.X;
    }
    if (keyCode === "up" && this.positionY > FIELD.EDGE) {
      this.positionY -= CHARACTER.STEP.Y;
    }
    if (keyCode === "down" && this.positionY < FIELD.HEIGHT - FIELD.CELL_HEIGHT) {
      this.positionY += CHARACTER.STEP.Y;
    }
  };
  
  const player = new Player(
    CHARACTER.POSITION_X,
    CHARACTER.POSITION_Y,
    CHARACTER.SPRITE
  );
  
  const randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
  };
  
  const allEnemies = ENEMY_OPTIONS.POSITION.map((position) => {
    let speed = randomNumber(ENEMY_OPTIONS.SPEED.MIN, ENEMY_OPTIONS.SPEED.MAX);
    return new Enemy(position.X, position.Y, speed);
  });
  
  document.addEventListener("keyup", function (e) {
    const allowedKeys = {
      ArrowLeft: "left",
      ArrowUp: "up",
      ArrowRight: "right",
      ArrowDown: "down",
    };
  
    player.handleInput(allowedKeys[e.key]);
  });
  