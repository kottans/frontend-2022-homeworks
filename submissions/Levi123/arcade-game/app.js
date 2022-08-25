// Enemies our player must avoid
class Player {

    constructor(x, y, score = 0){
        this.sprite = 'images/char-boy.png';
        this.x = x;
        this.y = y;
        this.score = score;
    }

    update () {

        if (this.y < 0){
            setTimeout(() => {
                this.x = 200;
                this.y = 400;
            }, 300)
            // this.score += 1;
            // document.querySelector('.score').innerHTML = `Score: ${this.score}`;
            // console.log(this.score);
        }
    }
    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(key){
       if (key == 'left' && this.x > 0){
        this.x -= 101;
       }
       if (key == 'right' && this.x < 400){
        this.x += 101;
       }
       if (key == 'up' && this.y > 0){
        this.y -= 82;
       }
       if (key == 'down' && this.y < 400){
        this.y += 82;
       }
    }
}

let player = new Player(200,400);

class Enemy {

    constructor(x, y) {
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.speed = this.changeSpeed();
    }

    changeSpeed(min = 200, max = 400) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    enemyKillPlayer() {
        if(player.x < this.x + 80 &&
            player.x + 80 > this.x &&
            player.y < this.y + 60 &&
            60 + player.y > this.y &&
            60 + player.y > this.y){
                player.x = 200;
                player.y = 400;
        }
    }

    update(delta) {
        this.x += this.speed * delta; 

        if(this.x > 505){
            this.speed = this.changeSpeed();
            this.x = -100;
        }

        this.enemyKillPlayer();
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

let allEnemies = [];
let yForEnemies = [50, 140, 225];

yForEnemies.forEach((valueY) => {
    enemy = new Enemy(-100, valueY);
    allEnemies.push(enemy);
})
console.log(allEnemies);

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
