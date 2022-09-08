var leftSide = 0;
var rightSide = 500;
var topSide = 0;
var bottomSide = 500;
var initialGroundY = 60;

var Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
    this.x = x;
    this.y = y;
};

Enemy.prototype.update = function(dt) {
    var shift = this.speed * dt;
    this.x = this.x + shift;
    if (this.x >= rightSide) {
        this.x = -this.width;
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.width = 80;
Enemy.prototype.height = 70;

var Player = function(x, y, speed) {
    this.sprite = 'images/char-princess-girl.png';
    this.speed = speed;
    this.x = x;
    this.y = y;
};

Player.prototype.width = 70;
Player.prototype.height = 70;

Player.prototype.update = function() {
    const isOverlapDetected = allEnemies.some((enemy) => {
        return checkIsOverlap(
            {
                x: player.x,
                y: player.y
            },
            {
                x: player.x + player.width,
                y: player.y + player.height
            },
            {
                x: enemy.x,
                y: enemy.y
            },
            {
                x: enemy.x + enemy.width,
                y: enemy.y + enemy.height
            }
        );
    });

    if (isOverlapDetected) {
        gameOver(false);
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(action) {
    switch (action) {
        case 'left': {
            if (this.x > leftSide) {
                this.x -= this.speed;
            }
            break;
        }
        case 'right': {
            if (this.x + this.width + this.speed < rightSide) {
                this.x += this.speed;
            }
            break;
        }
        case 'down': {
            if (this.y + this.height + this.speed < bottomSide) {
                this.y += this.speed;
            }
            break;
        }
        case 'up': {
            this.y -= this.speed;
            if (this.y <= 0) {
                gameOver(true);
            }

            break;
        }
    }
}

Player.prototype.setPosition = function(x, y) {
    this.x = x;
    this.y = y;
}

function getRandomNumberFromARange(min, max) {
    return (Math.random() * (max - min)) + min;
}

function createRandomEnemy(row) {
    var x = getRandomNumberFromARange(-400, -100);
    var y = initialGroundY + row * 80;
    var speed = getRandomNumberFromARange(100, 300);

    return new Enemy(x, y, speed);
}

var allEnemies = [
    createRandomEnemy(0),
    createRandomEnemy(1), 
    createRandomEnemy(2)
];

var initialPlayerX = 200;
var initialPlayerY = 400;
var playerSpeed = 75;
var player = new Player(initialPlayerX, initialPlayerY, playerSpeed);

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function checkIsOverlap(l1, r1,  l2,  r2) {
    const isRectangleOnLeftSideOfAnother = (l1.x > r2.x || l2.x > r1.x);
    if (isRectangleOnLeftSideOfAnother) {
        return false;
    }

    const isOneRectangleAboveAnother = (r1.y < l2.y || r2.y < l1.y);
    if (isOneRectangleAboveAnother) {
        return false;
    }

    return true;
}

var wins = 0;
var losses = 0;

function gameOver(isWin) {
    if (isWin) {
        wins++;
    } else {
        losses++;
    }

    scoreEl.innerText = `${wins}:${losses}`;
    player.setPosition(initialPlayerX, initialPlayerY);
}

const scoreEl = document.createElement('div');
scoreEl.className = 'score';
scoreEl.innerText = '0:0';
document.body.appendChild(scoreEl);
