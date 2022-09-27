//const
const CELL_WIDTH = 101,
    CELL_HEIGHT = 83,
    ALL_ENEMIES = [50, 60, 30];
const Enemy = function(y, index, player) {
    this.sprite = 'images/enemy-bug.png';
    this.x = -CELL_WIDTH;
    this.y = CELL_HEIGHT - 23 + index * CELL_HEIGHT;
    this.speed = speedGenerator();
    this.player = player;
};

Enemy.prototype.update = function(dt) {
    this.x += dt * this.speed;

    if (this.x > 505) {
        this.x = -CELL_WIDTH;
        this.speed = speedGenerator();
    }

    this.collisionsCheck();
};

Enemy.prototype.collisionsCheck = function() {
    //check if enemy hit
    if (this.x + CELL_WIDTH - 20 >= player.x 
        && this.x < player.x + CELL_WIDTH - 20
        && this.y === player.y + 9) {
            if (player.winCount > 0) {
                player.winCount--;
            }
            player.reset();
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.winCount = 0;
};

Player.prototype.update = function() {
    if(this.y > 383) {
        this.y = 383;
    }

    if(this.y < 0) {
        player.winCount++;
        player.reset();
    }

    if (this.x < 0) {
        this.x = 0;
    }

    if (this.x > 402) {
        this.x = 402;
    }
};

Player.prototype.reset = function() {
    this.x = CELL_WIDTH * 2;
    this.y = CELL_HEIGHT * 6;
    const score = document.querySelector('.score strong');
    score.innerHTML = this.winCount;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(allowedKey) {
    switch (allowedKey) {
        case 'down':
            this.y += CELL_HEIGHT;
            break;
        case 'up':
            this.y -= CELL_HEIGHT;
            break;
        case 'left':
            this.x -= CELL_WIDTH;
            break;
        case 'right':
            this.x += CELL_WIDTH;
            break;
        default:
    }
};

const speedGenerator = () => {
    return Math.floor(Math.random() * 150 + 100)
}

const allEnemies = ALL_ENEMIES.map(
    (posY, index) => (posY = new Enemy(posY, index, Player))
);
// Place the player object in a variable called player
const player = new Player(CELL_WIDTH * 2 , CELL_HEIGHT * 6);

document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

document.addEventListener('DOMContentLoaded', function(){
    const canvas = document.querySelector('canvas').parentNode;
    const div = document.createElement('div');

    div.className = 'score';
    div.innerHTML = `User Score: <strong>0</strong>`;
    canvas.append(div);
});