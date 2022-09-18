var Enemy = function(x, y, speed) {

    this.x = x;
    this.y = y;
    this.speed = speed;

    this.sprite = 'images/enemy-bug.png';

};

Enemy.prototype.update = function(dt) {

    if(this.x > 505) {
        this.x = -101;
        this.y = enemyLocations[randomNumber(0, 2)]; // change enemy location
        this.speed = randomNumber();
    }

    if(
        this.x + 51 > player.x && // enemy in front of player
        this.x - player.x <= 51 && // enemy behind of player
        this.y - player.y === 0 // enemy and player on the same line
    ) {
        player.x = defaultPlayerLocation.x;
        player.y = defaultPlayerLocation.y;
    }else {
        this.x += this.speed * dt;
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(playerPosition) {
    this.x = playerPosition.x;
    this.y = playerPosition.y;

    this.character = 'images/char-boy.png';
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.character), this.x, this.y);
};

Player.prototype.update = function() {
    
    // Player reached the water
    if(this.y < 0) {
        this.x = defaultPlayerLocation.x;
        this.y = defaultPlayerLocation.y;
    }
};

Player.prototype.handleInput = function(keyCode) {

    if(keyCode === 'left' && this.x > 0) {
            this.x -= 101;
    }
    if(keyCode === 'right' && this.x < 404) {
            this.x += 101;
    }
    if(keyCode === 'up' && this.y > 0) {
            this.y -= 83;
    }
    if(keyCode === 'down' && this.y < 392) {
            this.y += 83;
    }

};

const defaultPlayerLocation = { x: 202, y: 392 };
const player = new Player(defaultPlayerLocation, 'images/char-boy.png');

const enemyLocations = [60, 143, 226]; // Y coordinates of each enemy position
const allEnemies = enemyLocations.map(location => {
    let speed = randomNumber();
    return new Enemy(-101, location, speed);
});

function randomNumber(min = 200, max = 500) {
    return Math.round(Math.random() * (max - min) + min);
}

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
