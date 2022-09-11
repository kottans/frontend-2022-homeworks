
CELL_HEIGHT=83;
CELL_WIDTH=100;
COLLISION=false;
WIN=false;
PLAYER_X_START=200;
PLAYER_Y_START=383;

// Enemies our player must avoid
class Enemy {
    constructor({x,y,speed}){
        this.sprite = 'images/enemy-bug.png';
        this.x=x;
        this.y=y;
        this.speed=speed;
    }
    
    update(dt){
        this.x+=(dt*(this.speed+0.4*this.speed*game.getLevel()))*(!game.isStop);
        if (this.x>500){this.x=-150;}
        //console.log(this.isCollision);
        if (this.isCollision()){
            player.start();
            game.setLevel();
        }
    }

    isCollision(){
        if (  (this.x > player.x-50 && this.x < player.x+50) &&
              (this.y > player.y-40 && this.y < player.y+40) ) {
            return true;
        }
        else { 
            return false;
        }
    }

    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// Draw the enemy on the screen, required method for game

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

//let Player={};
//Player.__proto__=Enemy;

class Player {
    constructor(){
        this.sprite = 'images/char-boy.png';
        this.x=PLAYER_X_START;
        this.y=PLAYER_Y_START;
    }

    handleInput(key){
        switch(key){
            case "up":
                if(this.y>0){
                    this.y-=CELL_HEIGHT; 
                }                
                break;
            case "down":
                if(this.y<383){
                    this.y+=CELL_HEIGHT;
                }    
                break;
            case "left":
                if(this.x>0){
                    this.x-=CELL_WIDTH;
                }    
                break;
            case "right":
                if(this.x<400){
                    this.x+=CELL_WIDTH;
                }  
                break;
            default:break;
        }
    }

    isWin(){
        if (this.y<=0){
            return true;
        }
        else {
            return false;
        }
    }

    update(){

    }
    start(){
        this.x=PLAYER_X_START;
        this.y=PLAYER_Y_START;
    }
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Draw the enemy on the screen, required method for game

// Now instantiate your objects.

class Game {
    constructor(){
        this._level=0;
        this.isStop=false;
        this.isGameOver=false;
    }
    
    setLevel(){
        this._level=0;
    }
    getLevel(){
        return this._level;
    }
    incLevel(){
        this._level++;
    }
    gameStart(){ 

    }
}

const bug1=new Enemy({x:0,y:140,speed:100});
const bug2=new Enemy({x:0,y:50,speed:50});
const bug3=new Enemy({x:0,y:230,speed:200});

// Place all enemy objects in an array called allEnemies
const allEnemies=[bug1, bug2, bug3];
// Place the player object in a variable called player
const player=new Player();
const game=new Game();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function playerMove(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    if (player.isWin()){
        game.isStop=true;
        game.incLevel();
        player.start();
        document.removeEventListener('keyup',playerMove);
        
        const body=document.querySelector(".message");
        let div=`<div class="class__modal">You LEVEL ${game.getLevel()}!</div>`;
        body.innerHTML=div;

        setTimeout(()=>{
            game.isStop=false;
            document.addEventListener('keyup',playerMove);
            body.innerHTML='';
        },1500);
    }
});
