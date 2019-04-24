Chiringuito = function (game, x, y, name) {
    this.taken = false;

    Phaser.Sprite.call(this, game, x, y, name);

    var _this = this;

    this.stockSprite = null;
    this.stockSpriteMap = [8, 9, 10, 11];

    this.scale.set(scaleFactor);
    this.smoothed = false;

	this.bought = false;
    this.costOffset = 150;
    this.stock = 3;
    this.stockPrice = 30;
    this.maxStock = 3;
    this.isRefreshing = false;
    this.isRefreshed = false;
    this.lastStock = null;

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
        } else {
            if (gameState.refillSprite != null) {
                this.isRefreshing = false;

                gameState.refillSprite.kill();
                gameState.refillText.visible = false;
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
    if (!this.bought || this.stock < 3) {
        this.input.useHandCursor = true;
    } else {
        this.input.useHandCursor = false;
    }

    if (this.stock === this.maxStock) {
        this.isRefreshing = false;
    }

    // proporcion: en el nivel 7 queremos la mitad de velocidad
    var duration = 1000 / (1 + gameState.difficulty / 4);

    if (this.isRefreshing && !this.isRefreshed && game.input.activePointer.duration % duration > (duration - 100)) {
        if (this.lastStock == this.stock) {
            Tutorial.removeFromRead('chiringuito');
            gameState.money -= this.stockPrice;
            gameState.refillText.setText('');
            gameState.refillSprite.animations.play('refill');
        }

        this.stock++;
        this.stockSprite.frame = this.stockSpriteMap[this.stock];

        this.isRefreshed = true;

        if (this.stock === this.maxStock) {
            gameState.refillSprite.kill();
            gameState.refillText.visible = false;
        }
    }

    if (this.game.input.activePointer.duration % duration < (duration - 100)) {
        this.isRefreshed = false;
    }
};

Chiringuito.prototype.click = function() {
    var _this = this;

    if (!this.bought) {
        this.alpha = 1;
        gameState.showPriceInfo(this.centerX - 20, this.centerY - 50, gameState.chiringuitoCost);
    } else {
        if (this.stock < this.maxStock) {
            gameState.showRefillInfo(this);
       
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
        if (gameState.money >= gameState.chiringuitoCost) {
           this.buy(false);
        }
    }
}

Chiringuito.prototype.buy = function(free) {
    var _this = this;

    if (!free) {
        Tutorial.removeFromRead('buy');
        gameState.money -= gameState.chiringuitoCost;
        gameState.chiringuitoCost += this.costOffset;
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

    if (this.stock <= 1) {
        Tutorial.add('chiringuito');
    }
}

Chiringuito.prototype.createStock = function() {
    var _this = this;

    this.stockSprite = gameState.add.sprite(this.centerX + 30, this.centerY + 22, 'icons');
    this.stockSprite.smoothed = false;
    this.stockSprite.scale.set(scaleFactor);
    this.stockSprite.frame = this.stockSpriteMap[3];

    gameState.cooldownsGroup.add(this.stockSprite);
}