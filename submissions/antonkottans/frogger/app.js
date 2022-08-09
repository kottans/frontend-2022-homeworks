class Field {
    constructor() {
        this.topIndent = 57;
        this.squareWidth = 101;
        this.squareHeight = 85;
        this.maxreachableXCoord = 4 * this.squareWidth;
        this.maxreachableYCoord = 4 * this.squareHeight;
    }
}
const field = new Field();

class Enemy {
    constructor({ x, y, speed }) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = "images/enemy-bug.png";
    }
    checkCollision() {
        const distanceOfXCollision = field.squareWidth / 1.3;
        const distanceOfYColision = 1;
        const sameRow = () => Math.abs(player.y - this.y) < distanceOfYColision;
        const bugTooClose = () =>
            Math.abs(player.x - this.x) < distanceOfXCollision;
        if (sameRow() && bugTooClose()) {
            player.toStart();
        }
    }

    update(dt) {
        if (this.x >= field.maxreachableXCoord + field.squareWidth)
            this.x = -field.squareWidth;
        else this.x += dt * this.speed;

        this.checkCollision();
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Player {
    constructor() {
        this.sprite = "images/char-boy.png";
        this.start = { x: 2, y: 4 };
        this.x = this.start.x * field.squareWidth;
        this.y = this.start.y * field.squareHeight + field.topIndent;
    }
    update() {}
    toStart() {
        this.x = this.start.x * field.squareWidth;
        this.y = this.start.y * field.squareHeight + field.topIndent;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput(key) {
        if (key === "up") this.y -= field.squareHeight;
        else if (key === "right" && this.x < field.maxreachableXCoord)
            this.x += field.squareWidth;
        else if (key === "down" && this.y < field.maxreachableYCoord)
            this.y += field.squareHeight;
        else if (key === "left" && this.x > 0) this.x -= field.squareWidth;
        if (this.y < 0) this.toStart();
    }
}
const player = new Player();

const allEnemies = (() => {
    const yCoordsForEnemiesToMove = [
        field.topIndent,
        field.topIndent + field.squareHeight,
        field.topIndent + field.squareHeight * 2,
    ];
    const randomSpeed = ({ minSpeed, maxSpeed }) => {
        return Math.random() * (maxSpeed - minSpeed) + minSpeed;
    };
    return yCoordsForEnemiesToMove.map(
        (yCoord, i) =>
            new Enemy({
                x: 0,
                y: yCoord,
                speed: randomSpeed({ minSpeed: 60, maxSpeed: 200 }),
            })
    );
})();

document.addEventListener("keyup", function (e) {
    var allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down",
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

