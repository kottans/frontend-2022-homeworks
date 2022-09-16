const
    ENEMY_IMG = 'images/enemy-bug.png',
    PLAYER_IMG = "images/char-boy.png",
    COLUMNS = 5,
    ROWS = 5,
    ROW_CENTER = 20,
    COLUMN_CENTER = 35,
    CELL_WIDTH = 101,
    CELL_HEIGTH = 83,
    ENEMIES_ROWS = [1, 2, 3],
    FIELD_WIDTH = CELL_WIDTH * COLUMNS,
    START_Y = ROWS * CELL_HEIGTH - ROW_CENTER,
    START_X = FIELD_WIDTH / Math.ceil(COLUMNS / 2) + COLUMN_CENTER,
    ENEMY_SPEED = {
        min: 60,
        max: 200,
    };

const Person = function (sprite, x, y) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
};

Person.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Enemy = function (sprite, x, y, speed, player) {
    Person.call(this, sprite, x, y);
    this.speed = this.getRandomSpeed(speed);
    this.player = player
};

Enemy.prototype = Object.create(Person.prototype);


Enemy.prototype.update = function (dt) {
    if (this.x < FIELD_WIDTH) {
        this.x += this.speed * dt;
    } else {
        this.x -= FIELD_WIDTH;
    }
    if (this.checkCollision(this.player)) this.player.resetPosition("fail");
};

Enemy.prototype.checkCollision = function (player) {
    console.log
    return (
        this.y + ROW_CENTER > player.y &&
        this.y - ROW_CENTER < player.y &&
        player.x < this.x + COLUMN_CENTER &&
        player.x > this.x - COLUMN_CENTER
    );
};

Enemy.prototype.getRandomSpeed = function ({ min, max }) {
    let randomSpeed = min + Math.random() * (max + 1 - min);
    return Math.floor(randomSpeed);
};

const Player = function (sprite, x, y) {
    Person.call(this, sprite, x, y);
};

Player.prototype = Object.create(Person.prototype);

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

let player = new Player(PLAYER_IMG, START_X, START_Y),
    allEnemies = ENEMIES_ROWS.map((position) => new Enemy(ENEMY_IMG, -CELL_WIDTH, (position * CELL_HEIGTH - ROW_CENTER), ENEMY_SPEED, player));


document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
