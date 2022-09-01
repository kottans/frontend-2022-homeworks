const AVAILABLE_ROWS_FOR_ENEMIES = [63, 146, 229]; 
const allEnemies = [];

const WIDTH_OF_GAME_SPRITES = 100;
const COLUMNS_ON_GAME_FIELD = 5;
const HEIGH_OF_GAME_FIELD_CELL = 83;
const PLAYER_BUG_CENTERS_DISTANCE_OF_TOUCHING = 80;
const Y_OF_GAME_FIELD_ROWS = [63, 146, 229, 312, 395];
const Y_OF_LOWEST_GAME_FIELD_ROW = Y_OF_GAME_FIELD_ROWS[4];
const MIN_SPEED_MULTIPLIER_FOR_BUG = 200;
const MAX_SPEED_MULTIPLIER_FOR_BUG = 350;

function resetPlayer(){
    player.x = player.xInitial;
    player.y = player.yInitial;
}

function resetEnemies(){
    allEnemies.forEach((el)=>{        
        el.x = el.xInitial;
        el.speedKoef = Math.floor(Math.random() * MAX_SPEED_MULTIPLIER_FOR_BUG - MIN_SPEED_MULTIPLIER_FOR_BUG) + MIN_SPEED_MULTIPLIER_FOR_BUG;  
    })
}

function isOnWater(){                   
    if (this.y === this.yAxisMin){
        resetEnemies();
        resetPlayer();
    }
}


var Enemy = function(y) {                    
    this.sprite = 'images/enemy-bug.png';
    this.speedKoef = Math.floor(Math.random() * MAX_SPEED_MULTIPLIER_FOR_BUG - MIN_SPEED_MULTIPLIER_FOR_BUG) + MIN_SPEED_MULTIPLIER_FOR_BUG;  
    this.xInitial = -WIDTH_OF_GAME_SPRITES;
    this.xAxisMin = this.xInitial;
    this.x = this.xInitial;
    this.xAxisMax = WIDTH_OF_GAME_SPRITES * COLUMNS_ON_GAME_FIELD;
    this.y = y;
};

Enemy.prototype.doesHitPlayer = function (){
    if (Math.abs(this.x - player.x) <= PLAYER_BUG_CENTERS_DISTANCE_OF_TOUCHING && this.y === player.y){   
        resetPlayer();
        resetEnemies();
    }
}

Enemy.prototype.update = function(dt) {     
    this.x = this.x >= this.xAxisMax ? this.x = this.xInitial : this.x + dt * this.speedKoef;
    this.doesHitPlayer();        
    
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var Player = function (){
    this.sprite = 'images/char-boy.png';
    this.xInitial = WIDTH_OF_GAME_SPRITES * 2; 
    this.yInitial = Y_OF_LOWEST_GAME_FIELD_ROW;
    this.xStep = WIDTH_OF_GAME_SPRITES; 
    this.yStep = HEIGH_OF_GAME_FIELD_CELL;
    this.x = this.xInitial;
    this.y = this.yInitial;
    this.xAxisMin = 0;
    this.xAxisMax = this.xAxisMin + this.xStep * (COLUMNS_ON_GAME_FIELD - 1);             
    this.yAxisMin = this.yInitial - this.yStep * COLUMNS_ON_GAME_FIELD;             
    this.yAxisMax = this.yAxisMin + this.yStep * COLUMNS_ON_GAME_FIELD;             
}

Player.prototype.update = function (moveDirection){             
    if (moveDirection === 'left' && this.x > this.xAxisMin) {
        this.x -= this.xStep;
    }
    if (moveDirection === 'right' && this.x < this.xAxisMax){
        this.x += this.xStep;
    }
    if (moveDirection === 'up' && this.y > this.yAxisMin ){
        this.y -= this.yStep;
        if (this.y === this.yAxisMin){
            isOnWater.call(this);
        }
    }
    if (moveDirection === 'down' && this.y < this.yAxisMax) {
        this.y += this.yStep;
    }
}

Player.prototype.render = function (){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function (direction){
    this.update(direction);
}


for (let elem of AVAILABLE_ROWS_FOR_ENEMIES.concat(AVAILABLE_ROWS_FOR_ENEMIES)){
    allEnemies.push(new Enemy(elem));
}
let player = new Player();


document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
