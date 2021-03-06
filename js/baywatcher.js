Baywatcher = function (game, x, y, name) {
    Phaser.Sprite.call(this, game, x, y, name);

    var _this = this;

    this.scale.set(scaleFactor);
    this.smoothed = false;

    this.bought = false;
    this.costOffset = 250;

    this.exclamationMark = null;
    this.exclamationMarkInitialX = this.centerX - 5;
    this.exclamationMarkInitialY = this.centerY + 24;
    this.beingDrag = false;

    this.cooldownSprite = gameState.add.sprite(this.exclamationMarkInitialX, this.exclamationMarkInitialY, 'icons');
    this.cooldownSprite.smoothed = false;
    this.cooldownSprite.scale.set(scaleFactor);
    this.cooldownSprite.kill();
    gameState.baywatcherCooldownsGroup.add(this.cooldownSprite);

    this.isInCooldown = false;

    this.animations.add('idle', [0, 1, 2, 3], 5, true);

    this.alpha = 0.7;
    this.inputEnabled = true;
    this.input.useHandCursor = true;

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

    this.frame = 4;
};

Baywatcher.prototype = Object.create(Phaser.Sprite.prototype);
Baywatcher.prototype.constructor = Baywatcher;

Baywatcher.prototype.click = function() {
    var _this = this;

    if (!this.bought) {
        this.alpha = 1;
        gameState.showPriceInfo(this.centerX - 25, this.centerY - 40, gameState.baywatcherCost);
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
        Tutorial.removeFromRead('buy');
        AudioManager.getSound('coin').play();

        gameState.money -= gameState.baywatcherCost;
        gameState.baywatcherCost += this.costOffset;
    }

    this.alpha = 1;
    this.bought = true;
    this.animations.play('idle');
    this.input.useHandCursor = false;

    _this.createExclamationMark();
}

Baywatcher.prototype.createExclamationMark = function() {
    var _this = this;

    this.exclamationMark = gameState.add.sprite(this.exclamationMarkInitialX, this.exclamationMarkInitialY, 'icons');
    this.exclamationMark.smoothed = false;
    this.exclamationMark.scale.set(scaleFactor);
    this.exclamationMark.frame = 12;

    this.exclamationMark.inputEnabled = true;
    this.exclamationMark.input.enableDrag(true, true);
    this.exclamationMark.input.useHandCursor = true;

    game.physics.arcade.enable(this.exclamationMark);
    gameState.baywatcherCooldownsGroup.add(this.exclamationMark);

    this.exclamationMark.body.setSize(1, 1, 7, 7);

    this.exclamationMark.events.onDragStart.add(this.onMarkExclamationDragStart, this);
    this.exclamationMark.events.onDragStop.add(this.onMarkExclamationDragStop, this);
}

Baywatcher.prototype.onMarkExclamationDragStart = function() {
    this.beingDrag = true;

    if (Tutorial.getCurrentOption() == 'splash') {
        Tutorial.update('splash');
    }
}

Baywatcher.prototype.onMarkExclamationDragStop = function() {
    this.beingDrag = false;

    var overlap = game.physics.arcade.overlap(this.exclamationMark, gameState.guirisGroup, this.checkCollision, null, this);

    this.exclamationMark.x = this.exclamationMarkInitialX;
    this.exclamationMark.y = this.exclamationMarkInitialY;

    if (Tutorial.getCurrentOption() == 'splash') {
        Tutorial.update('splash');
    }
}

Baywatcher.prototype.checkCollision = function(exclamationMark, guiri) {
    if (guiri.isSplashing) {
        guiri.isSplashing = false;

        Tutorial.removeFromRead('splash');

        guiri.splash.destroy();
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
        levels[gameState.currentLevel].warningCount++;
    } else if (guiri.isSwimming) {
        guiri.modifyHappiness(-10);
        //guiri.actions.freeActions = false;

        guiri.fromWaterToTowel();

        var distance = game.physics.arcade.distanceToXY(guiri, this.exclamationMarkInitialX, this.exclamationMarkInitialY);

        this.startCooldown(distance);

        guiri.actions.unalertedByBaywatcher = false;
        levels[gameState.currentLevel].warningCount++;
    }
}

Baywatcher.prototype.startCooldown = function(distance) {
     var _this = this;

    this.isInCooldown = true;
    this.exclamationMark.kill();
    this.cooldownSprite.revive();

    // proporcion: en el nivel 7 queremos la mitad de velocidad
    var proportion = 1 + gameState.difficulty/4;
    var seconds = Phaser.Timer.SECOND * (distance / 40) / proportion;

    var fps = 4 / (seconds / Phaser.Timer.SECOND);

    this.cooldownSprite.revive();
    this.cooldownSprite.animations.add('cooldown', [3, 2, 1, 0], fps, false);
    this.cooldownSprite.animations.play('cooldown');

    game.time.events.add(seconds, this.stopCooldown, this);
}

Baywatcher.prototype.stopCooldown = function() {
    this.isInCooldown = false;
    this.cooldownSprite.kill();

    if (this.exclamationMark != null) {
        this.exclamationMark.revive();
    }
}