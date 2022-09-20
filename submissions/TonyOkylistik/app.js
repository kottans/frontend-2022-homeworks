'use strict'

const random = (max = 100, min = 0) => Math.floor(Math.random() * (max - min) + min)

//first Y-position enemies
const positionEnemy = () => {
    const pos = [60, 145, 230]
    return pos[random(pos.length - 1)]
}

// add new enemy if sum of speed enemies < appearLevel
const addEnemy = () => {
    const sumSpeed = allEnemies.reduce((sum = 0, item) => sum + item.speed, 0)
    const appearLevel = 1000
    if (sumSpeed < appearLevel) {
        allEnemies.push(new Enemy())
    }
}

// reset game
const reset = () => player = new Player()


let Enemy = function (pos = positionEnemy(), xPosition = -100) {
    this.speed = random(1000, 100)
    this.x = xPosition
    this.y = pos
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt

    if (this.x >= 500) {
        this.x = -100
        this.speed = random(1000, 100)
    }
    addEnemy()

    setTimeout(() => {
        if (this.y === player.y && (this.x - 50 < player.x && this.x + 50 > player.x)) {
            alert("you Lose")
            reset()
        }
    }, 0)
};

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

let Player = function (x = 200, y = 400) {
    this.sprite = "images/char-boy.png"
    this.x = x
    this.y = y
}

Player.prototype.update = function () {
    setTimeout(() => {
        if (player.y <= -25) {
            alert('YOU WIN');
            return reset()
        }
    }, 0)
}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function (key) {
    if (key === "left" && this.x > 0) {
        this.x -= 100
    }
    if (key === "right" && this.x < 400) {
        this.x += 100
    }
    if (key === "up" && this.y > -25) {
        this.y -= 85
    }
    if (key === "down" && this.y < 400) {
        this.y += 85
    }
    console.log(this.x, this.y);
}

let allEnemies = [new Enemy(60), new Enemy(145), new Enemy(230)]

let player = new Player()

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});