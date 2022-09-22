"use strict";

const initialInterfaceMarkup = () => {
  document.body.innerHTML = `
    <h1 class='title'>Frogger Game</h1>
    <div class='info-wrap'>
      <p><span>Level: </span><span class='js-info-level'>1</span></p>
      <p><span>Speed: </span><span class='js-info-speed'>x1</span></p>
    </div>
    <p class='popup js-popup'></p>
  `;
};

initialInterfaceMarkup();

const allEnemies = [];
let isFreeze = false;

const config = {
  BLOCK_WIDTH: 101,
  BLOCK_HEIGHT: 83,
  BLOCKS_NUMBER: {
    x: 5,
    y: 6,
  },
  get FIELD_WIDTH() {
    return this.BLOCK_WIDTH * this.BLOCKS_NUMBER.x;
  },
  ORIGIN_COORDINATE_CHARACTERS: {
    x: 0,
    y: -20,
  },
  PLAYER_CONF: {
    img: "images/char-boy.png",
    initialBlock: {
      x: 3,
      y: 6,
    },
  },
  ENEMIES_CONF: {
    img: "images/enemy-bug.png",
    initialRows: [2, 3, 4],
    amountOfEnemies: [2, 2, 1],
    overlapRatio: 1.3,
    speedIncrease: 0.2,
    minSpeedOfEnemy: 50,
    maxSpeedOfEnemy: 300,
  },
  STATE: {
    currentLevel: 1,
    speedMultiplicator: 1,
  },
  END_OF_GAME_WIN: "win",
  END_OF_GAME_LOSE: "lose",
  PRINT_MESSAGE_WIN: "You Win",
  PRINT_MESSAGE_LOSE: "You Lose",
  ELEMENT_POPUP_MESSAGE: document.querySelector(".js-popup"),
  ELEMENT_INFO_LEVEL: document.querySelector(".js-info-level"),
  ELEMENT_INFO_SPEED: document.querySelector(".js-info-speed"),
  POPUP_MESSAGE_ACTIVE_CLASS: "is-active",
};

const Character = function (imgUrl) {
  this.config = config;
  this.sprite = imgUrl;
};

Character.prototype.endOfGame = function (result) {
  const {
    POPUP_MESSAGE_ACTIVE_CLASS,
    ELEMENT_POPUP_MESSAGE,
    ELEMENT_INFO_LEVEL,
    ELEMENT_INFO_SPEED,
    END_OF_GAME_WIN,
    END_OF_GAME_LOSE,
    PRINT_MESSAGE_WIN,
    PRINT_MESSAGE_LOSE,
    ENEMIES_CONF,
    STATE,
  } = this.config;

  const updateMarkupInfo = (popupText) => {
    ELEMENT_POPUP_MESSAGE.innerText = popupText;
    ELEMENT_INFO_LEVEL.innerText = STATE.currentLevel;
    ELEMENT_INFO_SPEED.innerText = `x${STATE.speedMultiplicator}`;
    ELEMENT_POPUP_MESSAGE.classList.add(POPUP_MESSAGE_ACTIVE_CLASS);
  };

  isFreeze = true;
  if (result === END_OF_GAME_WIN) {
    STATE.currentLevel++;
    STATE.speedMultiplicator = +(
      STATE.speedMultiplicator + ENEMIES_CONF.speedIncrease
    ).toFixed(1);
    updateMarkupInfo(PRINT_MESSAGE_WIN);
  } else if (result === END_OF_GAME_LOSE) {
    STATE.currentLevel = 1;
    STATE.speedMultiplicator = 1;
    updateMarkupInfo(PRINT_MESSAGE_LOSE);
  }

  setTimeout(() => {
    ELEMENT_POPUP_MESSAGE.classList.remove(POPUP_MESSAGE_ACTIVE_CLASS);
    this.resetGame();
    isFreeze = false;
  }, 900);
};

const Enemy = function (x, y, minSpeed, maxSpeed, img) {
  Character.call(this, img);
  this.ENEMIES_CONF = this.config.ENEMIES_CONF;
  this.FIELD_WIDTH = this.config.FIELD_WIDTH;
  this.BLOCK_WIDTH = this.config.BLOCK_WIDTH;
  this.BLOCK_HEIGHT = this.config.BLOCK_HEIGHT;
  this.x = x;
  this.y = y;
  this.speed = this.getRandomArbitrary(minSpeed, maxSpeed);
};

Enemy.prototype = Object.create(Character.prototype);

Enemy.prototype.update = function (dt) {
  if (!isFreeze) {
    this.x += this.speed * dt;

    if (this.x > this.FIELD_WIDTH) {
      this.x = -this.BLOCK_WIDTH;
    }

    this.checkCollision();
  }
};

Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollision = function () {
  const isCollision =
    player.y === this.y &&
    player.x <=
      Math.floor(this.x) + this.BLOCK_WIDTH / this.ENEMIES_CONF.overlapRatio &&
    player.x >=
      Math.floor(this.x) - this.BLOCK_WIDTH / this.ENEMIES_CONF.overlapRatio;

  isCollision && this.endOfGame(config.END_OF_GAME_LOSE);
};

Enemy.prototype.getRandomArbitrary = function (min, max) {
  return Math.random() * (max - min) + min;
};

