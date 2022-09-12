// Enemy
const Enemy = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

let countLevels = 1;
let speedLevel = 200;
let multiplierSpeed = 300;

Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;
    if (this.x > 510) {
        this.x = -100;
        this.speed = 200 + Math.floor(Math.random() * multiplierSpeed)
    }

    if (this.x < player.x + 80 && this.y < player.y + 60 && this.x + 80 > player.x && this.y + 60 > player.y) {
        setTimeout(function () {
            player.x = 202;
            player.y = 400;
            multiplierSpeed = 300;
            countLevels = 1;
            paragraph.innerText = `Your level: ${countLevels}`
        }, 20);
    }
};

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

let allEnemies = [];
let eachEnemies = [56, 140, 223];
eachEnemies.forEach(function (Y) {
    enemy = new Enemy(0, Y, speedLevel);
    allEnemies.push(enemy);
})

// Player
const Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function (dt) {

};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

let player = new Player(202, 400);

Player.prototype.handleInput = function (keyPress) {
    if (keyPress === 'left' && this.x > 0) {
        this.x -= 101;
    }
    if (keyPress === 'right' && this.x < 400) {
        this.x += 101;
    }
    if (keyPress === 'up' && this.y > 0) {
        this.y -= 89;
    }
    if (keyPress === 'down' && this.y < 400) {
        this.y += 89;
    }
    if (this.y < 0) {
        setTimeout(function () {
            player.x = 202;
            player.y = 400;
        }, 300);

        if (prompt('You win, want to play next level?', 'yes') === 'yes') {
            countLevels++;
            addNote(countLevels);
        };
    }
}

let paragraph = document.createElement('p');
document.body.prepend(paragraph);
paragraph.innerText = `Your level: ${countLevels}`;
paragraph.style.cssText = `color: green;
    font-size: 32px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 0px`;

function addNote(countLevels) {
    paragraph.innerText = `Your level: ${countLevels}`;
    multiplierSpeed += 100;
};

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
