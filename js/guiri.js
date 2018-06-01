Guiri = function (game) {
    this.id = 0;
    this.waterSlot = null;
    this.chiringuito = null;
    this.initialPosition = {x :445, y : -50};
    this.towel = null;
    this.swimmingCounter = 0;
    this.buyCounter = 0;
    this.happiness = 0;
    this.splash = null;
    this.isSplashing = false;
    this.isSwimming = false;
    this.layOnTowelForFirstTime = true;

    this.id = gameState.rnd.integerInRange(1, 8);

    Phaser.Sprite.call(this, game, this.initialPosition.x, this.initialPosition.y, 'guiri' + this.id);

    this.smoothed = false;

    this.animations.add('down', [0, 1, 2, 3], 6, true);
    this.animations.add('up', [4, 5, 6, 7], 6, true);
    this.animations.add('swim', [8, 9, 10, 11], 6, true);
    this.animations.add('lay', [12]);

    this.animations.play('down');

    this.scale.set(scaleFactor);

    this.enableBody = true;
    game.physics.arcade.enable(this);

    this.beachSlot = gameState.getUntakenBeachSlot();

    // emoji
    this.emoji = gameState.add.sprite(this.x, this.y, 'icons');
    this.emoji.smoothed = false;
    this.emoji.scale.set(scaleFactor);
    this.emoji.animations.add('positive', [16, 17, 18, 19], 8, true);
    this.emoji.animations.add('negative', [20, 21, 22, 23], 8, true);
    this.emoji.kill();

    // actions
    this.actions = {
        layedOnTowel : null,
        swam: null,
        didSplash : null,
        quietSwam : null,
        couldBuy : null,
        clean : null,
        unalertedByBaywatcher : true
    };

    this.fromCityToMainPath();
};

Guiri.prototype = Object.create(Phaser.Sprite.prototype);
Guiri.prototype.constructor = Guiri;

Guiri.prototype.update = function() {
    if (this.emoji !== null) {
        this.emoji.x = this.x;

        if (this.animations.currentAnim.name == 'up' || this.animations.currentAnim.name == 'down') {
            this.emoji.y = this.y - 20;
        } else {
            this.emoji.y = this.y - 5;
        }

    }
};

Guiri.prototype.fromCityToMainPath = function() {
    var _this = this;

    var movingRoute1 = gameState.add.tween(this);
    var movingTransition1 = gameState.add.tween(this);
    var movingRoute2 = gameState.add.tween(this);

    // Come to the beach (+y)
    movingRoute1.to({ y: 100 }, 2000 / gameState.difficulty, Phaser.Easing.Linear.None);

    // Start transition to to movement2
    movingRoute1.onComplete.add(function() {
        if (_this.beachSlot !== null) {
            var offsetX = _this.beachSlot.x > _this.x ? 30 : -30;

            movingTransition1.to({
                y: '+40',
                x: _this.x + offsetX
            }, 1000 / gameState.difficulty, Phaser.Easing.Circular.None, true);
        } else {
            _this.fromMainPathToCity();
        }
    });

    movingTransition1.onComplete.add(function() {
        var rnd = gameState.rnd.integerInRange(1, 10);

        if (rnd > 9) {
            _this.chiringuito = gameState.getUntakenChiringuito();

            if (_this.chiringuito == null) {
                _this.modifyHappiness(-5);
                _this.actions.couldBuy = false;
                _this.fromMainPathToTowel();
            } else {
                _this.fromMainPathToChiringuito();
            }
        } else {
            _this.fromMainPathToTowel();
        }
    });

    movingRoute2.onComplete.add(function() {
        _this.destroy();
    });

    movingRoute1.start();
    //gameState.guiriEntersBeach(this);
}

