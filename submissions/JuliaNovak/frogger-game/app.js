// Enemies our player must avoid
var Enemy = function (x, y) {
   this.x = x;
   this.y = y;
   // Variables applied to each of our instances go here,
   // we've provided one for you to get started

   // The image/sprite for our enemies, this uses
   // a helper we've provided to easily load images
   this.sprite = "images/enemy-bug.png";
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
   // You should multiply any movement by the dt parameter
   // which will ensure the game runs at the same speed for
   // all computers.
   for (let i = 0; i < 200; i++) {
      this.x += dt;
      if (this.x > 550) {
         this.x = Math.floor(Math.random() * -200);
      }
   }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your Enemy.
// Place all enemy objects in an array called allEnemies
let enemy1 = new Enemy(0, 63);
let enemy2 = new Enemy(-30, 145);
let enemy3 = new Enemy(-50, 230);
const allEnemies = [enemy1, enemy2, enemy3];

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function (x, y) {
   this.x = x;
   this.y = y;
   this.sprite = "images/char-cat-girl.png";
   Player.prototype.update = function () {
      allEnemies.forEach((enemy) => {
         if (
            this.x < enemy.x + 80 &&
            this.x + 80 > enemy.x &&
            this.y < enemy.y + 60 &&
            60 + this.y > enemy.y
         ) {
            this.x = 200;
            this.y = 400;
         }
      });
   };
   Player.prototype.render = function () {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
   };
   Player.prototype.handleInput = function (key) {
      switch (key) {
         case "left":
            if (this.x > 0) {
               this.x -= 101;
               this.render();
            }
            break;
         case "right":
            if (this.x < y) {
               this.x += 101;
               this.render();
            }
            break;
         case "up":
            if (this.y > 0) {
               this.y -= 83;
               this.render();
            }
            break;
         case "down":
            if (this.y < y) {
               this.y += 83;
               this.render();
            }
            break;
      }
      if (this.y < 0) {
         setTimeout(() => {
            this.x = x;
            this.y = y;
            this.render();
         }, 700);
      }
   };
};

// Now instantiate Player.
// Place the player object in a variable called player
let player = new Player(200, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function (e) {
   var allowedKeys = {
      37: "left",
      38: "up",
      39: "right",
      40: "down",
   };

   player.handleInput(allowedKeys[e.keyCode]);
});
