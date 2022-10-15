const FIELD_CONF = {
	WIDTH: 400,
	HEIGHT: 400,
	CELL_WIDTH: 100,
	CELL_HEIGHT: 82,
	WATTER_BLOCK: -5,
	ZERO_POSITION: 0
};
const PLAYER_CONF = {
	PLAYER_WIDTH: 52,
	SPRITE: "images/char-boy.png",
	MOVE_LEFT: "left",
	MOVE_RIGHT: "right",
	MOVE_DOWN: "down",
	MOVE_UP: "up",
	INITIAL_POSITION: {
		x: FIELD_CONF.WIDTH / 2,
		y: FIELD_CONF.HEIGHT
	}
};

const ENEMY_CONF = {
	AVATAR_INDIVIDUAL: [
		{ ENEMY_POSITION_Y_TOP: 60, ENEMY_SPEED: 150 },
		{ ENEMY_POSITION_Y_MIDDLE: 145, ENEMY_SPEED: 200 },
		{ ENEMY_POSITION_Y_BOTTOM: 228, ENEMY_SPEED: 100 }
	],
	PADDING_AVATAR_X: 75,
	PADDING_AVATAR_Y: 50,
	SPRITE: "images/enemy-bug.png",
	START_POSITION_X: FIELD_CONF.ZERO_POSITION - FIELD_CONF.CELL_WIDTH,
	END_POSITION_X: FIELD_CONF.WIDTH + FIELD_CONF.CELL_WIDTH
};
const Enemy = function (x, y, speed, player) {
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.player = player;
	this.sprite = ENEMY_CONF.SPRITE;
};

Enemy.prototype.update = function (dt) {
	this.x += this.speed * dt;
	if (this.x > ENEMY_CONF.END_POSITION_X) {
		this.x = ENEMY_CONF.START_POSITION_X;
	}
	this.checkCollisions();
};

Enemy.prototype.checkCollisions = function () {
	if (
		this.player.x + ENEMY_CONF.PADDING_AVATAR_X > this.x &&
		this.player.x < ENEMY_CONF.PADDING_AVATAR_X + this.x &&
		this.player.y < ENEMY_CONF.PADDING_AVATAR_Y + this.y &&
		this.player.y + ENEMY_CONF.PADDING_AVATAR_Y > this.y
	) {
		alert("Game over! Score: 0");
		this.player.reset();
	}
};

Enemy.prototype.render = function () {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
const Player = function (x, y) {
	this.x = x;
	this.y = y;
	this.score = 0;
	this.sprite = PLAYER_CONF.SPRITE;
};

Player.prototype.update = function () {};
Player.prototype.reset = function () {
	this.x = PLAYER_CONF.INITIAL_POSITION.x;
	this.y = PLAYER_CONF.INITIAL_POSITION.y;
};

Player.prototype.render = function () {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (allowedKey) {
	if (
		allowedKey === PLAYER_CONF.MOVE_LEFT &&
		this.x > FIELD_CONF.ZERO_POSITION
	) {
		this.x -= FIELD_CONF.CELL_WIDTH;
	}
	if (allowedKey === PLAYER_CONF.MOVE_RIGHT && this.x < FIELD_CONF.WIDTH) {
		this.x += FIELD_CONF.CELL_WIDTH;
	}
	if (allowedKey === PLAYER_CONF.MOVE_DOWN && this.y < FIELD_CONF.HEIGHT) {
		this.y += FIELD_CONF.CELL_HEIGHT;
	}
	if (
		allowedKey === PLAYER_CONF.MOVE_UP &&
		this.y > FIELD_CONF.ZERO_POSITION
	) {
		this.y -= FIELD_CONF.CELL_HEIGHT;
	}
	if (this.y < FIELD_CONF.WATTER_BLOCK) {
		this.score++;
		setTimeout(() => {
			alert(`You win! Score: ${this.score}`);
			this.reset();
		}, 100);
	}
};

const player = new Player();
player.reset();

const allEnemies = ENEMY_CONF.AVATAR_INDIVIDUAL.map((enemy) => {
	const enemyProps = Object.values(enemy);
	return new Enemy(
		ENEMY_CONF.START_POSITION_X,
		enemyProps[0],
		enemyProps[1],
		player
	);
});

document.addEventListener("keyup", function (e) {
	var allowedKeys = {
		37: "left",
		38: "up",
		39: "right",
		40: "down"
	};
	player.handleInput(allowedKeys[e.keyCode]);
});
