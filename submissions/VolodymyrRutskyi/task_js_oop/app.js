const fieldWidth = 510,
      startX = 202,
      startY = 405,
      tileWidth = 100,
      tileHeight = 83;

class Enemy {
  constructor(y, speed) {
    this.x = 0;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
  }

  checkCollisions(){
    if (
      player.x < this.x + tileWidth &&
      player.x + tileWidth > this.x &&
      player.y < this.y + tileHeight &&
      tileHeight + player.y > this.y
    ) {
      player.x = startX;
      player.y = startY;
    }
  }

  update(dt) {
    this.x += this.speed * dt;
    if (this.x > fieldWidth) {
      this.x = 0;
    } else {
      this.checkCollisions();
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
    this.sprite = 'images/char-boy.png';
  }

  update(dt) {
    if (this.y < 0) {
      this.resetPosition();
    }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(keyPress) {
    if (keyPress == "left" && this.x > 0) {
      this.x -= tileWidth;
    }
    if (keyPress == "right" && this.x < startY) {
      this.x += tileWidth;
    }
    if (keyPress == "up" && this.y > 0) {
      this.y -= tileHeight;
    }
    if (keyPress == "down" && this.y < startY) {
      this.y += tileHeight;
    }
    if (this.y < 0) {
      setTimeout(function () {
        resetPosition();
      }, 600);
    }
  }

  resetPosition() {
    this.x = startX;
    this.y = startY;
  }
}

const player = new Player(startX, startY),
      enemyOne = new Enemy (66, 80),
      enemyTwo = new Enemy (150, 100),
      enemyTree = new Enemy (236, 120),
      allEnemies = [enemyOne, enemyTwo, enemyTree];

document.addEventListener("keyup", function (e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };

  player.handleInput(allowedKeys[e.keyCode]);
});


