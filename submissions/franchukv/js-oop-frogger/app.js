const CANVAS_HEIGHT = 606;
const CANVAS_WIDTH = 505;
const TILE_HEIGHT = 83;
const TILE_WIDTH = 101;
const ENEMY_SPEED = 80;
const PLAYER_STAT = {
    x: 202,
    y: 380,
    height: 40,
    width: 40,
};

const Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = PLAYER_STAT.x;
    this.y = PLAYER_STAT.y;
    this.height = PLAYER_STAT.height;
    this.width = PLAYER_STAT.width;
};

Player.prototype.update = function () {
    if (this.y < 0) {
        this.resetPlayerPosition();
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.resetPlayerPosition = function () {
    this.x = PLAYER_STAT.x;
    this.y = PLAYER_STAT.y;
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

const Enemy = function (x, y, player) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 40;
    this.speed = ENEMY_SPEED;
    this.player = player;
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

Enemy.prototype.setStartEnemiesPosition = function () {
    for (let i = 0; i < 3; i++) {
        let y = i * TILE_HEIGHT + 50;
        let x = i * -TILE_WIDTH;
        allEnemies.push(new Enemy(x, y, player));
    }
};

Enemy.prototype.checkCollision = function () {
    if (
        (
            this.player.y > this.y - this.height &&
            this.x + this.width > this.player.x &&
            this.player.x + this.player.width > this.x &&
            this.player.y - this.player.height < this.y
        )
    ) {

        player.resetPlayerPosition();
    }
};

const allEnemies = [];
const enemy = new Enemy();
const player = new Player();

Enemy.prototype.setStartEnemiesPosition();

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
