const CANVAS_HEIGHT = 606;
const CANVAS_WIDTH = 505;
const TILE_HEIGHT = 83;
const TILE_WIDTH = 101;

const Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 380;
    this.height = 40;
    this.width = 40;
};

Player.prototype.resetPlayerPosition = function () {
    this.x = 202;
    this.y = 380;
};

Player.prototype.handleInput = function (key) {
    switch (key) {
        case 'up':
            if (this.y > 0) this.y -= TILE_HEIGHT;
            break;
        case 'down':
            if (this.y <= CANVAS_HEIGHT - TILE_HEIGHT * 3) this.y += TILE_HEIGHT;
            break;
        case 'left':
            if (this.x > 0) this.x -= TILE_WIDTH;
            break;
        case 'right':
            if (this.x < CANVAS_WIDTH - TILE_WIDTH) this.x += TILE_WIDTH;
            break;
        default:
            break;
    }
};

Player.prototype.update = function () {
    if (this.y < 0) {
        this.resetPlayerPosition();
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const Enemy = function (x, y, speed, player) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 40;
    this.speed = speed;
    this.player = player;
};

Enemy.prototype.checkCollision = function () {
    if (
        this.player.y > this.y - this.height &&
        this.player.y - this.player.height < this.y &&
        this.player.x + this.player.width > this.x &&
        this.player.x < this.x + this.width
    ) {

        this.player.resetPlayerPosition();
    }
};

Enemy.prototype.update = function (dt) {
    this.checkCollision();

    if (this.x >= CANVAS_WIDTH) {
        this.x = 0;
    }

    this.x += this.speed * dt;
};

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const player = new Player();
const allEnemies = [
    new Enemy(0, 55, 280, player),
    new Enemy(0, 135, 150, player),
    new Enemy(0, 220, 200, player)
];

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
