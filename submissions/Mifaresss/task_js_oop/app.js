const CELL_WIDTH = 101;
const CELL_HEIGHT = 83;
const COLUMNS = 5;
const ROWS = 6;
const FIELD_WIDTH = CELL_WIDTH * COLUMNS;
const FIELD_HEIGHT = CELL_HEIGHT * ROWS;

const PLAYER_WIDTH = 77;
const PLAYER_HEIGHT = 64;
const PLAYER_START_POSITION_X = CELL_WIDTH * Math.floor(COLUMNS / 2);
const PLAYER_START_POSITION_Y = PLAYER_HEIGHT * ROWS;
const AVAILABLE_PLACES_FOR_PLAYER = {
	minX: PLAYER_START_POSITION_X - CELL_WIDTH * 2,
	maxX: PLAYER_START_POSITION_X + CELL_WIDTH * 2,
	minY: PLAYER_START_POSITION_Y - CELL_HEIGHT * 5,
	maxY: PLAYER_START_POSITION_Y
}

const ENEMIES_SPEED = { min: 100, max: 350 };
const ENEMIES_START_POSITION_X = -100;
const ENEMIES_START_POSITION_Y = [60, 143, 226];


const Character = function (x, y, sprite) {
	this.x = x;
	this.y = y;
	this.sprite = sprite;
}
Character.prototype.render = function () {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// ============================ Player ============================
const Player = function (x, y, sprite) {
	Character.call(this, x, y, sprite)
	this.stepLengthX = CELL_WIDTH;
	this.stepLengthY = CELL_HEIGHT;
}
Player.prototype = Object.create(Character.prototype)
Player.prototype.update = function (dt) {
	this.goToStart();
}
Player.prototype.goToStart = function () {
	if (this.y == AVAILABLE_PLACES_FOR_PLAYER.minY) {
		setTimeout(() => {
			this.x = PLAYER_START_POSITION_X;
			this.y = PLAYER_START_POSITION_Y;
		}, 400);
	}
}
Player.prototype.handleInput = function (allowedKey) {
	if (allowedKey === 'left') {
		if (this.x > AVAILABLE_PLACES_FOR_PLAYER.minX) this.x -= this.stepLengthX;
	} else if (allowedKey === 'up') {
		if (this.y > AVAILABLE_PLACES_FOR_PLAYER.minY) this.y -= this.stepLengthY;
	} else if (allowedKey === 'right') {
		if (this.x < AVAILABLE_PLACES_FOR_PLAYER.maxX) this.x += this.stepLengthX;
	} else if (allowedKey === 'down') {
		if (this.y < AVAILABLE_PLACES_FOR_PLAYER.maxY) this.y += this.stepLengthY;
	}
}

const player = new Player(PLAYER_START_POSITION_X, PLAYER_START_POSITION_Y, 'images/char-horn-girl.png');



// ============================ Enemies ============================
const Enemy = function (x, y, sprite, player) {
	Character.call(this, x, y, sprite)
	this.speed = getRandomSpeed(ENEMIES_SPEED.min, ENEMIES_SPEED.max);
	this.player = player;
};
Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.moveEnemy = function (time) {
	this.x += this.speed * time;
	if (this.x > FIELD_WIDTH) {
		this.x = ENEMIES_START_POSITION_X;
		this.speed = getRandomSpeed(ENEMIES_SPEED.min, ENEMIES_SPEED.max);
	}
}
Enemy.prototype.update = function (dt) {
	this.moveEnemy(dt);
	this.checkClash();
}
Enemy.prototype.checkClash = function () {
	if (
		this.player.x < this.x + PLAYER_WIDTH &&
		this.player.x + PLAYER_WIDTH > this.x &&
		this.player.y < this.y + PLAYER_HEIGHT &&
		this.player.y + PLAYER_HEIGHT > this.y
	) {
		this.player.x = PLAYER_START_POSITION_X;
		this.player.y = PLAYER_START_POSITION_Y;
	}
}

const allEnemies = [];
function createEnemies(num) {
	// The maximum allowed number of enemies is 9
	if (num >= 10) return false;
	for (let i = 1; i <= num; i++) {
		let positionY = 0;
		if (i == 1 || i == 4 || i == 7) positionY = ENEMIES_START_POSITION_Y[0];
		if (i == 2 || i == 5 || i == 8) positionY = ENEMIES_START_POSITION_Y[1];
		if (i == 3 || i == 6 || i == 9) positionY = ENEMIES_START_POSITION_Y[2];

		allEnemies.push(new Enemy(ENEMIES_START_POSITION_X, positionY, 'images/enemy-bug.png', player));
	}
}
createEnemies(3);





function getRandomSpeed(min, max) {
	return min + Math.floor(Math.random() * (max + 1 - min));
}

document.addEventListener('keyup', function (e) {
	const allowedKey = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};
	player.handleInput(allowedKey[e.keyCode]);
});
