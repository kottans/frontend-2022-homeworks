const CHAR_GIRL = "images/char-cat-girl.png",
    CHAR_BOY = "images/char-boy.png",
    START_X = 200,
    START_Y = 375,
    MIN_X = 0,
    MAX_X = 400,
    MIN_Y = 375,
    MAX_Y = -25,
    STEP_X = 100,
    STEP_Y = 80,
    HALF_SIZE_X = 50,
    HALF_SIZE_Y = 40,
    MIN_SPEED = 400,
    MAX_SPEED = 700,
    TIME_TIMEOUT = 200,
    ALL_X = [
        MIN_X,
        MIN_X + STEP_X,
        MIN_X + STEP_X * 2,
        MIN_X + STEP_X * 3,
        MAX_X,
    ],
    ENEMIES_Y = [MAX_Y + STEP_Y * 3, MAX_Y + STEP_Y * 2, MAX_Y + STEP_Y];

let winScore = 0,
    loseScore = 0,
    allEnemies = [],
    allRocks = [];

function getNumFromArea(min, max) {
    return Math.random() * (max - min) + min;
}

Array.prototype.getNumFromArray = function () {
    return this[Math.floor(Math.random() * this.length)];
};

function changeChar() {
    const body = document.querySelector("body");

    body.innerHTML = `<div class="choice">
                    <p class="choice__title">${"Select character"}</p>
                    <div class="choice__buttons">
                    <button class="choice__button button-boy">${"Boy"}</button>
                    <button class="choice__button button-girl">${"Girl"}</button>
                    </div>
                    </div>`;

    const buttonBoy = document.querySelector(".button-boy");
    buttonBoy.addEventListener("click", () => {
        player.sprite = CHAR_BOY;
    });

    const buttonGirl = document.querySelector(".button-girl");
    buttonGirl.addEventListener("click", () => {
        player.sprite = CHAR_GIRL;
    });
}

function showCounter() {
    alert(`Your score\nWin: ${winScore} Lose: ${loseScore}`);
}

var Enemy = function (x, y, speed, player) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = "images/enemy-bug.png";
    this.player = player;
};

Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;

    if (this.x > MAX_X + STEP_X) {
        this.x = -STEP_X;
        this.speed = getNumFromArea(MAX_SPEED, MIN_SPEED);
    }

    if (
        this.x > player.x - HALF_SIZE_X &&
        this.x < player.x + HALF_SIZE_X &&
        this.y > player.y - HALF_SIZE_Y &&
        this.y < player.y + HALF_SIZE_Y
    ) {
        loseScore++;
        showCounter();
        main();
    }
};

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = CHAR_BOY;
};

Player.prototype.update = function () {
    if (this.y == MAX_Y) {
        winScore++;
        setTimeout(showCounter, TIME_TIMEOUT);
        main();
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (keyPress, allRocks) {
    if (keyPress == "left" && this.x != MIN_X) {
        this.x -= STEP_X;
    } else if (keyPress == "up" && this.y != MAX_Y) {
        let isOutside = false;

        allRocks.forEach((rock) => {
            if (this.y == rock.y + STEP_Y && this.x == rock.x) {
                isOutside = true;
                return isOutside;
            }
        });

        if (!isOutside) {
            this.y -= STEP_Y;
        }
    } else if (keyPress == "right" && this.x != MAX_X) {
        this.x += STEP_X;
    } else if (keyPress == "down" && this.y != MIN_Y) {
        this.y += STEP_Y;
    }
};

var Rock = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = "images/Rock.png";
};

Rock.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

changeChar();
const player = new Player();

function main() {
    player.x = START_X;
    player.y = START_Y;

    allEnemies = [];
    allRocks = [];

    ENEMIES_Y.forEach((enemyY) => {
        enemy = new Enemy(
            ALL_X.getNumFromArray(),
            enemyY,
            getNumFromArea(MAX_SPEED, MIN_SPEED),
        );
        allEnemies.push(enemy);
    });

    const ROCKS_X = [
        ALL_X.getNumFromArray(),
        ALL_X.getNumFromArray(),
        ALL_X.getNumFromArray(),
        ALL_X.getNumFromArray(),
    ];

    ROCKS_X.forEach((rockX) => {
        rock = new Rock(rockX, MAX_Y, player);
        allRocks.push(rock);
    });
}

main();

document.addEventListener("keyup", function (e) {
    var allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down",
    };

    player.handleInput(allowedKeys[e.keyCode], allRocks);
});
