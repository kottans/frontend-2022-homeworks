let allEnemies = [];
let allSpeeds = [200, 250, 350];
let rangeY = [73, 156, 239];

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

let player = new Player ( 202, 405, 'images/char-boy.png' );

function Enemy(x, y, sprite, speedX) {
    Player.call(this, x, y, sprite);
    this.speedX = speedX;
};

Enemy.prototype = Object.create(Player.prototype);

Enemy.prototype.update = function(dt){
    this.x += this.speedX * dt;
    if (this.x > 505){
        this.x = -55;
        this.speedX = allSpeeds[Math.floor(Math.random()*3)];
    };
    if (this.y === player.y){
        if ((this.x - player.x < 40 ) && (player.x - this.x < 40 )) {
            player.x = 202;
            player.y = 405;
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
                this.x -= 101 
            };
            break;
        case 'up':
            this.y -= 83;
            if(this.y < 50){
                this.x = 202;
                this.y = 405;
            }
            break;
        case 'right':
            if (this.x < 400){
                this.x += 101
            };
            break;
        case 'down':
            if (this.y < 400){
                this.y += 83 
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

