const X_STEP = 101
const Y_STEP = 83
const INITIAL_ENEMIES_Y_POSITIONS = [50, 133, 210]
const START_ENEMIES_Y_POSITION = INITIAL_ENEMIES_Y_POSITIONS[0]
const START_PLAYER_X_POSITION = 200
const START_PLAYER_Y_POSITION = 380
const DEFAULT_NUM_OF_ENEMIES = 3
const X_OFFSET_CLICK = 50
const Y_OFFSET_CLICK = 130
const X_OFFSET_TAP = 50
const Y_OFFSET_TAP = 130
const MIN_SPEED = 100
const MAX_SPEED = 200

let offsetLeft = 0
let offsetTop = 0

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

	this.speed = speed;
	this.antagonist = antagonist
}

Enemy.prototype = Object.create(Thing.prototype)

Enemy.prototype.update = function(dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
	this.x += this.speed * dt

	if (this.x > 530) {
		this.x = -100
		this.speed = MIN_SPEED + Math.floor(Math.random() * MAX_SPEED)
	}

	this.collisions()

}

Enemy.prototype.collisions = function() {
	if (this.antagonist.x < this.x + 70 &&
		this.antagonist.x + 70 > this.x &&
		this.antagonist.y < this.y + 80 &&
		this.antagonist.y + 80 > this.y) reloadLevel(false)
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
	if (this.x > START_PLAYER_X_POSITION + X_STEP * 2 + X_STEP / 2)
		this.x = START_PLAYER_X_POSITION + X_STEP * 2
	if (this.x < START_PLAYER_X_POSITION - X_STEP * 2 - X_STEP / 2)
		this.x = START_PLAYER_X_POSITION - X_STEP * 2
	if (this.y > START_PLAYER_Y_POSITION + Y_STEP / 2) this.y = START_PLAYER_Y_POSITION
	if (this.y < Y_STEP * 5 - START_PLAYER_Y_POSITION + 5)
		setTimeout(() => {
			this.x = START_PLAYER_X_POSITION
			this.y = START_PLAYER_Y_POSITION
		}, 200)
	if (this.y < -(Y_STEP * 5 - START_PLAYER_Y_POSITION))
		this.y = -(Y_STEP * 5 - START_PLAYER_Y_POSITION)
}

Player.prototype.handleInput = function (direction) {
	switch (direction) {
		case 'up':
			this.y -= Y_STEP
			break
		case 'down':
			this.y += Y_STEP
			break
		case 'left':
			this.x -= X_STEP
			break
		case 'right':
			this.x += X_STEP
			break
	}
}

Player.prototype.click = function (e) {
	const X_DIFF = Math.abs(this.x - e.offsetX + X_OFFSET_CLICK)
	const Y_DIFF = Math.abs(this.y - e.offsetY + Y_OFFSET_CLICK)

	if (X_DIFF > Y_DIFF) {
		if (this.x > e.offsetX - X_OFFSET_CLICK) this.x -= X_STEP
		else this.x += X_STEP
	}
	else {
		if (this.y > e.offsetY - Y_OFFSET_CLICK) this.y -= Y_STEP
		else this.y += Y_STEP
	}
}

Player.prototype.tap = function (e) {
	e.preventDefault()

	const X_DIFF = Math.abs((this.x + X_OFFSET_TAP * 2) - (e.touches[0].clientX + X_OFFSET_TAP - offsetLeft))
	const Y_DIFF = Math.abs((this.y + Y_OFFSET_TAP) - (e.touches[0].clientY - offsetTop))

	if (X_DIFF > Y_DIFF) {
		if (this.x + X_OFFSET_TAP * 2 > e.touches[0].clientX + X_OFFSET_TAP - offsetLeft) this.x -= X_STEP
		else this.x += X_STEP
	}
	else {
		if (this.y + Y_OFFSET_TAP > e.touches[0].clientY - offsetTop) this.y -= Y_STEP
		else this.y += Y_STEP
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
	if (this.raider.x < this.x + 70 &&
		this.raider.x + 70 > this.x &&
		this.raider.y < this.y + 80 &&
		this.raider.y + 80 > this.y) {
		reloadLevel(true, this.index)
	}
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

function creteEnemies(num) {
	if (num > 6) num = 6
	const arrEnemies = []

	for (let i = START_ENEMIES_Y_POSITION; i < num * Y_STEP; i += Y_STEP) {
		let y = i
		if (i > START_ENEMIES_Y_POSITION + Y_STEP * 2 && i <= START_ENEMIES_Y_POSITION + Y_STEP * 3)
			y = INITIAL_ENEMIES_Y_POSITIONS[0]
		else if (i > START_ENEMIES_Y_POSITION + Y_STEP * 3 && i <= START_ENEMIES_Y_POSITION + Y_STEP * 4)
			y = INITIAL_ENEMIES_Y_POSITIONS[1]
		else if (i > START_ENEMIES_Y_POSITION + Y_STEP * 4 && i <= START_ENEMIES_Y_POSITION + Y_STEP * 5)
			y = INITIAL_ENEMIES_Y_POSITIONS[2]
		const x = -100 + Math.floor(Math.random() * -200)
		const speed = MIN_SPEED + Math.floor(Math.random() * MAX_SPEED)
		arrEnemies.push(new Enemy(x, y,'images/enemy-bug.png', speed, player))
	}

	return arrEnemies
}

function createStars(img) {
	const arrStars = []

	for (let i = 0; i < 5; i ++) {
		let y = i * X_STEP
		arrStars.push(new Star(y, -(Y_STEP * 5 - START_PLAYER_Y_POSITION), img, player, i))
	}

	return arrStars
}

// Create Player, Enemies and Gems
const player = new Player(START_PLAYER_X_POSITION, START_PLAYER_Y_POSITION, 'images/char-cat-girl.png')
let allEnemies = creteEnemies(DEFAULT_NUM_OF_ENEMIES)
let allStars = createStars('images/Gem Blue.png')

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
	setTimeout(() => allStars = createStars(img), 300)
}

// Reload or up level
function reloadLevel(levelUp, index) {
	// When colliding with a star
	if (levelUp) {
		delete allStars[index]
		// When no more stars
		if (allStars.every(el => el == '')) {
			if (player.level === 1) {
				player.level = 2
				allEnemies = creteEnemies(allEnemies.length + 1)
				setStars('images/Gem Green.png')
			}
			else if (player.level === 2) {
				player.level = 3
				allEnemies = creteEnemies(allEnemies.length + 1)
				setStars('images/Gem Orange.png')
			}
			else if (player.level === 3) {
				player.level = 4
				allEnemies = creteEnemies(allEnemies.length + 1)
				setStars('images/Gem Red.png')
			}
			else {
				alert('You won!')
				player.level = 1
				allEnemies = creteEnemies(DEFAULT_NUM_OF_ENEMIES)
				setStars('images/Gem Blue.png')
			}
		}
	}
	// When colliding with an enemy
	else {
		player.x = 200
		player.y = 380
		if (player.level === 1) {
			setStars('images/Gem Blue.png')
		}
		else if (player.level === 2) {
			setStars('images/Gem Green.png')
		}
		else if (player.level === 3) {
			setStars('images/Gem Orange.png')
		}
		else {
			setStars('images/Gem Red.png')
		}
	}
}

function addClickAndTap() {
	const canvas = document.querySelector('canvas')
	offsetLeft = canvas.getBoundingClientRect().left
	offsetTop = canvas.getBoundingClientRect().top

	canvas.addEventListener('click', (e) => player.click(e))
	canvas.addEventListener("touchstart", (e) => player.tap(e))
}