Guiri.prototype.fromMainPathToTowel = function() {
    var _this = this;

    var movingRoute2 = game.add.tween(this);
    var movingTransition2 = gameState.add.tween(this);
    var movingRoute3 = gameState.add.tween(this);
    var movingTransition3 = gameState.add.tween(this);
    var movingRoute4 = gameState.add.tween(this);

    var finalPoint = this.beachSlot.x + this.getTowelOffsetX(false);
    var time = Phaser.Math.difference(finalPoint, this.x) * 20;

    if (this.beachSlot.x > this.x) {
        finalPoint -= 30;
    } else {
        finalPoint += 30;
    }

    movingRoute2.to({
        x: finalPoint,
    }, time / gameState.difficulty, Phaser.Easing.Linear.None);

    // Start transition to movement 2
    movingRoute2.onComplete.add(function() {
        movingTransition2.to({
            x: _this.beachSlot.x + _this.getTowelOffsetX(false),
            y: '+35'
        }, 1000 / gameState.difficulty, Phaser.Easing.Linear.None, true);
    });

    // Start movement to Towel (Y)
    movingTransition2.onComplete.add(function() {
        movingRoute3.to({
            y: _this.beachSlot.y
        }, 2000 / gameState.difficulty, Phaser.Easing.Linear.None, true);
    });

    // Start movement to Towel (X)
    movingRoute3.onComplete.add(function() {
        movingRoute4.to({
            x: _this.beachSlot.x
        }, 2000 / gameState.difficulty, Phaser.Easing.Linear.None, true);
    });

    movingRoute4.onComplete.add(function() {
        _this.layOnTowel();
    });

    movingRoute2.start();
}

Guiri.prototype.fromTowelToWater = function() {
    var _this = this;

    this.animations.play('down');

    var movingRoute1 = gameState.add.tween(this);
    var movingRoute2 = gameState.add.tween(this);
    var movingRoute3 = gameState.add.tween(this);

    movingRoute1.to({
        x: _this.beachSlot.x + _this.getTowelOffsetX(false)
    }, 2000 / gameState.difficulty, Phaser.Easing.Linear.None, true);

    // GET A WATER SLOT BRO !!!
    this.waterSlot = gameState.getUntakenWaterSlot(this);

    movingRoute1.onComplete.add(function() {
        movingRoute2.to({
            y: 350,
        }, 2000 / gameState.difficulty, Phaser.Easing.Linear.None, true);
    });

    movingRoute2.onComplete.add(function() {
        movingRoute3.to({
            y: _this.waterSlot.y,
            x: _this.waterSlot.x
        }, 2000 / gameState.difficulty, Phaser.Easing.Linear.None, true);
    });

    movingRoute3.onComplete.add(function() {
        _this.swimming();
    });
}

Guiri.prototype.fromWaterToTowel = function() {
    var _this = this;

    this.animations.play('up');

    this.isSwimming = false;
    this.waterSlot.taken = false;

    var movingRoute1 = gameState.add.tween(this);
    var movingRoute2 = gameState.add.tween(this);
    var movingRoute3 = gameState.add.tween(this);

    movingRoute1.to({
        x: _this.beachSlot.x + _this.getTowelOffsetX(false),
        y: 350
    }, 2000 / gameState.difficulty, Phaser.Easing.Linear.None, true);

    movingRoute1.onComplete.add(function() {
        movingRoute2.to({
            y: _this.beachSlot.y,
        }, 2000 / gameState.difficulty, Phaser.Easing.Linear.None, true);
    });

    movingRoute2.onComplete.add(function() {
        movingRoute3.to({
            x: _this.beachSlot.x,
        }, 2000 / gameState.difficulty, Phaser.Easing.Linear.None, true);
    });

    movingRoute3.onComplete.add(function() {
        _this.layOnTowel();
    });
}

Guiri.prototype.getTowelOffsetX = function(revert) {
    if (!revert) {
        return this.beachSlot.titleX == 'right' ? 20 : -20;
    } else {
        return this.beachSlot.titleX == 'right' ? -20 : 20;
    }
}

