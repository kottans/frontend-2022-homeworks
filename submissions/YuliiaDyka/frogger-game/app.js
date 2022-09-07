// Enemy

var Enemy = class Enemy {
    constructor(speed, x, y) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png'; 
    };
};

Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if (this.x > 500) {
        this.x = -100;
        this.speed += 1;
    }

    if (Math.abs(player.x - this.x) < 60 && Math.abs(player.y - this.y) < 60) {
        alert("Чао, лузер)");
        player.x = 204;
        player.y = 409;

    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player

var Player = class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-boy.png';
    }
};

Player.prototype.update = function() {
    if (this.y < 0 && this.y > -12) {
        alert("Вітаннячка! Ви виграли!")
        this.x = 204;
        this.y = 409;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    if (this.x >= 0 && this.x <= 408 && this.y > 0 && this.y <= 409) {
            switch (key) {
            case "left" : 
            this.x -= 102;
            break;

            case "right":
            this.x += 102;
            break;   
            
            case "up":
            this.y -= 84;
            break; 

            case "down":
            this.y += 84;
            break;     
        };
      
        if (this.y > 409 || this.x < 0 || this.x > 408) {
            alert("Не виходь за межі поля!");
            this.x = 204;
            this.y = 409;
        }
    }
};

// Initialization characters

let player = new Player(204, 409);
let enemy1 = new Enemy((Math.random() * (200 - 60) + 60), -50, 230);
let enemy2 = new Enemy((Math.random() * (200 - 60) + 60), -150, 146);
let enemy3 = new Enemy((Math.random() * (200 - 60) + 60), -80, 63);
let enemy4 = new Enemy((Math.random() * (200 - 60) + 60), -200, 313);

const allEnemies = [
    enemy1,
    enemy2,
    enemy3,
    enemy4,
];

// event listeners

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
