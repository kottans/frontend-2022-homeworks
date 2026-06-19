const playArea = {
    width: 505,
    gridWidth: 101,
    gridHeight: 82
}

const enemy = {
    minSpeed: 100,
    maxSpeed: 300,
    localionY: [63, 147, 230]
}

const playerStarting = {
    x: 202,
    y: 400,
    pause: 500
}

class Enemy {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
    }
    update(dt) {
        this.x += this.speed * dt;

        if (this.x > playArea.width) {

            this.x = -(playArea.gridWidth);
            this.speed = (Math.random() * (enemy.maxSpeed + enemy.minSpeed) + enemy.minSpeed);
        }

        if (player.x < this.x + playArea.gridWidth &&
            player.x + playArea.gridWidth > this.x &&
            player.y < this.y + playArea.gridHeight &&
            playArea.gridHeight + player.y > this.y) {

            player.x = playerStarting.x;
            player.y = playerStarting.y;

        }
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.player = 'images/char-boy.png';
    }
    update(dt) {
    }
    render() {
        ctx.drawImage(Resources.get(this.player), this.x, this.y);
    }
    handleInput(keyPress) {
        if (keyPress == 'left' && this.x >= playArea.gridWidth) {
            this.x -= playArea.gridWidth;
        }
        if (keyPress == 'right' && this.x < playArea.width - playArea.gridWidth) {
            this.x += playArea.gridWidth;
        }
        if (keyPress == 'up' && this.y > playArea.gridHeight - playArea.gridHeight) {
            this.y -= playArea.gridHeight;
        }
        if (keyPress == 'down' && this.y < playerStarting.y) {
            this.y += playArea.gridHeight;
        }
        if (this.y < (playArea.gridHeight - playArea.gridHeight)) {
            setTimeout(function () {
                player.x = playerStarting.x;
                player.y = playerStarting.y;
            }, playerStarting.pause);
        }
    }
}

let allEnemies = [];

enemy.localionY.forEach(function (locationY) {
    enemyUnit = new Enemy(playArea.width, locationY,enemy.maxSpeed);
    allEnemies.push(enemyUnit);
});

let player = new Player(playerStarting.x, playerStarting.y);

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
