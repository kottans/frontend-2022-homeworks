const playingField = {
    width: 500,
    height: 600
};

const cell = {
    width: 100,
    height: 85
};

const river = {
    height: 85
};

const character = {
    width: 60,
    height: 60
};

const initialPlayerPosition = {
    x: 200,
    y: 385
};

let count = 0;

// ===========================================================

const score = document.createElement('h3');
score.textContent = 'your score is: 0';
document.body.append(score);

// ===========================================================

const Enemy = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png'
};

Enemy.prototype.update = function (dt) {
    if (this.x <= playingField.width) {
        this.x = this.speed * dt + this.x;
    } else {
        this.x = 0;
    }
    this.detectCollision();
};

Enemy.prototype.detectCollision = function () {
    if (player.x <= this.x + character.width &&
        player.x + character.width >= this.x &&
        player.y <= this.y + character.height &&
        player.y + character.height >= this.y) {
        player.reset()
    }
};

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// ===========================================================

const Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.moveSideways = cell.width;
    this.moveAhead = cell.height;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function () {
    this.scored();
};

Player.prototype.scored = function () {
    if (this.y < river.height) {
        count++;
        score.textContent = `your score is: ${count}`;
        this.x = initialPlayerPosition.x;
        this.y = initialPlayerPosition.y;
    }
};

Player.prototype.reset = function () {
    score.textContent = 'wasted';
    this.x = initialPlayerPosition.x;
    this.y = initialPlayerPosition.y;
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (key) {
    switch (key) {
        case 'up':
            this.y -= this.moveAhead;
            if (this.y < 0) {
                this.y = 0;
            }
            break;
        case 'down':
            this.y += this.moveAhead;
            if (this.y > initialPlayerPosition.y) {
                this.y = initialPlayerPosition.y;
            }
            break;
        case 'left':
            this.x -= this.moveSideways;
            if (this.x < 0) {
                this.x = 0;
            }
            break;
        case 'right':
            this.x += this.moveSideways;
            if (this.x > playingField.width - cell.width) {
                this.x = playingField.width - cell.width;
            }
            break;
    }
};

// ===========================================================

const player = new Player(initialPlayerPosition.x, initialPlayerPosition.y);

// const Enemy = function (x, y, speed)
const enemy1 = new Enemy(0, 225, 100);
const enemy2 = new Enemy(0, 142, 200);
const enemy3 = new Enemy(0, 60, 150);
const allEnemies = [enemy1, enemy2, enemy3];

// ===========================================================

document.addEventListener('keyup', function (e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
