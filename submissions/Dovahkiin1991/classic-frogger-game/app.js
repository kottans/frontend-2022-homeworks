//const
const CELL_WIDTH = 101,
    CELL_HEIGHT = 83,
    PLAYER_SPRITE_EMPTY_SPACE = 19,
    PLAYER_Y_CENTER_SHIFT = 32,
    ENEMY_Y_CENTER_SHIFT = 23,
    ENEMIES_COUNT = 3,
    allEnemies = [];

const Enemy = function(enemyRowPosition, player) {
    this.sprite = 'images/enemy-bug.png';
    this.x = -CELL_WIDTH;
    this.y = CELL_HEIGHT - ENEMY_Y_CENTER_SHIFT + enemyRowPosition * CELL_HEIGHT;
    this.speed = speedGenerator();
    this.player = player;
};

Enemy.prototype.update = function(dt) {
    this.x += dt * this.speed;

    if (this.x > CELL_WIDTH * 5) {
        this.x = -CELL_WIDTH;
        this.speed = speedGenerator();
    }

    this.collisionsCheck(this.player);
};

Enemy.prototype.collisionsCheck = function(player) {
    //check if enemy hit
    if (this.x + CELL_WIDTH >= player.x + PLAYER_SPRITE_EMPTY_SPACE
        && this.x < player.x + CELL_WIDTH - PLAYER_SPRITE_EMPTY_SPACE
        && this.y + ENEMY_Y_CENTER_SHIFT === player.y + PLAYER_Y_CENTER_SHIFT) {

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
    if(this.y > CELL_HEIGHT * 5 - PLAYER_Y_CENTER_SHIFT) {
        this.y = CELL_HEIGHT * 5 - PLAYER_Y_CENTER_SHIFT;
    }

    if(this.y < 0) {
        this.winCount++;
        this.reset();
    }

    if (this.x < 0) {
        this.x = 0;
    }

    if (this.x >= CELL_WIDTH * 4) {
        this.x = CELL_WIDTH * 4;
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

// Place the player object in a variable called player
const player = new Player(CELL_WIDTH * 2 , CELL_HEIGHT * 6);

//generate enemies
for (let i = 0; i < ENEMIES_COUNT; i++ ) {
    allEnemies.push(new Enemy(i, player));
}

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
