const X_SIZE = 101
const Y_SIZE = 83
const ROWS = 6
const COLUMNS = 5
const START_ROW = 5
const START_COLUMN = 2
const WIDTH_FIELD = COLUMNS * X_SIZE
const HEIGHT_FIELD = ROWS * Y_SIZE
const Y_OFFSET_PLAYER = 35
const Y_OFFSET_ENEMY = 35
const X_OFFSET_ENEMY = 20
const START_PLAYER_X_POSITION = X_SIZE * START_COLUMN
const START_PLAYER_Y_POSITION = Y_SIZE * START_ROW - Y_OFFSET_PLAYER
const DEFAULT_NUM_OF_ENEMIES = 3
const X_OFFSET_CLICK = 50
const Y_OFFSET_CLICK = 130
const X_OFFSET_TAP = 50
const Y_OFFSET_TAP = 130
const MIN_SPEED = 100
const MAX_SPEED = 300
const PLAYER_IMG = 'images/char-cat-girl.png'
const ENEMY_IMG = 'images/enemy-bug.png'
const STARS_IMG_LEVEL = {
	1: 'images/Gem Blue.png',
	2: 'images/Gem Green.png',
	3: 'images/Gem Orange.png',
	4: 'images/Gem Red.png',
}
const MAX_LEVEL = Object.keys(STARS_IMG_LEVEL).length

let offsetLeft = 0
let offsetTop = 0

function randomMinMax(min, max)  {
	return Math.floor(min + Math.random() * (max + 1 - min))
}

const Thing = function(x, y, sprite) {
	this.x = x
	this.y = y
	this.sprite = sprite
}

Thing.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
}

// Enemies our player must avoid
const Enemy = function(x, y, sprite, speed, antagonist) {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started

	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	Thing.call(this, x, y, sprite)

	this.speed = speed
	this.antagonist = antagonist
}

Enemy.prototype = Object.create(Thing.prototype)

Enemy.prototype.update = function(dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
	this.x += this.speed * dt

	if (this.x > WIDTH_FIELD) {
		this.x = -X_SIZE
		this.speed = randomMinMax(MIN_SPEED, MAX_SPEED)
	}

	this.collisions()
}

