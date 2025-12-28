const fieldX = 505;
const playerX = 205;
const playerY = 405;
const playerHight = 60;
const playerWidth = 80;
const playerMoveX  = 102;
const playerMoveY  = 83;
const enemyRestartX = -50;
const enemyY = 60;
const enemyMinSpeed = 50;
const enemyMaxSpeed = 250;

const Enemy = function (x, y, speed, player) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.player = player;
};

Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;

    if (this.x > fieldX) {
        this.x = enemyRestartX;
        this.speed = enemyMinSpeed + Math.floor(Math.random() * (enemyMaxSpeed - enemyMinSpeed));
    }
    this.colision()
};

Enemy.prototype.colision = function () {
    if (this.player.x < this.x + playerWidth &&
        this.player.x + playerWidth > this.x &&
        this.player.y < this.y + playerHight &&
        playerHight + this.player.y > this.y) {
        this.player.x = playerX;
        this.player.y = playerY;
    }
};

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const avatarPlayer = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png',
];

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-boy.png';
    }
    getAvatar() {
        return avatarPlayer[Math.floor(Math.random()*avatarPlayer.length)]
    }
}

Player.prototype.update = function () {
    if (this.y < 0) {
        setTimeout(() => {
            this.x = playerX;
            this.y = playerY;
            this.sprite = player.getAvatar();
        }, 50);
    }
};

Player.prototype.render = function () {
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

const player = new Player(playerX, playerY);

const allEnemies = [];
const enemyLocation = [];
const enemyAmount = 3;
const arrEnemy = [];

for (let i = 0; i < enemyAmount; i++){
    arrEnemy.push(i)
}

const getEnemyLocation = (arr) => {
    arr.reduce((acc) => {
        enemyLocation.push(acc);
        return acc + playerMoveY;
    }, enemyY);
};
getEnemyLocation(arrEnemy);

enemyLocation.map( locationY => {
    const enemy = new Enemy(0, locationY, enemyMinSpeed + Math.floor(Math.random() * (enemyMaxSpeed - enemyMinSpeed)), player);
    allEnemies.push(enemy);
});

document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

