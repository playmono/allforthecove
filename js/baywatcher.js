Baywatcher = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'baywatcher');

    var _this = this;

    this.scale.set(scaleFactor);
    this.smoothed = false;

	var bought = false;

    this.animations.add('idle', [0, 1, 2, 3], 5, true);

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
        _this.animations.play('idle');
    }, this);
};

Baywatcher.prototype = Object.create(Phaser.Sprite.prototype);
Baywatcher.prototype.constructor = Baywatcher;
Baywatcher.taken = false;

Baywatcher.prototype.update = function() {

};