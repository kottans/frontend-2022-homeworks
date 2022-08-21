"use strict";

const baseConfig = {
    fieldWidth: 400,
    fieldHeight: 390, 
    characterWidth: 100,
    heroHeight: 170,
    enemyLinkImg: 'images/enemy-bug.png',
    playerLinkImg: 'images/char-cat-girl.png',
    speedRandom(minSpeed = 150, maxSpeed = 350) {
        maxSpeed -= minSpeed;
        return Math.floor(Math.random() * ++maxSpeed) + minSpeed;
    },
    numberOfFields: {
        1: 50,
        2: 135,
        3: 220
    }
};

const body = document.querySelector('body'),
      scoreBlock = document.createElement('div');
let scoreCount = 0;
body.prepend(scoreBlock);
score();

class Enemy {
    constructor(x, y, baseConfig, player) {
        this.x = x;
        this.y = y;
        this.sprite = baseConfig.enemyLinkImg;
        this.speed = baseConfig.speedRandom();
        this.fieldWidth = baseConfig.fieldWidth;
        this.characterWidth = baseConfig.characterWidth;
        this.player = player;
    }
    update(dt) {    
        this.x += this.speed * dt;
        this.collisionСheck();
        this.addingRandomSpeed();
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    collisionСheck() {
        if(this.player.y == this.y && this.player.x <= Math.floor(this.x) + this.player.characterWidth / 1.5 && this.player.x >= Math.floor(this.x) - this.player.characterWidth / 1.5 ) {
            setTimeout(deletePopupMessage, 1000, 'body', 'popUp');
            showPopupMessage('div','popUp', 'body', 'You losе, bro :(');
            resetPlayerPosition(player);
            scoreCount = 0;
            score(scoreCount);
        }
    }
    addingRandomSpeed() {
        if (this.x > this.fieldWidth + this.characterWidth) {
            this.x = -this.characterWidth;
            this.speed = baseConfig.speedRandom();
        }
    }
};

class Player {
    constructor(baseConfig) {
        this.x = baseConfig.fieldWidth / 2;
        this.y = baseConfig.fieldHeight;
        this.sprite = baseConfig.playerLinkImg;
        this.fieldWidth = baseConfig.fieldWidth;
        this.fieldHeight = baseConfig.fieldHeight;
        this.characterWidth = baseConfig.characterWidth;
        this.heroHeight = baseConfig.heroHeight;
    }
    update(dt) {
        this.outOfFiledCheck();
        this.checkingForVictory();
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput(key) {
        switch(key) {
            case "left":
                this.x += -this.characterWidth; 
                break;
            case "up":
                this.y += -this.heroHeight/2; 
                break;
            case "right":
                this.x += this.characterWidth; 
                break;
            case "down":
                this.y += this.heroHeight/2;
                break;
        }
    }
    outOfFiledCheck() {
        if (this.x < 0 || 
            this.x > this.fieldWidth || 
            this.y > this.fieldHeight) {
                resetPlayerPosition(player);
        } 
    }
    checkingForVictory() {
        if (this.y <= 0) {
            setTimeout(deletePopupMessage, 1000, 'body', 'popUp');
            showPopupMessage('div','popUp', 'body', 'You win! :)');
            resetPlayerPosition(player); 
            scoreCount ++;
            score();
        }
    }
};

const player = new Player(baseConfig);
const allEnemies = [];

createEnemies(3, 2);
createEnemies(10, 1);
createEnemies(7, 3);

function createEnemies(n = 1, row = 1) {
    const rowNumber = baseConfig.numberOfFields[row];
    
    if (rowNumber === undefined) {
        console.error('WARNING! row value must be between 1, 2 or 3');
    }

    for (let i = 0; i < n; i++) {
        allEnemies.push(new Enemy(0, rowNumber, baseConfig, player));
    }
}

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    if (!document.querySelector('body').contains(document.querySelector('.popUp'))) {
        player.handleInput(allowedKeys[e.keyCode]);
    }
});

function resetPlayerPosition(player) {
    player.x = player.fieldWidth / 2;
    player.y = player.fieldHeight;
}

function showPopupMessage(tagName, classSelector, parrentSelector, message) {
    const parrent = document.querySelector(parrentSelector),
          newElement = document.createElement(tagName);

    parrent.style.cssText = 'position: relative';
    newElement.innerText = message;
    newElement.style.cssText = 'position: absolute; display: flex; align-items: center; justify-content: center; font-size: 50px; font-weight: 600; font-family: arial; width: 100%; height: 100%; color: black; background-color: rgba(255, 255, 255, 0.7)';   
    newElement.classList.add(classSelector);

    parrent.prepend(newElement); 
    player.handleInput();
}

function deletePopupMessage(parrentSelector, classSelector) {
    const parrent = document.querySelector(parrentSelector),
          child = document.querySelectorAll('.' + classSelector);
    child.forEach(e => {
        parrent.removeChild(e);
    });
}

function score() {
    scoreBlock.innerHTML = `SCORE: <span>${scoreCount}</span>`;
    scoreBlock.style.cssText = 'padding: 20px 0; font-size: 36px; font-weight: 600; font-family: arial';
}
