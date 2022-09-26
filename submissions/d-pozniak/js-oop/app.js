const X_STEP = 101,
    Y_STEP = 83,
    Y_SHIFT = 20,
    LAST_COLMN = 5,
    LAST_ROW = 5,
    FIELD_WIDTH = LAST_COLMN * X_STEP,
    EPS = 0.3;

const setYCoordByRowNum = (rowNo = LAST_ROW, num = Y_STEP, shift = Y_SHIFT) =>
    rowNo * num - shift;
const setXCoordByColNum = (colNo = -1, cellWidth = X_STEP) => colNo * cellWidth;
const getRandInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
};
function showWinAlert() {
    const winAlert = document.querySelector(".win-alert");
    winAlert.classList.add("active");
    winAlert.addEventListener("click", (e) =>
        e.currentTarget.classList.remove("active")
    );
}

const Character = function (xCoord, yCoord, spritePath) {
    this.x = xCoord;
    this.y = yCoord;
    this.sprite = spritePath;
};

const Enemy = function (
    xCoord,
    yCoord,
    spritePath,
    player,
    minSpeed = 150,
    maxSpeed = 700
) {
    Character.call(this, xCoord, yCoord, spritePath);
    this.player = player;
    this.minSpeed = minSpeed;
    this.maxSpeed = maxSpeed;
    this.speed = getRandInclusive(minSpeed, maxSpeed);
};
Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.update = function (dt) {
    this.collidedWith(player);
    if (this.x < FIELD_WIDTH) {
        this.x += this.speed * dt;
    } else this.restart();
};
Enemy.prototype.restart = function () {
    this.speed = getRandInclusive(this.minSpeed, this.maxSpeed);
    this.x = setXCoordByColNum();
};
Enemy.prototype.collidedWith = function () {
    if (
        this.x > this.player.x - X_STEP * EPS &&
        this.x < this.player.x + X_STEP * EPS &&
        this.y === this.player.y
    ) {
        player.restart();
    }
};
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const Player = function (xCoord, yCoord, spritePath) {
    Character.call(this, xCoord, yCoord, spritePath);
};
Player.prototype = Object.create(Character.prototype);
Player.prototype.update = function () {
    if (this.y < Y_SHIFT) {
        showWinAlert();
        this.restart();
    }
};
Player.prototype.restart = function () {
    this.x = setXCoordByColNum(Math.floor(LAST_COLMN / 2));
    this.y = setYCoordByRowNum();
};
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function (direction) {
    this.x =
        direction === "left" && this.x > 0 ? this.x - X_STEP
            : direction === "right" && this.x < FIELD_WIDTH - X_STEP
                ? this.x + X_STEP
                : this.x;
    this.y =
        direction === "up" && this.y > Y_SHIFT ? this.y - Y_STEP
            : direction === "down" && this.y < setYCoordByRowNum()
                ? this.y + Y_STEP
                : this.y;
};

const PLAYER_INFO = {
    xInit: setXCoordByColNum(Math.floor(LAST_COLMN / 2)),
    yInit: setYCoordByRowNum(),
    sprite: "images/char-cat-girl.png",
};
const player = new Player(...Object.values(PLAYER_INFO));

const ROWS_WITH_ENEM = 3,
    MIN_ROW_ENEM = 1,
    MAX_ROW_ENEM = 2;
const allEnemies = [];
for (let i = 1; i <= ROWS_WITH_ENEM; i++) {
    for (let j = 0; j < getRandInclusive(MIN_ROW_ENEM, MAX_ROW_ENEM); j++) {
        allEnemies.push(
            new Enemy(
                setXCoordByColNum(),
                setYCoordByRowNum(i),
                "images/enemy-bug.png",
                player
            )
        );
    }
}

document.addEventListener("keyup", function (e) {
    const allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down",
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
