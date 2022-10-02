const gameSettings = {
    rowHeight: 83,
    columnWidth: 101,
    gameAreaHeight: 300,
    gameAreaWidth: 404,
    collisionAreaWidth: 60,
    collisionAreaHeight: 15
}

// Enemies our player must avoid
const Enemy = function(player) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.player = player;
    this.size = 60;
    this.x = 0 - gameSettings.columnWidth;
    this.y = this.enemyPositionMaker(gameSettings.rowHeight);
    this.speed = this.enemySpeedMaker(200, 450);
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > ctx.canvas.width) {
        this.x = 0 - gameSettings.columnWidth;
        this.y = this.enemyPositionMaker(gameSettings.rowHeight);
        this.speed = this.enemySpeedMaker(200, 450); 
    }
    
    this.checkCollisions();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.enemyPositionMaker = function(rowHeight) {
    const positions = [this.size, this.size + rowHeight, this.size + (rowHeight * 2)]; 
    return positions[Math.floor(Math.random() * positions.length)]; 
}

Enemy.prototype.enemySpeedMaker = function(maxSpeed, minSpeed) {
    return Math.floor(Math.random() * (maxSpeed - minSpeed)) + minSpeed; 
}

Enemy.prototype.checkCollisions = function() {
    if (this.player.y < this.y + gameSettings.collisionAreaHeight && 
        this.player.y + gameSettings.collisionAreaHeight > this.y &&
        this.player.x < this.x + gameSettings.collisionAreaWidth && 
        this.player.x + gameSettings.collisionAreaWidth > this.x) {
            this.player.x = gameSettings.columnWidth * 2; 
            this.player.y = gameSettings.rowHeight * 4.6;
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function() {
    this.x = gameSettings.columnWidth * 2;
    this.y = gameSettings.rowHeight * 4.6;
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
            document.location.reload();
        }, 500);
    }
};

Player.prototype.handleInput = function(direction) {
    if (this.y > 0) {
        if (direction == 'left' && this.x > 0) {
            this.x -= gameSettings.columnWidth;
        }
        else if (direction == 'right' && this.x < gameSettings.gameAreaWidth) {
            this.x += gameSettings.columnWidth;
        }
        else if (direction == 'up' && this.y > 0) {
            this.y -= gameSettings.rowHeight;
        }
        else if (direction == 'down' && this.y < gameSettings.gameAreaHeight) {
            this.y += gameSettings.rowHeight;
        }
    
        this.winReset();   
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player();

let allEnemies = [];
function createEnemies(minEnemies, maxEnemies) {
    for (let i = 0; i < Math.floor(Math.random() * (maxEnemies - minEnemies + 1)) + minEnemies; i++) {
        allEnemies.push(new Enemy(player));    
    }
}
createEnemies(3, 5);



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
