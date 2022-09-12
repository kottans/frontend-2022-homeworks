const GAME_CONF = {
    OffsetX : 101,
    OffsetY : 83,
    overlap : 0.8,
    collumn : 5,
    countWinner : 0,
    countСheckmate : 0,
};

const PLAYER_CONF = {
    startX: 202,
    startY: 405,
};

const ENEMY_CONF = {
    startY: GAME_CONF.OffsetY / 4,
    speed: 50,
    maximumCount: 5,    
};

let allEnemies = [];

let Enemy = function (x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = ENEMY_CONF.speed * (1 + Math.random() * 4);
};

Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;
    this.x > GAME_CONF.OffsetX * GAME_CONF.collumn ? this.x = -GAME_CONF.OffsetX : false;
    this.collision();
    this.winner();
};

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

function createEnems() {
    allEnemies = [...Array(Math.floor((3 + Math.random() * (ENEMY_CONF.maximumCount - 2))))].map((_, i) =>
        i = new Enemy(-GAME_CONF.OffsetX, GAME_CONF.OffsetY * Math.floor(Math.random() * 3 + 1) - ENEMY_CONF.startY, ENEMY_CONF.speed));
};

createEnems();

Enemy.prototype.collision = function () {
    ((player.x < this.x + GAME_CONF.OffsetX * GAME_CONF.overlap) &&
        (player.x > this.x - GAME_CONF.OffsetX * GAME_CONF.overlap) &&
        (player.y < this.y + GAME_CONF.OffsetY * GAME_CONF.overlap) &&
        (player.y > this.y - GAME_CONF.OffsetY * GAME_CONF.overlap)) ? (player.x = PLAYER_CONF.startX, player.y = PLAYER_CONF.startY, createEnems(), GAME_CONF.countСheckmate += 1) : false;
};

Enemy.prototype.winner = function () {
    player.y < 0 ? (player.x = PLAYER_CONF.startX, player.y = PLAYER_CONF.startY, createEnems(), GAME_CONF.countWinner += 1) : false;
};

let Player = function (x = PLAYER_CONF.startX, y = PLAYER_CONF.startY) {
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

Player.prototype.countWinnerСheckmate = function () {
    ctx.textAlign = "center";
    ctx.font = "Bold 77px Arial";
    ctx.fillStyle = "greenyellow";
    ctx.shadowColor = "#444";
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    ctx.shadowBlur = 3;
    ctx.fillText(GAME_CONF.countWinner, Math.floor(GAME_CONF.OffsetX * 1.5), 117);
    ctx.fillStyle = "red";
    ctx.fillText(GAME_CONF.countСheckmate, Math.floor(GAME_CONF.OffsetX * 3.5), 117);
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.countWinnerСheckmate();
};

let player = new Player();

document.addEventListener('keyup', e => {
    player.handleInput(e.code);
});

Player.prototype.handleInput = function (keyPress) {
    keyPress == 'ArrowLeft' && this.x > this.offsetMinX ?
        this.x -= GAME_CONF.OffsetX : false;
    keyPress == 'ArrowRight' && this.x < this.offsetMaxX ?
        this.x += GAME_CONF.OffsetX : false;
    keyPress == 'ArrowUp' && this.y > this.offsetMinY ?
        this.y -= GAME_CONF.OffsetY : false;
    keyPress == 'ArrowDown' && this.y < this.offsetMaxY ?
        this.y += GAME_CONF.OffsetY : false;
}

