"use strict";

const INIT_VAL = {
    playerX: 202,
    playerY: 410,
    stepX: 101,
    stepY: 85,
    enemyX: -101,
    enemyY: 63,
    enemyMinSpeed: 100,
    enemyMaxspeed: 200,
    enemyQty: [1, 2, 3],
    collision: 75,
    canvasWidth: 505,
    canvasHeight: 606,
};

const ENEMIES_Y = INIT_VAL.enemyQty.map(enemyNumber =>
    INIT_VAL.enemyY + INIT_VAL.stepY * INIT_VAL.enemyQty.indexOf(enemyNumber));

const allPlayerSprites = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-princess-girl.png'
];

let levelSpeed = 0;
let level = 0;

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

const Enemy = function(x, y, player, speed) {
    this.x = x;
    this.y = y;
    this.player = player;    
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt + levelSpeed;

    if (this.x > INIT_VAL.canvasWidth
        || !playerOptionDiv.classList.contains('hide')
        || lostMessage.classList.contains('active_message')
        || winMessage.classList.contains('active_message')) {
        this.x = INIT_VAL.enemyX;
    };

    this.checkCollision();
};

Enemy.prototype.checkCollision = function() {
    if (this.player.x < this.x + INIT_VAL.collision &&
        this.player.x + INIT_VAL.collision > this.x &&
        this.player.y < this.y + INIT_VAL.collision &&
        INIT_VAL.collision + this.player.y > this.y) {
            this.player.resetPlayer();
    };
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const allEnemies = [];

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

Player.prototype.resetPlayer = function() {
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

ENEMIES_Y.forEach(y => {
    const enemySpeed = Math.round(Math.random() * INIT_VAL.enemyMaxspeed + INIT_VAL.enemyMinSpeed);
    const enemy = new Enemy(INIT_VAL.enemyX, y, player, enemySpeed);
    allEnemies.push(enemy);
});

Player.prototype.handleInput = function(allowedKeys) {
    if (!lostMessage.classList.contains('active_message')
        && !winMessage.classList.contains('active_message')
        && playerOptionDiv.classList.contains('hide')) {
            
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
            this.upLevel() 
        };
    };

    if (allowedKeys === 'Enter' && lostMessage.classList.contains('active_message') 
        || allowedKeys === 'Enter' && winMessage.classList.contains('active_message')) {
        this.resetPlayer();
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
