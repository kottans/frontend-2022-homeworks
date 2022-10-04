const score = document.createElement('p');
score.textContent = `Your score: 0 `;
document.body.append(score);

const field = {
    min: 0,
    borderX: 400,
    borderY: 450,
    waterCoord: 50,
}

const xColDistance = 80;
const yColDistance = 50;

class Enemy {
    constructor(posX, posY, speed) {
        this.posX = posX;
        this.posY = posY;
        this.speed = speed;
        this.width = 100;
        this.height = 50;
        this.sprite = 'images/enemy-bug.png';
    }

    update(dt) {
        this.posX += this.speed * dt;
        if (this.posX > ctx.canvas.width) {
            this.posX = -100;
        }

        this.collision();
    }

    collision() {
        if (player.posX < this.posX + xColDistance && player.posX + xColDistance > this.posX && player.posY < this.posY + yColDistance && yColDistance + player.posY > this.posY) {
            player.goToStartPosition();
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.posX, this.posY);
    }
}

class Player {
    constructor(posX, posY) {
        this.posX = posX;
        this.posY = posY;
        this.stepX = 100;
        this.stepY = 90;
        this.stat = 0;
        this.startPositionX = 200;
        this.startPositionY = 400;
        this.width = 80;
        this.height = 80;
    
        this.sprite = 'images/char-boy.png';
    }

    update() {
        this.win();
    }

    win() {
        if (field.min >= this.posY) {
            this.stat += 1;
            score.textContent = `Your score: ${this.stat}`;
            this.goToStartPosition();
        }
    }

    goToStartPosition() {
        this.posX = this.startPositionX;
        this.posY = this.startPositionY;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.posX, this.posY);
    }

    handleInput(key) {
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
}

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

let allEnemies = allEnemyVal.map(({x, y, speed}) => new Enemy(x, y, speed));

let player = new Player(200, 400);

document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        65: 'left',
        38: 'up',
        87: 'up',
        39: 'right',
        68: 'right',
        40: 'down',
        83: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
