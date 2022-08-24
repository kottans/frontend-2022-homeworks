// Enemies our player must avoid
class Enemy  {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started

	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	constructor(x, y, speed) {
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.sprite = 'images/enemy-bug.png'
	}

	update(dt) {
		this.x += this.speed * dt

		if (this.x > 530) {
			this.x = -100
			this.speed = 100 + Math.floor(Math.random() * 300)
		}
	}

	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
	}
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
class Player {
	constructor(x, y, sprite) {
		this.sprite = sprite
		this.x = x
		this.y = y
		this.level = 1
	}

	update() {
		if (this.x > 420) this.x = 402
		if (this.x < -20) this.x = -2
		if (this.y > 400) this.y = 380
		if (this.y < 40) setTimeout(() => {
			this.x = 200
			this.y = 380
		}, 200)
		if (this.y < -35) this.y = -35
	}
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
	}

	handleInput(direction) {
		switch (direction) {
			case 'up':
				this.y -= 83
				break
			case 'down':
				this.y += 83
				break
			case 'left':
				this.x -= 101
				break
			case 'right':
				this.x += 101
				break
		}
	}

	click(e) {
		const diffX = Math.abs(player.x - e.offsetX + 50)
		const diffY = Math.abs(player.y - e.offsetY + 130)

		if (diffX > diffY) {
			if (player.x > e.offsetX - 50) player.x -= 101
			else player.x += 101
		}
		else {
			if (player.y > e.offsetY - 130) player.y -= 83
			else player.y += 83
		}
	}

	tap(e) {
		e.preventDefault()

		const diffX = Math.abs(player.x - e.touches[0].clientX + 60)
		const diffY = Math.abs(player.y - e.touches[0].clientY + 190)

		if (diffX > diffY) {
			if (player.x > e.touches[0].clientX - 60) player.x -= 101
			else player.x += 101
		}
		else {
			if (player.y > e.touches[0].clientY - 190) player.y -= 83
			else player.y += 83
		}
	}
}

class Star {

	constructor(x, y, sprite) {
		this.x = x;
		this.y = y;
		this.sprite = sprite
	}

	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
	}
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

function creteEnemies(num) {

	if (num > 6) num = 6
	const arrEnemies = []

	for (let i = 50; i < num * 83; i += 83) {
		let y = i
		if (i > 216 && i < 300) y = 50
		else if (i > 300 && i < 383) y = 133
		else if (i > 383 && i < 466) y = 210
		let x = -100 + Math.floor(Math.random() * -300)
		let speed = 100 + Math.floor(Math.random() * 300)
		arrEnemies.push(new Enemy(x, y, speed))
	}

	return arrEnemies
}

function createStars(img) {
	const arrStars = []
	for (let i = 0; i < 5; i ++) {
		let y = i * 101
		arrStars.push(new Star(y, -35, img))
	}

	return arrStars
}

let numOfEnemies = window.prompt('Enter the initial number of enemies (1-6)', 3);
let allEnemies = creteEnemies(+numOfEnemies || 3)
let allStars = createStars('images/Gem Blue.png')
const player = new Player(200, 380, 'images/char-cat-girl.png')



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
