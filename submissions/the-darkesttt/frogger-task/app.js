const playerSkins = [
    {
        id: 'boy',
        src: 'images/char-boy.png',
    },
    {
        id: 'cat-girl',
        src: 'images/char-cat-girl.png',
    },
    {
        id: 'horn-girl',
        src: 'images/char-horn-girl.png',
    },
    {
        id: 'pink-girl',
        src: 'images/char-pink-girl.png',
    },
    {
        id: 'princess-girl',
        src: 'images/char-princess-girl.png',
    },
];

class Menu {
    bg;
    menu;
    menuTitle;
    menuDescriprion;

    menuList;
    menuItem;

    menuScore;
    menuClose;

    constructor() {
        this.bg = document.createElement('div');
        this.bg.classList.add('bg');
        this.menu = document.createElement('div');
        this.menu.classList.add('menu');
        this.menuTitle = document.createElement('h1');
        this.menuTitle.innerText = 'Game Menu';
        this.menuDescriprion = document.createElement('p');
    }

    start() {

        this.menuDescriprion.innerText = 'Choose your character!';
        this.menuList = document.createElement('ul');

        playerSkins.forEach((item) => {
            this.menuItem = document.createElement('li');
    
            const itemImg = document.createElement('img');
            const imgSrc = item.src;
            const imgId = item.id;
            itemImg.setAttribute('src', imgSrc);
            itemImg.setAttribute('id', imgId);
            const imgDesc = document.createElement('p');
            imgDesc.innerText = imgId;
    
            this.menuList.appendChild(this.menuItem);
            this.menuItem.appendChild(itemImg);
            this.menuItem.appendChild(imgDesc);
            
        });

        document.body.appendChild(this.bg);
        document.body.appendChild(this.menu);

        this.menu.appendChild(this.menuTitle);
        this.menu.appendChild(this.menuDescriprion);
        this.menu.appendChild(this.menuList);

        this.menuList.addEventListener('click', (event) => {
            const listTarget = event.target;
            if (listTarget.tagName == "UL") return;
        
            player.sprite = listTarget.getAttribute("src");
    
            this.bg.classList.add('menu-animation');
            this.menu.classList.add('menu-animation');

        });
    }

    death(points) {
        if (this.menuList.parentElement != null) {
            this.menuList.parentElement.removeChild(this.menuList);
        }

        this.bg.classList.remove('menu-animation');
        this.menu.classList.remove('menu-animation');

        this.menuDescriprion.innerText = 'You died! Your score:';

        this.menuScore = document.createElement('span');
        this.menuScore.innerText = points;
        this.menuScore.classList.add('menu-score');

        this.menu.appendChild(this.menuScore);

        this.menuClose = document.createElement('button');
        this.menuClose.innerText = 'Close menu and continue';
        this.menuClose.classList.add('menu-close');
        this.menu.appendChild(this.menuClose);

        this.menuClose.addEventListener('click', (event) => {
            this.bg.classList.add('menu-animation');
            this.menu.classList.add('menu-animation');

            this.menuDescriprion.innerText = '';
            this.menuScore.parentElement.removeChild(this.menuScore);
            this.menuClose.parentElement.removeChild(this.menuClose);
        });
    }
}


const startMenu = new Menu();
startMenu.start();

let points = 0;
const score = document.createElement('p');
score.classList.add('score');
document.body.appendChild(score);

function updateScore() {
    score.innerHTML = 'Score: ' + points;
}

updateScore();

function animateScoreGreen() {
    score.classList.add('green');
    setTimeout(function() {
        score.classList.remove('green');
    }, 1000)
}

function animateScoreBlue() {
    score.classList.add('blue');
    setTimeout(function() {
        score.classList.remove('blue');
    }, 1000)
}

let health = 3;

const healthBar = document.createElement('div');
document.body.appendChild(healthBar);
healthBar.classList.add("health");

function generateHealthBar() {

    if (health <= 0) {
        death();
    }

    if (healthBar.children.length > 0){
        let imgArr = Array(...healthBar.children);
        imgArr.forEach(item => {
            item.remove();
        });
    }

    for (let i = 1; i <= health; i++) {
        let img = document.createElement('img');
        img.setAttribute('src', 'images/Heart.png')
        healthBar.appendChild(img);
    }
}

generateHealthBar();

function death() {
    startMenu.death(points);

    health = 3;
    points = 0;
}

const blockSize = {
    width: 101,
    height: 85
};

const canvasSize = {
    width: 505,
    height: 606
};

const startPosition = {
    x: blockSize.width * 2,
    y: blockSize.width * 4
}

class Entity {
    x;
    y;
    scrite;

    constructor(x, y, sprite) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Enemy extends Entity {
    speed = 100 + Math.floor(Math.random() * 222);

    constructor(x, y, sprite) {
        super(x, y, sprite);
    }

    handleInput(){}

    update(dt) {

        if (this.sprite == "images/enemy-bug.png") {
            this.x += this.speed * dt;

            if (this.x > 500) {
                this.x = -50;
                this.speed = 100 + Math.floor(Math.random() * 222);
            }
        } else if (this.sprite == "images/enemy-bug-revert.png") {
            this.x -= this.speed * dt;

            if (this.x < -150) {
                this.x = canvasSize.width;
                this.speed = 100 + Math.floor(Math.random() * 222);
            };
        }
      
        if (player.x < this.x + 70 &&
            player.x + 70 > this.x &&
            player.y < this.y + 60 &&
            60 + player.y > this.y) {

            player.x = startPosition.x;
            player.y = startPosition.y;

            if (health <= 1) {
                death();
            } else {
                points -= 5;
                health--;
            }

            updateScore();
            animateScoreBlue();
            generateHealthBar();
        };
    }
}

class Player extends Entity {

    constructor(x, y, sprite) {
        super(x, y, sprite);
    }

    handleInput(keyPress) {

        if (keyPress == 'left' && this.x > 0) {
            this.x -= blockSize.width;
        };
    
        if (keyPress == 'right' && this.x < 400) {
            this.x += blockSize.width;
        };
    
        if (keyPress == 'up' && this.y > 0) {
            this.y -= blockSize.height;
        };
    
        if (keyPress == 'down' && this.y < 395) {
            this.y += blockSize.height;
        };

        this.reset();
    }

    update(){}

    reset() {
        if (this.y < 0) {
            alert('You won!');
            this.x = startPosition.x;
            this.y = startPosition.y;

            points += 10;
            updateScore();
            animateScoreGreen();
        }
        
    }
}

const allEnemies = [
    new Enemy( -150, blockSize.height - 30, "images/enemy-bug.png"),
    new Enemy( canvasSize.width, blockSize.height * 2 - 30, "images/enemy-bug-revert.png"),
    new Enemy( -150, blockSize.height * 3 - 30, "images/enemy-bug.png"),
];

const player = new Player(startPosition.x, startPosition.y, "images/char-cat-girl.png");

document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
