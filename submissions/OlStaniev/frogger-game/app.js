class SizeObject {
    constructor(width, heigth) {
        this.width = width
        this.heigth = heigth
    }
}
const playerSize = new SizeObject(65, 80)
const enemySize = new SizeObject(90, 63)
const tileSize = new SizeObject(100, 83)
const border = new SizeObject(20, 20)

const body = document.querySelector('body')
const div = document.createElement('div')

body.appendChild(div)
div.style.fontSize = '30px';

class Enemy {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
        this.start = -enemySize.width;
    }
    checkCollision() {
        if (((player.x > this.x && player.x < this.x + enemySize.width) || (player.x < this.x && player.x > this.x - enemySize.width))
            && player.y - this.y < enemySize.heigth && player.y + border.heigth > this.y
        ) {
            console.log('error');
            player.x = player.startX
            player.y = player.startY
            player.score = 0
        }
        console.log(player)
    }
    update(dt) {
        if (this.x > tileSize.width * 5) {
            this.x = this.start
            this.speed = Math.floor(Math.random() * (400 - 100) + 100);
        }
        this.x += dt * this.speed;
        this.checkCollision()
    };
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
};

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-boy.png';
        this.score = 0;
        this.startY = tileSize.heigth * 5 - border.heigth;
        this.startX = tileSize.width * 2
    }
    update() {
        if (this.y + border.heigth < tileSize.heigth) {
            this.y = this.startY;
            this.x = this.startX
            this.score += 1
        }
        div.textContent = `score: ${this.score}`
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput(key) {
        if (key === 'left' && this.x > border.width) { this.x -= tileSize.width }
        if (key === 'right' && this.x < tileSize.width * 4) { this.x += tileSize.width }
        if (key === 'up') { this.y -= tileSize.heigth }
        if (key === 'down' && this.y + border.heigth < tileSize.heigth * 5) { this.y += tileSize.heigth }
    }
}

const enemy1 = new Enemy(-enemySize.width, tileSize.heigth - border.heigth, 100)
const enemy2 = new Enemy(-enemySize.width, tileSize.heigth * 2 - border.heigth, 150)
const enemy3 = new Enemy(-enemySize.width, tileSize.heigth * 3 - border.heigth, 250)

const allEnemies = [enemy1, enemy2, enemy3]

const player = new Player(tileSize.width * 2, tileSize.heigth * 5 - border.heigth)

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
