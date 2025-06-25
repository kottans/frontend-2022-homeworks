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
   const fieldWidth = 505;
   // You should multiply any movement by the dt parameter
   // which will ensure the game runs at the same speed for
   // all computers.
   for (let i = 0; i < 200; i++) {
      this.x += dt;
      if (this.x > fieldWidth) {
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
const generateEnemies = function (numberOfEnemies) {
   const allEnemies = [];
   for (let i = 0; i < numberOfEnemies; i++) {
      const initialPositionX = 0;
      const initialPositionY = 63;
      const yDistanceBetwEnemies = 84;
      allEnemies.push(
         new Enemy(
            initialPositionX,
            initialPositionY + i * yDistanceBetwEnemies
         )
      );
   }
   return allEnemies;
};
const allEnemies = generateEnemies(3);

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function (x, y) {
   this.x = x;
   this.y = y;
   this.sprite = "images/char-cat-girl.png";
};

const calculatePositions = function (data) {
   allEnemies.forEach((enemy) => {
      const xCollisionPoint = 80;
      const yCollisionPoint = 60;
      if (
         data.x < enemy.x + xCollisionPoint &&
         data.x + xCollisionPoint > enemy.x &&
         data.y < enemy.y + yCollisionPoint &&
         yCollisionPoint + data.y > enemy.y
      ) {
         data.x = 200;
         data.y = 400;
      }
   });
};
Player.prototype.update = function () {
   calculatePositions(this);
};

Player.prototype.render = function () {
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (key) {
   const xCell = 101;
   const yCell = 83;
   switch (key) {
      case "left":
         if (this.x > 0) {
            this.x -= xCell;
            this.render();
         }
         break;
      case "right":
         if (this.x < defaultY) {
            this.x += xCell;
            this.render();
         }
         break;
      case "up":
         if (this.y > 0) {
            this.y -= yCell;
            this.render();
         }
         break;
      case "down":
         if (this.y < defaultY) {
            this.y += yCell;
            this.render();
         }
         break;
   }
   if (this.y < 0) {
      setTimeout(() => {
         this.x = defaultX;
         this.y = defaultY;
         this.render();
      }, 700);
   }
};

// Now instantiate Player.
// Place the player object in a variable called player
const defaultX = 200;
const defaultY = 400;
let player = new Player(defaultX, defaultY);

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
