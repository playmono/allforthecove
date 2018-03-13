Baywatcher = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'baywatcher');

    var _this = this;

    this.scale.set(scaleFactor);
    this.smoothed = false;

	this.bought = false;

    this.exclamationMark = null;
    this.exclamationMarkisDragging = false;
    this.exclamationMarkInitialX = this.centerX - 5;
    this.exclamationMarkInitialY = this.centerY + 24;

    this.animations.add('idle', [0, 1, 2, 3], 5, true);

    this.moneyText = gameState.add.text(this.centerX, this.centerY);
    this.moneyText.setStyle({fill: '#FFFFFF', fontSize: 16});

    this.alpha = 0.2;
    this.inputEnabled = true;
    this.events.onInputOver.add(function () {
        if (!_this.bought) {
            _this.alpha = 0.7;
            _this.moneyText.setText(gameState.baywatcherCost);
        } else {
            if (_this.exclamationMark == null) {
                if (!_this.exclamationMark.alive) {
                    _this.createExclamationMark();
                }
            }
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

    this.exclamationMark.events.onInputDown.add(function () {
        _this.exclamationMarkisDragging = true;
    }, this);

    this.exclamationMark.events.onDragStop.add(this.onMarkExclamationDragStop, this);
}

Baywatcher.prototype.onMarkExclamationDragStop = function() {
    var overlap = game.physics.arcade.overlap(this.exclamationMark, gameState.guirisGroup, this.checkCollision, null, this);

    if (!overlap) {
        this.exclamationMark.x = this.exclamationMark.initialX;
        this.exclamationMark.y = this.exclamationMark.initialY;
    }
}

Baywatcher.prototype.checkCollision = function(exclamationMark, guiri) {
    if (guiri.isSplashing) {
        guiri.splash.destroy();
        guiri.isSplashing = false;
        guiri.fromWaterToTowel();
    } else if (guiri.isSwimming) {
        //
    }

    this.exclamationMark.x = this.exclamationMark.initialX;
    this.exclamationMark.y = this.exclamationMark.initialY;
}