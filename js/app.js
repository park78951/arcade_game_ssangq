
// Enemies our player must avoid
// Parameter => x: x-axis, y: y-axis, speed: speed of enemies' movement
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed

    // Location of the image of enemies
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    //To return the enemies after crossing the boundary
    if (this.x > 540) {
        this.x = -100;
        this.speed = 200 + Math.floor(Math.random() * 500);
    }

    // To set the collision between a player and enemies
    if (this.x + 50 >= player.x &&
        this.x <= player.x + 60 &&
        this.y + 50 >= player.y  &&
        this.y <= player.y + 60) {
            player.x = 200;
            player.y = 360;
    }
};

// To draw the image of enemies on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Constructor for Player
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

// For player not to cross the boundaries, and to reset the position after winning
Player.prototype.update = function() {
    if (this.x < 0) {
        this.x = 0;
    }

    if (this.x > 400) {
        this.x = 400;
    }

    if (this.y < 40) {
        this.x = 200;
        this.y = 360;
    }

    if (this.y > 360) {
        this.y = 360;
    }
};

// To draw the image of player on the screen
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// To make player move on a constant interval
Player.prototype.handleInput = function(keyPress) {
    switch (keyPress) {
        case 'left':
        this.x -= 100;
        break;

        case 'up':
        this.y -= 80;
        break;

        case 'right':
        this.x += 100;
        break;

        case 'down':
        this.y += 80;
        break;
    }
    
};

// Emenemy position based on Y-axis
let enemyPosY = [220, 140, 60];
// Making an instance of Player contructor
let player = new Player (200, 360);
// Making a variable for instantiation of Enemy constructor in the map method in the variable "allEnemies"
let enemy;

// To make an array save 3 enemies in the game with creating the enemies.
// For different speed for each enemy from the start, the third argument is set by using a Math.random() method.
let allEnemies = enemyPosY.map( posY => enemy = new Enemy (0, posY, 200 + Math.floor(Math.random() * 500)));

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