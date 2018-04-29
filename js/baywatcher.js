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

    this.moneyText = gameState.add.text(this.centerX, this.centerY);
    this.moneyText.setStyle({fill: '#FFFFFF', fontSize: 16});

    this.alpha = 0.2;
    this.inputEnabled = true;
    this.events.onInputOver.add(function () {
        if (!_this.bought) {
            _this.alpha = 0.7;
            _this.moneyText.setText(gameState.baywatcherCost);
        }
    }, this);
    this.events.onInputOut.add(function () {
        if (!_this.bought) {
            _this.alpha = 0.2;
            _this.moneyText.setText('');
        }
    }, this);
    this.events.onInputDown.add(function () {
        if (gameState.money >= gameState.baywatcherCost) {
           _this.buy(false);
        }
    }, this);
};

Baywatcher.prototype = Object.create(Phaser.Sprite.prototype);
Baywatcher.prototype.constructor = Baywatcher;

Baywatcher.prototype.update = function() {

};

Baywatcher.prototype.buy = function(free) {
    var _this = this;

    this.moneyText.setText('');

    if (!free) {
        gameState.money -= gameState.baywatcherCost;
        gameState.baywatcherCost += 150;
    }

    this.alpha = 1;
    this.bought = true;
    this.animations.play('idle');

    coinEffect.play();

    _this.createExclamationMark();
}

Baywatcher.prototype.createExclamationMark = function() {
    var _this = this;

    this.exclamationMark = gameState.add.sprite(this.exclamationMarkInitialX, this.exclamationMarkInitialY, 'icons');
    this.exclamationMark.smoothed = false;
    this.exclamationMark.scale.set(scaleFactor);

    this.exclamationMark.animations.add('idle', [12], 0, false);

    this.exclamationMark.animations.play('idle');

    this.exclamationMark.inputEnabled = true;
    this.exclamationMark.input.enableDrag(true);

    game.physics.arcade.enable(this.exclamationMark);

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

        guiri.happiness -= 10;

        gameState.guirisGroup.forEach(function(waterGuiri) {
            if (waterGuiri.isSwimming || waterGuiri.isSplashing) {
                if (gameState.guirisGroup.getIndex(guiri) != gameState.guirisGroup.getIndex(waterGuiri)) {
                    waterGuiri.happiness += 10;

                    var happyFace = gameState.add.sprite(waterGuiri.x, waterGuiri.y - 10, 'icons');
                    happyFace.smoothed = false;
                    happyFace.scale.set(scaleFactor);
                    happyFace.animations.add('idle', [16, 17, 18, 19], 8, true);
                    happyFace.animations.play('idle');

                    var happyTweenStatic = gameState.add.tween(this);
                    var happyTweenFade = gameState.add.tween(this);

                    var happyTweenStatic = gameState.add.tween(happyFace).to({
                        // @ todo: this should be an event, not a tween
                    }, Phaser.Timer.SECOND * 3 / gameState.difficulty, Phaser.Easing.Linear.None, true);

                    happyTweenStatic.onComplete.add(function() {
                        happyTweenFade = gameState.add.tween(happyFace).to({
                            alpha: 0,
                        }, Phaser.Timer.SECOND * 2 / gameState.difficulty, Phaser.Easing.Linear.None, true);
                    })

                    happyTweenFade.onComplete.add(function() {
                        happyFace.destroy();
                    })
                }
            }
        });

        var distance = game.physics.arcade.distanceToXY(guiri, this.exclamationMarkInitialX, this.exclamationMarkInitialY);

        this.startCooldown(distance);
    } else if (guiri.isSwimming) {
        guiri.happiness -= 10;

        guiri.fromWaterToTowel();

        var distance = game.physics.arcade.distanceToXY(guiri, this.exclamationMarkInitialX, this.exclamationMarkInitialY);

        this.startCooldown(distance);
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

    game.time.events.add(seconds, function () {
        _this.isInCooldown = false;

        cooldownSprite.destroy();

        _this.exclamationMark.revive();
    });
}