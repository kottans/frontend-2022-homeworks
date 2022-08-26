const FIELD_WIDTH = 505,
    START_X = 202,
    START_Y = 404,
    CELL_WIDTH = 100,
    CELL_HEIGTH = 83,
    ROW_POSITION = [60, 143, 228],
    ENEMY_SPEED = {
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
    if (this.x < FIELD_WIDTH) {
        this.x += this.speed * dt;
    } else {
        this.x -= FIELD_WIDTH;
    }
    if (this.checkCollision(player)) player.resetPosition("fail");
};

Enemy.prototype.checkCollision = function (player) {
    return (
        this.y + CELL_HEIGTH > player.y &&
        player.x < this.x + CELL_WIDTH &&
        player.x > this.x - CELL_WIDTH
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
    if (this.y > START_Y) {
        this.y = START_Y;
    }
    if (this.y < 0) {
        this.resetPosition("win");
    }
    if (this.x > FIELD_WIDTH - CELL_WIDTH) {
        this.x -= FIELD_WIDTH;
    }
    if (this.x < 0) {
        this.x = FIELD_WIDTH - CELL_WIDTH;
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (key) {
    switch (key) {
        case "up":
            this.y -= CELL_HEIGTH;
            break;
        case "down":
            this.y += CELL_HEIGTH;
            break;
        case "left":
            this.x -= CELL_WIDTH;
            break;
        case "right":
            this.x += CELL_WIDTH;
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
    this.x = START_X;
    this.y = START_Y;
};

let player = new Player(START_X, START_Y),
    allEnemies = ROW_POSITION.map((position) => new Enemy(-100, position, ENEMY_SPEED));


document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
