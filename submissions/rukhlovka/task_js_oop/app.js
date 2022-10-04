const Enemy = function (y) {
    this.sprite = 'images/enemy-bug.png';
    this.height = 75;
    this.width = 100;
    this.x = 0 - this.width;
    this.y = y;
    this.speed = Math.random() * 500 + 100;
};
let score = 0;
const row = 85;
const col = 101;
const playground = {
    height: row * 5,
    width: col * 6
};

Enemy.prototype.update = function (dt) {
    this.x += dt * this.speed;
    if (this.x > playground.width) {
        this.x = 0 - this.width;
    }
    this.checkCollisions();
};

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const start = {
    x: 200,
    y: 400
};

const Player = function (start) {
    this.sprite = 'images/char-boy.png';
    this.height = 75;
    this.width = 75;
    this.x = start.x;
    this.y = start.y;
    this.moving = false;
};

Player.prototype.update = function (dt) {
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    scoreBoard();
};

Player.prototype.handleInput = function (key) {
    switch (key) {
        case "left":
            if (this.x > 0) {
                this.x -= col;
            }
            break;
        case "right":
            if (this.x < playground.width / 2) {
                this.x += col;
            }
            break;
        case "up":
            if (this.y < row) {
                finish();
            };
            if (this.y > 0) {
                this.y -= row;
            }
            break;
        case "down":
            if (this.y + row < playground.height) {
                this.y += row;
            }
            break;
    }
};

function scoreBoard() {
    ctx.fillStyle = 'blue';
    ctx.strokeStyle = 'blue';
    ctx.font = '25px Helvetica';
    ctx.strokeText('Score:', 175, 30);
    ctx.font = '30px Helvetica';
    ctx.fillText(score, 260, 33);
}

const player = new Player(start);

const allEnemies = [
    new Enemy(60),
    new Enemy(145),
    new Enemy(220),
];

function finish() {
    score++;
    player.x = start.x;
    player.y = start.y;

};
function lost() {
    if (score !== 0) {
        score--;
    }
    player.x = start.x;
    player.y = start.y;

};

Enemy.prototype.checkCollisions = function () {
    for (let i = 0; i < allEnemies.length; i++) {
        if (collision(player, allEnemies[i])) {
            lost();
        }
    }
};

function collision(first, second) {
    return !(first.x > second.x + second.width ||
        first.x + first.width < second.x ||
        first.y > second.y + second.height ||
        first.y + first.height < second.y);
}

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

