const Enemy = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = "images/enemy-bug.png";
};
const field = {
    x: 4,
    y: 4,
};

Enemy.prototype.update = function (dt) {
    if (this.x >= (field.x+1) * 100) this.x = -100;
    else this.x += dt * this.speed;

    this.checkCollision();
};

Enemy.prototype.checkCollision = function () {
    if (
        Math.abs(player.x * 100 - this.x) <= 70 &&
        Math.abs(player.y * 80 + 50 - this.y) < 20
    ) {
        player.x = player.start.x;
        player.y = player.start.y;
    }
};

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const player = {
    sprite: "images/char-boy.png",
    start: { x: 2, y: 4 },
    x: 2,
    y: 4,
    update() {},
    toStart() {
        this.x = this.start.x;
        this.y = this.start.y;
    },
    render() {
        ctx.drawImage(
            Resources.get(this.sprite),
            this.x * 100,
            this.y * 80 + 50
        );
    },
    handleInput(key) {
        key === "up"
            ? this.y--
            : key === "right" && this.x < field.x
            ? this.x++
            : key === "down" && this.y < field.y
            ? this.y++
            : key === "left" && this.x > 0
            ? this.x--
            : {};
        if (this.y < 0) this.toStart();
    },
};

const allEnemies = (() => {
    const enemyRows = [60, 143, 225];
    return [0, 1, 2].map((_, i) => {
        return new Enemy(0, enemyRows[i], Math.random() * (200 - 60) + 60);
    });
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
