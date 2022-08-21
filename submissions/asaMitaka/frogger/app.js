const score = document.createElement('p');
score.textContent = `Your score: 0 `;
document.body.append(score);

const enemyStat = {
    width: 98,
    height: 56,
    sprite: "images/enemy-bug.png",
};

const field = {
    min: -50,
    borderX: 400,
    borderY: 450,
    waterCoord: 50,
}

const playerStat = {
    startPositionX: 200,
    startPositionY: 400
}

let xColDistance = 80;
let yColDistance = 60;

const Enemy = function(posX, posY, speed) {
    this.posX = posX;
    this.posY = posY;
    this.speed = speed;
    this.width = 100;
    this.height = 56;
    this.sprite = "images/enemy-bug.png";
};

Enemy.prototype.update = function(dt) {
    this.posX += this.speed * dt;
    if (this.posX > ctx.canvas.width) {
        this.posX = -100;
    }

    this.collision();
};

Enemy.prototype.collision = function() {
    if (player.posX < this.posX + xColDistance && player.posX + xColDistance > this.posX && player.posY < this.posY + yColDistance && yColDistance + player.posY > this.posY) {
        player.goToStartPosition();
    }
}

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.posX, this.posY);
};

const allEnemyVal = [
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

let allEnemies = allEnemyVal.map(
    ({x, y, speed}) => new Enemy(x, y, speed)
)

const Player = function(posX, posY) {
    this.posX = posX;
    this.posY = posY;
    this.stepX = 100;
    this.stepY = 90;
    this.stat = 0;

    this.width = 80;
    this.height = 80;

    this.sprite = 'images/char-boy.png';
}


Player.prototype.update = function() {
    this.win();
}

Player.prototype.win = function() {
    console.log(field.min, this.posY);
    if (field.min >= this.posY) {
        this.stat += 1;
        score.textContent = `Your score: ${this.stat}`;
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

Player.prototype.handleInput = function(key) {
    switch(key) {
        case 'up':
            this.posY -= this.stepY;
            break;
        case 'down':
            this.posY += this.stepY;
            if (this.posY > field.borderY) {
                this.posY = field.borderY - 50;
            }
            break;
        case 'left':
            this.posX -= this.stepX;
            if (this.posX < this.stepX) {
                this.posX = 0;
            }
            break;
        case 'right':
            this.posX += this.stepX;
            if (this.posX > field.borderX) {
                this.posX = field.borderX;
            }
            break;
    }
}

let player = new Player(playerStat.startPositionX, playerStat.startPositionY);

document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
