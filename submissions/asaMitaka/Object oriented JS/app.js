// Enemies our player must avoid
var newP = document.createElement('p');
newP.textContent = `Your score: 0 `;
document.body.append(newP);

var enemyStat = {
    width: 98,
    height: 56,
    sprite: "images/enemy-bug.png",
};

var field = {
    min: -50,
    borderX: 400,
    borderY: 450,
    waterCoord: 50,
}

var playerStat = {
    width: 80,
    height: 80,
    startPositionX: 200,
    startPositionY: 400
}

var xColDistance = 80;
var yColDistance = 60;

var Enemy = function(posX, posY, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.posX = posX;
    this.posY = posY;
    this.speed = speed;
    this.width = enemyStat.width;
    this.height = enemyStat.height;
    this.sprite = enemyStat.sprite;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.posX += this.speed * dt;
    if (this.posX > ctx.canvas.width) {
        this.posX = -enemyStat.width;
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.collision();
};

Enemy.prototype.collision = function() {
    if (player.posX < this.posX + xColDistance && player.posX + xColDistance > this.posX && player.posY < this.posY + yColDistance && yColDistance + player.posY > this.posY) {
        player.goToStartPosition();
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.posX, this.posY);
};

var allEnemyVal = [
    {
        x: -120,
        y: 200,
        speed: 60
    },
    {
        x: -120,
        y: 120,
        speed: 120
    },
    {
        x: -30,
        y: 50,
        speed: 300
    }
];

var allEnemies = allEnemyVal.map(
    ({x, y, speed}) => new Enemy(x, y, speed)
)

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(posX, posY) {
    this.posX = posX;
    this.posY = posY;
    this.stat = 0;
    this.step = 75;

    this.width = playerStat.width;
    this.height = playerStat.height;

    this.sprite = 'images/char-boy.png';
}


Player.prototype.update = function() {
    this.win();
}

Player.prototype.win = function() {
    if (field.min >= this.posY) {
        console.log(field.min, this.posY);
        this.stat += 1;
        newP.textContent = `Your score: ${this.stat}`;
        this.goToStartPosition();
    }
}

Player.prototype.goToStartPosition = function() {
    this.posX = playerStat.startPositionX;
    this.posY = playerStat.startPositionY;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.posX, this.posY);
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

Player.prototype.handleInput = function(key) {
    switch(key) {
        case 'up':
            this.posY -= this.step;
            break;
        case 'down':
            this.posY += this.step;
            if (this.posY > field.borderY) {
                this.posY = field.borderY;
            }
            break;
        case 'left':
            this.posX -= this.step;
            if (this.posX < this.step) {
                this.posX = this.step;
            }
            break;
        case 'right':
            this.posX += this.step;
            if (this.posX > field.borderX) {
                this.posX = field.borderX;
            }
            break;
    }
}

var player = new Player(playerStat.startPositionX, playerStat.startPositionY);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
