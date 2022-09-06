const canvasWidth = 505;
const refreshTime = 500;

const enemyStartSpeed = 200;
const enemyRefresh = -50;
const enemyLocation1 = 62;
const enemyLocation2 = 144;
const enemyLocation3 = 228;
const enemySpeed = (Math.random() * 200) + 150;
const enemySprite = "images/enemy-bug.png";

const playerX = 203;
const playerY = 390;
const playerStepX = 102;
const playerStepY = 83;
const playerSprite = "images/char-boy.png";
const playerHeight = 60;
const playerWidth = 70;
const playerRightBorder = 400;

const Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = enemySprite;
};

Enemy.prototype.update = function(dt) {
    this.x += enemySpeed * dt;
    if(this.x > canvasWidth){
        this.x = enemyRefresh;
    }
    if(player.x < this.x + playerWidth &&
        player.x + playerWidth > this.x &&
        player.y < this.y + playerHeight &&
        playerHeight + player.y > this.y){
            player.x = playerX;
            player.y = playerY;
        }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const Player = function(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
};

Player.prototype.update = function (){} 

Player.prototype.render = function  (){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
} 

Player.prototype.handleInput = function (allowKey){
    if(allowKey == "left" && this.x > 0){
        this.x -= playerStepX;
    }
    if(allowKey == "right" && this.x < playerRightBorder){
        this.x += playerStepX;
    }
    if(allowKey == "up" && this.y > 0){
        this.y -= playerStepY;
    }
    if(allowKey == "down" && this.y < playerY){
        this.y += playerStepY;
    }
    if(this.y < 0){
        setTimeout(function (){
            player.x = playerX;
            player.y = playerY;
        }, refreshTime);
    }
} 

const player = new Player(playerX, playerY, playerSprite); 

const allEnemies = [];

const enemyLocations = [enemyLocation1,enemyLocation2,enemyLocation3];

enemyLocations.forEach(function (enemyLocation){
    const enemyStart = Math.random()*canvasWidth;
        const enemy = new Enemy(enemyStart, enemyLocation, enemyStartSpeed);
            allEnemies.push(enemy);
})

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
