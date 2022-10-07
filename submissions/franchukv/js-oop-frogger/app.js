window.gameRowsNumber = prompt('How many rows do you want to play?', 6);
window.gameColsNumber = prompt('How many columns do you want to play?', 5);

const TILE_HEIGHT = 83;
const TILE_WIDTH = 101;
const ROWS_NUMBER = window.gameRowsNumber;
const COLS_NUMBER = window.gameColsNumber;
const CANVAS_HEIGHT = TILE_HEIGHT * ROWS_NUMBER;
const CANVAS_WIDTH = TILE_WIDTH * COLS_NUMBER;

const PLAYER_CONF = {
    size: {
        height: 40,
        width: 40,
    },
    position: {
        x: COLS_NUMBER % 2 != 0 ? TILE_WIDTH * Math.floor(COLS_NUMBER / 2) : CANVAS_WIDTH - TILE_WIDTH,
        y: TILE_HEIGHT * (ROWS_NUMBER - 1.5),
    },
};

const ENEMIES_CONF = {
    size: {
        height: 40,
        width: 80,
    },
    enemiesNumber: ROWS_NUMBER - 3,
    firstEnemyPositionY: 55,
    minSpeed: 100,
    maxSpeed: 300,
    enemies: [],
};

const Player = function ({ position, size }) {
    this.sprite = "images/char-boy.png";
    this.x = position.x;
    this.y = position.y;
    this.height = size.height;
    this.width = size.width;
};

Player.prototype.resetPlayerPosition = function ({ position }) {
    this.x = position.x;
    this.y = position.y;
};

Player.prototype.handleInput = function (key) {
    switch (key) {
        case "up":
            if (this.y > 0) this.y -= TILE_HEIGHT;
            break;
        case "down":
            if (this.y <= CANVAS_HEIGHT - TILE_HEIGHT * 2) this.y += TILE_HEIGHT;
            break;
        case "left":
            if (this.x > 0) this.x -= TILE_WIDTH;
            break;
        case "right":
            if (this.x < CANVAS_WIDTH - TILE_WIDTH) this.x += TILE_WIDTH;
            break;
        default:
            break;
    }
};

Player.prototype.update = function () {
    if (this.y < 0) {
        setTimeout(() => {
            this.resetPlayerPosition(PLAYER_CONF);
        }, 200);
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const Enemy = function (size, enemyStartPositionX, enemyProperty, player) {
    this.sprite = "images/enemy-bug.png";
    this.height = size.height;
    this.width = size.width;
    this.x = enemyStartPositionX;
    this.y = enemyProperty.y;
    this.speed = enemyProperty.speed;
    this.player = player;
};

Enemy.prototype.checkCollision = function () {
    if (
        this.player.y > this.y - this.height &&
        this.player.y - this.player.height < this.y &&
        this.player.x + this.player.width > this.x &&
        this.player.x < this.x + this.width
    ) {
        this.player.resetPlayerPosition(PLAYER_CONF);
    }
};

Enemy.prototype.update = function (dt) {
    this.checkCollision();

    if (this.x >= CANVAS_WIDTH) {
        this.x = -TILE_WIDTH;
    }

    this.x += this.speed * dt;
};

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const createEnemies = (
    { enemiesNumber, firstEnemyPositionY, minSpeed, maxSpeed },
    tileHeight,
    tileWidth
) => {
    for (let i = 0; i < enemiesNumber; i++) {
        ENEMIES_CONF.enemies.push({});
        ENEMIES_CONF.enemies[i].y = firstEnemyPositionY + tileHeight * i;
        ENEMIES_CONF.enemies[i].speed =
            Math.random() * (maxSpeed - minSpeed) + minSpeed;
    }

    ENEMIES_CONF.enemies.forEach((enemyProperty) => {
        allEnemies.push(
            new Enemy(ENEMIES_CONF.size, -tileWidth, enemyProperty, player)
        );
    });
};

const player = new Player(PLAYER_CONF);
const allEnemies = [];
createEnemies(ENEMIES_CONF, TILE_HEIGHT, TILE_WIDTH);

document.addEventListener("keyup", function (e) {
    var allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down",
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
