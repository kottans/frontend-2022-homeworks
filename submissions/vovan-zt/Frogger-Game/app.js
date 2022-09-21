const GRID_SIZE = {
    WIDTH: 101,
    HEIGHT: 81,
}

const FIELD_SIZE = {
    WIDTH: GRID_SIZE.WIDTH * 5,
    HEIGHT: GRID_SIZE.HEIGHT * 6,
    TOP: 0,
    LEFT: 0,
}

const START_PLAYER_POSITION = {
    X: GRID_SIZE.WIDTH * 2,
    Y: GRID_SIZE.HEIGHT * 5,
}

const ENEMY_SPEED = 200

const LOCATION_ENEMIES = {
    FIRST_TRACK: GRID_SIZE.HEIGHT * 1,
    SECOND_TRACK: GRID_SIZE.HEIGHT * 2,
    THIRD_TRACK: GRID_SIZE.HEIGHT * 3,
}
const Enemy = function (x = 0, y, player) {
    this.x = x
    this.y = y
    this.player = player
    this.speed = this.generateSpeed()
    this.sprite = 'images/enemy-bug.png'
}

Enemy.prototype.checkCollision = function () {
    if (
        this.player.x + GRID_SIZE.WIDTH > this.x &&
        this.player.x < this.x + GRID_SIZE.WIDTH &&
        this.player.y + GRID_SIZE.HEIGHT > this.y &&
        this.player.y < this.y + GRID_SIZE.HEIGHT
    ) {
        this.player.resetPlayerPosition()
    }
}

Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt
    this.resetEnemyPosition()
    this.checkCollision()
}

Enemy.prototype.resetEnemyPosition = function () {
    if (this.x > FIELD_SIZE.WIDTH) {
        this.x = -GRID_SIZE.WIDTH
        this.speed = this.generateSpeed()
    }
}

Enemy.prototype.generateSpeed = function () {
    return 100 + Math.floor(Math.random() * ENEMY_SPEED)
}

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
}
const Player = function (x, y) {
    this.x = x
    this.y = y
    this.sprite = 'images/char-boy.png'
}

Player.prototype.resetPlayerPosition = function () {
    this.x = START_PLAYER_POSITION.x
    this.y = START_PLAYER_POSITION.y
}

Player.prototype.update = function (dt) {}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
}

Player.prototype.handleInput = function (keyPress) {
    if (keyPress == 'up' && this.y > FIELD_SIZE.TOP) {
        this.y -= GRID_SIZE.HEIGHT
    }

    if (keyPress == 'down' && this.y < FIELD_SIZE.WIDTH - GRID_SIZE.WIDTH) {
        this.y += GRID_SIZE.HEIGHT
    }

    if (keyPress == 'left' && this.x > FIELD_SIZE.LEFT) {
        this.x -= GRID_SIZE.WIDTH
    }

    if (keyPress == 'right' && this.x < FIELD_SIZE.WIDTH - GRID_SIZE.WIDTH) {
        this.x += GRID_SIZE.WIDTH
    }

    if (this.y <= FIELD_SIZE.TOP) {
        setTimeout(() => {
            this.resetPlayerPosition()
        }, 600)
    }
}

const player = new Player(START_PLAYER_POSITION.X, START_PLAYER_POSITION.Y)

const allEnemies = [
    LOCATION_ENEMIES.FIRST_TRACK,
    LOCATION_ENEMIES.SECOND_TRACK,
    LOCATION_ENEMIES.THIRD_TRACK,
    LOCATION_ENEMIES.SECOND_TRACK,
    LOCATION_ENEMIES.FIRST_TRACK,
].map((trackNumber) => new Enemy(this.x, trackNumber, player))

document.addEventListener('keyup', function (e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
    }

    player.handleInput(allowedKeys[e.keyCode])
})
