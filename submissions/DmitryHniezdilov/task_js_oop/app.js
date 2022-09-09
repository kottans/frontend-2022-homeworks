"use strict";

document.body.innerHTML = `
    <h1 class='title'>Frogger Game</h1>
    <div class='info-wrap'>
        <p><span>Level: </span><span class='js-info-level'>1</span></p>
        <p><span>Speed: </span><span class='js-info-speed'>x1</span></p>
    </div>
    <p class='popup js-popup'></p>
`;

const fieldWidth = 404,
  fieldHeight = 404,
  cellWidth = 101,
  rowHeight = 83,
  playerImg = "images/char-boy.png",
  enemyImg = "images/enemy-bug.png",
  heightLinesOfEnemies = {
    1: 228,
    2: 145,
    3: 62,
  },
  speedIncrease = 0.2,
  minSpeedOfEnemy = 50,
  maxSpeedOfEnemy = 300,
  elementPopupMessage = document.querySelector(".js-popup"),
  elementInfoLevel = document.querySelector(".js-info-level"),
  elementInfoSpeed = document.querySelector(".js-info-speed"),
  getRandomArbitrary = function (min, max) {
    return Math.random() * (max - min) + min;
  };

let currentLevel = 1,
  speedMultiplicator = 1,
  isFreeze = false;

const Enemy = function (x, y, currentMinSpeedOfEnemy, currentMaxSpeedOfEnemy) {
  this.x = x;
  this.y = y;
  this.sprite = enemyImg;
  this.speed = getRandomArbitrary(
    currentMinSpeedOfEnemy,
    currentMaxSpeedOfEnemy
  );
};

Enemy.prototype.update = function (dt) {
  if (!isFreeze) {
    this.x += this.speed * dt;

    if (this.x > fieldWidth + cellWidth) {
      this.x = -cellWidth;
    }

    this.checkCollision();
  }
};

Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollision = function () {
  if (
    player.y - 10 == this.y &&
    player.x <= Math.floor(this.x) + cellWidth / 1.3 &&
    player.x >= Math.floor(this.x) - cellWidth / 1.3
  ) {
    endOfGame("lose");
  }
};

const Player = function () {
  this.x = fieldWidth / 2;
  this.y = fieldHeight;
  this.sprite = playerImg;
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
          this.x += -cellWidth;
          break;
        case "up":
          this.y += -rowHeight;
          break;
        case "right":
          this.x += cellWidth;
          break;
        case "down":
          this.y += rowHeight;
          break;
      }
      this.checkWin();
    }
  };
  this.checkExitFromField = function () {
    if (this.x < 0) {
      this.x = 0;
    } else if (this.x > fieldWidth) {
      this.x = fieldWidth;
    } else if (this.y < -11) {
      this.y = -11;
    } else if (this.y > fieldHeight) {
      this.y = fieldHeight;
    }
  };
  this.returnToStart = function () {
    this.x = fieldWidth / 2;
    this.y = fieldHeight;
  };
  this.checkWin = function () {
    if (this.y < 0) {
      endOfGame("win");
    }
  };
};

const allEnemies = [];

const startPositionOfEnemies = function (i, n) {
  if (i === 1) {
    return getRandomArbitrary(-cellWidth, cellWidth * 2);
  } else if (i === 2 && n === 2) {
    return getRandomArbitrary(-fieldWidth, -cellWidth);
  } else if (i === 2) {
    return getRandomArbitrary((-fieldWidth + cellWidth) / 2, -cellWidth);
  } else if (i === 3) {
    return getRandomArbitrary((-fieldWidth + cellWidth) / 2, -cellWidth);
  } else {
    return 0;
  }
};

const createEnemies = function (n, row) {
  const heightOfLine = heightLinesOfEnemies[row],
    currentMinSpeedOfEnemy = minSpeedOfEnemy * speedMultiplicator,
    currentMaxSpeedOfEnemy = maxSpeedOfEnemy * speedMultiplicator;

  for (let i = 1; i <= n; i++) {
    const startPositionX = startPositionOfEnemies(i, n);

    allEnemies.push(
      new Enemy(
        startPositionX,
        heightOfLine,
        currentMinSpeedOfEnemy,
        currentMaxSpeedOfEnemy
      )
    );
  }
};

const updateEnemies = function () {
  allEnemies.length = 0;
  createEnemies(1, 1);
  createEnemies(2, 2);
  createEnemies(2, 3);
};

updateEnemies();

const player = new Player();

document.addEventListener("keyup", function (e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

function endOfGame(result) {
  const updateMarkupInfo = (popupText) => {
    elementPopupMessage.innerText = popupText;
    elementInfoLevel.innerText = currentLevel;
    elementInfoSpeed.innerText = `x${speedMultiplicator}`;
    elementPopupMessage.classList.add("is-active");
  };

  isFreeze = true;
  if (result == "win") {
    currentLevel++;
    speedMultiplicator = +(speedMultiplicator + speedIncrease).toFixed(1);

    updateMarkupInfo("You Win");
  } else if (result == "lose") {
    currentLevel = 1;
    speedMultiplicator = 1;

    updateMarkupInfo("You Lose");
  }

  setTimeout(() => {
    elementPopupMessage.classList.remove("is-active");
    updateEnemies();
    player.returnToStart();
    isFreeze = false;
  }, 900);
}
