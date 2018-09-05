// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y + 55;// stops bug from entering the water
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.step = 101;
    this.boundary = this.step* 5;
    this.resetPosition = -this.step; //to reset the position from starting at another position.
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //condtion if the enemy to check that the enemy didn't cross the boundary
    if(this.x < this.boundary){
        // we multiply x by the speed *dt
        this.x += this.speed * dt;

    }else{
        this.x = this.resetPosition;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Hero{
        constructor(){
            this.sprite = 'images/char-boy.png';
            this.step = 101;
            this.jump = 83;
            this.startPointX = this.step * 2; //where to start from X axis
            this.startPointY = (this.jump * 4) + 55; //where to start from Y axis
            this.x = this.startPointX;
            this.y = this.startPointY;
            this.winner = false;
        }         //Draw hero sprite on current x and y coord position

        update(){
            //to check collision with the enemy
            for(let enemy of allEnemies){
                if (this.y === enemy.y && (enemy.x + enemy.step/2 > this.x && enemy.x < this.x + this.step/2)) {
                    this.reset();
                }
            }

            // to check if the player has won the game!
            if(this.y === 55){
                this.winner = true;
            }
        }
     render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
     }
//@param {string} input;
     handleInput(input){
        switch(input){
            case 'left':
            if(this.x > 0){ //to prevent our char-boy from moving out of the game board.
                this.x -= this.step;
            }
            break;

            case 'up':
            if(this.y > this.jump){
               this.y -= this.jump; 
            }
            break;

            case 'right':
            if(this.x < this.step*4){
              this.x += this.step;  
            }
            break;

            case 'down':
            if(this.y < this.jump *4){
                this.y += this.jump;
            }
            
            break;
        }
     }

     reset(){
        this.y  = this.startPointY;
        this.x = this.startPointX;
     }
}const player = new Hero();
const bug1 = new Enemy(-101, 0, 200);
const bug2 = new Enemy(-101, 83, 300);
const bug3 = new Enemy((-101*2.5), 83, 300);
    const allEnemies = [];
    allEnemies.push(bug1, bug2, bug3);
    console.log(allEnemies);
//const allEnemies = [];
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
