"use srtict";

const CELL = {
	width: 100,
	height: 85
};

const GAME_FIELD = {
	top: 0,
	right: CELL.width * 5,
	bottom: CELL.height * 5,
	left: 0
};

const PLAYER_START = {
	x: 202,
	y: 400
};

const ENEMY_SPEED = {
	min: 90,
	max: 250 
}; 

const SPRITE = {
	enemy: 'images/enemy-bug.png',
	player: 'images/char-boy.png'
};

const SPEED = () => ENEMY_SPEED.min + Math.floor(Math.random() * ENEMY_SPEED.max);
const OVERLAP_AMOUNT = 70;
const BORDER = 20;

const Enemy = function (x, y, SPEED, player) {
	this.x = x;
	this.y = y;
	this.SPEED = SPEED();
	this.player = player;
	this.SPRITE = SPRITE.enemy;	
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
		this.x -= GAME_FIELD.right;
		this.SPEED = SPEED();
		}
	this.x += this.SPEED * dt;
	this.checkColission();
};

Enemy.prototype.render = function () {
	ctx.drawImage(Resources.get(this.SPRITE), this.x, this.y);
};

const Player = function () {
	this.x = PLAYER_START.x;
	this.y = PLAYER_START.y;
	this.SPRITE = SPRITE.player;	
};

Player.prototype.update = function (dt) {};

Player.prototype.handleInput = function (keyPress) {
	if (keyPress == 'left' && this.x > GAME_FIELD.left + CELL.width) {
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
	else if (this.y  < GAME_FIELD.top) {			
		this.x = PLAYER_START.x;
		this.y = PLAYER_START.y;	
		alert('You win!');	
	}		
};

Player.prototype.render = function () {
	ctx.drawImage(Resources.get(this.SPRITE), this.x, this.y);
};

const player = new Player(PLAYER_START.x, PLAYER_START.y);

const allEnemies = [CELL.height - BORDER, CELL.height*2 - BORDER, CELL.height*3 - BORDER]
				   .map(value => {return new Enemy(GAME_FIELD.left, value, SPEED, player);});

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
