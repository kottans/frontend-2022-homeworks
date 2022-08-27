// Enemies our player must avoid
const DEFAULT_MAP = {
    widthMap: 505,
    widthBlock: 101,
    heightBlock: 82,
    waterLine: 0,
    firstRow: 0,
    secondRow: 82,
    thirdRow: 164,
}

const DEFAULT_PLAYER = {
    sprite: 'images/char-boy.png',
    positionX: 200,
    positionY: 400,
}

// const DEFAULT_ENEMY = {
//     sprite: 'images/enemy-bug.png',
//     minSpeed: 200,
//     maxSpeed: 400,
//     widthEnemy: 80,
//     heightEnemy: 60,
//     positionX: -100,
//     positionY: [60, 142, 225],
// }

const DEFAULT_ENEMY = {
    sprite: 'images/enemy-bug.png',
    minSpeed: 200,
    maxSpeed: 400,
    widthEnemy: 80,
    heightEnemy: 60,
    positionX: -100,
    positionY: {
        firstRowEnemy: DEFAULT_MAP.firstRow + 60,
        secondRowEnemy: DEFAULT_MAP.secondRow + 60,
        thirdRowEnemy: DEFAULT_MAP.thirdRow + 60,
    },
}

let {firstRowEnemy, secondRowEnemy, thirdRowEnemy} = DEFAULT_ENEMY.positionY;

class Player {
    constructor(x = DEFAULT_PLAYER.positionX, y = DEFAULT_PLAYER.positionY){
        this.sprite = DEFAULT_PLAYER.sprite;
        this.x = x;
        this.y = y;
    }

    update(){
        if (this.y < DEFAULT_MAP.waterLine){
            setTimeout(() => {
                this.x = DEFAULT_PLAYER.positionX;
                this.y = DEFAULT_PLAYER.positionY;
            }, 300)
        }
    }

    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(key){
       if (key == 'left' && this.x > DEFAULT_MAP.waterLine){
        this.x -= DEFAULT_MAP.widthBlock;
       }
       if (key == 'right' && this.x < DEFAULT_PLAYER.positionY){
        this.x += DEFAULT_MAP.widthBlock;
       }
       if (key == 'up' && this.y > DEFAULT_MAP.waterLine){
        this.y -= DEFAULT_MAP.heightBlock;
       }
       if (key == 'down' && this.y < DEFAULT_PLAYER.positionY){
        this.y += DEFAULT_MAP.heightBlock;
       }
    }
}

let player = new Player();

class Enemy {
    constructor(x, y){
        this.sprite = DEFAULT_ENEMY.sprite;
        this.x = x;
        this.y = y;
        this.speed = this.changeSpeed();
    }

    changeSpeed(min = DEFAULT_ENEMY.minSpeed, max = DEFAULT_ENEMY.maxSpeed){
        return Math.floor(Math.random() * (max - min)) + min;
    }

    enemyKillPlayer(){
        if(player.x < this.x + DEFAULT_ENEMY.widthEnemy &&
            player.x + DEFAULT_ENEMY.widthEnemy > this.x &&
            player.y < this.y + DEFAULT_ENEMY.heightEnemy &&
            DEFAULT_ENEMY.heightEnemy + player.y > this.y){
                player.x = DEFAULT_PLAYER.positionX;
                player.y = DEFAULT_PLAYER.positionY;
        }
    }

    update(delta){
        this.x += this.speed * delta; 

        if(this.x > DEFAULT_MAP.widthMap){
            this.speed = this.changeSpeed();
            this.x = DEFAULT_ENEMY.positionX;
        }
        this.enemyKillPlayer();
    }

    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

let allEnemies = [];
//If you want create Enemy, add row number (along which a new enemy will run) to array.
let createEnemies = [1,2,3]

createEnemies.forEach((valueY) => {
    if (valueY === 1){
        enemy = new Enemy(DEFAULT_ENEMY.positionX, firstRowEnemy);
        allEnemies.push(enemy);
    }

    if (valueY === 2){
        enemy = new Enemy(DEFAULT_ENEMY.positionX, secondRowEnemy);
        allEnemies.push(enemy);
    }

    if (valueY === 3){
        enemy = new Enemy(DEFAULT_ENEMY.positionX, thirdRowEnemy);
        allEnemies.push(enemy);
    }
})

// DEFAULT_ENEMY.positionY.forEach((valueY) => {
//     enemy = new Enemy(DEFAULT_ENEMY.positionX, valueY);
//     allEnemies.push(enemy);
// })

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