Enemy.prototype.startPositionOfEnemies = function (i) {
  const numberOfStartBlock = 2;
  const numberOfFirstEnemy = 1;
  const numberOfSecondEnemy = 1;

  if (i === numberOfFirstEnemy) {
    return this.getRandomArbitrary(
      -this.BLOCK_WIDTH,
      this.BLOCK_WIDTH * numberOfStartBlock
    );
  } else if (i === numberOfSecondEnemy) {
    return this.getRandomArbitrary(-this.FIELD_WIDTH, -this.BLOCK_WIDTH);
  } else {
    return this.getRandomArbitrary(
      -this.FIELD_WIDTH,
      this.config.ORIGIN_COORDINATE_CHARACTERS.x
    );
  }
};

Enemy.prototype.createEnemies = function () {
  const { ENEMIES_CONF, ORIGIN_COORDINATE_CHARACTERS, BLOCK_HEIGHT, STATE } =
    this.config;
  const currentMinSpeedOfEnemy =
      ENEMIES_CONF.minSpeedOfEnemy * STATE.speedMultiplicator,
    currentMaxSpeedOfEnemy =
      ENEMIES_CONF.maxSpeedOfEnemy * STATE.speedMultiplicator;

  ENEMIES_CONF.initialRows.forEach((row, idx) => {
    const amountEnemiesOnRow = ENEMIES_CONF.amountOfEnemies[idx],
      startPositionY =
        ORIGIN_COORDINATE_CHARACTERS.y + BLOCK_HEIGHT * (row - 1);

    const createEnemy = (i) => () => {
      if (i > 0) {
        const startPositionX = this.startPositionOfEnemies(i);
        allEnemies.push(
          new Enemy(
            startPositionX,
            startPositionY,
            currentMinSpeedOfEnemy,
            currentMaxSpeedOfEnemy,
            ENEMIES_CONF.img
          )
        );
        createEnemy(i - 1)();
      }
    };

    createEnemy(amountEnemiesOnRow)();
  });
};

Enemy.prototype.updateEnemies = function () {
  allEnemies.length = 0;
  this.createEnemies();
};

Enemy.prototype.resetGame = function () {
  this.updateEnemies();
  player.goToStart();
};

const EnemiesFactory = function () {
  Enemy.call(this);
};

EnemiesFactory.prototype = Object.create(Enemy.prototype);

const enemiesFactory = new EnemiesFactory();
enemiesFactory.createEnemies();

const Player = function (img) {
  Character.call(this, img);
  this.PLAYER_CONF = this.config.PLAYER_CONF;
  this.FIELD_WIDTH = this.config.FIELD_WIDTH;
  this.BLOCK_WIDTH = this.config.BLOCK_WIDTH;
  this.BLOCK_HEIGHT = this.config.BLOCK_HEIGHT;
  this.ORIGIN_COORDINATE_CHARACTERS = this.config.ORIGIN_COORDINATE_CHARACTERS;
  this.INITIAL_POSITION_X =
    this.ORIGIN_COORDINATE_CHARACTERS.x +
    this.BLOCK_WIDTH * (this.PLAYER_CONF.initialBlock.x - 1);
  this.INITIAL_POSITION_Y =
    this.ORIGIN_COORDINATE_CHARACTERS.y +
    this.BLOCK_HEIGHT * (this.PLAYER_CONF.initialBlock.y - 1);
  this.x = this.INITIAL_POSITION_X;
  this.y = this.INITIAL_POSITION_Y;
};

Player.prototype = Object.create(Character.prototype);

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function () {
  this.checkExitFromField();
};

Player.prototype.handleInput = function (key) {
  if (!isFreeze) {
    switch (key) {
      case "left":
        this.x += -this.BLOCK_WIDTH;
        break;
      case "up":
        this.y += -this.BLOCK_HEIGHT;
        break;
      case "right":
        this.x += this.BLOCK_WIDTH;
        break;
      case "down":
        this.y += this.BLOCK_HEIGHT;
        break;
    }
    this.checkWin();
  }
};

Player.prototype.checkExitFromField = function () {
  if (this.x < this.ORIGIN_COORDINATE_CHARACTERS.x) {
    this.x = 0;
  } else if (this.x > this.FIELD_WIDTH - this.BLOCK_WIDTH) {
    this.x = this.FIELD_WIDTH - this.BLOCK_WIDTH;
  } else if (this.y < this.ORIGIN_COORDINATE_CHARACTERS.y) {
    this.y = this.ORIGIN_COORDINATE_CHARACTERS.y;
  } else if (this.y > this.INITIAL_POSITION_Y) {
    this.y = this.INITIAL_POSITION_Y;
  }
};

Player.prototype.checkWin = function () {
  if (this.y === this.ORIGIN_COORDINATE_CHARACTERS.y) {
    this.endOfGame(config.END_OF_GAME_WIN);
  }
};

Player.prototype.goToStart = function () {
  this.x = this.INITIAL_POSITION_X;
  this.y = this.INITIAL_POSITION_Y;
};

Player.prototype.resetGame = function () {
  enemiesFactory.updateEnemies();
  this.goToStart();
};

const player = new Player(config.PLAYER_CONF.img);

document.addEventListener("keyup", function (e) {
  const allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
