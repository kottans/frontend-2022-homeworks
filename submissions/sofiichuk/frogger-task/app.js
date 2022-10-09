const cell = {
    width: 101,
    height: 83
};

const numberOfRows = 6;
const numberOfColumns = 5;

const playingField = {
    width: cell.width * numberOfColumns, // 505
    height: cell.height * numberOfRows // 498
};

const character = {
    width: 60,
    height: 60
};

const offsetToTheCenter = 23;

const initialPlayerPosition = {
    x: 2 * cell.width, // 202
    y: 5 * cell.height - offsetToTheCenter // 392
};

const initialEnemyPosition = {
    x: -2 * cell.width, // -202
    y: [1, 2, 3].map(rowNumber => rowNumber * cell.height - offsetToTheCenter) // 60, 143, 226
};

const minSpeed = 100;
const maxSpeed = 500;
const enemySpeed = Math.floor(Math.random() * (maxSpeed - minSpeed)) + minSpeed;
const desynchronizedSpeed = [0, 100, 50].map(speedDelta => enemySpeed + speedDelta);

let count = 0;

// ===========================================================

const score = document.createElement('h3');
const speed = document.createElement('h4');
const resetButton = document.createElement('button');
score.textContent = 'your score is: 0';
speed.textContent = `game speed is: ${enemySpeed}`;
resetButton.textContent = 'reset speed';
resetButton.addEventListener('click', location.reload.bind(location))
document.body.append(score, resetButton, speed);

// ===========================================================

const Enemy = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.width = character.width;
    this.height = character.height;
    this.speed = speed;
    this.rival = player;
    this.sprite = 'images/enemy-bug.png'
};

Enemy.prototype.update = function (dt) {
    if (this.x <= playingField.width) {
        this.x = this.speed * dt + this.x;
    } else {
        this.x = -2 * cell.width;
    }
    this.detectCollision();
};

Enemy.prototype.detectCollision = function () {
    if (this.rival.x <= this.x + this.width &&
        this.rival.x + this.width >= this.x &&
        this.rival.y <= this.y + this.height &&
        this.rival.y + this.height >= this.y) {
        this.rival.reset()
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
    if (this.y < cell.height / 2) {
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

const allEnemies = new Array(3);
for (let i = 0; i < allEnemies.length; i++) {
    allEnemies[i] = new Enemy(initialEnemyPosition.x, initialEnemyPosition.y[i], desynchronizedSpeed[i]);
}

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
