"use strict";

const widthOfBlock = 101,
    heightOfBlock = 83,
    blocksByWidth = 5,
    blocksByHeight = 6,
    paddingEnemyAvatar = {
        bottom: 20,
        left: 0,
        right: 0
    },
    paddingPlayerAvatar = {
        bottom: 10,
        left: 20,
        right: 15,
    },
    widthOfField = widthOfBlock * blocksByWidth,
    heightOfField = heightOfBlock * blocksByHeight,
    enemyTracksYCoord = [
        heightOfBlock - paddingEnemyAvatar.bottom,
        2 * heightOfBlock - paddingEnemyAvatar.bottom,
        3 * heightOfBlock - paddingEnemyAvatar.bottom,
    ],
    enemyBasicSpeed = 350,
    playersStartPoint = [
        Math.floor(blocksByWidth / 2) * widthOfBlock,
        (blocksByHeight - 1) * heightOfBlock - paddingPlayerAvatar.bottom,
    ],
    hardestLevel = 4;

let winPoints = 0,
    failPoints = 0;

class Unit {
    constructor(coordX, coordY, avatar) {
        (this.x = coordX), (this.y = coordY);
        this.sprite = avatar;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    update() {}
    setAvatar(avatar) {
        this.sprite = avatar;
    }
}

class Enemy extends Unit {
    constructor(coordX, coordY, startSpeed, avatar) {
        super(coordX, coordY, avatar);
        this.speed = startSpeed;
    }
    update(dt) {
        this.x += this.speed * dt;
        this.moveToStart();
        this.checkCollisions();
    }
    checkCollisions() {
        if (
            this.x - paddingEnemyAvatar.left > player.x - widthOfBlock + paddingPlayerAvatar.left &&
            this.x + paddingEnemyAvatar.right < player.x + widthOfBlock - paddingPlayerAvatar.right &&
            this.y < player.y &&
            this.y + heightOfBlock > player.y
        ) {
            endGame("fail");
        }
    }
    moveToStart() {
        if (this.x > widthOfField + widthOfBlock) {
            this.x = -Math.random() * (3 * widthOfBlock);
            this.speed = Math.random() * enemyBasicSpeed;
        }
    }
}

class Player extends Unit {
    constructor(coordX, coordY, avatar) {
        super(coordX, coordY, avatar);
        this._isFrozen = true;
    }
    freeze() {
        this._isFrozen = true;
    }
    unfreeze() {
        this._isFrozen = false;
    }
    moveToStart() {
        this.x = Math.floor(Math.random() * (blocksByWidth - 1)) * widthOfBlock;
        this.y =
            Math.random() > 0.5
                ? heightOfBlock * (blocksByHeight - 1) -
                  paddingPlayerAvatar.bottom
                : heightOfBlock * (blocksByHeight - 2) -
                  paddingPlayerAvatar.bottom;
    }
    handleInput(key) {
        if (!this._isFrozen) {
            switch (key) {
                case "ArrowLeft":
                    this.stepLeft();
                    break;
                case "ArrowRight":
                    this.stepRight();
                    break;
                case "ArrowUp":
                    this.stepUp();
                    break;
                case "ArrowDown":
                    this.stepDown();
                    break;
                default:
                    break;
            }
            this.checkWin();
        }
    }
    stepLeft() {
        if (this.x > 0) {
            this.x -= widthOfBlock;
        }
    }
    stepRight() {
        if (this.x < widthOfField - 1.5 * widthOfBlock) {
            this.x += widthOfBlock;
        }
    }
    stepUp() {
        if (this.y > 0) {
            this.y -= heightOfBlock;
        }
    }
    stepDown() {
        if (this.y < heightOfField - 1.5 * heightOfBlock) {
            this.y += heightOfBlock;
        }
    }
    checkWin() {
        if (this.y < 0) {
            this._isFrozen = true;
            endGame("win");
        }
    }
}

function endGame(status) {
    if (status === "win") {
        winPoints += 1;
        setTimeout(() => restartGame(true), 400);
        updatePoints();
    } else if (status === "fail") {
        failPoints += 1;
        setTimeout(() => restartGame(false), 0);
        updatePoints();
    }
}

function restartGame(winOrLose) {
    showWinOrLoseBanners(winOrLose);
    player.freeze();
    player.moveToStart();
    setTimeout(() => {
        showWinOrLoseBanners();
        player.unfreeze();
    }, 750);
}

function generateAllEnemies(difficultyLevel) {
    let enemies = [];
    for (let i = 1; i <= difficultyLevel; i++) {
        enemies.push(
            ...enemyTracksYCoord.map(
                (trackYCoord) =>
                    new Enemy(
                        -Math.random() * (3 * widthOfBlock),
                        trackYCoord,
                        Math.random() * enemyBasicSpeed
                    )
            )
        );
    }
    return enemies;
}

function updatePoints() {
    document.querySelector("#win-points").innerHTML = winPoints;
    document.querySelector("#fail-points").innerHTML = failPoints;
}

function showWinOrLoseBanners(winOrLose = -1) {
    if (winOrLose == -1) {
        document.querySelector(".win").classList.remove("show");
        document.querySelector(".lose").classList.remove("show");
    } else {
        winOrLose
            ? document.querySelector(".win").classList.add("show")
            : document.querySelector(".lose").classList.add("show");
    }
}

var allEnemies = generateAllEnemies(hardestLevel),
    player = new Player(...playersStartPoint);
