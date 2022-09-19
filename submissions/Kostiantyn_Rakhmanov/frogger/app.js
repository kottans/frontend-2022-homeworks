 let Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;

    if (this.x > 510) {
        this.x = -100;
        this.speed = 111 + Math.floor(Math.random() * 111);
    }

    if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y) {
            player.x = 205;
            player.y = 405;
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
    if (keyPress == 'left' && this.x > 0) {
        this.x -= 105;
    };
    if (keyPress == 'right' && this.x < 400) {
        this.x += 105;
    };
    if (keyPress == 'up' && this.y > 0) {
        this.y -= 85;
    };
    if (keyPress == 'down' && this.y < 350) {
        this.y += 85;
    };
    if (this.y < 0) {
        setTimeout(function() {
            player.x = 200;
            player.y = 375;
        }, 777);
    };
};

let allEnemies = [];

const ENEMY_LOCATIONS_Y = [60, 145, 225];

ENEMY_LOCATIONS_Y.forEach(function (locationY) {
    let enemy = new Enemy(0, locationY, 200);
    allEnemies.push(enemy);
});

const PLAYER_X = 200;
const PLAYER_Y = 375;
let player = new Player(PLAYER_X, PLAYER_Y);

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
