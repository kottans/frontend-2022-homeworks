const gameLevel = document.createElement('div');
gameLevel.textContent = 'Your level: 0';

document.body.append(gameLevel);

const xStep = 100;
const yStep = 85;

const coordinates = {
  startEnemyXPosition: -90,
  winPosition: -45,
  defaultPlayerXPosition: 200,
  defaultPlayerYPosition: 380,
  maxYDownPosition: 380,
  maxXRightPosition: 400,
  maxXLeftPosition: 0,
  enemyPositionYDiff: 20,
};

class Enemy {
  sprite = 'images/enemy-bug.png';

  constructor({speed, x, y}) {
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  update(dt) {
    this.x += this.speed * dt;
    
    // Cross the boundaries of the board - move to start position (endless movement) 
    if (this.x >= ctx.canvas.width) {
      this.x = coordinates.startEnemyXPosition;
    }
    
    // Check end game; Check loose only for the same Y
    if (player.y === (this.y - coordinates.enemyPositionYDiff)) {
      if (
        player.x < this.x && (this.x - player.x) <= 50 || // Player is behind the bug
        player.x > this.x && (player.x - this.x) <= 50    // Player is in front of the bug
      ) {
        alert('Game over!');
        player.resetGame();
      }
    }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

class Player {
  sprite = 'images/char-boy.png';
  level = 0;
  x = coordinates.defaultPlayerXPosition;
  y = coordinates.defaultPlayerYPosition;

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  resetPosition() {
    this.x = coordinates.defaultPlayerXPosition;
    this.y = coordinates.defaultPlayerYPosition;
  }

  update() {
    if (this.y <= coordinates.winPosition) {
      this.level += 1;
      gameLevel.textContent = `Your level: ${this.level}`;

      this.resetPosition();
    }
  }

  resetGame() {
    this.level = 0;
    gameLevel.textContent = `Your level: ${this.level}`;

    this.resetPosition();
  }

  handleInput(direction) {
    switch (direction) {
      case 'left':
        if (this.x > coordinates.maxXLeftPosition) {
          this.x -= xStep;
        }
        break;
      case 'right':
        if (this.x < coordinates.maxXRightPosition) {
          this.x += xStep;
        }
        break;
      case 'up':
        this.y -= yStep;
        break;
      case 'down':
        if (this.y < coordinates.maxYDownPosition) {
          this.y += yStep;
        }
        break;
    }
  }
}

const allEnemies = [
  new Enemy({speed: 90, y: 230, x: -50}),
  new Enemy({speed: 150, y: 145, x: -20}),
  new Enemy({speed: 100, y: 60, x: -30}),
];


const player = new Player();

document.addEventListener('keyup', (e) => {
  const allowedKeys = {
    ArrowLeft: 'left',
    ArrowUp: 'up',
    ArrowRight: 'right',
    ArrowDown: 'down'
  };

  player.handleInput(allowedKeys[e.code]);
});
