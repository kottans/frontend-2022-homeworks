const GAME_CONF = {
    OffsetX: 101,
    OffsetY: 83,
    overlap: 0.8,
    collumn: 5,
    countWinner: 0,
    countСheckmate: 0,
};

const PLAYER_CONF = {
    startX: 202,
    startY: 405,
    offsetMinX: 0,
    offsetMaxX: 400,
    offsetMinY: 0,
    offsetMaxY: 400,
    sprite: "images/char-boy.png",
};

const ENEMY_CONF = {
    startY: GAME_CONF.OffsetY / 4,
    speed: 50,
    maximumCount: 5,
    sprite: 'images/enemy-bug.png',
};

const Elementary = function (x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
}

const Enemy = function (x, y, sprite, speed, player) {
    Elementary.call(this, x, y, sprite);
    this.speed = speed;
    this.player = player;
}

Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;
    this.x > GAME_CONF.OffsetX * GAME_CONF.collumn ? this.x = -GAME_CONF.OffsetX : false;
    this.collision();
};

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.collision = function () {
    ((this.player.x < this.x + GAME_CONF.OffsetX * GAME_CONF.overlap) &&
        (this.player.x > this.x - GAME_CONF.OffsetX * GAME_CONF.overlap) &&
        (this.player.y < this.y + GAME_CONF.OffsetY * GAME_CONF.overlap) &&
        (this.player.y > this.y - GAME_CONF.OffsetY * GAME_CONF.overlap)) ?
        (this.player.x = PLAYER_CONF.startX,
            this.player.y = PLAYER_CONF.startY,
            GAME_CONF.countСheckmate += 1)
        : false;
};

const Player = function (x, y, sprite) {
    Elementary.call(this, x, y, sprite);
}

Player.prototype.update = function () {
    this.offsetMinX = PLAYER_CONF.offsetMinX;
    this.offsetMaxX = PLAYER_CONF.offsetMaxX;
    this.offsetMinY = PLAYER_CONF.offsetMinY;
    this.offsetMaxY = PLAYER_CONF.offsetMaxY;
    this.checkVictory();
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.outputGameResult();
};

Player.prototype.checkVictory = function () {
    if (this.y < 0) {
        this.x = PLAYER_CONF.startX;
        this.y = PLAYER_CONF.startY;
        GAME_CONF.countWinner += 1;
    }
    // this.y < 0
    //     ? (this.x = PLAYER_CONF.startX, this.y = PLAYER_CONF.startY, GAME_CONF.countWinner += 1)
    //     : false;
};

Player.prototype.outputGameResult = function () {
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

const player = new Player(PLAYER_CONF.startX, PLAYER_CONF.startY, PLAYER_CONF.sprite);

const allEnemies = [...Array(Math.floor((3 + Math.random() * (ENEMY_CONF.maximumCount - 2))))].map((_, enemy) =>
    enemy = new Enemy(-GAME_CONF.OffsetX,
        GAME_CONF.OffsetY * Math.floor(Math.random() * 3 + 1) - ENEMY_CONF.startY,
        ENEMY_CONF.sprite,
        ENEMY_CONF.speed * (1 + Math.random() * 4),
        player)
);

document.addEventListener('keyup', event => {
    player.handleInput(event.code);
});

