// Enemies our player must avoid

var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
	this.x = -100;
	this.y = (83 * (Math.floor(Math.random() * (4 - 1)) + 1)) - 30;
	this.speed = Math.random() * (6 - 1) + 1;								

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite ='images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
this.x = this.x + (this.speed * 101 * dt);
	
	
	if (this.x > 505) {
		var check = allEnemies.indexOf(this);
		allEnemies.splice(check, 1);
		allEnemies.push(new Enemy());
	}

	// Check for collision here.
	var characterDistance = this.x - player.x;
	if (this.y == player.y && characterDistance > -61 && characterDistance < 40) {
		player.reset();
	}
};
	

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
var Player = function() {
	// The image/sprite for our player
	this.sprite = 'images/char-boy.png';

	
	this.x = 101 * 2;
	this.y = 83 * 5 - 30;  //-30 is an offsett to put the player in the middle of the row
};

// Update the player's position, required method for the game
Player.prototype.update = function(dt) {
	// Player's position is reset when they reach the water. 
	if (this.y < 53) {
		this.reset();
	}
};

// Draw the player on the screen, required method for the game
Player.prototype.render = function() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.reset = function() {
	this.x = 101 * 2;
	this.y = 83 * 5 - 30;
};
Player.prototype.handleInput = function (keyCode) {
    if (keyCode == 'up') {
		this.y = this.y - 83;
	}
	else if (keyCode == 'down' && this.y < 83 * 5 - 30) {
		this.y = this.y + 83;
	}
	else if (keyCode == 'left' && this.x > 101 * 0) {
		this.x = this.x - 101;
	}
	else if (keyCode == 'right' && this.x < 101 * 4) {
		this.x = this.x + 101;
	}
};

var allEnemies = [];
numberOfEnemies = 4;
for (i = 0; i < numberOfEnemies; i++) {
		allEnemies.push(new Enemy());
}

var player = new Player();


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


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
