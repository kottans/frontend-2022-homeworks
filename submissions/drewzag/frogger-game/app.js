const FIELD_ROW = 5
const FIELD_COLS = 5
const CELL_X_SIZE = 101
const CELL_Y_SIZE = 83
const FIELD_X_SIZE = FIELD_COLS * CELL_X_SIZE
const FIELD_Y_SIZE = FIELD_ROW * CELL_Y_SIZE

const ENEMY_MIN_SPEED = 100
const ENEMY_MAX_SPEED = 400
const ENEMY_SIZE_X = 48
const ENEMY_SIZE_Y = 48

const PLAYER_START_COL = 2
const PLAYER_START_ROW = 5
const PLAYER_SIZE_Y = 35
const PLAYER_START_X = CELL_X_SIZE * PLAYER_START_COL
const PLAYER_START_Y = CELL_Y_SIZE * PLAYER_START_ROW - PLAYER_SIZE_Y

let isFreeze = false

const randomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

const congrats = function (player) {
  const check = document.querySelector('div')
  if (!check) {
    const parent = document.querySelector('body')
    const popup = document.createElement('div')

    popup.innerHTML = '<h2>You Win!</h2> <br/> Press Enter to play again'
    popup.style.cssText = `
    position: absolute;
    display: flex;
    flex-direction: column;
    top: -10%;
    left: 50%;
    transform: translate(-50%, 50%);
    width: 400px;
    height: 400px;
    background-color: white;
    border-radius: 30px;
    align-items: center;
    justify-content: center;
    font-size: 2em;
    opacity: 80%;
    `
    isFreeze = true
    parent.append(popup)

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        popup.remove()
        player.x = PLAYER_START_X
        player.y = PLAYER_START_Y
        isFreeze = false
      }
    })
  }
}

const Character = function (x, y, sprite) {
  this.x = x
  this.y = y
  this.sprite = sprite
}

var Enemy = function (x, y, sprite, speed, player) {
  Character.call(this, x, y, sprite)
  this.speed = speed
  this.player = player
}

Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
}

Enemy.prototype.update = function (dt) {
  this.x += this.speed * dt

  if (this.x > FIELD_X_SIZE) {
    this.x = -CELL_X_SIZE
    this.speed = randomNumber(ENEMY_MIN_SPEED, ENEMY_MAX_SPEED)
  }
  this.collisions()
}

Enemy.prototype.collisions = function () {
  if (
    this.player.y === this.y &&
    this.player.x < this.x + ENEMY_SIZE_Y * 1.5 &&
    this.player.x > this.x - ENEMY_SIZE_Y * 1.5
  ) {
    player.x = PLAYER_START_X
    player.y = PLAYER_START_Y
  }
}

var Player = function (x, y, sprite) {
  Character.call(this, x, y, sprite)
}

Player.prototype.update = function () {
  if (this.x > FIELD_X_SIZE - CELL_X_SIZE) this.x = FIELD_X_SIZE - CELL_X_SIZE
  if (this.x < 0) this.x = 0
  if (this.y > FIELD_Y_SIZE - PLAYER_SIZE_Y) this.y = PLAYER_START_Y
  if (this.y < 0) {
    this.y = -PLAYER_SIZE_Y
    congrats(this)
  }
}

Player.prototype.handleInput = function (direction) {
  if (!isFreeze) {
    switch (direction) {
      case 'left':
        this.x -= CELL_X_SIZE
        break
      case 'up':
        this.y -= CELL_Y_SIZE
        break
      case 'right':
        this.x += CELL_X_SIZE
        break
      case 'down':
        this.y += CELL_Y_SIZE
        break
    }
  }
}

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
}

const player = new Player(PLAYER_START_X, PLAYER_START_Y, 'images/char-boy.png')
const allEnemies = []
for (let i = 0; i < 3; i++) {
  let count = i
  if (i >= 3) {
    count = randomNumber(0, 2)
  }
  allEnemies.push(
    new Enemy(
      0,
      count * CELL_Y_SIZE + ENEMY_SIZE_Y,
      'images/enemy-bug.png',
      randomNumber(ENEMY_MIN_SPEED, ENEMY_MAX_SPEED),
      player
    )
  )
}

document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
  }

  player.handleInput(allowedKeys[e.keyCode])
})
