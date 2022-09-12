// Enemies our player must avoid
const Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = -95;
    this.y = this.positionEnemyMaker();
    this.speed = this.speedEnemyMaker(200, 450);
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 500) { 
        this.x += Math.round(this.speed * dt);
    }
    else {
        this.x = -95;
        this.y = this.positionEnemyMaker();
        this.speed = this.speedEnemyMaker(200, 450);
    }
    this.checkCollisions();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.positionEnemyMaker = function() {
    const allowedPositions = [47, 129, 211]; 
    return allowedPositions[Math.floor(Math.random() * allowedPositions.length)]; 
}

Enemy.prototype.speedEnemyMaker = function(maxSpeed, minSpeed) {
    return Math.floor(Math.random() * (maxSpeed - minSpeed)) + minSpeed; 
}

Enemy.prototype.checkCollisions = function() {
    if (player.y < this.y + player.collisionAreaHeight && 
        player.y + player.collisionAreaHeight > this.y &&
        player.x < this.x + player.collisionAreaWidth && 
        player.x + player.collisionAreaWidth > this.x) {
            player.x = player.columnWidth * 2; 
            player.y = player.rowHeight * 5;
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function() {
    this.rowHeight = 75;
    this.columnWidth = 101;
    this.gameAreaHeight = this.rowHeight * 4;
    this.gameAreaWidth = this.columnWidth * 4;
    this.collisionAreaWidth = 60;
    this.collisionAreaHeight = 7;
    this.x = this.columnWidth * 2;
    this.y = this.rowHeight * 5;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = () => {};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.winReset = function() {
    if (this.y < 0) {
        setTimeout(() => {
            alert('Great! You Win!');
            this.x = this.columnWidth * 2; 
            this.y = this.rowHeight * 5;
            allEnemies = [];
            createEnemies(5, 6);
        }, 500);
    }
};

Player.prototype.handleInput = function(direction) {
    if (this.y > 0) {
        if (direction == 'left' && this.x > 0) {
            this.x -= this.columnWidth;
        }
        else if (direction == 'right' && this.x < this.gameAreaWidth) {
            this.x += this.columnWidth;
        }
        else if (direction == 'up' && this.y > 0) {
            this.y -= this.rowHeight + this.collisionAreaHeight;
        }
        else if (direction == 'down' && this.y < this.gameAreaHeight) {
            this.y += this.rowHeight + this.collisionAreaHeight;
        }
    
        this.winReset();   
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
function createEnemies(minEnemies, maxEnemies) {
    for (let i = 0; i < Math.floor(Math.random() * (maxEnemies - minEnemies + 1)) + minEnemies; i++) {
        allEnemies.push(new Enemy());    
    }
}
createEnemies(5, 6);

const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
