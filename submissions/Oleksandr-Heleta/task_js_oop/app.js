const fieldWidth = 505,
    startX = 202,
    startY = 404;
cellWidth = 100;
cellHeigth = 83;
enemySpeed = {
    min: 60,
    max: 200,
};


const counter = document.createElement("div");
let count = 0;
counter.innerHTML = `Counter: ${count}`;
document.body.append(counter);


var Enemy = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = this.randomSpeed(speed);
    this.sprite = 'images/enemy-bug.png';
};

const Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = "images/char-boy.png";
};

Enemy.prototype.update = function (dt) {
    if (this.x < fieldWidth) {
        this.x += this.speed * dt;
    } else {
        this.x -= fieldWidth;
    }
    if (this.checkCollision(player)) player.resetPosition("fail");
};

Enemy.prototype.checkCollision = function (player) {
    return (
        this.y + cellHeigth > player.y &&
        player.x < this.x + cellWidth &&
        player.x > this.x - cellWidth
    );
};

Enemy.prototype.randomSpeed = function ({ min, max }) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
};

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.update = function () {
    if (this.y > startY) {
        this.y = startY;
    }
    if (this.y < 0) {
        this.resetPosition("win");
    }
    if (this.x > fieldWidth - cellWidth) {
        this.x -= fieldWidth;
    }
    if (this.x < 0) {
        this.x = fieldWidth - cellWidth;
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (key) {
    switch (key) {
        case "up":
            this.y -= cellHeigth;
            break;
        case "down":
            this.y += cellHeigth;
            break;
        case "left":
            this.x -= cellWidth;
            break;
        case "right":
            this.x += cellWidth;
            break;

        default:
            break;
    }
};

Player.prototype.resetPosition = function (status) {
    switch (status) {
        case "win":
            alert("You win!!!");
            count += 1;
            counter.innerHTML = `Counter: ${count}`;
            break;
        case "fail":
            alert("You fail!!!");;
            break;
        default:
            break;
    }
    this.x = startX;
    this.y = startY;
};

let player = new Player(startX, startY),
    enemy1 = new Enemy(-100, 60, enemySpeed),
    enemy2 = new Enemy(-100, 143, enemySpeed),
    enemy3 = new Enemy(-100, 228, enemySpeed),
    allEnemies = [enemy1, enemy2, enemy3];


document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

