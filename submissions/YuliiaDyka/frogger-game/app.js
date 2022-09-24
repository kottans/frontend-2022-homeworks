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
      numberofEnemies = 4;
const enemyRows = [230, 146, 63, 313];
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

// Enemy

const Enemy = function(speed, x, y) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png'; 

};

Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if (this.x > maxX) {
        this.x = enemyStartX;
        this.speed += 1;
    }

    if (Math.abs(player.x - this.x) < affectedArea && Math.abs(player.y - this.y) < affectedArea) {
        alert("Чао, лузер)");
        player.x = defaultPlayer.x;
        player.y = defaultPlayer.y;

    }
};

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
    if (this.y < winningArea.borderBottom && this.y > winningArea.borderTop) {
        alert("Вітаннячка! Ви виграли!")
        this.x = defaultPlayer.x;
        this.y = defaultPlayer.y;
    }
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
for (let i = 0; i < numberofEnemies; i++) {
    allEnemies[i] = new Enemy(getRandomSpeed(initialSpeed.max, initialSpeed.min), enemyStartX, enemyRows[i]);
}

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
