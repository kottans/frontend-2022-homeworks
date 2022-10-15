const enemiesConfig = {
    TOP_POS: 51,
    MIDDLE_POS: 141,
    BOTTOM_POS: 226,
};

const playerConfig = {
    POS_X: 200,
    POS_Y: 400
};

const canvasConfig = {
    CELL_WIDTH: 101,
    CELL_HEIGHT: 83,
    HEIGHT: 600,
    WIDTH: 500
};

const gameConfig = {
    PADDING_TOP: 20,
    PADDING_LEFT: 78,
    MIN_SPEED: 100,
    MAX_SPEED: 300
}

const Enemy = function (x, y, speed, player) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.player = player;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.checkCollision = function () {
    if (this.player) {
        if (this.x + gameConfig.PADDING_LEFT > this.player.x &&
            this.x - gameConfig.PADDING_LEFT < this.player.x &&
            this.y - gameConfig.PADDING_TOP < this.player.y &&
            this.y + gameConfig.PADDING_TOP > this.player.y
        ) {
            alert(`You lose! Score: ${ player.score }`);

            this.resetEnemyPosition();
            this.player.resetPosition();
        }
    }
};

Enemy.prototype.resetEnemyPosition = function () {
    this.x = -canvasConfig.CELL_WIDTH;
};

Enemy.prototype.update = function (dt) {
    if (dt) {
        this.x += dt * this.speed;
    }

    if (this.x >= canvasConfig.WIDTH) {
        this.resetEnemyPosition();
    }

    this.checkCollision();
};

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.score = 0;
    this.sprite = 'images/char-boy.png';
};

Player.prototype = Enemy.prototype;

Player.prototype.handleInput = function (key) {
    switch (key) {
        case 'ArrowUp':
            if (this.y > 0) {
                this.y -= canvasConfig.CELL_HEIGHT;
            }
            if (this.y < 0) {
                this.score++;

                setTimeout(() => {
                    alert(`You win! Score: ${ this.score }`);
                    this.resetPosition();
                }, 100);
            }
            break;
        case 'ArrowDown':
            if (this.y < playerConfig.POS_Y) {
                this.y += canvasConfig.CELL_HEIGHT;
            }
            break;
        case 'ArrowLeft':
            if (this.x > 0) {
                this.x -= canvasConfig.CELL_WIDTH;
            }
            break;
        case 'ArrowRight':
            if (this.x < canvasConfig.WIDTH - canvasConfig.CELL_WIDTH) {
                this.x += canvasConfig.CELL_WIDTH;
            }
            break;
        default:
            break;

    }
};

Player.prototype.resetPosition = function () {
    this.x = playerConfig.POS_X;
    this.y = playerConfig.POS_Y;
}

const player = new Player(playerConfig.POS_X, playerConfig.POS_Y);

const addEnemies = () => Object.values(enemiesConfig).map(pos => {
    const randomSpeed = Math.random() * (gameConfig.MAX_SPEED - gameConfig.MIN_SPEED) + gameConfig.MIN_SPEED;

    return new Enemy(-canvasConfig.CELL_WIDTH, pos, randomSpeed, player);
});

const allEnemies = addEnemies();

document.addEventListener('keyup', function ({ key }) {
    player.handleInput(key);
});
