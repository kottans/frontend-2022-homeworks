const config = {
    canvas: {
        COLUMN: 101,
        ROW: 83,
        HEIGHT: 600,
        WIDTH: 500,
    },
    player: {
        POS_X: 200,
        POS_Y: 400
    },
    enemy: {
        TOP_POS: 51,
        MIDDLE_POS: 141,
        BOTTOM_POS: 226,
    },
    game: {
        MAX_SPEED: 300,
        MIN_SPEED: 100,
        BUG_PADDING_LEFT: 78,
        BUG_PADDING_TOP:20
    }
};

let chosenCharacter = 'images/char-boy.png';

const randomCharacter = () => {
    const arrayOfCharacters = [
        'char-boy.png',
        'char-cat-girl.png',
        'char-horn-girl.png',
        'char-pink-girl.png',
        'char-princess-girl.png'
    ];

    const index = Math.floor(Math.random() * (6));

    chosenCharacter = 'images/' + arrayOfCharacters[index];
};

randomCharacter();

class Enemy {
    constructor(y, x = -config.canvas.COLUMN) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/enemy-bug.png';
        this.speed = this.randomSpeed();
    }

    randomSpeed() {
        return Math.floor(Math.random() * (config.game.MAX_SPEED - config.game.MIN_SPEED)) + config.game.MIN_SPEED;
    }

    resetPosition() {
        this.x = -config.canvas.COLUMN;
    }

    update(dt) {
        this.x += dt * this.speed;

        if (this.x >= config.canvas.WIDTH) {
            this.resetPosition();
        }
    };

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

}

class Player extends Enemy {
    constructor(x, y) {
        super(x, y);
        this.sprite = chosenCharacter;
        this.score = 0;
    }

    handleInput(key) {
        switch (key) {
            case 'ArrowUp':
                if (this.y > 0)
                    this.y -= config.canvas.ROW;
                if (this.y < 0) {
                    setTimeout(() => {
                        this.win();
                    }, 100);
                }
                break;
            case 'ArrowDown':
                if (this.y < config.player.POS_Y) {
                    this.y += config.canvas.ROW;
                }
                break;
            case 'ArrowLeft':
                if (this.x > 0) {
                    this.x -= config.canvas.COLUMN;
                }
                break;
            case 'ArrowRight':
                if (this.x < config.canvas.WIDTH - config.canvas.COLUMN) {
                    this.x += config.canvas.COLUMN;
                }
                break;
        }
    }

    win() {
        this.score++;
        alert(`You win! Score:${ this.score }`);
        this.resetPosition();
    }

    lose() {
        if (this.score > 0) {
            this.score--;
        }
        alert(`You lose! Score:${ this.score }`);
        this.resetPosition();
    }

    checkCollisions() {
        allEnemies.forEach((enemy) => {
            if (
                this.calculateEnemyPosition(this.x, config.game.BUG_PADDING_LEFT, '-') < enemy.x &&
                this.calculateEnemyPosition(this.x, config.game.BUG_PADDING_LEFT) > enemy.x &&
                this.calculateEnemyPosition(this.y, config.game.BUG_PADDING_TOP, '-') < enemy.y &&
                this.calculateEnemyPosition(this.y, config.game.BUG_PADDING_TOP) > enemy.y
            ) {
                this.lose();
            }
        });
    }

    resetPosition() {
        this.x = config.player.POS_X;
        this.y = config.player.POS_Y;
    }

    calculateEnemyPosition(playerPosition, enemySize, operation = '+') {
        return operation === '+'
            ? playerPosition + enemySize
            : playerPosition - enemySize;
    }

    update() {
        this.checkCollisions();
    };
}


const addEnemies = () => Object.values(config.enemy).map(pos => new Enemy(pos));

const allEnemies = addEnemies();

const player = new Player(config.player.POS_Y, config.player.POS_X);

document.addEventListener('keyup', function ({ key }) {
    player.handleInput(key);
});
