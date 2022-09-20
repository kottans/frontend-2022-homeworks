const allEnemies = [];
const allSpeeds = [200, 250, 350];
const rangeY = [73, 156, 239];
const cellX = 101;
const cellY = 83;
const playerStartX = 202;
const playerStartY = 405;
const fieldWidth = 505;

function Player(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite=sprite;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y) 
};

Player.prototype.update = function() {
};

const player = new Player ( playerStartX, playerStartY, 'images/char-boy.png' );

function Enemy(x, y, sprite, speedX) {
    Player.call(this, x, y, sprite);
    this.speedX = speedX;
};

Enemy.prototype = Object.create(Player.prototype);

Enemy.prototype.update = function(dt){
    this.x += this.speedX * dt;
    if (this.x > fieldWidth){
        this.x = -55;
        this.speedX = allSpeeds[Math.floor(Math.random()*3)];
    };
    if (this.y === player.y){
        if ((this.x - player.x < 40 ) && (player.x - this.x < 40 )) {
            player.x = playerStartX;
            player.y = playerStartY;
        };    
    };
};

function addBug() {
    rangeY.forEach ( (levelMark)=>  allEnemies
    .push( new Enemy(0, levelMark, 'images/enemy-bug.png', allSpeeds[Math.floor(Math.random()*3)] )) 
    )
};

player.handleInput = function (direction) {
    switch (direction) {
        case 'left':
            if (this.x > 0){
                this.x -= cellX 
            };
            break;
        case 'up':
            this.y -= cellY;
            if(this.y < 50){
                this.x = playerStartX;
                this.y = playerStartY;
            }
            break;
        case 'right':
            if (this.x < 400){
                this.x += cellX
            };
            break;
        case 'down':
            if (this.y < 400){
                this.y += cellY 
            };
            break;
        default:
            break;
    };        
};
    
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
    
addBug()

