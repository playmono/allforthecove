Baywatcher = function (game, x, y, name) {
    Phaser.Sprite.call(this, game, x, y, name);

    var _this = this;

    this.scale.set(scaleFactor);
    this.smoothed = false;

    this.bought = false;

    this.exclamationMark = null;
    this.exclamationMarkInitialX = this.centerX - 5;
    this.exclamationMarkInitialY = this.centerY + 24;

    this.isInCooldown = false;

    this.animations.add('idle', [0, 1, 2, 3], 5, true);

    this.priceInfo = null;

    this.alpha = 0.7;
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
            _this.alpha = 0.7;

            if (_this.priceInfo != null) {
                _this.priceInfo.destroy();
            }
        }
    }, this);

    this.frame = 4;
};

Baywatcher.prototype = Object.create(Phaser.Sprite.prototype);
Baywatcher.prototype.constructor = Baywatcher;

Baywatcher.prototype.update = function() {

};

Baywatcher.prototype.click = function() {
    var _this = this;

    if (!this.bought) {
        this.alpha = 1;
        this.priceInfo = gameState.createPriceInfo(this.centerX - 25, this.centerY - 40, gameState.baywatcherCost);
    }
}

Baywatcher.prototype.doubleClick = function() {
    var _this = this;

    if (!this.bought && gameState.money >= gameState.baywatcherCost) {
       this.buy(false);
    }
}

Baywatcher.prototype.buy = function(free) {
    var _this = this;

    if (!free) {
        gameState.money -= gameState.baywatcherCost;
        gameState.baywatcherCost += 150;
        coinEffect.play();
    }

    this.alpha = 1;
    this.bought = true;
    this.animations.play('idle');

    _this.createExclamationMark();
}

Baywatcher.prototype.createExclamationMark = function() {
    var _this = this;

    this.exclamationMark = gameState.add.sprite(this.exclamationMarkInitialX, this.exclamationMarkInitialY, 'icons');
    this.exclamationMark.smoothed = false;
    this.exclamationMark.scale.set(scaleFactor);
    this.exclamationMark.frame = 12;

    this.exclamationMark.inputEnabled = true;
    this.exclamationMark.input.enableDrag(true);

    game.physics.arcade.enable(this.exclamationMark);

    this.exclamationMark.body.setSize(1, 1, 7, 7);

    this.exclamationMark.events.onDragStop.add(this.onMarkExclamationDragStop, this);
}

Baywatcher.prototype.onMarkExclamationDragStop = function() {
    var overlap = game.physics.arcade.overlap(this.exclamationMark, gameState.guirisGroup, this.checkCollision, null, this);

    this.exclamationMark.x = this.exclamationMarkInitialX;
    this.exclamationMark.y = this.exclamationMarkInitialY;
}

Baywatcher.prototype.checkCollision = function(exclamationMark, guiri) {
    if (guiri.isSplashing) {
        guiri.splash.destroy();
        guiri.isSplashing = false;

        guiri.fromWaterToTowel();

        guiri.modifyHappiness(-10);
        //guiri.actions.freeActions = false;

        gameState.guirisGroup.forEach(function(waterGuiri) {
            if ((waterGuiri.isSwimming || waterGuiri.isSplashing)
                && (gameState.guirisGroup.getIndex(guiri) != gameState.guirisGroup.getIndex(waterGuiri))
            ) {
                waterGuiri.modifyHappiness(10);
                waterGuiri.actions.quietSwam = true;
            }
        });

        var distance = game.physics.arcade.distanceToXY(guiri, this.exclamationMarkInitialX, this.exclamationMarkInitialY);

        this.startCooldown(distance);

        guiri.actions.unalertedByBaywatcher = false;
    } else if (guiri.isSwimming) {
        guiri.modifyHappiness(-10);
        //guiri.actions.freeActions = false;

        guiri.fromWaterToTowel();

        var distance = game.physics.arcade.distanceToXY(guiri, this.exclamationMarkInitialX, this.exclamationMarkInitialY);

        this.startCooldown(distance);

        guiri.actions.unalertedByBaywatcher = false;
    }
}

Baywatcher.prototype.startCooldown = function(distance) {
     var _this = this;

    this.isInCooldown = true;
    this.exclamationMark.kill();

    var cooldownSprite = gameState.add.sprite(this.exclamationMarkInitialX, this.exclamationMarkInitialY, 'icons');
    cooldownSprite.smoothed = false;
    cooldownSprite.scale.set(scaleFactor);

    var seconds = Phaser.Timer.SECOND * (distance / 40);
    var fps = 4 / (seconds / Phaser.Timer.SECOND);

    cooldownSprite.animations.add('cooldown', [3, 2, 1, 0], fps, false);

    cooldownSprite.animations.play('cooldown');

    gameState.baywatcherCooldownsGroup.add(cooldownSprite);

    game.time.events.add(seconds, function () {
        _this.isInCooldown = false;

        cooldownSprite.destroy();

        _this.exclamationMark.revive();
    });
}