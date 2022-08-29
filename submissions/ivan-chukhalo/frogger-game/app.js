const AVAILABLEROWSFORENEMIES = [63, 146, 229]; 
const allEnemies = [];

function resetPlayer(){
    player.x = player.xInitial;
    player.y = player.yInitial;
}

function resetEnemies(){
    allEnemies.forEach((el)=>{        
        el.x = el.xInitial;
        el.speedKoef = Math.floor(Math.random() * 10) * 25 + 75;  
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
    this.speedKoef = Math.floor(Math.random() * 10) * 25 + 75;
    this.widthOfBugSprite = 98;
    this.xInitial = -this.widthOfBugSprite;
    this.xAxisMin = this.xInitial;
    this.x = this.xInitial;
    this.xAxisMax = 101 * 4 + this.widthOfBugSprite;
    this.y = y;
};

Enemy.prototype.doesHitPlayer = function (){
    if (Math.abs(this.x - player.x) <= 75 && this.y === player.y){   
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
    this.xInitial = 202; 
    this.yInitial = 395;
    this.xStep = 101; 
    this.yStep = 83;
    this.x = this.xInitial;
    this.y = this.yInitial;
    this.xAxisMin = 0;
    this.xAxisMax = this.xAxisMin + this.xStep * 4;             
    this.yAxisMin = this.yInitial - this.yStep * 5;             
    this.yAxisMax = this.yAxisMin + this.yStep * 5;             
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
        if (player.y === player.yAxisMin){
            isOnWater.call(player);
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


for (let elem of AVAILABLEROWSFORENEMIES.concat(AVAILABLEROWSFORENEMIES)){
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
