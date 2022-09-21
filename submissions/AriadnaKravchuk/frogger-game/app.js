const SKIN = {
    GIRL: "images/char-cat-girl.png",
    BOY: "images/char-boy.png"
};

const SPEED = {
    MIN: 400,
    MAX: 700
};

const STEP = {
    X: 100,
    Y: 80,
    HALF_X: 50,
    HALF_Y: 40,
};

const BORDER = {
    MIN_X: 0,
    MAX_X: 400,
    MIN_Y: 375,
    MAX_Y: -25
};

const PLAYER_POSITION = {
    START_X: 200,
    START_Y: 375
};

const TIME_TIMEOUT = 200,
    ALL_X = [
        BORDER.MIN_X,
        BORDER.MIN_X + STEP.X,
        BORDER.MIN_X + STEP.X * 2,
        BORDER.MIN_X + STEP.X * 3,
        BORDER.MAX_X,
    ],
    ENEMIES_Y = [
        BORDER.MAX_Y + STEP.Y * 3, 
        BORDER.MAX_Y + STEP.Y * 2, 
        BORDER.MAX_Y + STEP.Y
    ],
    ROCKS_Y = [
        BORDER.MAX_Y,
        BORDER.MAX_Y,
        BORDER.MAX_Y,
        BORDER.MAX_Y
    ]

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

function changeChar(player) {
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
        player.sprite = SKIN.BOY;
    });

    const buttonGirl = document.querySelector(".button-girl");
    buttonGirl.addEventListener("click", () => {
        player.sprite = SKIN.GIRL;
    });
}

function showCounter() {
    alert(`Your score\nWin: ${winScore} Lose: ${loseScore}`);
}

const Enemy = function (x, y, speed, player) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = "images/enemy-bug.png";
    this.player = player;
};

Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;

    if (this.x > BORDER.MAX_X + STEP.X) {
        this.x = -STEP.X;
        this.speed = getNumFromArea(SPEED.MAX, SPEED.MIN);
    }

    this.collision();
};

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.collision = function () {
    if (
        this.x > this.player.x - STEP.HALF_X &&
        this.x < this.player.x + STEP.HALF_X &&
        this.y > this.player.y - STEP.HALF_Y &&
        this.y < this.player.y + STEP.HALF_Y
    ) {
        loseScore++;
        showCounter();
        loadGame();
    }
};

const Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = SKIN.BOY;
};

Player.prototype.update = function () {
    if (this.y === BORDER.MAX_Y) {
        winScore++;
        setTimeout(showCounter, TIME_TIMEOUT);
        loadGame();
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (keyPress, allRocks) {
    if (keyPress === "left" && this.x !== BORDER.MIN_X) {
        this.x -= STEP.X;
    } else if (keyPress === "up" && this.y !== BORDER.MAX_Y) {
        checkRock(this, allRocks);
    } else if (keyPress === "right" && this.x !== BORDER.MAX_X) {
        this.x += STEP.X;
    } else if (keyPress === "down" && this.y !== BORDER.MIN_Y) {
        this.y += STEP.Y;
    }
};

function checkRock(player, allRocks) {
    let isRock = false;

    allRocks.forEach((rock) => {
        if (player.y === rock.y + STEP.Y && player.x === rock.x) isRock = true;
    });

    if (!isRock) player.y -= STEP.Y;
}

const Rock = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = "images/Rock.png";
};

Rock.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

let player = new Player();
changeChar(player);

function loadGame() {
    player.x = PLAYER_POSITION.START_X;
    player.y = PLAYER_POSITION.START_Y;

    allEnemies = [];
    allRocks = [];

    ENEMIES_Y.forEach(enemyY => 
        allEnemies.push(
            new Enemy(
                ALL_X.getNumFromArray(), enemyY,
                getNumFromArea(SPEED.MAX, SPEED.MIN), player
            )
        )
    );

    ROCKS_Y.forEach(rockY => 
        allRocks.push(new Rock(ALL_X.getNumFromArray(), rockY, player))
    );
}

loadGame();

document.addEventListener("keyup", function (e) {
    var allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down",
    };

    player.handleInput(allowedKeys[e.keyCode], allRocks);
});
