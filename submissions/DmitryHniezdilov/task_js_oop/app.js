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
  this.sprite = imgUrl;
  this.isFreeze = false;
};

Character.prototype.setFreeze = function () {
  this.isFreeze = true;
};

Character.prototype.unFreeze = function () {
  this.isFreeze = false;
};

const Enemy = function (x, y, speed, config, endOfGame, player) {
  Character.call(this, config.ENEMIES_CONF.img);
  this.config = config;
  this.STATE = config.STATE;
  this.ENEMIES_CONF = config.ENEMIES_CONF;
  this.FIELD_WIDTH = config.FIELD_WIDTH;
  this.BLOCK_WIDTH = config.BLOCK_WIDTH;
  this.BLOCK_HEIGHT = config.BLOCK_HEIGHT;
  this.END_OF_GAME_LOSE = config.END_OF_GAME_LOSE;
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.endOfGame = endOfGame;
  this.player = player;
};

Enemy.prototype = Object.create(Character.prototype);

Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.update = function (dt) {
  if (!this.isFreeze) {
    this.x += this.speed * dt;
    this.x > this.FIELD_WIDTH && (this.x = -this.BLOCK_WIDTH);
    this.checkCollision();
  }
};

Enemy.prototype.checkCollision = function () {
  const isCollision =
    this.player.y === this.y &&
    this.player.x <=
      Math.floor(this.x) + this.BLOCK_WIDTH / this.ENEMIES_CONF.overlapRatio &&
    this.player.x >=
      Math.floor(this.x) - this.BLOCK_WIDTH / this.ENEMIES_CONF.overlapRatio;

  isCollision && this.endOfGame.updateGame(this.END_OF_GAME_LOSE);
};

Enemy.prototype.updateSpeed = function () {
  const currentMinSpeedOfEnemy =
    this.ENEMIES_CONF.minSpeedOfEnemy * this.STATE.speedMultiplicator;
  const currentMaxSpeedOfEnemy =
    this.ENEMIES_CONF.maxSpeedOfEnemy * this.STATE.speedMultiplicator;
  this.speed =
    Math.random() * (currentMaxSpeedOfEnemy - currentMinSpeedOfEnemy) +
    currentMinSpeedOfEnemy;
};

const Player = function (config, endOfGame) {
  Character.call(this, config.PLAYER_CONF.img);
  this.config = config;
  this.STATE = config.STATE;
  this.PLAYER_CONF = config.PLAYER_CONF;
  this.FIELD_WIDTH = config.FIELD_WIDTH;
  this.BLOCK_WIDTH = config.BLOCK_WIDTH;
  this.BLOCK_HEIGHT = config.BLOCK_HEIGHT;
  this.END_OF_GAME_WIN = config.END_OF_GAME_WIN;
  this.ORIGIN_COORDINATE_CHARACTERS = config.ORIGIN_COORDINATE_CHARACTERS;
  this.INITIAL_POSITION_X =
    this.ORIGIN_COORDINATE_CHARACTERS.x +
    this.BLOCK_WIDTH * (this.PLAYER_CONF.initialBlock.x - 1);
  this.INITIAL_POSITION_Y =
    this.ORIGIN_COORDINATE_CHARACTERS.y +
    this.BLOCK_HEIGHT * (this.PLAYER_CONF.initialBlock.y - 1);
  this.x = this.INITIAL_POSITION_X;
  this.y = this.INITIAL_POSITION_Y;
  this.endOfGame = endOfGame;
};

Player.prototype = Object.create(Character.prototype);

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function () {
  this.checkExitFromField();
};

Player.prototype.handleInput = function (key) {
  if (!this.isFreeze) {
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
    this.endOfGame.updateGame(this.END_OF_GAME_WIN);
  }
};

Player.prototype.goToStart = function () {
  this.x = this.INITIAL_POSITION_X;
  this.y = this.INITIAL_POSITION_Y;
};

const EndOfGame = function (config) {
  this.config = config;
  this.STATE = config.STATE;
};

EndOfGame.prototype.incrementLevel = function () {
  this.config.STATE.currentLevel++;
  this.STATE.speedMultiplicator = +(
    this.STATE.speedMultiplicator + this.config.ENEMIES_CONF.speedIncrease
  ).toFixed(1);
};

EndOfGame.prototype.resetLevel = function () {
  this.STATE.currentLevel = 1;
  this.STATE.speedMultiplicator = 1;
};

