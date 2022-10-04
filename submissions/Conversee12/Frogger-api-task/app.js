// Enemy
const InitialPosition_X = 202;
const InitialPosition_Y = 400;
const Start_X = -100;
const End_X = 510;
const PlayerWidth = 80;
const PlayerHeight = 60;
const StartPositionEnemy_Y = [56, 140, 223];
const StartPositionEnemy_X = 0;
const PlayerStep_X = 101;
const PlayerStep_Y = 89;
const BorderRight = BorderTop = 400;
const BorderLeft = BorderBottom = 0;
let allEnemies = [];

const Enemy = function (x, y, speed, player) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.player = player;
};

let countLevels = 1;
let speedLevel = 200;
let multiplierSpeed = 300;

Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;
    if (this.x > End_X) {
        this.x = Start_X;
        this.speed = speedLevel + Math.floor(Math.random() * multiplierSpeed)
    }

    if (this.x < this.player.x + PlayerWidth && this.y < this.player.y + PlayerHeight && this.x + PlayerWidth > this.player.x && this.y + PlayerHeight > this.player.y) {
        setTimeout(() => {
            this.player.x = InitialPosition_X;
            this.player.y = InitialPosition_Y;
            multiplierSpeed = 300;
            countLevels = 1;
            paragraph.innerText = `Your level: ${countLevels}`
        }, 20);
    }
};

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

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

let player = new Player(InitialPosition_X, InitialPosition_Y);

function createEnemy(amount) {
    for (let i = 0; i <= amount; i++) {
        enemy = new Enemy(StartPositionEnemy_X, StartPositionEnemy_Y[i], speedLevel, player);
        allEnemies.push(enemy);
    }
};
createEnemy(3);

Player.prototype.handleInput = function (keyPress) {
    if (keyPress === 'left' && this.x > BorderLeft) {
        this.x -= PlayerStep_X;
    }
    if (keyPress === 'right' && this.x < BorderRight) {
        this.x += PlayerStep_X;
    }
    if (keyPress === 'up' && this.y > BorderBottom) {
        this.y -= PlayerStep_Y;
    }
    if (keyPress === 'down' && this.y < BorderTop) {
        this.y += PlayerStep_Y;
    }
    if (this.y < 0) {
        setTimeout(() => {
            this.x = InitialPosition_X;
            this.y = InitialPosition_Y;
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
