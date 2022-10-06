"use srtict";

const CELL = {
	width: 101,
	height: 80
};

const GAME_FIELD = {
	top: 0,
	right: CELL.width * 5,
	bottom: CELL.height * 6,
	left: 0
};

const PLAYER_START = {
	x: CELL.width * 2,
	y: CELL.height * 5 
};

const ENEMY_SPEED = {
	min: 90,
	max: 250 
}; 

const SPRITE = {
	enemy: 'images/enemy-bug.png',
	player: 'images/char-boy.png'
};

const speed = () => ENEMY_SPEED.min + Math.floor(Math.random() * ENEMY_SPEED.max);
const OVERLAP_AMOUNT = 70;
const BORDER = 20;

const Enemy = function (x, y, speed, player) {
	this.x = x;
	this.y = y;
	this.speed = speed();
	this.player = player;
	this.sprite = SPRITE.enemy;	
};

Enemy.prototype.checkColission = function () {
	if(this.player.x + OVERLAP_AMOUNT > this.x &&
	this.player.x < this.x + OVERLAP_AMOUNT &&
	this.player.y + OVERLAP_AMOUNT > this.y &&
	this.player.y < this.y + OVERLAP_AMOUNT) {
	this.player.x = PLAYER_START.x;
	this.player.y = PLAYER_START.y;
	}
};

Enemy.prototype.update = function (dt) {
	if (this.x > GAME_FIELD.right) {
		this.x -= GAME_FIELD.right + CELL.width;
		this.speed = speed();
		}
	this.x += this.speed * dt;
	this.checkColission();
};

Enemy.prototype.render = function () {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const Player = function () {
	this.x = PLAYER_START.x;
	this.y = PLAYER_START.y;
	this.sprite = SPRITE.player;	
};

Player.prototype.update = function (dt) {};

Player.prototype.handleInput = function (keyPress) {
	if (keyPress == 'left' && this.x > GAME_FIELD.left) {
		this.x -= CELL.width;
		}
	if (keyPress == 'right' && this.x < GAME_FIELD.right - CELL.width) {
		this.x += CELL.width;
	}
	if (keyPress == 'up' && this.y > GAME_FIELD.top) {
		this.y -= CELL.height;
	}
	if (keyPress == 'down' && this.y < GAME_FIELD.bottom - CELL.height) {
		this.y += CELL.height;
	}	
	else if (this.y  < GAME_FIELD.top + CELL.height) {			
		this.x = PLAYER_START.x;
		this.y = PLAYER_START.y;	
		alert('You win!');	
	}		
};

Player.prototype.render = function () {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const player = new Player(PLAYER_START.x, PLAYER_START.y);

const allEnemies = [1, 2, 2, 3].
				   map(trackNumber => CELL.height*trackNumber - BORDER).
				   map(enemyPositionY => new Enemy((GAME_FIELD.left - CELL.width), enemyPositionY, speed, player));

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
