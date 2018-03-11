Trash = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'trash');

    var _this = this;

    var bought = false;

    this.scale.set(scaleFactor);
    this.smoothed = false;
    this.alpha = 0.2;
    this.inputEnabled = true;
    this.events.onInputOver.add(function () {
    	if (!_this.bought) {
    		_this.alpha = 0.7;
    	}
    }, this);
    this.events.onInputOut.add(function () {
    	if (!_this.bought) {
    		_this.alpha = 0.2;
    	}
    }, this);
    this.events.onInputDown.add(function () {
    	_this.alpha = 1;
    	_this.bought = true;
    }, this);

	//this.animations.add('idle', [0, 1, 2, 3], 8, true);
	//this.animations.play('idle');
};

Trash.prototype = Object.create(Phaser.Sprite.prototype);
Trash.prototype.constructor = Trash;

Trash.prototype.update = function() {

};