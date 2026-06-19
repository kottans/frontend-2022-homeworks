// --------------------------------------------------------------Settings-------------------------------------------------
const SCORE = {
    start: 0,
    victory: 10,
    gameOver: -10,
  };
  const GAME_CELL = {
    cellX: 101,
    cellY: 75,
  };
  const PLAYING_FIELD = {
    x: 5,
    y: 6,
  };
  const BORDER = {
    left: 0,
    right: GAME_CELL.cellX * (PLAYING_FIELD.x - 1),
    bottom: GAME_CELL.cellY * (PLAYING_FIELD.y - 1),
    top: 0,
  };
  const START_POSITION_PLAYER = {
    x: GAME_CELL.cellX * Math.floor(PLAYING_FIELD.x / 2),
    y: GAME_CELL.cellY * (PLAYING_FIELD.y - 1),
  };
  const POSITION_ENEMY = {
    firstStart: -GAME_CELL.cellX,
    secondStart: -GAME_CELL.cellX * 2,
    end: GAME_CELL.cellX * PLAYING_FIELD.x,
  };
  const COUNT_LINES = [1, 2, 3];
  const LINES = {
    line1: GAME_CELL.cellY * COUNT_LINES[0],
    line2: GAME_CELL.cellY * COUNT_LINES[1],
    line3: GAME_CELL.cellY * COUNT_LINES[2],
    randomLine: GAME_CELL.cellY * randomizer(Math.min(...COUNT_LINES), Math.max(...COUNT_LINES)),
  };
  const SPRETES = {
    enemy: "images/enemy-bug.png",
    player: "images/char-boy.png",
  };
  const BG_COLOR = {
    red: 100,
    green: 100,
    blue: 100,
    max: 255,
    min: 0,
    step: 10,
  };
  const COLOR = {
    red: 218,
    green: 165,
    blue: 32,
    step: 10,
  };
  const SPEED = {
    min: 50,
    max: 150,
  };
  const MASSAGE = {
    gameOver:
      "Співчуваю, жуки пустили вас на добрива =(\nПотрібно їм помститись! \n\nЗапускаємо по новій?",
    victory:
      "Вітаю, ви успішно влаштували жукам потоп! Амінь! \nНо що ж це? На вільне місце прийшли жуки зі сходу! \n\nАллах Акбар невірним!!!\nЗапускаємо по новій!",
  };
  function randomizer(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }
  
  // --------------------------------------------------------Parent class------------------------------------------------------
  class Character {
    constructor(positionX, positionY, speed, sprite) {
      this.positionX = positionX;
      this.positionY = positionY;
      this.speed = speed;
      this.sprite = sprite;
    }
  
    render() {
      ctx.drawImage(Resources.get(this.sprite), this.positionX, this.positionY);
    }
  }
  
  // --------------------------------------------------------Enemy class------------------------------------------------------
  class Enemy extends Character {
    constructor(positionX, positionY, speed, sprite) {
      super(positionX, positionY, speed, sprite);
    }
  
    update(dt) {
      this.positionX += this.speed * dt;
      this.startPosition();
      this.collision();
    }
  
    startPosition() {
      if (this.positionX > POSITION_ENEMY.end) {
        this.positionX = randomizer(POSITION_ENEMY.firstStart, POSITION_ENEMY.secondStart);
        this.positionY =
          randomizer(Math.min(...COUNT_LINES), Math.max(...COUNT_LINES)) * GAME_CELL.cellY;
      }
    }
  
    collision() {
      if (
        this.positionX + GAME_CELL.cellX > player.positionX &&
        this.positionX < player.positionX + GAME_CELL.cellX &&
        this.positionY + GAME_CELL.cellY > player.positionY &&
        this.positionY < player.positionY + GAME_CELL.cellY
      ) {
        this.win();
        player.loss();
      }
    }
  
    win() {
      this.speed++;
    }
  }
  
  // --------------------------------------------------------Player class------------------------------------------------------
  class Player extends Character {
    constructor(positionX, positionY, sprite) {
      super(positionX, positionY);
      this.score = SCORE.start;
      this.sprite = sprite;
      this.red = BG_COLOR.red;
      this.green = BG_COLOR.green;
      this.blue = BG_COLOR.blue;
      this.redScore = COLOR.red;
      this.greenScore = COLOR.green;
      this.blueScore = COLOR.blue;
    }
  
    update() {
      this.win();
    }
  
    win() {
      if (this.positionY <= BORDER.top) {
        this.score++;
        this.startPosition();
        this.styleWin();
      }
      if (this.score == SCORE.victory) {
        this.victory();
      }
    }
  
    loss() {
      this.score--;
      this.startPosition();
      this.slyleLoss();
      if (this.score == SCORE.gameOver) {
        this.gameOver();
      }
    }
  
    victory() {
      alert(MASSAGE.victory);
      this.score = 0;
      this.redrawStyle();
    }
  
    gameOver() {
      alert(MASSAGE.gameOver);
      this.score = 0;
      this.redrawStyle();
    }
  
    startPosition() {
      this.positionX = START_POSITION_PLAYER.x;
      this.positionY = START_POSITION_PLAYER.y;
    }
  
    handleInput(keyup) {
      switch (keyup) {
        case "left":
          this.positionX -= GAME_CELL.cellX;
          if (this.positionX < BORDER.left) {
            this.positionX = BORDER.left;
          }
          break;
        case "right":
          this.positionX += GAME_CELL.cellX;
          if (this.positionX > BORDER.right) {
            this.positionX = BORDER.right;
          }
          break;
        case "up":
          this.positionY -= GAME_CELL.cellY;
          if (this.positionY < BORDER.top) {
            this.positionY = BORDER.top;
          }
          break;
        case "down":
          this.positionY += GAME_CELL.cellY;
          if (this.positionY > BORDER.bottom) {
            this.positionY = BORDER.bottom;
          }
          break;
      }
    }
  
    styleWin() {
      if (this.red <= BG_COLOR.max) {
        this.red += BG_COLOR.step;
        this.redScore -= COLOR.step;
      } else if (this.green <= BG_COLOR.max) {
        this.green += BG_COLOR.step;
        this.greenScore -= COLOR.step;
      } else if (this.blue <= BG_COLOR.max) {
        this.blue += BG_COLOR.step;
        this.blueScore -= COLOR.step;
      }
      this.redrawStyle();
    }
  
    slyleLoss() {
      if (this.red >= BG_COLOR.min) {
        this.red -= BG_COLOR.step;
        this.redScore += COLOR.step;
      } else if (this.green >= BG_COLOR.min) {
        this.green -= BG_COLOR.step;
        this.greenScore += COLOR.step;
      } else if (this.blue >= BG_COLOR.min) {
        this.blue -= BG_COLOR.step;
        this.blueScore += COLOR.step;
      }
      this.redrawStyle();
    }
  
    redrawStyle() {
      document.getElementsByTagName(
        "body"
      )[0].style.backgroundColor = `rgb(${this.red},${this.green},${this.blue})`;
      yourScore.innerHTML = `<span>Your score = ${this.score}</span>`;
      document.getElementsByTagName(
        "span"
      )[0].style.color = `rgb(${this.redScore},${this.greenScore},${this.blueScore})`;
      document.getElementsByTagName("span")[0].style.fontSize = "20px";
    }
  }
  
  // --------------------------------------------------------New object------------------------------------------------------
  const allEnemies = [
    new Enemy(
      POSITION_ENEMY.firstStart,
      LINES.line1,
      randomizer(SPEED.min, SPEED.max),
      SPRETES.enemy
    ),
    new Enemy(
      POSITION_ENEMY.firstStart,
      LINES.line2,
      randomizer(SPEED.min, SPEED.max),
      SPRETES.enemy
    ),
    new Enemy(
      POSITION_ENEMY.firstStart,
      LINES.line3,
      randomizer(SPEED.min, SPEED.max),
      SPRETES.enemy
    ),
    new Enemy(
      POSITION_ENEMY.firstStart,
      LINES.randomLine,
      randomizer(SPEED.min, SPEED.max),
      SPRETES.enemy
    ),
  ];
  const player = new Player(START_POSITION_PLAYER.x, START_POSITION_PLAYER.y, SPRETES.player);
  
  // --------------------------------------------------------Event listener------------------------------------------------------
  document.addEventListener("keyup", function (e) {
    const allowedKeys = {
      37: "left",
      38: "up",
      39: "right",
      40: "down",
      65: "left",
      87: "up",
      68: "right",
      83: "down",
    };
    player.handleInput(allowedKeys[e.keyCode]);
  });
  
  // --------------------------------------------------------New DOM element and style------------------------------------------------------
  const yourScore = document.createElement("header");
  yourScore.innerHTML = `<span>Your score = ${SCORE.start}</span>`;
  document.body.append(yourScore);
  document.getElementsByTagName(
    "body"
  )[0].style.backgroundColor = `rgb(${BG_COLOR.red},${BG_COLOR.green},${BG_COLOR.blue})`;
  document.getElementsByTagName(
    "span"
  )[0].style.color = `rgb(${COLOR.red},${COLOR.green},${COLOR.blue})`;
  document.getElementsByTagName("span")[0].style.fontSize = "20px";
  