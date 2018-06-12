Trash = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'trash');

    var _this = this;

    this.priceInfo = null;

    this.bought = false;
    this.isInCooldown = false;

    this.scale.set(scaleFactor);
    this.smoothed = false;
    this.alpha = 0.7;
    this.inputEnabled = true;

    this.mapFrame = {
        unbought : 1,
        bought: 0
    };

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
            _this.alpha = 0.7;

            if (_this.priceInfo != null) {
                _this.priceInfo.destroy();
            }
        }
    }, this);

    this.enableBody = true;
    game.physics.arcade.enable(this);

    this.frame = this.mapFrame.unbought;
};

Trash.prototype = Object.create(Phaser.Sprite.prototype);
Trash.prototype.constructor = Trash;

Trash.prototype.update = function() {

};

Trash.prototype.click = function() {
    var _this = this;

    if (!this.bought) {
        this.alpha = 1;

        this.priceInfo = gameState.createPriceInfo(this.centerX - 20, this.centerY - 85, gameState.trashCost);
    }
}

Trash.prototype.doubleClick = function() {
    var _this = this;

    if (!this.bought && gameState.money >= gameState.trashCost) {
       this.buy(false);
    }
}

Trash.prototype.buy = function(free) {
    _this = this;

    if (!free) {
        gameState.money -= gameState.trashCost;
        gameState.trashCost += 20;
    }

    this.alpha = 1;
    this.bought = true;
    this.frame = this.mapFrame.bought;
}

Trash.prototype.startCooldown = function(distance) {
    var _this = this;

    this.isInCooldown = true;

    var cooldownSprite = gameState.add.sprite(this.centerX, this.centerY, 'icons');
    cooldownSprite.smoothed = false;
    cooldownSprite.scale.set(scaleFactor);

    var seconds = Phaser.Timer.SECOND * (distance / 40);
    var fps = 4 / (seconds / Phaser.Timer.SECOND);

    cooldownSprite.animations.add('cooldown', [7, 6, 5, 4], fps, false);

    cooldownSprite.animations.play('cooldown');

    gameState.cooldownsGroup.add(cooldownSprite);

    game.time.events.add(seconds, function () {
        _this.isInCooldown = false;

        cooldownSprite.destroy();
    });
}