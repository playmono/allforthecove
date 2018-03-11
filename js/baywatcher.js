Baywatcher = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'baywatcher');

    var _this = this;

    this.scale.set(scaleFactor);
    this.smoothed = false;

	this.bought = false;
    this.cost = 300;

    this.animations.add('idle', [0, 1, 2, 3], 5, true);

    this.moneyText = gameState.add.text(this.centerX, this.centerY);
    this.moneyText.setStyle({fill: '#FFFFFF', fontSize: 16});

    this.alpha = 0.2;
    this.inputEnabled = true;
    this.events.onInputOver.add(function () {
        if (!_this.bought) {
            _this.alpha = 0.7;
            _this.moneyText.setText(_this.cost);
        }
    }, this);
    this.events.onInputOut.add(function () {
        if (!_this.bought) {
            _this.alpha = 0.2;
            _this.moneyText.setText('');
        }
    }, this);
    this.events.onInputDown.add(function () {
        if (gameState.money >= _this.cost) {
           _this.buy(false);
        }
    }, this);
};

Baywatcher.prototype = Object.create(Phaser.Sprite.prototype);
Baywatcher.prototype.constructor = Baywatcher;

Baywatcher.prototype.update = function() {

};

Baywatcher.prototype.buy = function(free) {
    _this = this;

    this.moneyText.setText('');

    if (!free) {
        gameState.money -= this.cost;
    }

    this.alpha = 1;
    this.bought = true;
    this.animations.play('idle');
}