Guiri.prototype.fromTowelToCity = function() {
    var _this = this;

    this.animations.play('up');

    this.towel.destroy();

    var movingRoute1 = gameState.add.tween(this);
    var movingRoute2 = gameState.add.tween(this);
    var movingTransition1 = gameState.add.tween(this);
    var movingRoute3 = gameState.add.tween(this);
    var movingTransition2 = gameState.add.tween(this);

    movingRoute1.to({
        x: _this.beachSlot.x + _this.getTowelOffsetX(false)
    }, 2000 / gameState.difficulty, Phaser.Easing.Linear.None);

    movingRoute1.onComplete.add(function() {
        _this.beachSlot.taken = false;

        movingRoute2.to({
            y: 165
        }, 2000 / gameState.difficulty, Phaser.Easing.Linear.None, true);
    });

    movingRoute2.onComplete.add(function() {
        var offsetX = _this.initialPosition.x > _this.x ? 30 : -30;

        movingTransition1.to({
            y: '-25',
            x: _this.x + offsetX
        }, 1000 / gameState.difficulty, Phaser.Easing.Linear.None, true);
    });

    movingTransition1.onComplete.add(function() {
        var time = Phaser.Math.difference(_this.initialPosition.x, _this.x) * 20;
        var finalPoint = _this.initialPosition.x;

        if (_this.initialPosition.x > _this.x) {
            finalPoint -= 20;
        } else {
            finalPoint +=20;
        }

        movingRoute3.to({
            x: finalPoint
        }, time / gameState.difficulty, Phaser.Easing.Linear.None, true);
    });

    movingRoute3.onComplete.add(function() {
        movingTransition2.to({
            y: 100,
            x: _this.initialPosition.x
        }, 1000 / gameState.difficulty, Phaser.Easing.Linear.None, true);
    });

    movingTransition2.onComplete.add(function() {
        _this.fromMainPathToCity();
    });

    movingRoute1.start();
}

Guiri.prototype.fromMainPathToCity = function() {
    var _this = this;

    var movingRoute1 = gameState.add.tween(this);

    movingRoute1.to({
        y: _this.initialPosition.y
    }, 2000 / gameState.difficulty, Phaser.Easing.Linear.None, true);

    movingRoute1.onComplete.add(function() {
        if (_this.beachSlot !== null) {
            var rubbishCount = gameState.rubbishGroup.length * 2;

            if (_this.happiness >= 0) {
                _this.actions.clean = (_this.happiness - rubbishCount <= 0) ? false : true;
            }

            _this.modifyHappiness(-rubbishCount);

            gameState.createNotification(_this);

            gameState.guirisTotalCount++;

            if (_this.happiness >= 0) {
                gameState.guirisHappyCount++;
            }

            gameState.famePercentage = parseInt(gameState.guirisHappyCount * 100 / gameState.guirisTotalCount);
        }

        _this.destroy();
    });
}


Guiri.prototype.fromTowelToChiringuito = function() {
    var _this = this;

    this.animations.play('up');

    var movingRoute1 = gameState.add.tween(this);
    var movingRoute2 = gameState.add.tween(this);
    var movingTransition1 = gameState.add.tween(this);
    var movingRoute3 = gameState.add.tween(this);

    movingRoute1.to({
        x: _this.beachSlot.x + _this.getTowelOffsetX(false)
    }, 2000 / gameState.difficulty, Phaser.Easing.Linear.None);

    movingRoute1.onComplete.add(function() {
        movingRoute2.to({
            y: 165
        }, 2000 / gameState.difficulty, Phaser.Easing.Linear.None, true);
    });

    movingRoute2.onComplete.add(function() {
        var offsetX = _this.initialPosition.x > _this.x ? 30 : -30;

        movingTransition1.to({
            y: '-25',
            x: _this.x + offsetX
        }, 1000 / gameState.difficulty, Phaser.Easing.Linear.None, true);
    });

    movingTransition1.onComplete.add(function() {
        _this.fromMainPathToChiringuito();
    });

    movingRoute1.start();
}

Guiri.prototype.fromMainPathToChiringuito = function() {
    var _this = this;

    this.buyCounter++;

    this.animations.play('up');

    var movingRoute1 = gameState.add.tween(this);
    var time = Phaser.Math.difference(this.chiringuito.x + 60, this.x) * 20;

    movingRoute1.to({
        x: _this.chiringuito.x + 60,
        y: _this.chiringuito.y + 100
    }, time / gameState.difficulty, Phaser.Easing.Linear.None, true);

    movingRoute1.onComplete.add(function() {
        _this.buyInChiringuito();

        var rnd = gameState.rnd.integerInRange(3, 7);

        game.time.events.add(Phaser.Timer.SECOND * rnd, function () {
            _this.chiringuito.sell();
            _this.fromChiringuitoToTowel();
        }, _this);
    })
}

