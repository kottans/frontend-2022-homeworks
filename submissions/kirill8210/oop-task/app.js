const fieldX = 505;
const playerX = 205;
const playerY = 405;
const playerHight = 60;
const playerWidth = 80;
const playerMoveX  = 102;
const playerMoveY  = 83;

const Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;

    if (this.x > fieldX) {
        this.x = -50;
        this.speed = 50 + Math.floor(Math.random() * 200);
    }

    if (player.x < this.x + playerWidth &&
        player.x + playerWidth > this.x &&
        player.y < this.y + playerHight &&
        playerHight + player.y > this.y) {
        player.x = playerX;
        player.y = playerY;
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const avatarPlayer = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png',
];

const avatar = function () {
    return avatarPlayer[Math.floor(Math.random()*avatarPlayer.length)]
};

const Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(){
    if (this.y < 0) {
        setTimeout(() => {
            this.x = playerX;
            this.y = playerY;
            this.sprite = avatar();
        }, 50);
    }
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (allowKeys) {
    if (allowKeys === 'left' && this.x > playerMoveX) {
        this.x -= playerMoveX;
    }
    if (allowKeys === 'right' && this.x < fieldX - playerMoveX) {
        this.x += playerMoveX;
    }
    if (allowKeys === 'up' && this.y > 0) {
        this.y -= playerMoveY;
    }
    if (allowKeys === 'down' && this.y < playerY) {
        this.y += playerMoveY;
    }
};

const allEnemies = [];

const enemyLocation = [63, 147, 230];

enemyLocation.forEach(function (locationY) {
    const enemy = new Enemy(0, locationY, 50 + Math.floor(Math.random() * 200));
    allEnemies.push(enemy);
});

const player = new Player(playerX, playerY);

document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

