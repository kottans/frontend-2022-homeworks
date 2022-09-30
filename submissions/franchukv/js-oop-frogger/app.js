const CANVAS_HEIGHT = 606;
const CANVAS_WIDTH = 505;
const TILE_HEIGHT = 83;
const TILE_WIDTH = 101;

const PLAYER_CONF = {
    size: {
        height: 40,
        width: 40
    },
    position: {
        x: 202,
        y: 380
    }
}

const EMENIES_CONF = {
    size: {
        height: 40,
        width: 80
    },
    enemy: [{
        x: 0,
        y: 55,
        speed: 280
    },
    {
        x: 0,
        y: 135,
        speed: 150
    },
    {
        x: 0,
        y: 220,
        speed: 200
    }]
}

const Player = function ({ position, size }) {
    this.sprite = 'images/char-boy.png';
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
        this.resetPlayerPosition(PLAYER_CONF);
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const Enemy = function ({ size }, enemy, player) {
    this.sprite = 'images/enemy-bug.png';
    this.height = size.height;
    this.width = size.width;
    this.x = enemy.x;
    this.y = enemy.y;
    this.speed = enemy.speed;
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
        this.x = 0;
    }

    this.x += this.speed * dt;
};

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const player = new Player(PLAYER_CONF);
const allEnemies = [
    new Enemy(EMENIES_CONF, EMENIES_CONF.enemy[0], player),
    new Enemy(EMENIES_CONF, EMENIES_CONF.enemy[1], player),
    new Enemy(EMENIES_CONF, EMENIES_CONF.enemy[2], player),
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
