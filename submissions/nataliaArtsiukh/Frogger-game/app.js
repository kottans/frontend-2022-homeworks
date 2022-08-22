const sizes = {
    colWidth: 101,
    rowHeight: 83,
    enemyVerticalShift: 20,
    playerVerticalShift: 10,
    startRow: 5,
    startCol: 2,
    starVerticalShift: 10,
    speedCoefficient: 0.7,
    enemyHorizontalShift: 20,
    colCount: 5,
    rowCount: 6,
    starCount: 5,
    enemyCount: 3
}

const Star = function(numCol, player) {
    this.x = sizes.colWidth * numCol; 
    this.y = -sizes.starVerticalShift;
    this.sprite = 'images/Star.png';
    this.player = player;
}

Star.prototype.update = function() {
    if (this.player.y < 0) {
        let index = this.player.x / sizes.colWidth; 
        allStars[index] = null;
        if (allStars.filter(elem => elem).length == 0) {
            setTimeout(()=> {
                alert('You are amazing!!!'); 
                launch();
            }, 1000);
        } 
    }
}

Star.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Enemies our player must avoid

const Enemy = function(numRow, player) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = sizes.colWidth * -1; 
    this.y = sizes.rowHeight * numRow - sizes.enemyVerticalShift; 
    this.speed = (Math.random() + sizes.speedCoefficient) * sizes.colWidth; 
    this.sprite = 'images/enemy-bug.png';
    this.player = player;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < sizes.colWidth * sizes.colCount) { 
        this.x = this.x + this.speed * dt;
    } else {
        this.x = sizes.colWidth * -1; 
        this.speed = (Math.random() + sizes.speedCoefficient) * sizes.colWidth; 
    }
    this.isCollided(this.player);
};

Enemy.prototype.isCollided = function(player) {
    if (player.y == this.y + sizes.enemyVerticalShift - sizes.playerVerticalShift) {
        if (this.x > player.x - sizes.colWidth + sizes.enemyHorizontalShift && this.x < player.x + sizes.colWidth - sizes.enemyHorizontalShift) { 
            player.comeBack();
        } 
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function() {
    this.x = sizes.colWidth * sizes.startCol; 
    this.y = sizes.rowHeight * sizes.startRow - sizes.playerVerticalShift; 
    this.finished = false;
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function(){
    // for (let i = 0; i < allEnemies.length; i++) {
    //     if (this.y == allEnemies[i].y + sizes.enemyVerticalShift - sizes.playerVerticalShift) {
    //         if (allEnemies[i].x > this.x - sizes.colWidth + sizes.enemyHorizontalShift && allEnemies[i].x < this.x + sizes.colWidth - sizes.enemyHorizontalShift) { 
    //             this.x = sizes.colWidth * sizes.startCol; 
    //             this.y = sizes.rowHeight * sizes.startRow - sizes.playerVerticalShift;  
    if (this.y < 0) {
        if (!this.finished) {
            setTimeout(() => {
                this.x = sizes.colWidth * sizes.startCol; 
                this.y = sizes.rowHeight * sizes.startRow - sizes.playerVerticalShift;  
                this.finished = false;
            }, 1000);
            this.finished = true;
        }
    }
};

Player.prototype.comeBack = function() {
    player.x = sizes.colWidth * sizes.startCol; 
    player.y = sizes.rowHeight * sizes.startRow - sizes.playerVerticalShift; 
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    if (this.y > 0) {
        if (direction == 'left' && this.x > 0) {
            this.x -= sizes.colWidth; 
        } else if (direction == 'up' && this.y > 0) {
            this.y -= sizes.rowHeight; 
        } else if (direction == 'right' && this.x < sizes.colWidth * (sizes.colCount - 1)) { 
            this.x += sizes.colWidth; 
        } else if (direction == 'down' && this.y < sizes.rowHeight * (sizes.rowCount - 1) - sizes.playerVerticalShift) { 
            this.y += sizes.rowHeight; 
        }
    } 
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allStars;
let allEnemies;
let player;

function launch() {
    player = new Player();

    allStars = [];
    for (let i = 0; i < sizes.starCount; i++) {
        allStars.push(new Star(i, player));
    }
    
    allEnemies = [];
    for (let i = 1; i <= sizes.enemyCount; i++){
        allEnemies.push(new Enemy(i, player));
    }  
}

launch();

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
