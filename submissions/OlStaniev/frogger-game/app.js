class SizeObject {
    constructor(width, heigth) {
        this.width = width
        this.heigth = heigth
    }
}
const playerSize = new SizeObject(65, 80)
const enemySize = new SizeObject(90, 63)
const tileSize = new SizeObject(100, 83)
const boardSize = new SizeObject(500, 498)
const border = new SizeObject(20, 20)
const enemySpeed = {
    min: 100,
    max: 400
}
const numberOfEnemies = 3
const allEnemies = []

const body = document.querySelector('body')
const div = document.createElement('div')

body.appendChild(div)
div.style.fontSize = '30px'

class Enemy {
    constructor(x, y, speed, player, sprite) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.speed = speed;
        this.start = -enemySize.width;
        this.player = player;
    }
    checkCollision() {
        if (((this.player.x > this.x && this.player.x < this.x + enemySize.width) || (this.player.x < this.x && this.player.x > this.x - enemySize.width))
            && this.player.y - this.y < enemySize.heigth && this.player.y + border.heigth > this.y) {
            this.player.x = this.player.startX
            this.player.y = this.player.startY
            this.player.score = 0
        }
    }
    update(dt) {
        if (this.x > boardSize.width) {
            this.x = this.start
            this.speed = Math.floor(Math.random() * (enemySpeed.max - enemySpeed.min) + enemySpeed.min);
        }
        this.x += dt * this.speed;
        this.checkCollision()
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Player {
    constructor(x, y, sprite) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.score = 0;
        this.startY = y;
        this.startX = x;
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
        if (key === 'right' && this.x < boardSize.width - tileSize.width) { this.x += tileSize.width }
        if (key === 'up') { this.y -= tileSize.heigth }
        if (key === 'down' && this.y + border.heigth < boardSize.heigth - tileSize.heigth) { this.y += tileSize.heigth }
    }
}

const player = new Player((boardSize.width - tileSize.width) / 2, boardSize.heigth - tileSize.heigth - border.heigth, 'images/char-boy.png')

for (let i = 1; i <= numberOfEnemies; i++) {
    const enemy = new Enemy(-enemySize.width, tileSize.heigth * i - border.heigth,
        Math.floor(Math.random() * (enemySpeed.max - enemySpeed.min) + enemySpeed.min), player, 'images/enemy-bug.png');
    allEnemies.push(enemy)
}

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
