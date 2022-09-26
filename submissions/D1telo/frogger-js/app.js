var Enemy = function (x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;

  this.sprite = "images/enemy-bug.png";
};

Enemy.prototype.update = function (dt) {
  this.x += this.speed * dt;

  if (this.x > 510) {
    this.x = -50;
    this.speed = 100 + Math.floor(Math.random() * 222);
  };

  if (player.x < this.x + 80 &&
    player.x + 80 > this.x &&
    player.y < this.y + 60 &&
    60 + player.y > this.y) {
        alert(`You lose! Try again:)`);
    player.x = 205;
    player.y = 405;
  };
};

Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function (x, y) {
  this.x = x;
  this.y = y;
  this.win = 0;
  this.player = "images/char-boy.png";
};

Player.prototype.update = function (dt) {

};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

Player.prototype.handleInput = function (keyPress) {
  if (keyPress == "left" && this.x > 0) {
    this.x -= 102;
  };
  if (keyPress == "right" && this.x < 405) {
    this.x += 102;
  };
  if (keyPress == "up" && this.y > 0) {
    this.y -= 83;
  };
  if (keyPress == "down" && this.y < 405) {
    this.y += 83;
  };
  if (this.y < 0) {
    this.win++;
    setTimeout(() => {
        alert(`You win! Victory: ${ this.win }`);
      this.x = 205;
      this.y = 405;
    }, 100);
  };
};

var allEnemies = [];
var enemyLocation = [63, 147, 230];

enemyLocation.forEach(function(locationY){
    enemy = new Enemy(0, locationY, 200);
    allEnemies.push(enemy);
});

var player = new Player(205,405);

document.addEventListener("keyup", function (e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
