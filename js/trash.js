Trash = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'trash');

    var _this = this;

    this.bought = false;
    this.costOffset = 30;

    this.isInCooldown = false;

    this.scale.set(scaleFactor);
    this.smoothed = false;
    this.alpha = 0.7;
    this.inputEnabled = true;
    this.input.useHandCursor = true;

    this.cooldownSprite = gameState.add.sprite(this.centerX, this.centerY, 'icons');
    this.cooldownSprite.smoothed = false;
    this.cooldownSprite.scale.set(scaleFactor);
    gameState.cooldownsGroup.add(this.cooldownSprite);

    this.cooldownSprite.kill();

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

            gameState.priceSprite.kill();
            gameState.priceText.visible = false;
        }
    }, this);

    this.enableBody = true;
    game.physics.arcade.enable(this);

    this.frame = this.mapFrame.unbought;
};

Trash.prototype = Object.create(Phaser.Sprite.prototype);
Trash.prototype.constructor = Trash;

Trash.prototype.click = function() {
    var _this = this;

    if (!this.bought) {
        this.alpha = 1;
        gameState.showPriceInfo(this.centerX - 20, this.centerY - 85, gameState.trashCost);
    }
}

Trash.prototype.doubleClick = function() {
    var _this = this;

    if (!this.bought && gameState.money >= gameState.trashCost) {
       this.buy(false);
    }
}

Trash.prototype.buy = function(free) {
    var _this = this;

    if (!free) {
        gameState.money -= gameState.trashCost;
        gameState.trashCost += this.costOffset;
    }

    this.alpha = 1;
    this.bought = true;
    this.frame = this.mapFrame.bought;
    this.input.useHandCursor = false;
}

Trash.prototype.startCooldown = function(distance) {
    var _this = this;

    this.isInCooldown = true;
    this.cooldownSprite.revive();

    var seconds = Phaser.Timer.SECOND * (distance / 40);
    var fps = 4 / (seconds / Phaser.Timer.SECOND);

    this.cooldownSprite.animations.add('cooldown', [7, 6, 5, 4], fps, false);
    this.cooldownSprite.animations.play('cooldown');

    game.time.events.add(seconds, this.stopCooldown, this);
}

Trash.prototype.stopCooldown = function() {
    this.isInCooldown = false;
    this.cooldownSprite.kill();
}