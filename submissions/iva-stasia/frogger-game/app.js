"use strict";

const INIT_VAL = {
    playerX: 202,
    playerY: 410,
    stepX: 101,
    stepY: 85,
    enemyX: -101,
    enemyY: [63, 147, 230],
    enemyMinSpeed: 100,
    enemyMaxspeed: 200,
    collision: 75,
    canvasWidth: 505,
    canvasHeight: 606,
};

const allPlayerSprites = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-princess-girl.png'
];

let levelSpeed = 0;
let level = 0;

/*---------- DOM elements ----------*/

const body = document.body;

body.insertAdjacentHTML('afterbegin',
    `
        <div class='level'>Level: ${level}/5</div>
        <div class='win_message'><h2>You won :)</h2><span>press enter</span></div>
        <div class='lost_message'><h2>You lost :(</h2><span>press enter</span></div>
        <div class='player_option'></div>
    `);
    
const levelDiv = document.querySelector('.level');
const winMessage = document.querySelector('.win_message');
const lostMessage = document.querySelector('.lost_message');
const playerOptionDiv = document.querySelector('.player_option');

playerOptionDiv.innerHTML =
    `
        <h1>Choose your character</h1>
        <img src='images/char-boy.png' class='player_img' data-player-num = '0' />
        <img src='images/char-cat-girl.png' class='player_img' data-player-num = '1' />
        <img src='images/char-princess-girl.png' class='player_img' data-player-num = '2' />
    `;

/*---------- Enemy ----------*/

const Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt + levelSpeed;

    if (this.x > INIT_VAL.canvasWidth) {
        this.x = INIT_VAL.enemyX;
    };

    this.checkCollision();
};

Enemy.prototype.checkCollision = function() {
    if (player.x < this.x + INIT_VAL.collision &&
        player.x + INIT_VAL.collision > this.x &&
        player.y < this.y + INIT_VAL.collision &&
        INIT_VAL.collision + player.y > this.y) {
            player.resetGame();
    };
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const allEnemies = [];

INIT_VAL.enemyY.forEach(y => {
    let enemySpeed = Math.round(Math.random() * INIT_VAL.enemyMaxspeed + INIT_VAL.enemyMinSpeed);
    let enemy = new Enemy(INIT_VAL.enemyX, y, enemySpeed);
    allEnemies.push(enemy);
});

/*---------- Player ----------*/

const Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';

    playerOptionDiv.addEventListener('click', (event) => {
        const playerNum = +event.target.dataset.playerNum;
        this.sprite = allPlayerSprites[playerNum];
        playerOptionDiv.classList.add('hide');
    });
};

Player.prototype.update = function() {
    
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.resetGame = function() {
    allEnemies.forEach(enemy => enemy.x = INIT_VAL.enemyX);
    this.x = INIT_VAL.playerX;
    this.y = INIT_VAL.playerY;
    levelSpeed = 0;
    level = 0;
    levelDiv.innerHTML = `<div class='level'>Level: ${level}/5</div>`;
    lostMessage.classList.add('active_message');
};

Player.prototype.upLevel = function() {
    this.x = INIT_VAL.playerX;
    this.y = INIT_VAL.playerY;
    levelSpeed++;
    level++;
    levelDiv.innerHTML = `<div class='level'>Level: ${level}/5</div>`;

    if (level === 5) {
        winMessage.classList.add('active_message');
    };
};

const player = new Player(INIT_VAL.playerX, INIT_VAL.playerY);

Player.prototype.handleInput = function(allowedKeys) {
    if (allowedKeys === 'left' && this.x > 0) {
        this.x -= INIT_VAL.stepX;
    };

    if (allowedKeys === 'right' && this.x < INIT_VAL.canvasWidth - INIT_VAL.stepX ) {
        this.x += INIT_VAL.stepX;
    };
    
    if (allowedKeys === 'up' && this.y > 0) {
        this.y -= INIT_VAL.stepY;
    };

    if (allowedKeys === 'down' && this.y < INIT_VAL.playerY) {
        this.y += INIT_VAL.stepY;
    };

    if (this.y < 0) {
        player.upLevel() 
    };

    if (allowedKeys === 'Enter') {
        player.resetGame();
        lostMessage.classList.remove('active_message');
        winMessage.classList.remove('active_message');
    };
};

document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'Enter'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
