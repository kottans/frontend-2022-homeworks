/*
 * Базовый класс для всех игровых объектов
 */
function BaseGameObject(x, y) {
  this._x = x;
  this._y = y;
}

BaseGameObject.prototype.getRow = function () {
  return Math.ceil((this._y - MARGIN_TOP) / CELL_HEIGHT);
};

BaseGameObject.prototype.getColumn = function () {
  return Math.ceil(this._x / CELL_WIDTH);
};

/*
 *Базовый класс для спрайтов с изображением
 */
function ImageSprite(x, y, sprite) {
  BaseGameObject.call(this, x, y);
  this._sprite = sprite;
}
ImageSprite.prototype = Object.create(BaseGameObject.prototype);

ImageSprite.prototype.render = function () {
  ctx.drawImage(Resources.get(this._sprite), this._x, this._y);
};

/*
 * Базовый класс для спрайтов без изображения
 */
function TextSprite(x, y, color, text) {
  BaseGameObject.call(this, x, y);
  this._text = text;
  this._color = color;
}
TextSprite.prototype = Object.create(BaseGameObject.prototype);

TextSprite.prototype.render = function () {
  ctx.font = "24px serif";
  ctx.fillStyle = this._color;
  ctx.fillText(this._text, this._x, this._y);
};

/*
 * Класс игрока
 */
function Player(x, y, sprite, joke) {
  ImageSprite.call(this, x, y, sprite);
  this._wins = 0;
  this._loses = 0;
  this._streak = 0;
  this._joke = joke;
}
Player.prototype = Object.create(ImageSprite.prototype);

Player.prototype.handleInput = function (key) {
  switch (key) {
    case "up":
      this._y -= CELL_HEIGHT;
      break;
    case "down":
      this._y += CELL_HEIGHT;
      break;
    case "right":
      this._x += CELL_WIDTH;
      break;
    case "left":
      this._x -= CELL_WIDTH;
      break;
    case "f":
      this._joke.jokeHandler();
      break;
  }
};

Player.prototype.update = function () {
  if (this._x + CELL_WIDTH > SCREEN_WIDTH) {
    this._x -= CELL_WIDTH;
  }
  if (this._y > START_Y) {
    this._y -= CELL_HEIGHT;
  }
  if (this._x < 0) {
    this._x += CELL_WIDTH;
  }
  if (this._y < 0) {
    this.win();
  }
};

Player.prototype.restart = function () {
  this._x = START_X;
  this._y = START_Y;
};

Player.prototype.win = function () {
  this._wins += 1;
  this._streak += 1;
  this.restart();
};

Player.prototype.lose = function () {
  this._loses += 1;
  this._streak = 0;
  this.restart();
};

/*
 * Класс врага
 */
function Enemy(x, y, sprite, player) {
  ImageSprite.call(this, x, y, sprite);
  this._player = player;
  this.start();
}
Enemy.prototype = Object.create(ImageSprite.prototype);

Enemy.prototype.getRow = function () {
  return Math.ceil((this._y - MARGIN_TOP) / CELL_HEIGHT) + 1;
};

Enemy.prototype.update = function (dt) {
  this._x += this._speed * dt;
  if (this._x > SCREEN_WIDTH) {
    this.start();
  }
  this.checkLose();
};

Enemy.prototype.start = function () {
  this._x = -CELL_WIDTH;
  this._speed =
    MIN_ENEMY_SPEED +
    Math.floor(Math.random() * (MAX_ENEMY_SPEED - MIN_ENEMY_SPEED));
};

Enemy.prototype.checkLose = function () {
  const [eRow, eCol, pRow, pCol] = [
    this.getRow(),
    this.getColumn(),
    this._player.getRow(),
    this._player.getColumn(),
  ];
  if (eRow === pRow && (eCol === pCol || eCol - 1 === pCol)) {
    this._player.lose();
  }
};

function WinText(x, y, player) {
  TextSprite.call(this, x, y, "green");
  this._player = player;
}
WinText.prototype = Object.create(TextSprite.prototype);

WinText.prototype.update = function () {
  this._text = `Wins: ${this._player._wins}`;
};

function LoseText(x, y, player) {
  TextSprite.call(this, x, y, "red");
  this._player = player;
}
LoseText.prototype = Object.create(TextSprite.prototype);

LoseText.prototype.update = function () {
  this._text = `Loses: ${this._player._loses}`;
};

function StreakText(x, y, player) {
  TextSprite.call(this, x, y, "gold");
  this._player = player;
}
StreakText.prototype = Object.create(TextSprite.prototype);

StreakText.prototype.update = function () {
  this._text = `Streak: ${this._player._streak}`;
};

function JokeText(x, y) {
  TextSprite.call(this, x, y, "white");
  this._messages = {
    first: "DON'T PRESS 'F' ( ͡ಠ ͜ʖ ͡ಠ)",
    last: "AAHHAH, GOOD LUCK ✌",
    nope: "NOPE ≧◉◡◉≦",
  };
  this._joke = this._messages.first;
  this._counter = 0;
  this._max_counter = 250;
  this._animation_text_delay = 200;
  this._toggle_joke_time = 1200;
  this._state = "normal";
}
JokeText.prototype = Object.create(TextSprite.prototype);

JokeText.prototype.update = function () {
  this._counter = (this._counter + 1) % this._max_counter;
  this._text =
    this._counter < this._animation_text_delay || this._state === "rotated"
      ? this._joke
      : "";
};
JokeText.prototype.jokeHandler = function () {
  if (this._state === "normal") {
    this._state = "rotated";
    this._joke = this._messages.last;
    this.rotateScreen();
  } else {
    this._joke = this._messages.nope;
    setTimeout(() => {
      this._joke = this._messages.last;
    }, this._toggle_joke_time);
  }
};
JokeText.prototype.rotateScreen = function () {
  ctx.translate(SCREEN_WIDTH, SCREEN_HEIGHT);
  ctx.rotate(Math.PI);
};

/* Основная программа */
document.addEventListener("keyup", function (e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    70: "f",
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

const CELL_WIDTH = 101;
const CELL_HEIGHT = 83;
const ROWS = 6;
const COLUMNS = 5;
const START_ROW = 4;
const START_COLUMN = 2;
const SCREEN_WIDTH = COLUMNS * CELL_WIDTH;
const SCREEN_HEIGHT = ROWS * CELL_WIDTH;
const START_X = START_COLUMN * CELL_WIDTH;
const START_Y = START_ROW * CELL_WIDTH;
const ENEMY_ROWS = 3;
const MIN_ENEMY_SPEED = 100;
const MAX_ENEMY_SPEED = 350;
const MARGIN_TOP = 60;

const allEnemies = [];
const joke = new JokeText(SCREEN_WIDTH / 2 - CELL_WIDTH, CELL_HEIGHT);
const player = new Player(START_X, START_Y, "images/char-boy.png", joke);
for (let i = 0; i < ENEMY_ROWS; i++) {
  allEnemies.push(
    new Enemy(
      -CELL_WIDTH,
      MARGIN_TOP + CELL_HEIGHT * i,
      "images/enemy-bug.png",
      player
    )
  );
}
const score = new WinText(0, SCREEN_HEIGHT, player);
const streak = new StreakText(2 * CELL_WIDTH, SCREEN_HEIGHT, player);
const dies = new LoseText(4 * CELL_WIDTH, SCREEN_HEIGHT, player);
