"use srtict";

const cell = {
	width: 100,
	height: 85
};

const gameField = {
	top: 0,
	right: cell.width * 5,
	bottom: cell.height * 5,
	left: 0
};

const playerStart = {
	x: 202,
	y: 400
};

const enemySpeed = {
	min: 90,
	max: 250 
}; 

const sprite = {
	enemy: 'images/enemy-bug.png',
	player: 'images/char-boy.png'
};

const speed = () => enemySpeed.min + Math.floor(Math.random() * enemySpeed.max);
const crash = 70;
const border = 20;

const Enemy = function (x, y, speed, player) {
	this.x = x;
	this.y = y;
	this.speed = speed();
	this.player = player;
	this.sprite = sprite.enemy;	

	this.checkColission = function () {
		if(this.player.x + crash > this.x &&
			this.player.x < this.x + crash &&
			this.player.y + crash > this.y &&
			this.player.y < this.y + crash) {
			this.player.x = playerStart.x;
			this.player.y = playerStart.y;
		}
	};

	this.update = function (dt) {
		if (this.x > gameField.right) {
			this.x -= gameField.right;
			this.speed = speed();
			}
		this.x += this.speed * dt;
		this.checkColission();
	};

	this.render = function () {ctx.drawImage(Resources.get(this.sprite), this.x, this.y);};
};

const Player = function () {
	this.x = playerStart.x;
	this.y = playerStart.y;
	this.sprite = sprite.player;	

	this.update = function () {
		if (this.y  < gameField.top) {			
		his.x = playerStart.x;
		this.y = playerStart.y;	
		alert('You win!');	
	}};

	this.render = function () {ctx.drawImage(Resources.get(this.sprite), this.x, this.y);};

	this.handleInput = function (keyPress) {
		if (keyPress == 'left' && this.x > gameField.left + cell.width) {
			this.x -= cell.width;
			}
		if (keyPress == 'right' && this.x < gameField.right - cell.width) {
			this.x += cell.width;
		}
		if (keyPress == 'up' && this.y > gameField.top) {
			this.y -= cell.height;
		}
		if (keyPress == 'down' && this.y < gameField.bottom - cell.height) {
			this.y += cell.height;
		}	
		if (this.y  < gameField.top) {			
			this.x = playerStart.x;
			this.y = playerStart.y;	
			alert('You win!');	
		}			
	};
};

Function.prototype.construct = function (position) {
	let gameEnteties = Object.create(this.prototype);
	this.apply(gameEnteties, position);
	return gameEnteties;
};

const playerPosition = [playerStart.x, playerStart.y];
const player = Player.construct(playerPosition);

const allEnemies = [cell.height - border, cell.height*2 - border, cell.height*3 - border].map((value) => {
	const enemyPosition = [gameField.left, value, speed, player];
	return Enemy.construct(enemyPosition);
});

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
