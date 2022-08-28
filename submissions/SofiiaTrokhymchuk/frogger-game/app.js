const TILE_WIDTH = 101;
const TILE_HEIGHT = 83;

const ROWS = 5;
const COLUMNS = 4;

const BOARD_WIDTH = TILE_WIDTH * COLUMNS;
const BOARD_HEIGHT = TILE_HEIGHT * ROWS;

const CHARACTERS_WIDTH = 101;
const CHARACHTERS_HEIGHT = 171;

const CHARACTERS_SIZE_DIFFERENCE = 20;

const INITIAL_ENEMY_X = -CHARACTERS_WIDTH;
const ENEMY_MIN_SPEED = 100;
const ENEMY_MAX_SPEED = 500;

const INITAL_PLAYER_X = BOARD_WIDTH / Math.ceil(COLUMNS / 2);
const INITAL_PLAYER_Y = BOARD_HEIGHT - CHARACTERS_SIZE_DIFFERENCE;

const Enemy = function(x, y, player) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = this.generateSpeed();
    this.player = player;
};

Enemy.prototype.update = function(dt) {
    this.checkCollisions();
    this.x += this.speed * dt;
    if(this.x > BOARD_WIDTH + CHARACTERS_WIDTH){
        this.x = INITIAL_ENEMY_X;
    };
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.generateSpeed = function() {
    return (Math.floor(Math.random() * (ENEMY_MAX_SPEED / 100 - ENEMY_MIN_SPEED / 100 + 1)) + ENEMY_MIN_SPEED / 100) * 100;
};

Enemy.prototype.checkCollisions = function() {
    if(Math.abs(this.x - this.player.x) <= CHARACTERS_WIDTH - CHARACTERS_SIZE_DIFFERENCE * 1.5 
    && Math.abs(this.y - this.player.y) <= CHARACTERS_SIZE_DIFFERENCE){
        this.player.loses += 1;
        this.player.addWinLossPointsToBlock(this.player.pointsBlock, this.player);
        this.player.resetInitialPosition();
    }
};

function generateEnemies(player){
    return [2, 3, 4].map(rowNumber => new Enemy(INITIAL_ENEMY_X, 
        TILE_HEIGHT * rowNumber - (CHARACHTERS_HEIGHT / 2 + CHARACTERS_SIZE_DIFFERENCE), player));
};

const Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.wins = 0;
    this.loses = 0;
    this.pointsBlock = this.createWinLossPointsBlock();
};

Player.prototype.update = function() {
    this.checkPosition();
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    this.update();
    switch(key){
        case 'left':
            this.x -= TILE_WIDTH;
            break;
        case 'right':
            this.x += TILE_WIDTH;
            break;
        case 'up':
            this.y -= TILE_HEIGHT;
            break;
        case 'down':
            this.y += TILE_HEIGHT;
            break;
    };
};

Player.prototype.resetInitialPosition = function(){
    this.x = INITAL_PLAYER_X;
    this.y = INITAL_PLAYER_Y;
};

Player.prototype.checkPosition = function() {
    if(this.x < 0){
        this.x = 0;
    }else if(this.x > BOARD_WIDTH){
        this.x = BOARD_WIDTH;
    }else if(this.y > BOARD_HEIGHT){
        this.y = BOARD_HEIGHT - 20;
    }else if(this.y < 0){
        this.wins += 1;
        this.addWinLossPointsToBlock(this.pointsBlock, this);
        this.resetInitialPosition();
    };
};

Player.prototype.createWinLossPointsBlock = function(){
    const pointsBlock = document.createElement('div');
    pointsBlock.style.cssText = `
        font-family: Helvetica; 
        font-size: 30px; 
        width: 50%;
        margin: 30px auto -10px;
        display: flex;
        justify-content: space-evenly;
    `;

    pointsBlock.innerHTML = `
        <span>Wins: 0</span>
        <span>Losses: 0</span>
    `;
    document.body.prepend(pointsBlock);
    return pointsBlock;
}

Player.prototype.addWinLossPointsToBlock = function(pointsBlock, player){
    pointsBlock.innerHTML = `
        <span>Wins: ${player.wins}</span>
        <span>Losses: ${player.loses}</span>
    `;
}

const player = new Player(INITAL_PLAYER_X, INITAL_PLAYER_Y);
const allEnemies = generateEnemies(player);

document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
