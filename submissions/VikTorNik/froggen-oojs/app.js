const OFFSET_X = 101;
const OFFSET_Y = 83;
const START_PLAYER_X = 202;
const START_PLAYER_Y = 405;
const START_OFFSET_ENEMY_Y = OFFSET_Y / 4;
const SPEED_ENEMY = 50;
const OVERLAP = 0.8;
const MAXIMUN_ENEMY = 5;
const COLLUMN_CANVAS = 5;
let allEnemies = [];
let countWinner = 0;
let countСheckmate = 0;

let Enemy = function (x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = SPEED_ENEMY * (1 + Math.random() * 4);
};

Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;
    this.x > OFFSET_X * 5 ? this.x = -OFFSET_X : false;
    this.collision();
    this.winner();
};

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

function createEnems() {
    allEnemies = [...Array(Math.floor((3 + Math.random() * (MAXIMUN_ENEMY - 2))))].map((_, i) =>
        i = new Enemy(-OFFSET_X, OFFSET_Y * Math.floor(Math.random() * 3 + 1) - START_OFFSET_ENEMY_Y, SPEED_ENEMY));
};

createEnems();

Enemy.prototype.collision = function () {
    ((player.x < this.x + OFFSET_X * OVERLAP) &&
        (player.x > this.x - OFFSET_X * OVERLAP) &&
        (player.y < this.y + OFFSET_Y * OVERLAP) &&
        (player.y > this.y - OFFSET_Y * OVERLAP)) ? (player.x = START_PLAYER_X, player.y = START_PLAYER_Y, createEnems(), countСheckmate += 1) : false;
};

Enemy.prototype.winner = function () {
    player.y < 0 ? (player.x = START_PLAYER_X, player.y = START_PLAYER_Y, createEnems(), countWinner += 1) : false;
};

let Player = function (x = START_PLAYER_X, y = START_PLAYER_Y) {
    this.sprite = "images/char-boy.png";
    this.x = x;
    this.y = y;
}

Player.prototype.update = function () {
    this.offsetMinX = 0;
    this.offsetMaxX = 400;
    this.offsetMinY = 0;
    this.offsetMaxY = 400;
};

Player.prototype.render = function () {
    ctx.textAlign = "center";
    ctx.font = "Bold 77px Arial";
    ctx.fillStyle = "greenyellow";
    ctx.shadowColor = "#444";
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    ctx.shadowBlur = 3;
    ctx.fillText(countWinner, Math.floor(OFFSET_X * 1.5), 117);
    ctx.fillStyle = "red";
    ctx.fillText(countСheckmate, Math.floor(OFFSET_X * 3.5), 117);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

let player = new Player();

document.addEventListener('keyup', e => {
    player.handleInput(e.code);
});

Player.prototype.handleInput = function (keyPress) {
    keyPress == 'ArrowLeft' && this.x > this.offsetMinX ?
        this.x -= OFFSET_X : false;
    keyPress == 'ArrowRight' && this.x < this.offsetMaxX ?
        this.x += OFFSET_X : false;
    keyPress == 'ArrowUp' && this.y > this.offsetMinY ?
        this.y -= OFFSET_Y : false;
    keyPress == 'ArrowDown' && this.y < this.offsetMaxY ?
        this.y += OFFSET_Y : false;
}

