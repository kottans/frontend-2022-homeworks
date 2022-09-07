const START_PLAYER_POSITION_X = 200,
    START_PLAYER_POSITION_Y = 390,
    CELL_WIDTH = 83,
    CELL_HEIGHT = 101,
    START_X = 0,
    START_Y = 0,
    RIGHT_WALL = 400,
    BOTTOM_WALL = 350,
    CHAR_BOY = 55,
    ENEMY = 40;
    
let countScore = 0;
const scopeElement = document.createElement('div');
scopeElement.style.cssText = 'font-size:25px; padding-top:20px; margin-bottom:-20px';
document.body.appendChild(scopeElement);

const Player = function () {
    this.resetPlayerPosition();
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function () {
    if (this.y < START_Y) {
        this.resetPlayerPosition();
        countScore++;
        score();
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.resetPlayerPosition = function () {
    this.x = START_PLAYER_POSITION_X;
    this.y = START_PLAYER_POSITION_Y;
}

Player.prototype.handleInput = function (route) {
    switch (route) {
        case 'left':
            if (this.x > START_X)
                this.x -= CELL_HEIGHT;
            break;
        case 'up':
            this.y -= CELL_WIDTH;
            break;
        case 'right':
            if (this.x < RIGHT_WALL)
                this.x += CELL_HEIGHT;
            break;
        case 'down':
            if (this.y < BOTTOM_WALL)
                this.y += CELL_WIDTH;
            break;
        default:
            break;
    }
};

const player = new Player();

const Enemy = function (x, y, player) {
    this.x = x;
    this.y = y;
    this.player = player;
    this.speed = Math.random() * 200 + 80;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;
    if (this.x > ctx.canvas.width) {
        this.x = START_X;
    }
    if (this.checkCollision()) {
        this.player.resetPlayerPosition();
    }
};

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollision = function () {
    if (Math.abs(this.x - this.player.x) < CHAR_BOY && Math.abs(this.y - this.player.y) < CHAR_BOY) {
        this.player.resetPlayerPosition();
        if (countScore > 0) {
            countScore--;
            score();
        }
    }
};

const allEnemies = [];

function createEnemies() {
    const positionY = [
        CELL_HEIGHT - ENEMY,
        CELL_HEIGHT * 1.8 - ENEMY, 
        CELL_HEIGHT * 2.6 - ENEMY
    ];
    positionY.map((y)=>{
        allEnemies.push(new Enemy(START_X, y, player));
    });
};

function score() {
    scopeElement.innerHTML = `Score: ${countScore} / 5`;
    if (countScore == 5) {
        showWinMessage();
    }
};

const message = document.createElement('div');

function showWinMessage() {
    message.style.cssText = 'position:absolute; font-size:50px; top:45%; left:5%; width:90%; padding-top:10px; padding-bottom:10px; background-color:rgba(176, 235, 182, 0.8);';
    document.body.appendChild(message);
    message.textContent = 'You win';
    window.setTimeout(resetGame, 2000);
};

function resetGame() {
    countScore = 0;
    score(countScore);
    document.body.removeChild(message);
};

createEnemies();
score();

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
