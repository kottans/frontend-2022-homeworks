"use strict";

const baseConfig = {
    fieldWidth: 400,
    fieldHeight: 390, 
    heroWidth: 100,
    heroHeight: 170,
    enemyWidth: 100,
    enemyLinkImg: 'images/enemy-bug.png',
    playerLinkImg: 'images/char-cat-girl.png',
    speedRandom(minSpeed = 150, maxSpeed = 300) {
        maxSpeed -= minSpeed;
        return Math.floor(Math.random() * ++maxSpeed) + minSpeed;
    }
};

//---------------SCORE--------------
const body = document.querySelector('body'),
      scoreBlock = document.createElement('div');
let scoreCount = 0;
body.prepend(scoreBlock);
score();
//------------------------------------------

class Enemy {
    constructor(x, y, speedX, sprite, fieldWidth, enemyWidth) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.speed = speedX;
        this.fieldWidth = fieldWidth;
        this.enemyWidth = enemyWidth;
    }
    update(dt) {
        if (this.x > this.fieldWidth + this.enemyWidth) {
            this.x = -this.enemyWidth;
            this.speed = baseConfig.speedRandom();
        }
        this.x += this.speed * dt;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

class Player {
    constructor(fieldWidth, fieldHeight, sprite, heroWidth, heroHeight) {
        this.x = fieldWidth / 2;
        this.y = fieldHeight;
        this.sprite = sprite;
        this.fieldWidth = fieldWidth;
        this.fieldHeight = fieldHeight;
        this.heroWidth = heroWidth;
        this.heroHeight = heroHeight;
    }
    update(dt) {
        if (player.x < 0 || 
            player.x > player.fieldWidth || 
            player.y > player.fieldHeight) {
                resetPlayerPosition(player);
        } 
        if (player.y <= 0) {
            setTimeout(deletePopupMessage, 1000, 'body', 'popUp');
            showPopupMessage('div','popUp', 'body', 'You win! :)');
            resetPlayerPosition(player); 
            scoreCount ++;
            score();
        }
        collisionResetPositions(player, firstEnemy, secondEnemy, thirdEnemy);
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput(key) {
        switch(key) {
            case "left":
                this.x += -this.heroWidth; 
                break;
            case "up":
                this.y += -this.heroHeight/2; 
                break;
            case "right":
                this.x += this.heroWidth; 
                break;
            case "down":
                this.y += this.heroHeight/2;
                break;
        }
    }
};

const   firstEnemy  = new Enemy(0, 60, baseConfig.speedRandom(), baseConfig.enemyLinkImg, baseConfig.fieldWidth, baseConfig.enemyWidth),
        secondEnemy  = new Enemy(0, 145, baseConfig.speedRandom(), baseConfig.enemyLinkImg, baseConfig.fieldWidth, baseConfig.enemyWidth),
        thirdEnemy  = new Enemy(0, 230, baseConfig.speedRandom(), baseConfig.enemyLinkImg, baseConfig.fieldWidth, baseConfig.enemyWidth);

const player = new Player(baseConfig.fieldWidth, baseConfig.fieldHeight, baseConfig.playerLinkImg, baseConfig.heroWidth, baseConfig.heroHeight);

const allEnemies = [firstEnemy, secondEnemy, thirdEnemy];

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

function collisionResetPositions(player, firstEnemy, secondEnemy, thirdEnemy) {
        if (player.y <= thirdEnemy.y && 
            player.y > secondEnemy.y && 
            player.x <= Math.floor(thirdEnemy.x) + player.heroWidth/1.5 && 
            player.x >= Math.floor(thirdEnemy.x) - player.heroWidth/1.5 
            ||
            player.y <= secondEnemy.y && 
            player.y > firstEnemy.y &&
            player.x <= Math.floor(secondEnemy.x) + player.heroWidth/1.5 && 
            player.x >= Math.floor(secondEnemy.x) - player.heroWidth/1.5 
            ||
            player.y <= firstEnemy.y && 
            player.y > 0 && 
            player.x <= Math.floor(firstEnemy.x) + player.heroWidth/1.5 && 
            player.x >= Math.floor(firstEnemy.x) - player.heroWidth/1.5) {
                setTimeout(deletePopupMessage, 1000, 'body', 'popUp');
                showPopupMessage('div','popUp', 'body', 'You losе, bro :(');
                resetPlayerPosition(player);
                scoreCount = 0;
                score(scoreCount);
        }
    }

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
