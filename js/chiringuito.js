Chiringuito = function (game, x, y, name) {
    this.taken = false;

    Phaser.Sprite.call(this, game, x, y, name);

    var _this = this;

    this.stockSprite = null;
    this.stockSpriteMap = [8, 9, 10, 11];

    this.priceInfo = null;
    this.refillInfo = null;

    this.scale.set(scaleFactor);
    this.smoothed = false;

	this.bought = false;
    this.cost = 100;
    this.stock = 3;
    this.stockPrice = 50;
    this.isRefreshing = false;
    this.isRefreshed = false;
    this.lastStock = null;

	this.animations.add('idle', [0, 1, 2, 3], 5, true);

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
        } else {
            this.isRefreshing = false;

            if (this.refillInfo != null) {
                this.refillInfo.destroy();
            }
        }
    }, this);

    this.frame = 4;
};

Chiringuito.prototype = Object.create(Phaser.Sprite.prototype);
Chiringuito.prototype.constructor = Chiringuito;

Chiringuito.prototype.update = function() {
    /**************************************
     * isRefreshing es la variable que evalua si hemos clicado y estamos "manteniendo el click"
     * isRefreshed es la variable que usamos como "flag" entre sumas de stock
     * ya que game.input.activePointer.duration no nos puede dar la duracion exacta
     *************************************/
    if (this.stock === 3) {
        this.isRefreshing = false;
    }

    if (this.isRefreshing && !this.isRefreshed && game.input.activePointer.duration % 1000 > 900) {
        if (this.lastStock == this.stock) {
            gameState.money -= this.stockPrice;

            if (this.refillText != null) {
                this.refillText.kill();
            }
        }

        this.stock++;
        this.stockSprite.frame = this.stockSpriteMap[this.stock];

        this.isRefreshed = true;
    }

    if (this.game.input.activePointer.duration % 1000 < 900) {
        this.isRefreshed = false;
    }
};

Chiringuito.prototype.click = function() {
    var _this = this;

    if (!this.bought) {
        this.alpha = 1;
        this.priceInfo = gameState.createPriceInfo(this.centerX - 20, this.centerY - 50, this.cost);
    } else {
        if (this.stock < 3) {
            this.createRefillInfo();
       
            if (gameState.money >= this.stockPrice) {
                this.isRefreshing = true;
                this.lastStock = this.stock;
            }
        }
    }
}

Chiringuito.prototype.doubleClick = function() {
    var _this = this;

    if (!this.bought) {
        if (gameState.money >= this.cost) {
           this.buy(false);
        }
    }
}

Chiringuito.prototype.buy = function(free) {
    var _this = this;

    if (!free) {
        gameState.money -= this.cost;
    }

    this.alpha = 1;
    this.bought = true;
    this.animations.play('idle');

    this.createStock();
}

Chiringuito.prototype.sell = function() {
    var _this = this;

    if (this.stock < 0) {
        return;
    }

    this.stock--;
    this.stockSprite.frame = this.stockSpriteMap[this.stock];
}

Chiringuito.prototype.createStock = function() {
    var _this = this;

    this.stockSprite = gameState.add.sprite(this.centerX + 30, this.centerY + 22, 'icons');
    this.stockSprite.smoothed = false;
    this.stockSprite.scale.set(scaleFactor);
    this.stockSprite.frame = this.stockSpriteMap[3];

    gameState.cooldownsGroup.add(this.stockSprite);
}

Chiringuito.prototype.createRefillInfo = function() {
    if (this.refillInfo == null) {
        var refillSprite = gameState.add.sprite(this.centerX + 60, this.centerY - 15, 'refill');
    } else {
        refillSprite.revive();
    }

    refillSprite.smoothed = false;
    refillSprite.scale.set(scaleFactor);
    refillSprite.animations.add('refill', [1, 2, 3, 4], 5, true);

    gameState.cooldownsGroup.add(refillSprite);

    refillSprite.animations.play('refill');

    if (gameState.money >= this.stockPrice) {
        var textColor = '#FFFFFF';
    } else {
        var textColor = '#FF0000';
    }

    var refillText = gameState.add.text(refillSprite.x + 25, refillSprite.y + 50, this.stockPrice, {fill: textColor, font: '16px pixellari', boundsAlignH: 'right'});

    this.refillInfo = this.game.add.group();
    this.refillInfo.add(refillSprite);
    this.refillInfo.add(refillText);
}