Guiri.prototype.fromChiringuitoToTowel = function() {
    var _this = this;

    this.animations.play('down');

    this.chiringuito.taken = false;
    this.chiringuito = null;

    var movingRoute1 = gameState.add.tween(this);

    movingRoute1.to({
        y: '+25'
    }, 2000 / gameState.difficulty, Phaser.Easing.Linear.None, true);

    movingRoute1.onComplete.add(function() {
        _this.fromMainPathToTowel();
    });
}

Guiri.prototype.swimming = function() {
    var _this = this;

    this.isSwimming = true;

    this.swimmingCounter++;

    this.animations.play('swim');

    this.modifyHappiness(5);
    this.actions.swam = true;

    var rnd = gameState.rnd.integerInRange(4, 15);

    game.time.events.add(Phaser.Timer.SECOND * rnd / gameState.difficulty, function () {
        // Podemos interrumptir este evento
        if (_this.isSwimming) {
            var rnd = gameState.rnd.integerInRange(1, 100);

            if (rnd > 75) {
                _this.doSplash();
            } else {
                _this.fromWaterToTowel();
            }
        }
    }, _this);
}

Guiri.prototype.layOnTowel = function() {
    var _this = this;

    this.animations.play('lay');

    if (this.layOnTowelForFirstTime) {
        this.layOnTowelForFirstTime = false;
        this.modifyHappiness(2);
        this.actions.layedOnTowel = true;
    }

    if (this.towel == null) {
        this.towel = gameState.add.sprite(this.beachSlot.x, this.beachSlot.y, 'towel');

        gameState.itemsGroup.add(_this.towel);
        this.towel.scale.set(scaleFactor);

        var i = gameState.rnd.integerInRange(0, 7);
        this.towel.animations.add('idle', [i], 0, false);
        this.towel.animations.play('idle');
    }

    var rnd = gameState.rnd.integerInRange(4, 15);

    game.time.events.add((Phaser.Timer.SECOND * rnd) / gameState.difficulty, function () {
        var swimProbability = gameState.rnd.integerInRange(0, 100);
        var buyProbability = gameState.rnd.integerInRange(0, 100);

        if (swimProbability > (25 + _this.swimmingCounter * 20) && _this.swimmingCounter <= 3) {
            _this.fromTowelToWater();
        } else if (buyProbability > (10 + _this.buyCounter * 20) && _this.buyCounter <= 3) {
            // GET A CHIRINGUITO BRO!!!
            _this.chiringuito = gameState.getUntakenChiringuito();

            if (_this.chiringuito == null) {
                _this.modifyHappiness(-5);
                _this.actions.couldBuy = false;
                _this.layOnTowel();
            } else {
                _this.fromTowelToChiringuito();
            }
        } else {
            _this.fromTowelToCity();
        }
    }, _this);
}

Guiri.prototype.doSplash = function() {
    var _this = this;

    this.isSplashing = true;

    this.splash = gameState.add.sprite(this.x - 30, this.y - 15, 'splash');

    gameState.itemsGroup.add(this.splash);
    this.splash.scale.set(scaleFactor);
    this.splash.smoothed = false;

    this.splash.animations.add('idle', [0, 1, 2, 3], 8, true);

    this.splash.animations.play('idle');

    var rnd = gameState.rnd.integerInRange(6, 10);

    game.time.events.add((Phaser.Timer.SECOND * rnd) / gameState.difficulty, function () {
        // Podemos interrumpir este evento
        if (_this.isSplashing) {
            var destroySplash = gameState.add.tween(_this.splash).to({
                alpha: 0,
            }, Phaser.Timer.SECOND * 1 / gameState.difficulty, Phaser.Easing.Linear.None, true);

            destroySplash.onComplete.add(function() {
                _this.modifyHappiness(5);
                _this.actions.didSplash = true;

                _this.splash.destroy();

                gameState.guirisGroup.forEach(function(guiri) {
                    if ((guiri.isSwimming || guiri.isSplashing)
                        && (gameState.guirisGroup.getIndex(guiri) != gameState.guirisGroup.getIndex(_this))
                    ) {
                        guiri.modifyHappiness(-5);
                        guiri.actions.quietSwam = false;
                    }
                });

                _this.swimming();
            });
        }
    });
}

