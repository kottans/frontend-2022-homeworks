var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
    this.x += this.speed * player.win * dt;
    
    if (this.x > 505) {
        this.x = - 100;
    }

    if (this.y + 70 > player.y &&
        player.y + 70 > this.y &&
        player.x < this.x + 78 &&
        player.x > this.x - 78) {
        alert('You louse, try again!')
        titleGameRef.innerHTML = 'Level: 1';
        player.win = 1;
        return player.x = 200, player.y = 402;
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.win = 1;
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function() {
    if (this.x < 0) {
        this.x = 0;
    }

    if (this.x > 405) {
        this.x = 405;
    }

    if (this.y < 20) {
        this.y = -8;
    }
      
    if (this.y > 400) {
        this.y = 402;
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(keyPress) {
    switch (keyPress) {
        case 'left': 
            this.x -= 104; 
            break;
        
        case 'up': 
            this.y -= 82; 
            if (this.y < 0) {
                this.countWin();
            }
            break;

        case 'right': 
            this.x += 104; 
            break;
        
        case 'down': 
            this.y += 82; 
            break;
        
        default: break;
    }
}

Player.prototype.countWin = function () {
    this.win++;
    setTimeout(() => {
        alert(`You win! Victory: ${this.win - 1}`);
        this.x = 200;
        this.y = 402;
    }, 100);
    titleGameRef.innerHTML = `Level: ${this.win}`;
}

let enemyStart = new Enemy (-100, 228, 200);
let enemyMiddle = new Enemy (-100, 146, 100);
let enemyFinish = new Enemy (-100, 64, 260);
const allEnemies = [enemyStart, enemyMiddle, enemyFinish];
const player = new Player(200, 405);

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

const titleGameRef = document.querySelector('.levelGame');