EndOfGame.prototype.updateMarkupInfo = function (popupText) {
  this.config.ELEMENT_POPUP_MESSAGE.innerText = popupText;
  this.config.ELEMENT_INFO_LEVEL.innerText = this.STATE.currentLevel;
  this.config.ELEMENT_INFO_SPEED.innerText = `x${this.STATE.speedMultiplicator}`;
};

EndOfGame.prototype.showPopup = function () {
  this.config.ELEMENT_POPUP_MESSAGE.classList.add(
    this.config.POPUP_MESSAGE_ACTIVE_CLASS
  );
};

EndOfGame.prototype.hidePopup = function () {
  this.config.ELEMENT_POPUP_MESSAGE.classList.remove(
    this.config.POPUP_MESSAGE_ACTIVE_CLASS
  );
};

EndOfGame.prototype.setFreezeCharacters = function () {
  player.setFreeze();
  allEnemies.forEach((enemy) => enemy.setFreeze());
};

EndOfGame.prototype.unFreezeCharacters = function () {
  player.unFreeze();
  allEnemies.forEach((enemy) => enemy.unFreeze());
};

EndOfGame.prototype.updateSpeedOfEnemies = function () {
  allEnemies.forEach((enemy) => enemy.updateSpeed());
};

EndOfGame.prototype.updateGame = function (result) {
  this.setFreezeCharacters();

  switch (result) {
    case this.config.END_OF_GAME_WIN:
      this.incrementLevel();
      this.updateMarkupInfo(this.config.PRINT_MESSAGE_WIN);
      this.showPopup();
      break;
    case this.config.END_OF_GAME_LOSE:
      this.resetLevel();
      this.updateMarkupInfo(this.config.PRINT_MESSAGE_LOSE);
      this.showPopup();
      break;
  }

  this.restartGame();
};

EndOfGame.prototype.restartGame = function () {
  setTimeout(() => {
    this.updateSpeedOfEnemies();
    player.goToStart();
    this.hidePopup();
    this.unFreezeCharacters();
  }, 900);
};

const createEnemies = (config, endOfGame, player) => {
  const {
    ENEMIES_CONF,
    ORIGIN_COORDINATE_CHARACTERS,
    BLOCK_WIDTH,
    BLOCK_HEIGHT,
    FIELD_WIDTH,
    STATE,
  } = config;

  const currentMinSpeedOfEnemy =
      ENEMIES_CONF.minSpeedOfEnemy * STATE.speedMultiplicator,
    currentMaxSpeedOfEnemy =
      ENEMIES_CONF.maxSpeedOfEnemy * STATE.speedMultiplicator;

  const getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  const setSpeed = () =>
    getRandomArbitrary(currentMinSpeedOfEnemy, currentMaxSpeedOfEnemy);

  const startPositionOfEnemies = (i) => {
    const numberOfStartBlock = 2;
    const numberOfFirstEnemy = 1;
    const numberOfSecondEnemy = 1;

    if (i === numberOfFirstEnemy) {
      return getRandomArbitrary(-BLOCK_WIDTH, BLOCK_WIDTH * numberOfStartBlock);
    } else if (i === numberOfSecondEnemy) {
      return getRandomArbitrary(-FIELD_WIDTH, BLOCK_WIDTH);
    } else {
      return getRandomArbitrary(-FIELD_WIDTH, ORIGIN_COORDINATE_CHARACTERS.x);
    }
  };

  ENEMIES_CONF.initialRows.forEach((row, idx) => {
    const amountEnemiesOnRow = ENEMIES_CONF.amountOfEnemies[idx],
      startPositionY =
        ORIGIN_COORDINATE_CHARACTERS.y + BLOCK_HEIGHT * (row - 1);

    const createEnemy = (i) => () => {
      if (i > 0) {
        const startPositionX = startPositionOfEnemies(i);
        allEnemies.push(
          new Enemy(
            startPositionX,
            startPositionY,
            setSpeed(),
            config,
            endOfGame,
            player
          )
        );
        createEnemy(i - 1)();
      }
    };

    createEnemy(amountEnemiesOnRow)();
  });
};

const endOfGame = new EndOfGame(config);
const player = new Player(config, endOfGame);
createEnemies(config, endOfGame, player);

document.addEventListener("keyup", function (e) {
  const allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
