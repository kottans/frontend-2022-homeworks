const  Enemy = function(x, y, speed) {  
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
    this.x += this.speed*dt;

    if (this.x > 510) {
        this.x = -70;
        this.speed = 100 + Math.floor(Math.random() * 200);
    };

    if (player.x + 80 > this.x && player.x < this.x + 80 &&
        player.y + 80 > this.y && player.y < this.y + 80) {
        player.x = 202;
        player.y = 405;
    }  
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const  Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function (dt) {
 
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

let count = 0;
Player.prototype.handleInput = function (keyPress) {
    if (keyPress == 'up' && this.y > 0) {
        this.y -= 83;
    }

    if (keyPress == 'down' && this.y < 405) {
        this.y += 83;
    }

    if (keyPress == 'left' && this.x > 0) {
        this.x -= 101;
    }

    if (keyPress == 'right' && this.x < 404) {
        this.x += 101;
    }

    if (this.y <= 0) {
        setTimeout(() => {
            this.x = 202;
            this.y = 405;
        }, 600);
        count++;
    };
};

let allEnemies = [73, 156, 239].map(location =>location = new Enemy(location+50, location, 200));

let player = new Player(202, 405);

document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
