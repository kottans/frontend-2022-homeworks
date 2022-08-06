const countRows = 6;
const countColumns = 5;
const tileHight = 83;
const tileWidth = 105;

class Position {
    constructor( row, col ) {
        this.startX = tileWidth * col - tileWidth;
        this.startY = tileHight * row - tileHight / 2;
        this.x = this.startX;
        this.y = this.startY;
        this.maxY = tileHight * countRows - 1;
        this.maxX = tileWidth * countColumns - 1;
        this.minY = tileHight * (row - 1) - this.startY;
        this.minX = 0;
    }
    reset() {
        this.x = this.startX;
        this.y = this.startY;
    }
}

class PositionEnemy extends Position {
    run(speed, dt) {
        this.x += (speed * dt); 
    }
}

class PositionPlayer extends Position {
    moveRigtht() {
        const newPositionX = this.x + tileWidth;
        if (newPositionX <= this.maxX) {
            this.x = newPositionX; 
        }
    }
    moveLeft() {
        const newPositionX = this.x - tileWidth;
        if (newPositionX >= this.minX) {
            this.x = newPositionX; 
        }
    }
    moveUp() {
        const newPositionY = this.y - tileHight;
        if (newPositionY >= this.minY) {
            this.y = newPositionY; 
        }
    }
    moveDown() {
        const newPositionY = this.y + tileHight;
        if (newPositionY <= this.maxY) {
            this.y = newPositionY;
        }
    }
}

class Enemy {
    const maxSpeed = 500;
    const minSpeed = 100;
    speed = (Math.floor(Math.random() * maxSpeed) + minSpeed);
    sprite = 'images/Rock.png';
    constructor ( positionEnemy ) {
        this.position = positionEnemy;
    }
    update (dt) {
        if (this.position.x <= this.position.maxX) {
            this.position.run(this.speed, dt);
        } else {
            this.position.reset();
        }
    }
    render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.position.x, this.position.y);
    }
}

class Player {
    sprite = 'images/char-princess-girl.png';
    constructor ( positionPlayer ) {
        this.position = positionPlayer;
    }
    checkForWin() {
        if (this.position.y === this.position.minY) {
            alert("Not bed! Try again!");
            this.position.reset();
        }
    }
    update () {
        this.checkForWinn();
    }
    handleInput (keyCode) {
        switch(keyCode) {
            case 'up': 
                this.position.moveUp();
                break;
            case 'down': 
                this.position.moveDown();
                break;
            case 'right': 
                this.position.moveRigtht();
                break;
            case 'left': 
                this.position.moveLeft();
                break;
            default: 
                break;
        }
    }
    render () {
        ctx.drawImage(Resources.get(this.sprite), this.position.x, this.position.y);
    }
}

const player = new Player (new PositionPlayer( 5, 3 ));
const allEnemies = [
    new Enemy (new PositionEnemy ( 1, 0 )), 
    new Enemy (new PositionEnemy ( 2, 0 )),
    new Enemy (new PositionEnemy ( 3, 0 )),
];

function checkCollisions() {
    const confrontEnemies = allEnemies.filter(filterConfrontEnemies, player);
    if (confrontEnemies.length) {
        player.position.reset();
    }
}

function filterConfrontEnemies(enemy) {
    const fromPlayerToEnemyX = this.position.x - enemy.position.x;
    const halftileWidth = (tileWidth / 2);
    const isEqualY = this.position.y === enemy.position.y;
    return (Math.abs(fromPlayerToEnemyX) < halftileWidth) && isEqualY;
}

document.addEventListener('keyup', function(e) {
    let keys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(keys[e.keyCode]);
});
