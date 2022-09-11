const Enemy = function (x, y, speed) {
    this.x = x
    this.y = y
    this.speed = speed
    this.sprite = "images/enemy-bug.png"
}

Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt
    if (this.x > 505) {
        this.x = -80
    }
    if (
        player.x + 75 > this.x &&
        player.x < this.x + 75 &&
        player.y < this.y + 50 &&
        player.y + 50 > this.y
    ) {
        alert("Game over! Score: 0")
        player.reset()
    }
}

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
}

const Player = function (x, y) {
    this.x = x
    this.y = y
    this.score = 0
    this.sprite = "images/char-boy.png"
}

Player.prototype.update = function () {}
Player.prototype.reset = function () {
    this.x = 200
    this.y = 400
}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
}

Player.prototype.handleInput = function (allowedKey) {
    if (allowedKey === "left" && this.x > 0) {
        this.x -= 100
    }
    if (allowedKey === "right" && this.x < 400) {
        this.x += 100
    }
    if (allowedKey === "down" && this.y < 400) {
        this.y += 82
    }
    if (allowedKey === "up" && this.y > 0) {
        this.y -= 82
    }
    if (this.y < -5) {
        this.score++
        setTimeout(() => {
            alert(`You win! Score: ${this.score}`)
            player.reset()
        }, 100)
    }
}

const enemy1 = new Enemy(0, 60, 150)
const enemy2 = new Enemy(0, 145, 200)
const enemy3 = new Enemy(0, 228, 100)
const allEnemies = [enemy1, enemy2, enemy3]
const player = new Player()
player.reset()

document.addEventListener("keyup", function (e) {
    var allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    }

    player.handleInput(allowedKeys[e.keyCode])
})
