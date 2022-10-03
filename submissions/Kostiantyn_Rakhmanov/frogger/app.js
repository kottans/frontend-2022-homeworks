// Enemies our player must avoid
const CANVAS = {
    start: 0,
    rows: 5,
    columns: 4,
    section: {
        width: 100,
        height: 80,
    },
};

const CANVAS_WIDTH = CANVAS.section.width * CANVAS.columns;
const CANVAS_HEIGHT = CANVAS.section.height * CANVAS.rows;

const PLAYER = {
    startCoordX: 200,
    startCoordY: 375,
    startLocationShift: 60,
    startDelay: 777,
}

const ENEMY = {
    coordX: {
        min: -100,
        max: 510,
    },
    speed: {
        min: 50,
        max: 100,
    },
    locationsY: [
        60,
        145,
        225,
    ],
};

let Enemy = function (x, y, speed, player) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.player = player;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if (this.x > ENEMY.coordX.max) {
        this.x = ENEMY.coordX.min;
        this.speed = ENEMY.speed.min + Math.floor(Math.random() * ENEMY.speed.max);
    }
    if (player.x < this.x + CANVAS.section.height &&
        player.x + CANVAS.section.height > this.x &&
        player.y < this.y + PLAYER.startLocationShift &&
        PLAYER.startLocationShift + player.y > this.y) {
        player.x = PLAYER.startCoordX.x;
        player.y = PLAYER.startCoordY.y;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function (x, y) {
    this.sprite = 'images/char-cat-girl.png';
    this.x = x;
    this.y = y;
};

Player.prototype.update = function () {

};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (keyPress) {
    if (keyPress == 'left' && this.x > CANVAS.columns) {
        this.x -= CANVAS.section.width;
    };
    if (keyPress == 'right' && this.x < CANVAS_WIDTH) {
        this.x += CANVAS.section.width;
    };
    if (keyPress == 'up' && this.y > CANVAS.start) {
        this.y -= CANVAS.section.height;
    };
    if (keyPress == 'down' && this.y < CANVAS_WIDTH - PLAYER.startLocationShift) {
        this.y += CANVAS.section.height;
    };
    if (this.y < CANVAS.start) {
        setTimeout(() => {
            player.x = PLAYER.startCoordX;
            player.y = PLAYER.startCoordY;
        }, PLAYER.startDelay);
    };
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];

ENEMY.locationsY.forEach(function (locationY) {
    let enemy = new Enemy(CANVAS.start, locationY, ENEMY.speed.max);
    allEnemies.push(enemy);
});

// Place the player object in a variable called player

let player = new Player(PLAYER.startCoordX, PLAYER.startCoordY);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
