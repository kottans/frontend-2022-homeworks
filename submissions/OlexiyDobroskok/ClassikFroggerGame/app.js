const PLAYER_START_POSITION_X = 202;
const PLAYER_START_POSITION_Y = 373;
const PLAYER_STEP_X = 101;
const PLAYER_STEP_Y = 83;
const ENEMY_WIDTH = 171;
const ENEMY_START_SPEED = 100;
const ENEMIES_START_POSITION_Y = [43, 126, 209];
const CANVAS_WIDTH = 505;
const DELTA_WIDTH = 85;
const DELTA_HEIGH = 3;

const skins = [
  {
    id: "boy",
    img: "images/char-boy.png",
  },
  {
    id: "cat-girl",
    img: "images/char-cat-girl.png",
  },
  {
    id: "horn-girl",
    img: "images/char-horn-girl.png",
  },
  {
    id: "pink-girl",
    img: "images/char-pink-girl.png",
  },
  {
    id: "princess-girl",
    img: "images/char-princess-girl.png",
  },
];

const body = document.querySelector("body");
const skinsList = document.createElement("ul");
skinsList.classList.add("skins__list");
body.prepend(skinsList);
skinsList.prepend(...createSkinsList());

let score = 0;

const result = document.createElement("p");
result.classList.add("show__result");
skinsList.after(result);
result.innerHTML = `Score: ${score}`;

function createSkinsList() {
  return skins.map((playerSkin) => {
    const { id, img } = playerSkin;
    const listItem = document.createElement("li");
    listItem.classList.add("list__item");
    listItem.innerHTML = id;
    const skinImg = document.createElement("img");
    skinImg.classList.add("list__image");
    skinImg.src = img;
    skinImg.id = id;
    listItem.prepend(skinImg);
    return listItem;
  });
}

function changeSkin({ target }) {
  const { img: playerSkin } = skins.find((skin) => skin.id === target.id);
  player.sprite = playerSkin;
}

skinsList.addEventListener("click", changeSkin);

const Enemy = function (x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.sprite = "images/enemy-bug.png";
};

Enemy.prototype.update = function (dt) {
  this.x += this.speed * dt;
  if (this.x > CANVAS_WIDTH) {
    this.x = -ENEMY_WIDTH;
    this.speed = ENEMY_START_SPEED + Math.floor(Math.random() * 200);
  }
  this.collision();
};

Enemy.prototype.collision = function () {
  if (
    player.x < this.x + DELTA_WIDTH &&
    player.x + DELTA_WIDTH > this.x &&
    player.y < this.y + DELTA_HEIGH &&
    player.y + DELTA_HEIGH > this.y
  ) {
    player.x = PLAYER_START_POSITION_X;
    player.y = PLAYER_START_POSITION_Y;
    resetScore();
  }
};

function resetScore() {
  score = 0;
  result.innerHTML = `Score: ${score}`;
}

function increaseScore() {
  score++;
  result.innerHTML = `Score: ${score}`;
}

Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const Player = function (x, y) {
  this.x = x;
  this.y = y;
  this.sprite = "images/char-cat-girl.png";
};

Player.prototype.update = function () {};

Player.prototype.reset = function () {
  this.x = PLAYER_START_POSITION_X;
  this.y = PLAYER_START_POSITION_Y;
  increaseScore();
};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const player = new Player(PLAYER_START_POSITION_X, PLAYER_START_POSITION_Y);

const allEnemies = ENEMIES_START_POSITION_Y.map((yPosition) => {
  const xPosition = Math.floor(Math.random() * -200);
  return new Enemy(xPosition, yPosition, ENEMY_START_SPEED);
});

Player.prototype.handleInput = function (pressedKey) {
  if (pressedKey === "left" && this.x > 0) {
    this.x -= PLAYER_STEP_X;
  }
  if (pressedKey === "right" && this.x < CANVAS_WIDTH - PLAYER_STEP_X) {
    this.x += PLAYER_STEP_X;
  }
  if (pressedKey === "up" && this.y > 0) {
    this.y -= PLAYER_STEP_Y;
  }
  if (pressedKey === "down" && this.y < PLAYER_START_POSITION_Y) {
    this.y += PLAYER_STEP_Y;
  }
  if (this.y < 0) {
    setTimeout(function () {
      player.reset();
    }, 150);
  }
};

document.addEventListener("keyup", function (e) {
  const allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
