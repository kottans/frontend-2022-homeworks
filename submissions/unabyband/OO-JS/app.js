// Enemies our player must avoid
// Variables applied to each of our instances go here,
// we've provided one for you to get started
// The image/sprite for our enemies, this uses
// a helper we've provided to easily load images
const Enemy = function(horizontalMove, verticalPosition, speed) {
    this.horizontalMove = horizontalMove;
    this.verticalPosition = verticalPosition;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};
let winsCounter = 0;
let speedIncreaser = 100;
let mainMessage = "";
let enemy = new Enemy();
const allEnemies = []; 
const enemyLocation = [63, 147, 230];
const enemyStartPosition = -50;
const enemyEndPosition = 510;
const enemyWidth = 80;
const enemyHeight = 60;
const playerStartHorizontal = 202;
const playerStartVertical = 405;
const playerHorizontalStep = 102;
const playerVerticalStep = 83;
const maxRounds = 12;
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.
Enemy.prototype.update = function(dt) {
    this.horizontalMove += this.speed * dt;
    if (this.horizontalMove > enemyEndPosition) {
        this.horizontalMove = enemyStartPosition;
        this.speed = speedIncreaser + Math.floor(Math.random() * 222);
    };
    if (player.horizontalPosition < this.horizontalMove + enemyWidth &&
        player.horizontalPosition + enemyWidth > this.horizontalMove &&
        player.verticalPosition < this.verticalPosition + enemyHeight &&
        player.verticalPosition + enemyHeight > this.verticalPosition) 
        {
        if (winsCounter > 0) {
            winsCounter -= 1;
        } else {
            winsCounter = 0;
            speedIncreaser = 100;
        }
            player.horizontalPosition = playerStartHorizontal;
            player.verticalPosition = playerStartVertical;
        };
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.horizontalMove, this.verticalPosition);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function (horizontalPosition, verticalPosition) {
    this.horizontalPosition = horizontalPosition;
    this.verticalPosition = verticalPosition;
    this.sprite = 'images/char-boy.png'
};
Player.prototype.update = function (dt) {
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.horizontalPosition, this.verticalPosition);
};
Player.prototype.handleInput = function (keyPress) {
    if (keyPress == 'left' && this.horizontalPosition > 0) {
        this.horizontalPosition -= playerHorizontalStep;
    };
    if (keyPress == 'right' && this.horizontalPosition < playerStartVertical) {
        this.horizontalPosition += playerHorizontalStep;
    };
    if (keyPress == 'up' && this.verticalPosition > 0) {
        this.verticalPosition -= playerVerticalStep;
    };
    if (keyPress == 'down' && this.verticalPosition < playerStartVertical) {
        this.verticalPosition += playerVerticalStep;
    };  
    if (this.verticalPosition < 0) {
        let speedMessage = "";         
        winsCounter += 1;
        mainMessage = "CONGRATULATIONS!\nYou won " + winsCounter + " times. Let's do it again!";
        setTimeout (() => {
            this.horizontalPosition = playerStartHorizontal;
            this.verticalPosition = playerStartVertical;
            alert(mainMessage + speedMessage);
        }, 100);
        if ((winsCounter % 3) == 0  && winsCounter < maxRounds) {
            speedIncreaser += 100;
            speedMessage = "\nIncreasing average bugs speed up to " + speedIncreaser;
        } else if (winsCounter == maxRounds) {
            mainMessage = "\nYou're a REAL BUG-DECEIVER!"
            speedIncreaser = 100;
            winsCounter = 0;
        }
    };
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
enemyLocation.forEach(function (locationY) {
    enemy = new Enemy(0, locationY, speedIncreaser);
    allEnemies.push(enemy);
});
// Place the player object in a variable called player
let player = new Player(playerStartHorizontal, playerStartVertical);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(event) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[event.keyCode]);
});

