const enemyConfig = [
   {y: 60, speedX: 400, },
   {y: 145, speedX: 320, },
   {y: 230, speedX: 270, },
]
class Enemies {
   constructor(y, speedX) {
      this.sprite = 'images/enemy-bug.png';
      this.x = 0;
      this.y = y;
      this.speedX = speedX;
   }
   update(dt) {
      this.x += this.speedX * dt;
      if (this.x > 500) this.x = -100;
      this.checkClash();
   }
   checkClash() {
         if (player.x < this.x + 77 && player.x + 77 > this.x && player.y < this.y + 66 && player.y + 66 > this.y) {
            player.x = player.startX;
            player.y = player.startY;
         }
      }
   render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
   }
}
let enemy1 = new Enemies(enemyConfig[0].y, enemyConfig[0].speedX);
let enemy2 = new Enemies(enemyConfig[1].y, enemyConfig[1].speedX);
let enemy3 = new Enemies(enemyConfig[2].y, enemyConfig[2].speedX);
const allEnemies = [enemy1, enemy2, enemy3]



class Player {
   constructor(speedX, speedY) {
      this.sprite = 'images/char-horn-girl.png';
      this.startX = 200;
      this.startY = 400;
      this.x = 200;
      this.y = 400;
      this.speedX = speedX;
      this.speedY = speedY;
   }
   update() {
      if (player.y == -25) {
         this.goToStart();
         alert('Вы выиграли!')
      }
   }
   render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
   }
   goToStart() {
      this.y = this.startY;
      this.x = this.startX;
   }
   handleInput(key) {
      if (key === 'left') {
         if (this.x > 0) this.x -= this.speedX;
      } else if (key === 'up') {
         if (this.y > 0) this.y -= this.speedY;
      }
      else if (key === 'right') {
         if (this.x < 400) this.x += this.speedX;
      } else if (key === 'down') {
         if (this.y < 400) this.y += this.speedY;
      }
   }
}
const player = new Player(100, 85);

document.addEventListener('keyup', function (e) {
   var allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
   };

   player.handleInput(allowedKeys[e.keyCode]);
});
