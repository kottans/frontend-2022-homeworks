class Enemy {
  constructor({x, y, speed}) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
  }
  update(dt) {
    this.x += this.speed * dt;

    if (this.x > 510) {
      this.x = -50;
      this.speed = 100 + Math.floor(Math.random() * 222);
    }

    if (
      player.x < this.x + 80 &&
      player.x + 80 > this.x &&
      player.y < this.y + 60 &&
      60 + player.y > this.y
    ) {
      player.x = 202;
      player.y = 405;
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
      this.x -= 102;
    }
    if (keyPress == "right" && this.x < 405) {
      this.x += 102;
    }
    if (keyPress == "up" && this.y > 0) {
      this.y -= 83;
    }
    if (keyPress == "down" && this.y < 405) {
      this.y += 83;
    }
    if (this.y < 0) {
      setTimeout(function () {
        player.x = 202;
        player.y = 405;
      }, 600);
    }
  }

  resetPosition() {
    this.x = this.fieldWidth / 2;
    this.y = this.fieldHeight;
  }
}

const enemySetting1 = {
    x : 0,
    y : 63,
    speed: 800, 
}
const enemySetting2 = {
    x : 0,
    y : 147,
    speed: 1000,
}
const enemySetting3 = {
    x : 0,
    y : 230,
    speed: 1200, 
}

const allEnemies = [
    new Enemy(enemySetting1),
    new Enemy(enemySetting2),
    new Enemy(enemySetting3)
];


const player = new Player(202, 405);

document.addEventListener("keyup", function (e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };

  player.handleInput(allowedKeys[e.keyCode]);
});


