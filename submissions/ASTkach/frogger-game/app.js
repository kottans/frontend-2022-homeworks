const canvasWidth = 505;
const canvasHeight = 606;
const cellWidth = 101;
const cellHeight = 83;
const xPlayerPosition = 202;
const yPlayerPosition = 404;
const startEnemySpeed = 100;

let initialScore = 0;

const div = document.createElement("div");
document.body.append(div);
div.innerHTML = `<h1>Score: ${initialScore}</h1>`;
div.style.cssText = `position: relative;
top: 150px;
font-size: 24px;`;

function getCurrentScore() {
    initialScore++;
    div.innerHTML = `<h1>Score: ${initialScore}</h1>`;
}

const Player = function () {
    this.x = xPlayerPosition;
    this.y = yPlayerPosition;
    this.sprite = "images/char-boy.png";
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const player = new Player();

Player.prototype.update = function () {
    if (this.y < 0) {
        this.toTheBeginning();
        getCurrentScore();
    }
};

Player.prototype.handleInput = function (key) {
    if (key == "up") {
        this.y -= cellHeight;
    }
    if (key == "down") {
        if (this.y < canvasHeight - cellHeight * 2.5) {
            this.y += cellHeight;
        }
    }
    if (key == "left") {
        if (this.x > 0) {
            this.x -= cellWidth;
        }
    }
    if (key == "right") {
        if (this.x < canvasWidth - cellWidth) {
            this.x += cellWidth;
        }
    }
};

Player.prototype.toTheBeginning = function () {
    this.x = xPlayerPosition;
    this.y = yPlayerPosition;
};

const Enemy = function (x, y) {
    this.x = x;
    this.y = y;
    this.speed = startEnemySpeed;
    this.sprite = "images/enemy-bug.png";
};

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const enemy = new Enemy();

Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;
    if (this.x > canvasWidth) {
        this.x = -cellWidth;
        this.speed = Math.random() * (500 - startEnemySpeed) + startEnemySpeed;
    }
    this.collision();
};

const allEnemies = [];

Enemy.prototype.position = function () {
    for (let i = 0; i < 3; i++) {
        let y = i * cellHeight + 64;
        let x = i * -cellWidth;
        allEnemies.push(new Enemy(x, y));
    }
};

Enemy.prototype.position();

Enemy.prototype.collision = function () {
    if (!(player.x > this.x + cellWidth || player.x + cellWidth < this.x || player.y > this.y + cellHeight || player.y + cellHeight < this.y)) {
        player.toTheBeginning();
    }
};

document.addEventListener("keyup", function (e) {
    var allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down",
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
