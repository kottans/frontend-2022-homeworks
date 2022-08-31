// Enemies our player must avoid
class Enemy {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = "images/enemy-bug.png";
  }
  update(dt) {
    this.checkCollisions();

    this.x += dt * this.speed;
    if (this.x > 505) {
      this.x = -100;
      this.speed = 150 + Math.floor(Math.random() * 600);
    }
  }

  checkCollisions() {
    if (
      player.x + 50 > this.x &&
      player.x < this.x + 1 &&
      player.y + 50 > this.y &&
      player.y < this.y + 50
    ) {
      player.x = 202;
      player.y = 405;
    }
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

let win = 0;
const winScore = () => {
  if (win == 0) {
    ++win;
    return;
  }
  alert(`Your score! 🏆 Win: ${win++}`);
};

class Player {
  constructor(x, y, sprite) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
  }
  update() {
    if (this.x > 404) {
      this.x = 404;
    }
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.y < 20) {
      winScore();
      this.y = 380;
    }
    if (this.y > 400) {
      this.y = 380;
    }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(click) {
    switch (click) {
      case "up":
        this.y -= 81;
        break;
      case "down":
        this.y += 81;
        break;
      case "left":
        this.x -= 101;
        break;
      case "right":
        this.x += 101;
        break;
    }
  }
}

allEnemies = [50, 130, 220].map(
  (position) => (position = new Enemy(position, position, 1000))
);

let player = new Player(202, 0, "images/char-boy.png");

document.addEventListener("keyup", function (e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };
  player.handleInput(allowedKeys[e.keyCode]);
});
