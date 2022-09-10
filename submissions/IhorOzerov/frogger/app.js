const config = {
    CANVAS_WIDTH : 505,
    REFRESH_TIME : 500,
    Y_START : 0,
    X_START : 0,

    ENEMY_CONST: {
        refresh: -101,
        locations: [62, 144, 228],
        speed: (Math.random() * 200) + 200,
        sprite: "images/enemy-bug.png"
    },

    PLAYER_CONST: {
        x: 203,
        y: 390,
        stepX: 102,
        stepY: 83,
        sprite: "images/char-boy.png",
        height: 60,
        width: 70,
        rightBorder: 400
    }
};

const Enemy = function (x, y) {
    this.x = x;
    this.y = y;
    this.speed = config.ENEMY_CONST.speed;
    this.sprite = config.ENEMY_CONST.sprite;
}; 

Enemy.prototype.update = function (dt) {
    this.x += config.ENEMY_CONST.speed * dt;
    if (this.x > config.CANVAS_WIDTH) {
        this.x = config.ENEMY_CONST.refresh;
    };
    this.checkCollision();
};

Enemy.prototype.checkCollision = function () {
    
    const enemyWidth = this.x + config.PLAYER_CONST.width;
    const enemyHeight = this.y + config.PLAYER_CONST.height;
    const playerWidth = player.x + config.PLAYER_CONST.width;
    const playerHeight = player.y + config.PLAYER_CONST.height;
    
    if (player.x < enemyWidth &&
        playerWidth > this.x &&
        player.y < enemyHeight &&
        playerHeight > this.y) {
            player.x = config.PLAYER_CONST.x;
            player.y = config.PLAYER_CONST.y;
            }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const allEnemies = [];

config.ENEMY_CONST.locations.forEach(
    function (enemyPosition) {
    const startPoint = Math.random()*config.CANVAS_WIDTH;
    const enemy = new Enemy(startPoint, enemyPosition, config.ENEMY_CONST.speed);
    allEnemies.push(enemy);
});

const Player = function() {
    this.x = config.PLAYER_CONST.x;
    this.y = config.PLAYER_CONST.y;
    this.sprite = config.PLAYER_CONST.sprite;
};
const player = new Player;

Player.prototype.update = function () {
    if (this.y < config.Y_START) {
        setTimeout(function () {
            player.x = config.PLAYER_CONST.x;
            player.y = config.PLAYER_CONST.y;
        }, config.REFRESH_TIME);
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (allowKey) {
    if (allowKey == "left" && this.x > config.X_START) {
        this.x -= config.PLAYER_CONST.stepX;
    }
    if (allowKey == "right" && this.x < config.PLAYER_CONST.rightBorder) {
        this.x += config.PLAYER_CONST.stepX;
    }
    if (allowKey == "up" && this.y > config.Y_START) {
        this.y -= config.PLAYER_CONST.stepY;
    }
    if (allowKey == "down" && this.y < config.PLAYER_CONST.y) {
        this.y += config.PLAYER_CONST.stepY;
    }
}; 

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
