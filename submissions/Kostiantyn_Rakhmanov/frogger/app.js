const X_ENEMY = {
    min: -100,
    max: 510,
};

const ENEMY_SPEED = {
    min: 50,
    max: 100,
};
const ENEMY_LOCATIONS_Y = [60, 145, 225];

const SECTION = {
    width: 100,
    height: 80,
};

const CANVAS = {
    start: 0,
    rows: 5,
    columns: 4,
};

const CANVAS_WIDTH = SECTION.width * CANVAS.columns;
const CANVAS_HEIGHT = SECTION.height * CANVAS.rows;

const PLAYER_COORDS = {
    x: 200,
    y: 375,
};
const PLAYER_SHIFT = 60;
const NEW_PLAYER_DELAY = 777;


let Enemy = function(x, y, speed, player) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.player = player;
};

Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;

    if (this.x > X_ENEMY.max) {
        this.x = X_ENEMY.min;
        this.speed = ENEMY_SPEED.min + Math.floor(Math.random() * ENEMY_SPEED.max);
    }
    if (player.x < this.x + SECTION.height &&
        player.x + SECTION.height > this.x &&
        player.y < this.y + PLAYER_SHIFT &&
        PLAYER_SHIFT + player.y > this.y) {
            player.x = PLAYER_COORDS.x;
            player.y = PLAYER_COORDS.y;
        }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

let Player = function(x, y) {
    this.sprite = 'images/char-cat-girl.png';
    this.x = x;
    this.y = y;
};

Player.prototype.update = function() {
    
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left' && this.x > CANVAS.columns) {
        this.x -= SECTION.width;
    };
    if (keyPress == 'right' && this.x < CANVAS_WIDTH) {
        this.x += SECTION.width;
    };
    if (keyPress == 'up' && this.y > CANVAS.start) {
        this.y -= SECTION.height;
    };
    if (keyPress == 'down' && this.y < CANVAS_WIDTH - PLAYER_SHIFT) {
        this.y += SECTION.height;
    };
    if (this.y < CANVAS.start) {
        setTimeout(() => {
            player.x = PLAYER_COORDS.x;
            player.y = PLAYER_COORDS.y;
        }, NEW_PLAYER_DELAY);
    };
};

let allEnemies = [];

ENEMY_LOCATIONS_Y.forEach(function (locationY) {
    let enemy = new Enemy(CANVAS.start, locationY, ENEMY_SPEED.max);
    allEnemies.push(enemy);
});

let player = new Player(PLAYER_COORDS.x, PLAYER_COORDS.y);

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
