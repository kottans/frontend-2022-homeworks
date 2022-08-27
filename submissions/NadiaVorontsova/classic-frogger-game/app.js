const startPlayerPositionX = 200,
    startPlayerPositionY = 390,
    cellWidth = 101,
    cellHeight = 83,
    startX = 0,
    startY = 0,
    rightWall = 400,
    bottomWall = 350;

let countScore = 0;
const scopeElement = document.createElement('div');
scopeElement.style.cssText = 'font-size:25px; padding-top:20px; margin-bottom:-20px';
document.body.appendChild(scopeElement);

var Player = function (x, y) {
    this.resetPlayerPosition();
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function () {
    if (this.y < startY) {
        this.resetPlayerPosition();
        countScore++;
        score();
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.resetPlayerPosition = function () {
    this.x = startPlayerPositionX;
    this.y = startPlayerPositionY;
}

Player.prototype.handleInput = function (route) {
    switch (route) {
        case 'left':
            if (this.x > startX)
                this.x -= cellWidth;
            break;
        case 'up':
            this.y -= cellHeight;
            break;
        case 'right':
            if (this.x < rightWall)
                this.x += cellWidth;
            break;
        case 'down':
            if (this.y < bottomWall)
                this.y += cellHeight;
            break;
        default:
            break;
    }
}

let player = new Player();

var Enemy = function (x, y) {
    this.x = x;
    this.y = y;
    this.speed = Math.random() * 200 + 80;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;
    if (this.x > ctx.canvas.width) {
        this.x = startX;
    }
    if (this.checkCollision())
        player.resetPlayerPosition();
};

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollision = function () {
    if (Math.abs(this.x - player.x) < 50 && Math.abs(this.y - player.y) < 50) {
        player.resetPlayerPosition();
        if (countScore > 0) {
            countScore--;
            score();
        }
    }
}

let allEnemies = [];

function createEnemies() {
    const positionY = [60, 140, 220];
    for (let y of positionY) {
        const randomPositionX = Math.random() * (-100) - 100;
        allEnemies.push(new Enemy(randomPositionX, y));
    }
}

function score() {
    scopeElement.innerHTML = `Scope: ${countScore} / 5`;
    if (countScore == 5) {
        showWinMessage();
    }
}

const message = document.createElement('div');

function showWinMessage() {

    message.style.cssText = 'position:absolute; font-size:50px; top:45%; left:5%; width:90%; padding-top:10px; padding-bottom:10px; background-color:rgba(176, 235, 182, 0.8);';
    document.body.appendChild(message);
    message.textContent = 'You win';
    window.setTimeout(resetGame, 2000);
}

function resetGame() {
    countScore = 0;
    score(countScore);
    document.body.removeChild(message);
}

createEnemies();
score();

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
