const gridSize = {
    width: 101,
    height: 81,
}

const fieldSize = {
    width: gridSize.width * 5,
    height: gridSize.height * 6,
    top: 0,
    left: 0,
}

const startPlayerPosition = {
    x: gridSize.width * 2,
    y: gridSize.height * 5,
}

const enemySpeed = 200
const Enemy = function (x = 0, y, speed) {
    this.x = x
    this.y = y
    this.speed = speed
    this.sprite = 'images/enemy-bug.png'
}

Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt

    if (this.x > fieldSize.width) {
        this.x = -gridSize.width
        this.speed = 100 + Math.floor(Math.random() * enemySpeed)
    }

    if (
        player.x + gridSize.width > this.x &&
        player.x < this.x + gridSize.width &&
        player.y + gridSize.height > this.y &&
        player.y < this.y + gridSize.height
    ) {
        player.x = startPlayerPosition.x
        player.y = startPlayerPosition.y
    }
}

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
}
const Player = function (x, y) {
    this.x = x
    this.y = y
    this.sprite = 'images/char-boy.png'
}

Player.prototype.update = function (dt) {}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
}

Player.prototype.handleInput = function (keyPress) {
    if (keyPress == 'up' && this.y > fieldSize.top) {
        this.y -= gridSize.height
    }

    if (keyPress == 'down' && this.y < fieldSize.width - gridSize.width) {
        this.y += gridSize.height
    }

    if (keyPress == 'left' && this.x > fieldSize.left) {
        this.x -= gridSize.width
    }

    if (keyPress == 'right' && this.x < fieldSize.width - gridSize.width) {
        this.x += gridSize.width
    }

    if (this.y <= fieldSize.top) {
        setTimeout(() => {
            this.x = startPlayerPosition.x
            this.y = startPlayerPosition.y
        }, 600)
    }
}

// let positionEnemies = []
// function numbeOfEnemies(amount) {
//     for (let i = 1; i <= amount; i++) {
//         if (i > 3) {
//             return numbeOfEnemies(amount - i + 1)
//         }
//         positionEnemies.push(i)
//     }
//     positionEnemies = positionEnemies.map(
//         (rowNumber) => rowNumber * gridSize.height
//     )
//     console.log(positionEnemies)
//     return positionEnemies
// }

const positionEnemies = {
    first: gridSize.height * 1,
    second: gridSize.height * 2,
    third: gridSize.height * 3,
}

const allEnemies = [
    positionEnemies.first,
    positionEnemies.second,
    positionEnemies.third,
].map((positionY) => (positionY = new Enemy(this.x, positionY, enemySpeed)))

const player = new Player(startPlayerPosition.x, startPlayerPosition.y)

document.addEventListener('keyup', function (e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
    }

    player.handleInput(allowedKeys[e.keyCode])
})
