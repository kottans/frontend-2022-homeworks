const CANVAS = {
    start: 0,
    rows: 6,
    columns: 5,
    section: {
        width: 100,
        height: 80,
    },
};

const CANVAS_WIDTH = CANVAS.section.width * CANVAS.columns;
const CANVAS_HEIGHT = CANVAS.section.height * CANVAS.rows;

const PLAYER = {
    startCoordX: 200,
    startCoordY: 400,
    startLocationShift: 60,
    startDelay: 777,
};

const ENEMY = {
    coordX: {
        min: -100,
        max: 510,
    },
    speed: {
        min: 50,
        max: 100,
    },
    collision: {
        x: 70,
        y: 60,
    },
    locationsY: [
        60,
        145,
        225,
    ],
};

var Enemy = function (x, y, speed, player) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
    this.player = player;
};

Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;
    if (this.x > ENEMY.coordX.max) {
        this.x = ENEMY.coordX.min;
        this.speed = ENEMY.speed.min + Math.floor(Math.random() * ENEMY.speed.max);
    }
    this.checkCollision();
};

Enemy.prototype.checkCollision = function () {
    if (this.player.x < this.x + ENEMY.collision.x &&
        this.player.x + ENEMY.collision.x > this.x &&
        player.y < this.y + ENEMY.collision.y &&
        ENEMY.collision.y + player.y > this.y) {
        this.player.toStart();
    }
};

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

let Player = function (x, y, enemies) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
    this.enemies = enemies;
    this.startX = 200;
    this.startY = 400;
};

Player.prototype.update = function () {
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.toStart = function () {
    this.x = this.startX;
    this.y = this.startY;
};

Player.prototype.handleInput = function (key) {
    switch (key) {
        case 'up':
            this.y -= CANVAS.section.height;
            if (this.y < CANVAS.start) {
                this.y = PLAYER.startCoordY;
            }
            break;
        case 'down':
            this.y += CANVAS.section.height;
            if (this.y >= CANVAS_HEIGHT) {
                this.y = CANVAS_HEIGHT - CANVAS.section.height;
            }
            break;
        case 'left':
            this.x -= CANVAS.section.width;
            if (this.x < CANVAS.section.width) {
                this.x = CANVAS.start;
            }
            break;
        case 'right':
            this.x += CANVAS.section.width;
            if (this.x >= CANVAS_WIDTH) {
                this.x = CANVAS_WIDTH - CANVAS.section.width;
            }
            break;
    };
};

let player = new Player(PLAYER.startCoordX, PLAYER.startCoordY);

const allEnemies = [];
ENEMY.locationsY.forEach(function (locationY) {
    let enemy = new Enemy(CANVAS.start, locationY, ENEMY.speed.min, player);
    allEnemies.push(enemy);
});

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
