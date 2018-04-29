Chiringuito = function (game, x, y, name) {
    this.taken = false;

    Phaser.Sprite.call(this, game, x, y, name);

    var _this = this;

    this.scale.set(scaleFactor);
    this.smoothed = false;

	this.bought = false;
    this.cost = 100;

    this.animations.add('unbought', [4], 1, false);
	this.animations.add('idle', [0, 1, 2, 3], 5, true);

    this.moneyText = gameState.add.text(this.centerX, this.centerY);
    this.moneyText.setStyle({fill: '#FFFFFF', fontSize: 16});

    this.alpha = 0.2;
    this.inputEnabled = true;

    this.dblClickTrigger = false;
    this.events.onInputDown.add(function () {
        if (!_this.dblClickTrigger) {
            _this.dblClickTrigger = true;

            gameState.time.events.add(300, function(){
                _this.dblClickTrigger = false;
            }, _this);

            // SINGLE TAP
            _this.click();
            return;
        }

        // DOUBLE TAP
        _this.doubleClick();

    }, this);

    this.events.onInputUp.add(function () {
        if (!_this.bought) {
            _this.alpha = 0.2;
            _this.moneyText.setText('');
        }
    }, this);

    this.animations.play('unbought');
};

Chiringuito.prototype = Object.create(Phaser.Sprite.prototype);
Chiringuito.prototype.constructor = Chiringuito;

Chiringuito.prototype.update = function() {

};

Chiringuito.prototype.click = function() {
    var _this = this;

    if (!this.bought) {
        this.alpha = 0.7;
        this.moneyText.setText(this.cost);
    }
}

Chiringuito.prototype.doubleClick = function() {
    var _this = this;

    if (gameState.money >= this.cost) {
       this.buy(false);
    }
}

Chiringuito.prototype.buy = function(free) {
    var _this = this;

    this.moneyText.setText('');

    if (!free) {
        gameState.money -= this.cost;
    }

    this.alpha = 1;
    this.bought = true;
    this.animations.play('idle');

    //coinEffect.play();
}