const water_edge = 52;
// Enemies our player must avoid
class Enemy {
  constructor({ x, y, speedX, initialWidth, player }) {
    this.initialWidth = initialWidth + 100;
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.height = 40;
    this.width = 101;
    this.player = player;
    this.sprite = "images/enemy-bug.png";
  }

  checkCollision() {
    if (
      this.x + this.width > this.player.x &&
      this.player.x + this.player.width > this.x &&
      this.player.y > this.y - this.height &&
      this.player.y - this.player.height < this.y
    ) {
      this.player.lose();
    }
  }

  update(dt) {
    this.checkCollision();
    if (this.x >= this.initialWidth) {
      this.x = -101;
    }
    this.x += dt * this.speedX;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor({ initialWidth, initialHeight, speedX, speedY }) {
    this.initialWidth = initialWidth;
    this.initialHeight = initialHeight;
    this.x = this.initialWidth / 2;
    this.y = this.initialHeight;
    this.height = 30;
    this.width = 30;
    this.speedX = speedX;
    this.speedY = speedY;
    this.sprite = "images/char-boy.png";
  }

  update() {
    if (this.y < 0) {
      this.resetPosition();
    }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(keyCode) {
    if (this.y >= 0 && keyCode === "up") {
      this.y -= this.speedY;
    }
    if (this.y < this.initialHeight && keyCode === "down") {
      this.y += this.speedY;
    }
    if (this.x > 0 && keyCode === "left") {
      this.x -= this.speedX;
    }
    if (this.x < this.initialWidth && keyCode === "right") {
      this.x += this.speedX;
    }
    if (this.y < water_edge) {
      this.wins();
    }
  }

  resetPosition() {
    this.x = this.initialWidth / 2;
    this.y = this.initialHeight;
  }

  lose() {
    this.resetPosition();
    alert("Game over. Try again!");
  }

  wins() {
    setTimeout(() => {
      this.resetPosition();
    }, 100);
    alert("You win!!! Congratulation");
  }
}

const playerConfiguration = {
  initialWidth: 400,
  initialHeight: 375,
  speedY: 80,
  speedX: 100,
};

const player = new Player(playerConfiguration);

const enemyFirstConfiguration = {
  x: 100,
  y: 60,
  speedX: 200,
  initialWidth: 400,
  player,
};

const enemySecondConfiguration = {
  x: 100,
  y: 145,
  speedX: 180,
  initialWidth: 400,
  player,
};

const enemyThirdConfiguration = {
  x: 100,
  y: 230,
  speedX: 150,
  initialWidth: 400,
  player,
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [
  new Enemy(enemyFirstConfiguration),
  new Enemy(enemySecondConfiguration),
  new Enemy(enemyThirdConfiguration),
];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
function handleClick(e) {
  const allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };

  player.handleInput(allowedKeys[e.keyCode]);
}

document.addEventListener("keyup", handleClick);
