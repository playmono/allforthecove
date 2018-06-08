Chiringuito = function (game, x, y, name) {
    this.taken = false;

    Phaser.Sprite.call(this, game, x, y, name);

    var _this = this;

    this.stockSprite = null;
    this.stockSpriteMap = [8, 9, 10, 11];
    this.moneyText = null;
    this.priceSprite = null;

    this.refillSprite = null;
    this.refillText = null;

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

            if (_this.priceSprite != null) {
                _this.priceSprite.destroy();
            }

            if (_this.moneyText != null) {
                _this.moneyText.destroy();
            }
        } else {
            this.isRefreshing = false;

            if (this.refillSprite != null) {
                this.refillSprite.kill();
            }

            if (this.refillText != null) {
                this.refillText.kill();
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

        var group = gameState.createPrice(this.centerX - 20, this.centerY - 50, this.cost);
        this.priceSprite = group.priceSprite;
        this.moneyText = group.moneyText;
    } else if (this.stock < 3 && gameState.money >= this.stockPrice) {
        this.isRefreshing = true;
        this.lastStock = this.stock;

        this.createRefill();
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

Chiringuito.prototype.createRefill = function() {
    if (this.refillSprite == null) {
        this.refillSprite = gameState.add.sprite(this.centerX + 60, this.centerY - 15, 'refill');
    } else {
        this.refillSprite.revive();
    }

    this.refillSprite.smoothed = false;
    this.refillSprite.scale.set(scaleFactor);
    this.refillSprite.animations.add('refill', [1, 2, 3, 4], 5, true);

    gameState.cooldownsGroup.add(this.refillSprite);

    this.refillSprite.animations.play('refill');

    this.refillText = gameState.add.text(this.refillSprite.x + 20, this.refillSprite.y + 50, '-' + this.stockPrice, {fill: '#FFFFFF', font: '16px pixellari', boundsAlignH: 'right'});
}