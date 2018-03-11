Trash = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'trash');

    var _this = this;

    this.bought = false;
    this.cost = 50;
    this.isInCooldown = false;

    this.scale.set(scaleFactor);
    this.smoothed = false;
    this.alpha = 0.2;
    this.inputEnabled = true;

    this.moneyText = gameState.add.text(this.centerX, this.centerY);
    this.moneyText.setStyle({fill: '#FFFFFF', fontSize: 16});

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

    this.enableBody = true;
    game.physics.arcade.enable(this);
};

Trash.prototype = Object.create(Phaser.Sprite.prototype);
Trash.prototype.constructor = Trash;

Trash.prototype.update = function() {

};

Trash.prototype.buy = function(free) {
    _this = this;

    this.moneyText.setText('');

    if (!free) {
        gameState.money -= this.cost;
    }

    this.alpha = 1;
    this.bought = true;
}

Trash.prototype.startCooldown = function() {
    var _this = this;

    this.isInCooldown = true;

    var cooldownSprite = gameState.add.sprite(this.centerX, this.centerY, 'icons');
    cooldownSprite.smoothed = false;
    cooldownSprite.scale.set(scaleFactor);

    cooldownSprite.animations.add('cooldown', [4, 5, 6, 7, 7], 1, false);

    cooldownSprite.animations.play('cooldown');

    game.time.events.add((Phaser.Timer.SECOND * 4), function () {
        _this.isInCooldown = false;

        cooldownSprite.destroy();
    });
}