Enemy.prototype.collisions = function() {
	if (this.antagonist.y + Y_OFFSET_PLAYER === this.y + Y_OFFSET_ENEMY &&
		this.antagonist.x < this.x + X_SIZE / 2 + X_OFFSET_ENEMY &&
		this.antagonist.x > this.x - X_SIZE / 2 - X_OFFSET_ENEMY) reloadLevel(false)
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// Enemy.prototype.update = function(dt) {
// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.
// }

// Draw the enemy on the screen, required method for game
// Enemy.prototype.render = function() {
// 	ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
// }

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function (x, y, sprite) {
	Thing.call(this, x, y, sprite)

	this.level = 1
}

Player.prototype = Object.create(Thing.prototype)

Player.prototype.update = function () {
	if (this.x > WIDTH_FIELD - X_SIZE) this.x = WIDTH_FIELD - X_SIZE
	if (this.x < 0) this.x = 0
	if (this.y > HEIGHT_FIELD - Y_OFFSET_PLAYER * 2) this.y = START_PLAYER_Y_POSITION
	if (this.y < 0)
		setTimeout(() => {
			this.x = START_PLAYER_X_POSITION
			this.y = START_PLAYER_Y_POSITION
		}, 200)
	if (this.y < 0) this.y = -Y_OFFSET_PLAYER
}

Player.prototype.handleInput = function (direction) {
	switch (direction) {
		case 'up':
			this.y -= Y_SIZE
			break
		case 'down':
			this.y += Y_SIZE
			break
		case 'left':
			this.x -= X_SIZE
			break
		case 'right':
			this.x += X_SIZE
			break
	}
}

Player.prototype.click = function (e) {
	const X_DIFF = Math.abs(this.x - e.offsetX + X_OFFSET_CLICK)
	const Y_DIFF = Math.abs(this.y - e.offsetY + Y_OFFSET_CLICK)

	if (X_DIFF > Y_DIFF) {
		if (this.x > e.offsetX - X_OFFSET_CLICK) this.x -= X_SIZE
		else this.x += X_SIZE
	}
	else {
		if (this.y > e.offsetY - Y_OFFSET_CLICK) this.y -= Y_SIZE
		else this.y += Y_SIZE
	}
}

Player.prototype.tap = function (e) {
	e.preventDefault()

	const X_DIFF = Math.abs((this.x + X_OFFSET_TAP * 2) - (e.touches[0].clientX + X_OFFSET_TAP - offsetLeft))
	const Y_DIFF = Math.abs((this.y + Y_OFFSET_TAP) - (e.touches[0].clientY - offsetTop))

	if (X_DIFF > Y_DIFF) {
		if (this.x + X_OFFSET_TAP * 2 > e.touches[0].clientX + X_OFFSET_TAP - offsetLeft) this.x -= X_SIZE
		else this.x += X_SIZE
	}
	else {
		if (this.y + Y_OFFSET_TAP > e.touches[0].clientY - offsetTop) this.y -= Y_SIZE
		else this.y += Y_SIZE
	}
}

const Star = function (x, y, sprite, raider, index) {
	Thing.call(this, x, y, sprite)

	this.raider = raider
	this.index = index
}

Star.prototype = Object.create(Thing.prototype)

Star.prototype.update = function() {
	this.collisions()
}

Star.prototype.collisions = function() {
	if (this.raider.y + Y_OFFSET_PLAYER === this.y + Y_OFFSET_ENEMY &&
		this.raider.x === this.x) reloadLevel(true, this.index)
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

function creteEnemies(num) {
	if (num > 6) num = 6
	allEnemies.splice(0, allEnemies.length)

	for (let i = 1; i < num + 1; i++) {
		let y = i
		if (i === 4) y = 1
		if (i === 5) y = 2
		if (i === 6) y = 3
		y = y * Y_SIZE - Y_OFFSET_ENEMY
		const x = -randomMinMax(X_SIZE, X_SIZE * 3)
		const speed = randomMinMax(MIN_SPEED, MAX_SPEED)
		allEnemies.push(new Enemy(x, y, ENEMY_IMG, speed, player))
	}
}

function createStars(img) {
	allStars.splice(0, allStars.length)

	for (let i = 0; i < 5; i ++) {
		let y = i * X_SIZE
		allStars.push(new Star(y, -(Y_SIZE * 5 - START_PLAYER_Y_POSITION), img, player, i))
	}
}

// Create Player, Enemies and Gems
const player = new Player(START_PLAYER_X_POSITION, START_PLAYER_Y_POSITION, PLAYER_IMG)
const allEnemies = []
const allStars = []
creteEnemies(DEFAULT_NUM_OF_ENEMIES)
createStars(STARS_IMG_LEVEL[1])

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
	const allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	}

	player.handleInput(allowedKeys[e.keyCode])
})

// Fill array of stars
function setStars(img) {
	setTimeout(() => createStars(img), 300)
}

// Reload or up level
function reloadLevel(levelUp, index) {
	// When colliding with a star
	if (levelUp) {
		delete allStars[index]
		// When no more stars
		if (allStars.every(el => el === '')) {
			if (player.level === MAX_LEVEL) {
				alert('You won!')
				player.level = 1
				creteEnemies(DEFAULT_NUM_OF_ENEMIES)
				setStars(STARS_IMG_LEVEL[player.level])
			}
			else {
				player.level++
				creteEnemies(allEnemies.length + 1)
				setStars(STARS_IMG_LEVEL[player.level])
			}
		}
	}
	// When colliding with an enemy
	else {
		player.x = START_PLAYER_X_POSITION
		player.y = START_PLAYER_Y_POSITION
		setStars(STARS_IMG_LEVEL[player.level])
	}
}

function addClickAndTap() {
	const canvas = document.querySelector('canvas')
	offsetLeft = canvas.getBoundingClientRect().left
	offsetTop = canvas.getBoundingClientRect().top

	canvas.addEventListener('click', (e) => player.click(e))
	canvas.addEventListener("touchstart", (e) => player.tap(e))
}
