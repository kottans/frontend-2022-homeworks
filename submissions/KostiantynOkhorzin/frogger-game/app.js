const config = {
    canvas: {
        width: 505,
        blockWidth: 101,
        blockHeight: 80,
    },
    enemy: {
        minSpeed: 100,
        maxSpeed: 300,
        initialPositionOnX: -101,
        initialPositionOnY: {
            firstLine: 80,
            secondLine: 160,
            thirdLine: 240
        },
        numberOfEnemy: {
            firstLine: 1,
            secondLine: 2,
            thirdLine: 1
        }
    },
    player: {
        initialPositionOnX: 202,
        initialPositionOnY: 400
    }
};

class Enemy {
    constructor(y) {
        this.x = config.enemy.initialPositionOnX;
        this.y = y;
        this.speed = this.randomSpeed();
        this.sprite = 'images/enemy-bug.png';
    }

    randomSpeed() {
        return Math.round(Math.random() * (config.enemy.maxSpeed - config.enemy.minSpeed) + config.enemy.minSpeed);
    }

    checkCollision() {
        if(player.x < this.x + config.canvas.blockWidth &&
            player.x + config.canvas.blockWidth > this.x &&
            player.y < this.y + config.canvas.blockHeight && 
            config.canvas.blockHeight + player.y > this.y) {
            player.x = config.player.initialPositionOnX;
            player.y = config.player.initialPositionOnY;
        }
    }

    update(dt) {
        this.x += this.speed * dt;

        if (this.x > config.canvas.width) {
            this.x = config.enemy.initialPositionOnX;
            this.speed = this.randomSpeed();
        };

        this.checkCollision();
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

class Player {
    constructor(sprite = 'images/char-boy.png') {
        this.x = config.player.initialPositionOnX;
        this.y = config.player.initialPositionOnY;
        this.sprite = sprite;

    }

    update() {
        if (this.y < config.canvas.blockHeight) {
            this.x = config.player.initialPositionOnX;
            this.y = config.player.initialPositionOnY;
        };
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(keyPress) {
        if (keyPress == 'left' && this.x >= config.canvas.blockWidth) {
            this.x -= config.canvas.blockWidth;
        };
        if (keyPress == 'right' && this.x < config.canvas.width - config.canvas.blockWidth) {
            this.x += config.canvas.blockWidth;
        };
        if (keyPress == 'up' && this.y >= config.canvas.blockHeight) {
            this.y -= config.canvas.blockHeight;
        };
        if (keyPress == 'down' && this.y < config.player.initialPositionOnY) {
            this.y += config.canvas.blockHeight;
        };
    }
};

const player = new Player();

const allEnemies = [];

const createEnemy = (positionY, numberEnemy) => {
    for (let line in positionY) {
        for (let enemy = 0; enemy < numberEnemy[line]; enemy++) {
            allEnemies.push(new Enemy(positionY[line]));
        }
    }
};

createEnemy(config.enemy.initialPositionOnY, config.enemy.numberOfEnemy);

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});




