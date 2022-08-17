class Field {
    constructor() {
        this.topIndent = 57;
        this.squareWidth = 100;
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
        (this.width = 99), (this.height = 77);
    }

    checkCollision() {
        if (
            (player.x >= this.x &&
                player.x <= this.x + this.width &&
                player.y >= this.y &&
                player.y <= this.y + this.height) ||
            (this.y >= player.y &&
                this.y <= player.y + player.height &&
                this.x >= player.x &&
                this.x <= player.x + player.width)
        ) {
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
        (this.width = 67),
            (this.height = 84),
            (this.speed = 5),
            (this.moving = false),
            (this.movingCountDown = 0),
            (this.movingDirection = null);
    }

    update() {
        if (this.movingCountDown === 0) this.moving = false;
        if (this.y < 0) {
            this.toStart();
        }
        if (this.moving) {
            if (this.movingDirection === "right") {
                this.x += this.speed;
                this.movingCountDown -= this.speed;
            }
            if (this.movingDirection === "left") {
                this.x -= this.speed;
                this.movingCountDown -= this.speed;
            }
            if (this.movingDirection === "up") {
                this.y -= this.speed;
                this.movingCountDown -= this.speed;
            }
            if (this.movingDirection === "down") {
                this.y += this.speed;
                this.movingCountDown -= this.speed;
            }
        }
    }

    toStart() {
        this.moving = false;
        this.movingCountDown = 0;
        this.x = this.start.x * field.squareWidth;
        this.y = this.start.y * field.squareHeight + field.topIndent;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(key) {
        if (this.moving) return null;
        if (key === "up") {
            this.moving = true;
            this.movingDirection = "up";
            this.movingCountDown = field.squareHeight;
        } else if (key === "right" && this.x < field.maxreachableXCoord) {
            this.moving = true;
            this.movingDirection = "right";
            this.movingCountDown = field.squareWidth;
        } else if (key === "down" && this.y < field.maxreachableYCoord) {
            this.moving = true;
            this.movingDirection = "down";
            this.movingCountDown = field.squareHeight;
        } else if (key === "left" && this.x > 0) {
            this.moving = true;
            this.movingDirection = "left";
            this.movingCountDown = field.squareWidth;
        }
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