Guiri.prototype.buyInChiringuito = function() {
    var _this = this;

    gameState.money += 50;
    this.modifyHappiness(2);
    this.actions.couldBuy = true;

    buyGuiriEffect.play();
}

Guiri.prototype.modifyHappiness = function(happiness) {
    var _this = this;

    if (happiness == 0) {
        return;
    }

    this.happiness += happiness;

    if (this.emoji.alive) {
        this.emoji.kill();
    }

    this.emoji.revive();

    if (happiness > 0) {
        this.emoji.animations.play('positive');
    } else {
        this.emoji.animations.play('negative');
    }

    this.emoji.alpha = 1;

    var emojiTweenStatic = gameState.add.tween(this.emoji).to({
        // @ todo: this should be an event, not a tween
    }, Phaser.Timer.SECOND * 3 / gameState.difficulty, Phaser.Easing.Linear.None, true);

    emojiTweenStatic.onComplete.add(function() {
        var emojiTweenFade = gameState.add.tween(_this.emoji).to({
            alpha: 0,
        }, Phaser.Timer.SECOND * 2 / gameState.difficulty, Phaser.Easing.Linear.None, true);
   
        emojiTweenFade.onComplete.add(function() {
            _this.emoji.kill();
        });

    });
}

Guiri.prototype.getNotificationText = function() {
    var result = [];

    for (var key in this.actions) {
        if (this.happiness >= 0 && this.actions[key] === true) {
            result.push(key);
        }

        if (this.happiness < 0 && this.actions[key] === false) {
            result.push(key);
        }
    }

    var rnd = gameState.rnd.integerInRange(0, (result.length - 1));

    return this.getNotificationTexts(result[rnd], this.happiness >= 0);
}

Guiri.prototype.getNotificationTexts = function(key, positive) {
    var positiveTexts = {
        layedOnTowel: [
            'La playa está impecable <3',
            'Vuelvo mañana mismo.'
        ],
        swam: [
            '¡Qué fresquita está el agua!',
            'El mar está muy tranquilo'
        ],
        didSplash: [
            'Me lo he pasasado genial',
            'ANARKIA Y BIRRA FRIA!'
        ],
        quietSwam: [
            'Vale la pena venir a bañarse.',
            'Una playa muy tranquila.',
        ],
        couldBuy: [
            'Muy rica la comida.',
            'Me encanta la piña colada'
        ],
        clean: [
            '¡Qué limpio está todo!',
            'La playa está impecable'
        ],
        unalertedByBaywatcher: [
            '¡Que guay! Dejan meter pelotas en el agua',
            'Me encantan las guerras de agua'
        ]
    };

    var negativeTexts = {
        quietSwam: [
            '¿Es que nadie vigila o qué?',
            'Los Guardacostas van a su bola ¬¬'
        ],
        couldBuy: [
            'No quedan helados y hace calor...',
            'Me gustaría poder comer algo...'
        ],
        clean: [
            '¡La playa está super sucia!!!1!',
            'Que asco de la playa.'
        ],
        unalertedByBaywatcher: [
            '¡No se puede hacer nada en el agua!',
            'Los guardacostas son unos aguafiestas'
        ]
    }

    var rnd = gameState.rnd.integerInRange(0, 1);

    // EDGE CASE
    // -----------
    // SE PUEDEN DAR CASOS DE DEFAULT SI LA PERSONA HA TENIDO EXPERIENCIAS MUY NEGATIVAS, DESPUES POSITIVAS (Por lo que todas las acciones = true) 
    // PERO AUN ASÍ, SU FELICIDAD ES NEGATIVA

    var defaultPositiveText = [
        'Me lo he pasado genial.',
        'Ha sido un día genial'
    ];
    var defaultNegativeText = [
        'No pienso volver a esta playa.',
        'Ha sido el peor día de mi vida'
    ];

    if (positive) {
        return (positiveTexts[key] !== undefined) ? positiveTexts[key][rnd] : defaultPositiveText[rnd]; 
    } else {
        return (negativeTexts[key] !== undefined) ? negativeTexts[key][rnd] : defaultNegativeText[rnd];
    }
}





