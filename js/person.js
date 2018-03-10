Person = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y);
};

Person.prototype = Object.create(Phaser.Sprite.prototype);
Person.prototype.constructor = Person;


Person.prototype.update = function() {
	
};