const SCORE = 0;
const CANVAS = {
    width: 505,
    height: 605,
    cellHeight: 83,
    cellWidth: 101,
    stoneBlockPositionStart: 63
};
const RESET_ENEMIES_SPEED = function () {
    for (let i = 0; i < allEnemies.length; i++) {
        allEnemies[i].resetSpeed();
    }
};
class Creature {
    constructor({ x, y, boardWidth, width, height, score }) {
        this.x = x;
        this.y = y;
        this.boardWidth = boardWidth;
        this.width = width;
        this.height = height;
        this.score = score
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
}
class Enemy extends Creature {
    constructor({ x, y, boardWidth, player, width, height, score, resetEnemiesSpeed }) {
        super({ x, y, boardWidth, width: width - 20, height: height - 20, score })
        this.speed = Math.floor(Math.random() * (100 - 40)) + 40;
        this.defaultSpeed = this.speed;
        this.player = player;
        this.sprite = 'images/enemy-bug.png';
        this.resetEnemiesSpeed = resetEnemiesSpeed
    };
    /* Method  update contains :
        update enemy speed,
        checks collision enemy with player, 
        checks if enemy goes out of bounds game board and return it to beginning,
        increases speed of enemies when the player passes the level
     */
    update(dt) {
        this.x += dt * this.speed;
        this.handleCollision();
        if (this.x >= this.boardWidth) {
            this.x = 0;
        };
        if (this.player.score !== this.score) {
            this.score = this.player.score;
            this.speed += 40;
        };
    };
    resetSpeed() {
        this.speed = Math.floor(Math.random() * (100 - 40)) + 40;
    }
    /* Method handleCollision checks collision enemy with player.
    when they collide the following actions take place :
        resets score ,
        is used method resetEnemiesSpeed witch reset enemy speed,
        the player is notified of his loss,
        is used method resetPosition witch reset player position */
    handleCollision = function () {
        if (
            this.x + this.width > this.player.x &&
            this.y > this.player.y - this.player.height &&
            this.player.x + this.player.width > this.x &&
            this.player.y > this.y - this.height
        ) {
            this.player.score = 0;
            this.score = 0;
            this.resetEnemiesSpeed();
            alert(`You lose! Score: ${this.player.score}`);
            this.player.resetPosition();
        };
    };
};
class Player extends Creature {
    constructor({ x, y, boardWidth, boardHeight, stepX, stepY, score }) {
        super({ x, y, boardWidth, width: 50, height: 50, score })
        this.sprite = 'images/char-boy.png';
        this.boardHeight = boardHeight;
        this.stepX = stepX;
        this.stepY = stepY;
    }
    update = function (dt) {
    };
    /* Method resetPosition reset player position */
    resetPosition() {
        this.x = this.boardWidth - 3 * this.stepX;
        this.y = this.boardHeight - 2.5 * this.stepY;
    };
    /* Method handleInput depending on pressed key performs player actions (movements up, down,left,right )
    when player moves up it is checked whether the player entered the water and if check passed the following actions take place :
        player goes to the next level (score + 1)
        the player is notified of his won,
        is used method resetPosition witch reset player position */
    handleInput = function (key) {
        switch (key) {
            case "up":
                if (this.y > 0) this.y -= this.stepY;
                if (this.y < 0) {
                    setTimeout(() => {
                        this.score++
                        alert(`You won! Score:  ${this.score}`);
                        this.resetPosition();
                    }, 50)
                };
                break;
            case "down":
                if (this.y < this.boardHeight - 3 * this.stepY) this.y += this.stepY;
                break;
            case "left":
                if (this.x > 0) this.x -= this.stepX;
                break;
            case "right":
                if (this.x < this.boardWidth - this.stepX) this.x += this.stepX;
                break;
            default:
                break;
        };
    };
};
const player = new Player({
    x: CANVAS.width - 3 * CANVAS.cellWidth,
    y: CANVAS.height - 2.5 * CANVAS.cellHeight,
    boardWidth: CANVAS.width,
    boardHeight: CANVAS.height,
    boardWidth: CANVAS.width,
    stepX: CANVAS.cellWidth,
    stepY: CANVAS.cellHeight,
    score: SCORE,
});
const allEnemies = [];
for (let i = 0; i < 3; i++) {
    allEnemies.push(new Enemy({
        x: CANVAS.width - CANVAS.cellWidth,
        y: CANVAS.stoneBlockPositionStart + i * CANVAS.cellHeight,
        boardWidth: CANVAS.width,
        player: player,
        width: CANVAS.cellWidth,
        height: CANVAS.cellHeight,
        score: 0,
        resetEnemiesSpeed: RESET_ENEMIES_SPEED
    }));
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


