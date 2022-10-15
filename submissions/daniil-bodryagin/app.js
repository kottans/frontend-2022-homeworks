const Enemy = function(speed, rowIndex, player) {
  this.sprite = 'images/enemy-bug.png';
  this.speed = speed;
  this.x = getX(field.colNumber);
  this.y = getY(rowIndex + 1);
  this.player = player;
}

Enemy.prototype.update = function(dt) {
  this.x += this.speed * dt;
  if (this.x > getX(field.colNumber)) {
    placeEnemy(this, field.colNumber);
  }
  if (isCollided(this, this.player)) {
    scoreUpdate();
    startGame();
  }
}

Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


const Player = function() {
  this.sprite = field.skin;
  this.x = getX(field.playerStartCol);
  this.y = getY(field.playerStartRow);
  this.disabled = false;
}

Player.prototype.update = function() {
  if (getRow(this.y) == 0 && !this.disabled) {
    this.disabled = true;
    scoreUpdate(field.winReward);
    setTimeout((function(){ 
      this.disabled = false;
      startGame();
    }).bind(this), 1000);
  }
}

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(direction) {
  if (this.disabled) return;
  switch (direction) {
    case 'left':
      if (this.x > getX(0)) {
        this.x -= field.colWidth;
      }
      break;
    case 'up':
      if (this.y > getY(0)) {
        this.y -= field.rowHeight;
      }
      break;
    case 'right':
      if (this.x < getX(field.colNumber - 1)) {
        this.x += field.colWidth;
      }
      break;
    case 'down':
      if (this.y < getY(field.rowNumber - 1)) {
        this.y += field.rowHeight;
      }
      break;
  }
}

const Bonus = function(player) {
  this.sprite = 'images/Selector.png'
  this.x = getX(Math.floor(Math.random() * field.colNumber));
  this.y = getY(0);
  this.player = player;
}

Bonus.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y); 
}

Bonus.prototype.update = function() {
  if (getRow(this.player.y) == getRow(this.y) && getCol(this.player.x) == getCol(this.x)) {
    scoreUpdate(field.bonusReward);
    bonus.x = getX(field.colNumber);
  }
}


const field = {
  skin: 'images/char-boy.png',
  colWidth: 101,
  rowHeight: 82,
  colNumber: 5,
  rowNumber: 6,
  playerStartCol: 2,
  playerStartRow: 5,
  verticalSpriteShift: 39,
  horizontalSpriteShift: 20,
  enemyRows: [
    {
        speed: 50,
        numOfEnemies: 3,
    },
    {
        speed: 120,
        numOfEnemies: 2,
    },
    {
        speed: 80,
        numOfEnemies: 3,
    }
  ],
  score: 0,
  maxScore: 0,
  winReward: 100,
  bonusReward: 250
}

const getX = function(col) {
  return col * field.colWidth;
}

const getY = function(row) {
  return row * field.rowHeight - field.verticalSpriteShift
}

const getCol = function(x) {
  return Math.floor(x / field.colWidth + 1);
}

const getRow = function(y) {
  return Math.floor((y + field.verticalSpriteShift) / field.rowHeight);
}

const isCollided = function (enemy, player) {
  if (getRow(enemy.y) != getRow(player.y)) return false;
  const playerLeftSide = player.x + field.horizontalSpriteShift;
  const playerRightSide = player.x + field.colWidth - field.horizontalSpriteShift;
  const enemyLeftSide = enemy.x;
  const enemyRightSide = enemy.x + field.colWidth;
  if (enemyRightSide > playerLeftSide && enemyLeftSide < playerRightSide) return true;
  return false;
}

const placeEnemy = function(enemy, offset) {
  let probableCol;  
  do {
    probableCol = Math.floor(Math.random() * field.colNumber - offset);
  } while(allEnemies.some(anotherEnemy => 
      getRow(anotherEnemy.y) == getRow(enemy.y) && getCol(anotherEnemy.x) == probableCol));
  enemy.x = getX(probableCol);
}

const startGame = function() {
  player = new Player();
  allEnemies = field.enemyRows.reduce((enemies, {speed, numOfEnemies}, rowIndex) => {
    const enemiesOnRow = Array.from(Array(numOfEnemies), () => new Enemy(speed, rowIndex, player));
    return enemies.concat(enemiesOnRow);
  }, []);
  bonus = new Bonus(player);
  allEnemies.forEach(enemy => placeEnemy(enemy, 0));
}

const scoreUpdate = function(reward) {
  let congratulation;
  if (reward === 0 || reward) {
    field.score += reward;
    congratulation = '';
  } else {
    if (field.maxScore < field.score) field.maxScore = field.score;
    field.score = 0;
    congratulation = `You've beat a record!`;
  }
  scoreParagraph.textContent = `Your score is: ${field.score}. ${congratulation} Best score: ${field.maxScore}`;
}

document.addEventListener('keyup', function(e) {
  const allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});

const scoreParagraph = document.createElement('p');
scoreParagraph.classList.add('score-paragraph');
document.body.prepend(scoreParagraph);

const skins = [
  {
    skin: 'Boy',
    src: 'images/char-boy.png'
  },
  {
    skin: 'Cat Girl',
    src: 'images/char-cat-girl.png'
  },
  {
    skin: 'Horn Girl',
    src: 'images/char-horn-girl.png'
  },
  {
    skin: 'Pink Girl',
    src: 'images/char-pink-girl.png'
  },
  {
    skin: 'Princess Girl',
    src: 'images/char-princess-girl.png'
  }
  
];

document.body.insertAdjacentHTML('beforeend', 
  `<p class="skin-caption">You can pick a skin!</p>`)
const skinPanel = document.createElement('div');
skinPanel.classList.add('skin-panel');
skinPanel.insertAdjacentHTML('beforeend', skins.map(({skin, src}) => 
  `<div class="skin-panel__tile" data-skin="${src}">
    <img src="${src}" alt="${skin}" class="skin-panel__img">
    <p class="skin-panel__title">${skin}</p>
  </div>`).join('\n'));
document.body.append(skinPanel);
skinPanel.addEventListener('click', function(event) {
  const tile = event.target.closest('.skin-panel__tile');
  field.skin = tile.dataset.skin;
  startGame();
});


let player;
let allEnemies;
startGame();
scoreUpdate(0);
