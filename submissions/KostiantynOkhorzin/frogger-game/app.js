class Enemy {
    constructor(x, y, speed, sprite = 'images/enemy-bug.png') {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = sprite;
    }

    update(dt) {
        this.x += this.speed * dt;

        if (this.x > 510) {
            this.x = -50;
            this.speed = Math.round(Math.random() * 100 + 100); 
        };

        if (player.x < this.x + 80 && player.x + 80 > this.x &&
            player.y < this.y + 60 && 60 + player.y > this.y) {
            player.x = 200;
            player.y = 400;
        };
    }
    
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Player {
    constructor(x, y, sprite = 'images/char-boy.png') {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        
    }

    update() {
        if (this.y < 5) {
            setTimeout(() => {
                this.x = 200;
                this.y = 400;
            }, 2000);
        };
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput (keyPress) {
        if (keyPress == 'left' && this.x > 0) {
            this.x -= 100;
        };
        if (keyPress == 'right' && this.x < 400) {
            this.x += 100;
        };
        if (keyPress == 'up' && this.y > 0) {
            this.y -= 80;
        };
        if (keyPress == 'down' && this.y < 400) {
            this.y += 80;
        };
    }
}

const player = new Player(200, 400);

const enemy1 = new Enemy(-100, 60, 100);
const enemy2 = new Enemy(-50, 140, 150);
const enemy3 = new Enemy(-150, 230, 200);

const allEnemies = [enemy1, enemy2, enemy3];

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});




