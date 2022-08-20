// Enemies our player must avoid
const FIELDWIDTH = 505;
const FIELDHEIGHT = 606;
const BUGWIDTH = 90;
const PLAYERWIDTH = 91;

const playerStartX = (FIELDWIDTH - PLAYERWIDTH) / 2;
const playerStartY = 300;
const playerStepY = 83;
const playerStepX = FIELDWIDTH / 5;
const firstEnemyX = 51;
const enemySpeed = {
  min: 60,
  max: 130,
};

const field = {
  top: 0,
  bottom: FIELDHEIGHT,
  left: 0,
  right: FIELDWIDTH,
};

class Enemy {
  constructor(x, y, speed, player) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.player = player;
    this.sprite = "images/enemy-bug.png";
  }

  update(dt) {
    if (this.x >= FIELDWIDTH) {
      this.x = -BUGWIDTH;
    }
    this.x += this.speed * dt;
    this.handleCollision();
  }

  handleCollision() {
    if (
      Math.round(this.x) === player.x &&
      Math.round(this.y) === player.y &&
      Math.round(this.x) + playerStepX > player.x &&
      Math.round(this.y) + playerStepY > player.y
    ) {
      player.reset();
    }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = "images/char-boy.png";
  }
  update() {}

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(e) {
    switch (e) {
      case "up":
        this.y -= playerStepY;
        break;
      case "down":
        this.y += playerStepY;
        break;
      case "left":
        this.x -= playerStepX;
        break;
      case "right":
        this.x += playerStepX;
        break;
    }
    this.updateToStart();
  }

  reset() {
    this.y = playerStartY;
    this.x = playerStartX;
  }

  updateToStart() {
    if (
      this.y > field.bottom - playerStepY * 2 ||
      this.y < field.top ||
      this.x > field.right ||
      this.x < field.left
    ) {
      this.reset();
    }
  }
}

const player = new Player(playerStartX, playerStartY);

const allEnemies = [];
for (i = 0; i < 3; i++) {
  allEnemies.push(
    new Enemy(
      -BUGWIDTH,
      firstEnemyX + playerStepY * i,
      Math.floor(Math.random() * (enemySpeed.max - enemySpeed.min)) +
        enemySpeed.min
    )
  );
}

document.addEventListener("keyup", function (e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
