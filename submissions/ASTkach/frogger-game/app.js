const CANVAS_WIDTH = 505;
const CANVAS_HEIGHT = 606;
const CELL_WIDTH = 101;
const CELL_HEIGHT = 83;
const X_PLAYER_POSITION = 202;
const Y_PLAYER_POSITION = 404;
const START_ENEMY_SPEED = 100;

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
    this.x = X_PLAYER_POSITION;
    this.y = Y_PLAYER_POSITION;
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
        this.y -= CELL_HEIGHT;
    }
    if (key == "down") {
        if (this.y < CANVAS_HEIGHT - CELL_HEIGHT * 2.5) {
            this.y += CELL_HEIGHT;
        }
    }
    if (key == "left") {
        if (this.x > 0) {
            this.x -= CELL_WIDTH;
        }
    }
    if (key == "right") {
        if (this.x < CANVAS_WIDTH - CELL_WIDTH) {
            this.x += CELL_WIDTH;
        }
    }
};

Player.prototype.toTheBeginning = function () {
    this.x = X_PLAYER_POSITION;
    this.y = Y_PLAYER_POSITION;
};

const Enemy = function (x, y) {
    this.x = x;
    this.y = y;
    this.speed = START_ENEMY_SPEED;
    this.sprite = "images/enemy-bug.png";
};

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const enemy = new Enemy();

Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;
    if (this.x > CANVAS_WIDTH) {
        this.x = -CELL_WIDTH;
        this.speed = Math.random() * (500 - START_ENEMY_SPEED) + START_ENEMY_SPEED;
    }
    this.collision();
};

const allEnemies = [];

Enemy.prototype.position = function () {
    for (let i = 0; i < 3; i++) {
        let y = i * CELL_HEIGHT + 64;
        let x = i * -CELL_WIDTH;
        allEnemies.push(new Enemy(x, y));
    }
};

Enemy.prototype.position();

Enemy.prototype.collision = function () {
    if (
        !(
            player.x > this.x + CELL_WIDTH - 10 ||
            player.x + CELL_WIDTH - 10 < this.x ||
            player.y > this.y + CELL_HEIGHT - 10 ||
            player.y + CELL_HEIGHT - 10 < this.y
        )
    ) {
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
