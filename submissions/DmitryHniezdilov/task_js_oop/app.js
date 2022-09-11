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

const BLOCK_WIDTH = 101,
  BLOCK_HEIGHT = 83,
  BLOCKS_NUMBER = {
    x: 5,
    y: 6,
  },
  FIELD_WIDTH = BLOCK_WIDTH * BLOCKS_NUMBER.x,
  FIELD_HEIGHT = BLOCK_HEIGHT * BLOCKS_NUMBER.y,
  ORIGIN_COORDINATE_CHARACTERS = {
    x: 0,
    y: -20,
  },
  PLAYER_CONF = {
    img: "images/char-boy.png",
    initialBlock: {
      x: 3,
      y: 6,
    },
    get initialPositionX() {
      return (
        ORIGIN_COORDINATE_CHARACTERS.x + BLOCK_WIDTH * (this.initialBlock.x - 1)
      );
    },
    get initialPositionY() {
      return (
        ORIGIN_COORDINATE_CHARACTERS.y + BLOCK_WIDTH * (this.initialBlock.y - 1)
      );
    },
  },
  ENEMIES_CONF = {
    img: "images/enemy-bug.png",
    initialRows: [2, 3, 4],
    amountOfEnemies: [2, 2, 1],
    speedIncrease: 0.2,
    minSpeedOfEnemy: 50,
    maxSpeedOfEnemy: 300,
  },
  ELEMENT_POPUP_MESSAGE = document.querySelector(".js-popup"),
  ELEMENT_INFO_LEVEL = document.querySelector(".js-info-level"),
  ELEMENT_INFO_SPEED = document.querySelector(".js-info-speed"),
  getRandomArbitrary = (min, max) => Math.random() * (max - min) + min;

let currentLevel = 1,
  speedMultiplicator = 1,
  isFreeze = false;

const Enemy = function (x, y, minSpeed, maxSpeed) {
  this.x = x;
  this.y = y;
  this.sprite = ENEMIES_CONF.img;
  this.speed = getRandomArbitrary(minSpeed, maxSpeed);
};

Enemy.prototype.update = function (dt) {
  if (!isFreeze) {
    this.x += this.speed * dt;

    if (this.x > FIELD_WIDTH) {
      this.x = -BLOCK_WIDTH;
    }

    this.checkCollision();
  }
};

Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollision = function () {
  if (
    player.y === this.y &&
    player.x <= Math.floor(this.x) + BLOCK_WIDTH / 1.3 &&
    player.x >= Math.floor(this.x) - BLOCK_WIDTH / 1.3
  ) {
    endOfGame("lose");
  }
};

const Player = function () {
  this.x = PLAYER_CONF.initialPositionX;
  this.y = PLAYER_CONF.initialPositionY;
  this.sprite = PLAYER_CONF.img;
  this.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
  this.update = function () {
    this.checkExitFromField();
  };
  this.handleInput = function (key) {
    if (!isFreeze) {
      switch (key) {
        case "left":
          this.x += -BLOCK_WIDTH;
          break;
        case "up":
          this.y += -BLOCK_HEIGHT;
          break;
        case "right":
          this.x += BLOCK_WIDTH;
          break;
        case "down":
          this.y += BLOCK_HEIGHT;
          break;
      }
      this.checkWin();
    }
  };
  this.checkExitFromField = function () {
    if (this.x < ORIGIN_COORDINATE_CHARACTERS.x) {
      this.x = 0;
    } else if (this.x > FIELD_WIDTH - BLOCK_WIDTH) {
      this.x = FIELD_WIDTH - BLOCK_WIDTH;
    } else if (this.y < ORIGIN_COORDINATE_CHARACTERS.y) {
      this.y = ORIGIN_COORDINATE_CHARACTERS.y;
    } else if (
      this.y >
      ORIGIN_COORDINATE_CHARACTERS.y + FIELD_HEIGHT - BLOCK_HEIGHT
    ) {
      this.y = ORIGIN_COORDINATE_CHARACTERS.y + FIELD_HEIGHT - BLOCK_HEIGHT;
    }
  };
  this.returnToStart = function () {
    this.x = PLAYER_CONF.initialPositionX;
    this.y = PLAYER_CONF.initialPositionY;
  };
  this.checkWin = function () {
    if (this.y < PLAYER_CONF.initialBlock.y) {
      endOfGame("win");
    }
  };
};

const allEnemies = [];

const startPositionOfEnemies = (i, n) => {
  if (i === 1) {
    return getRandomArbitrary(-BLOCK_WIDTH, BLOCK_WIDTH * 2);
  } else if (i === 2 && n === 2) {
    return getRandomArbitrary(-FIELD_WIDTH, -BLOCK_WIDTH);
  } else if (i === 2) {
    return getRandomArbitrary((-FIELD_WIDTH + BLOCK_WIDTH) / 2, -BLOCK_WIDTH);
  } else {
    return 0;
  }
};

const createEnemies = () => {
  const currentMinSpeedOfEnemy =
      ENEMIES_CONF.minSpeedOfEnemy * speedMultiplicator,
    currentMaxSpeedOfEnemy = ENEMIES_CONF.maxSpeedOfEnemy * speedMultiplicator;

  ENEMIES_CONF.initialRows.forEach((row, idx) => {
    const amountEnemiesOnRow = ENEMIES_CONF.amountOfEnemies[idx],
      startPositionY =
        ORIGIN_COORDINATE_CHARACTERS.y + BLOCK_HEIGHT * (row - 1);

    const createEnemy = (i) => () => {
      if (i > 0) {
        const startPositionX = startPositionOfEnemies(i, amountEnemiesOnRow);
        allEnemies.push(
          new Enemy(
            startPositionX,
            startPositionY,
            currentMinSpeedOfEnemy,
            currentMaxSpeedOfEnemy
          )
        );
        createEnemy(i - 1)();
      }
    };

    createEnemy(amountEnemiesOnRow)();
  });
};

const updateEnemies = () => {
  allEnemies.length = 0;
  createEnemies();
};

updateEnemies();

const player = new Player();

document.addEventListener("keyup", function (e) {
  const allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

function endOfGame(result) {
  const updateMarkupInfo = (popupText) => {
    ELEMENT_POPUP_MESSAGE.innerText = popupText;
    ELEMENT_INFO_LEVEL.innerText = currentLevel;
    ELEMENT_INFO_SPEED.innerText = `x${speedMultiplicator}`;
    ELEMENT_POPUP_MESSAGE.classList.add("is-active");
  };

  isFreeze = true;
  if (result === "win") {
    currentLevel++;
    speedMultiplicator = +(
      speedMultiplicator + ENEMIES_CONF.speedIncrease
    ).toFixed(1);
    updateMarkupInfo("You Win");
  } else if (result === "lose") {
    currentLevel = 1;
    speedMultiplicator = 1;
    updateMarkupInfo("You Lose");
  }

  setTimeout(() => {
    ELEMENT_POPUP_MESSAGE.classList.remove("is-active");
    updateEnemies();
    player.returnToStart();
    isFreeze = false;
  }, 900);
}
