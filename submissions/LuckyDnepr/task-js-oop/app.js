"use strict";

const blockWidth = 101, //gamefield sizes
    blockHeight = 83,
    nBlocksWidth = 5,
    nBlocksHeight = 6,
    fieldWidth = blockWidth * nBlocksWidth,
    fieldHeight = blockHeight * nBlocksHeight,
    enemyTracksHeight = [62, 145, 228], //coordinates of enemy tracks
    playerStartPoint = [200, 405],
    hardestLevel = 4;

let winPoints = 0,
failPoints = 0;

class Unit {
    constructor (coordX, coordY, avatar) {
        this.x = coordX,
        this.y = coordY;
        this.sprite = avatar;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    update() {}
    setAvatar (avatar) {
        this.sprite = avatar;
    }
}

class Enemy extends Unit {
    constructor (coordX, coordY, startSpeed, avatar) {
        super(coordX, coordY, avatar);
        this.speed = startSpeed;
    }
    update(dt) {
        this.x += this.speed * dt;
        this.moveEnemyToStart ();
        this.checkCollisions();
    }
    checkCollisions () {
        if (this.x > player.x - blockWidth + 20 && //+20 - correction for avatar, for clearer collision
            this.x < player.x + blockWidth - 15 && //-15 - correction for avatar, for clearer collision
            this.y < player.y &&
            this.y + blockHeight > player.y) {
            endGame(false); //false - you lose the game
        }
    }
    moveEnemyToStart () {
        if (this.x > fieldWidth + blockWidth) {
            this.x = Math.random() * -300; //change enemy start point before new appearance
            this.speed = Math.random() * 150 + Math.random() * 150; //change enemy speed before new appearance
        }
    }
}

class Player extends Unit {
    constructor (coordX, coordY, avatar) {
        super(coordX, coordY, avatar);
        this._freeze = true; //the player does not respond to the keyboard if _freeze === true
    }
    freezing() {
        this._freeze = true; //player freezed until the win/lose banner showing
    }
    unfreezing() {
        this._freeze = false; //player unfreezed when gameplay start
    }
    movePlayerToStart() { //randomize player start position after win/lose
        this.x = Math.floor(Math.random() * 4) * blockWidth;
        this.y = (Math.random() > 0.5) ? (blockHeight * 5 - 10) : (blockHeight * 4 - 10);
    }
    handleInput(key) {
        if (!this._freeze) {
            switch (key) { //choose direction depending on the key pressed
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
            this.checkWin(); //check win after move player
        }
    }
    stepLeft () { //player do step left
        if (this.x > 0) {
            this.x -= blockWidth;
        }
    }
    stepRight () { //player do step right
        if (this.x < fieldWidth - 1.5 * blockWidth) {
            this.x += blockWidth;
        }
    }
    stepUp () { //player do step up
        if (this.y > 0) {
            this.y -= blockHeight;
        }
    }
    stepDown () { //player do step down
        if (this.y < fieldHeight - 1.5 * blockHeight) {
            this.y += blockHeight;
        }
    }
    checkWin () { //player on the water => you win
        if (this.y < 0) { 
            this._freeze = true;
            endGame(true); //win the game
        }
    }
}

function endGame(win) { //end gameset
    if (win) {
        winPoints += 1;
        setTimeout(() => restartGame(true), 400);
        updatePoints();
    } else {
        failPoints += 1;
        setTimeout(() => restartGame(false), 0);
        updatePoints();
    }
}

function restartGame(winLose) { //restart gameset - winLose - true->win; false->fail
    winLoseBanners (winLose);
    player.freezing();
    player.movePlayerToStart();
    setTimeout(() => {
        winLoseBanners ();
        player.unfreezing();
    }, 750);
}

function generateEnemies(n) { //n - enemies per track - this is equivalent difficulty
    let enemies = [];
    for (let i = 1; i <= n; i++) {
        enemies
            .push(...enemyTracksHeight
                .map((trackHeight) => {
                    return new Enemy(Math.random() * -300, trackHeight, Math.random() * 350); //randomise start point and speed
                })
            );
    }
    return enemies;
}

function updatePoints () { //update win/lode points
    document.querySelector("#win-points").innerHTML = winPoints;
    document.querySelector("#fail-points").innerHTML = failPoints;
}

function winLoseBanners (winLose = -1) { //show/hide win/lose banners
    if (winLose == -1) {
        document.querySelector(".win").classList.remove("show");
        document.querySelector(".lose").classList.remove("show");
    } else {
        (winLose)
            ? document.querySelector(".win").classList.add("show")
            : document.querySelector(".lose").classList.add("show");
    }
}

var allEnemies = generateEnemies(hardestLevel), //"4" - the hardest level (12 enemies)
player = new Player(...playerStartPoint); //create player
