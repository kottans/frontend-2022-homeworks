// Player constants
const defaultPlayer = {
    x: 204,
    y: 409,
};
const stepSize = {
    x: 102,
    y: 84,
}

// Enemy constans
const maxX = 500,
      enemyStartX = -150,
      affectedArea = 60,
      numberOfEnemies = 4,
      firstEnemyRow = 63,
      enemyRows = [];

const initialSpeed = {
        max: 200,
        min: 60,
}

// Game Constants
const winningArea = {
    borderTop: -12,
    borderBottom: 0,
};
const playingArea = {
    maxX: 408,
    maxY: 409,
}
const rowHeight = 83;

// enemy rows calculation
for (let i = 0; i < numberOfEnemies; i++) {
    enemyRows.push(firstEnemyRow + rowHeight * i);
}

// Enemy

const Enemy = function(speed, x, y, player) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png'; 
    this.player = player;
};

Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if (this.x > maxX) {
        this.x = enemyStartX;
        this.speed += 1;
    }
    this.isCollision();
};

Enemy.prototype.isCollision = function() {
    if (Math.abs(this.player.x - this.x) < affectedArea && Math.abs(this.player.y - this.y) < affectedArea) {
        alert("Чао, лузер)");
        this.player.x = defaultPlayer.x;
        this.player.y = defaultPlayer.y;
    }
}

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player

const Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    if (this.x >= 0 && this.x <= playingArea.maxX && this.y > 0 && this.y <= playingArea.maxY) {
            switch (key) {
            case "left" : 
            this.x -= stepSize.x;
            break;

            case "right":
            this.x += stepSize.x;
            break;   
            
            case "up":
            this.y -= stepSize.y;
            if (this.y < winningArea.borderBottom && this.y > winningArea.borderTop) {
                alert("Вітаннячка! Ви виграли!")
                this.x = defaultPlayer.x;
                this.y = defaultPlayer.y;
            }
            break; 

            case "down":
            this.y += stepSize.y;
            break;     
        };
      
        if (this.y > playingArea.maxY || this.x < 0 || this.x > playingArea.maxX) {
            alert("Не виходь за межі поля!");
            this.x = defaultPlayer.x;
            this.y = defaultPlayer.y;
        }
    }
};

function getRandomSpeed(max, min) {
    return Math.random() * (max - min) + min;
}

// Initialization characters

const player = new Player(defaultPlayer.x, defaultPlayer.y);
const allEnemies = [];
for (let i = 0; i < numberOfEnemies; i++) {
    allEnemies.push(new Enemy(getRandomSpeed(initialSpeed.max, initialSpeed.min), enemyStartX, enemyRows[i], player));
};

// event listeners

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
