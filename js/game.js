gameState = {
    // Level properties
    difficulty : 0,
    money: 0,
    famePercentage : 0,
    trashCost : 0,
    baywatcherCost : 0,
    currentGuirisTotalCount : 0,
    realGuirisTotalCount : 0,

    moneyText : null,
    moneySprite : null,
    famePercentageText : null,
    fameSprite : null,

    currentLevel : 0,

    beachSlots : [
        {squareIndex: 1, titleY: 'top', titleX: 'left', x: 125, y: 240, taken: false},
        {squareIndex: 1, titleY: 'middle', titleX: 'left', x: 125, y: 280, taken: false},
        {squareIndex: 1, titleY: 'bottom', titleX: 'left', x: 125, y: 320, taken: false},
        {squareIndex: 1, titleY: 'top', titleX: 'right', x: 170, y: 240, taken: false},
        {squareIndex: 1, titleY: 'middle', titleX: 'right', x: 170, y: 280, taken: false},
        {squareIndex: 1, titleY: 'bottom', titleX: 'right', x: 170, y: 320, taken: false},

        {squareIndex: 2, titleY: 'top', titleX: 'left', x: 320, y: 240, taken: false},
        {squareIndex: 2, titleY: 'middle', titleX: 'left', x: 320, y: 280, taken: false},
        {squareIndex: 2, titleY: 'bottom', titleX: 'left', x: 320, y: 320, taken: false},
        {squareIndex: 2, titleY: 'top', titleX: 'right', x: 365, y: 240, taken: false},
        {squareIndex: 2, titleY: 'middle', titleX: 'right', x: 365, y: 280, taken: false},
        {squareIndex: 2, titleY: 'bottom', titleX: 'right', x: 365, y: 320, taken: false},

        {squareIndex: 3, titleY: 'top', titleX: 'left', x: 515, y: 240, taken: false},
        {squareIndex: 3, titleY: 'middle', titleX: 'left', x: 515, y: 280, taken: false},
        {squareIndex: 3, titleY: 'bottom', titleX: 'left', x: 515, y: 320, taken: false},
        {squareIndex: 3, titleY: 'top', titleX: 'right', x: 560, y: 240, taken: false},
        {squareIndex: 3, titleY: 'middle', titleX: 'right', x: 560, y: 280, taken: false},
        {squareIndex: 3, titleY: 'bottom', titleX: 'right', x: 560, y: 320, taken: false},

        {squareIndex: 4, titleY: 'top', titleX: 'left', x: 705, y: 240, taken: false},
        {squareIndex: 4, titleY: 'middle', titleX: 'left', x: 705, y: 280, taken: false},
        {squareIndex: 4, titleY: 'bottom', titleX: 'left', x: 705, y: 320, taken: false},
        {squareIndex: 4, titleY: 'top', titleX: 'right', x: 750, y: 240, taken: false},
        {squareIndex: 4, titleY: 'middle', titleX: 'right', x: 750, y: 280, taken: false},
        {squareIndex: 4, titleY: 'bottom', titleX: 'right', x: 750, y: 320, taken: false},
    ],
    waterSlots : [],
    chiringuitoSlots: [
        {x: 100, y: 10, name: 'chiringuito1'},
        {x: 270, y: 10, name: 'chiringuito2'},
        {x: 500, y: 10, name: 'chiringuito3'},
        {x: 670, y: 10, name: 'chiringuito4'}
    ],
    trashSlots: [
        {x: 130, y: 215},
        {x: 240, y: 135},
        {x: 330, y: 215},
        {x: 425, y: 320},
        {x: 520, y: 215},
        {x: 635, y: 135},
        {x: 715, y: 215},
    ],
    baywatchersSlots: [
        {x: 205, y: 180, name: 'baywatcher1'},
        {x: 400, y: 160, name: 'baywatcher2'},
        {x: 590, y: 180, name: 'baywatcher3'}
    ],
    rubbishZones : [
        {x: 50, y: 200},
        {x: 50, y: 350},
        {x: 445, y: 30},
        {x: 840, y: 200},
        {x: 840, y: 350},
        {x: 150, y: 175},
        {x: 330, y: 175},
        {x: 530, y: 175},
        {x: 740, y: 175},
    ],
    notificationSlotInitialX: 40,
    notificationSlotInitialY: 0,
    maxNotifications: 3,
    guirisGroup : null,
    chiringuitosGroup : null,
    rubbishGroup : null,
    trashGroup: null,
    baywatchersGroup: null,
    itemsGroup: null,
    notificationsGroup: null,
    cooldownsGroup: null,
    baywatcherCooldownsGroup : null,
    priceInfo: null,

    preload: function() {
    },

    create: function() {
        var _this = this;

        // Level properties

        this.difficulty = velocity,
        this.money = 250,
        this.famePercentage = 0,
        this.trashCost = 50,
        this.baywatcherCost = 300,
        this.currentGuirisTotalCount = 0,

        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        var background = this.game.add.sprite(0, 0, 'background');
        background.scale.set(scaleFactor);
        background.smoothed = false;

        background.animations.add('idle', [0, 1, 2, 3, 4, 5], 5, true);
        background.animations.play('idle');

        var exit = this.game.add.sprite(gameWidth -70, 15, 'exit');
        exit.smoothed = false;
        exit.inputEnabled = true;
        //exit.scale.set(scaleFactor);

        exit.events.onInputDown.add(function () {
            _this.state.start("menuState");
        }, this);

        this.moneyText = this.game.add.text(0, 0, this.money, {fill: '#FFFFFF', font: '24px pixellari', boundsAlignH: 'right'});
        this.moneyText.setTextBounds(gameWidth - 320, 12, 0, 50);

        this.moneySprite = this.game.add.sprite(gameWidth - 310, 6, 'icons');
        this.moneySprite.smoothed = false;
        this.moneySprite.scale.set(scaleFactor);
        this.moneySprite.frame = 13;

        this.famePercentageText = this.game.add.text(0, 0, '0%', {fill: '#FFFFFF', font: '24px pixellari', boundsAlignH: 'right'});
        this.famePercentageText.setTextBounds(gameWidth - 190, 12, 0, 50);

        this.fameSprite = this.game.add.sprite(gameWidth - 180, 8, 'icons');
        this.fameSprite.smoothed = false;
        this.fameSprite.scale.set(scaleFactor);
        this.fameSprite.frame = 25; // 25 = yellow face

        this.refillSprite = null;
        this.refillText = null;

        this.priceSprite = null;
        this.priceText = null;

        // LAYERS

        this.itemsGroup = this.add.group();
        this.chiringuitosGroup = this.add.group();
        this.trashGroup = this.add.group();
        this.cooldownsGroup = this.add.group();
        this.rubbishGroup = this.add.group();
        this.guirisGroup = this.add.group();
        this.baywatchersGroup = this.add.group();
        this.baywatcherCooldownsGroup = this.add.group();
        this.notificationsGroup = this.add.group();

        var waterPositionY = 420;
        var waterSlotsPositionsX = 0;

        for (i = 0; i < 24; i++) {
            waterSlotsPositionsX += 35;
            waterPositionY = waterPositionY == 420 ? 460 : 420;

            _this.waterSlots.push({
                x: waterSlotsPositionsX,
                y: waterPositionY,
                // y: _this.game.rnd.integerInRange(400, 440),
                taken: false
            })
        }

        this.chiringuitoSlots.forEach(function(chiringuitoSlot) {
            var chiringuito = new Chiringuito(game, chiringuitoSlot.x, chiringuitoSlot.y, chiringuitoSlot.name);
            _this.chiringuitosGroup.add(chiringuito);

            if (chiringuitoSlot.name == 'chiringuito2') {
                chiringuito.buy(true);
            }
        });

        var trashActive = false;
        this.trashSlots.forEach(function(trash) {
            var trash = new Trash(game, trash.x, trash.y);

            if (!trashActive) {
                trash.buy(true);
                trashActive = true;
            }

            _this.trashGroup.add(trash);
        });

        this.baywatchersSlots.forEach(function(baywatcherSlot) {
            var baywatcher = new Baywatcher(game, baywatcherSlot.x, baywatcherSlot.y, baywatcherSlot.name);
            _this.baywatchersGroup.add(baywatcher);

            if (baywatcherSlot.name == 'baywatcher2') {
                baywatcher.buy(true);
            }
        });


        this.createRubbishLoop();
        this.createGuirisLoop();

        var music = game.add.audio("music");
        trashEffect = game.add.audio("trash");
        buyGuiriEffect = game.add.audio("buyguiri");
        coinEffect = game.add.audio("coin");

        music.play();
    },

    update: function() {

    },

    render: function() {
        if (debug) {
            //this.game.debug.text('FPS: ' + this.time.fps, gameWidth - 250, 20);

            var notTaken = [];

            this.beachSlots.forEach(function (beachSlot) {
                if (!beachSlot.taken) {
                    notTaken.push(beachSlot);
                }
            });
            
            //this.game.debug.text('Rubbish generated: ' + this.rubbishGroup.length, gameWidth - 250, 40);

            this.guirisGroup.forEach(function(guiri) {
                //this.game.debug.text('Happiness: ' + guiri.happiness, guiri.centerX, guiri.centerY, { color: 'black'});
                //this.game.debug.text('LayedOnTowel: ' + guiri.actions.layedOnTowel, guiri.centerX, guiri.centerY + 45, { color: 'black'});
                //this.game.debug.text('Swam: ' + guiri.actions.swam, guiri.centerX, guiri.centerY + 30, { color: 'black'});
                //this.game.debug.text('Did Splash: ' + guiri.actions.didSplash, guiri.centerX, guiri.centerY + 45, { color: 'black'});
                //this.game.debug.text('Quiet Swam: ' + guiri.actions.quietSwam, guiri.centerX, guiri.centerY + 60, { color: 'black'});
                //this.game.debug.text('Could Boy: ' + guiri.actions.couldBuy, guiri.centerX, guiri.centerY + 75, { color: 'black'});
                //this.game.debug.text('Clean: ' + guiri.actions.clean, guiri.centerX, guiri.centerY + 90, { color: 'black'});
                //this.game.debug.body(guiri);
            });

            this.baywatchersGroup.forEach(function(baywatcher) {
                if (baywatcher.exclamationMark !== null) {
                   // this.game.debug.body(baywatcher.exclamationMark, 'red');
                }
            });

            //this.game.debug.geom(this.famePercentageText.getBounds());
            //this.game.debug.geom(this.moneyText.getBounds());

            this.game.debug.text(this.rubbishGroup.countLiving(), gameWidth - 50, 80);

            this.game.debug.text(levels[this.currentLevel].title, gameWidth - 80, 120);
        }

        var fameSpriteMap = {
            red: 24,
            yellow: 25,
            green: 26,
            blue: 27
        };

        this.moneyText.setText(this.money);
        this.famePercentageText.setText(this.famePercentage + '%');

        if (this.guirisTotalCount == 0) {
            this.fameSprite.frame = fameSpriteMap.yellow;
        } else {
            if (this.famePercentage > 80) {
                this.fameSprite.frame = fameSpriteMap.blue;
            } else if (this.famePercentage > 60) {
                this.fameSprite.frame = fameSpriteMap.green;
            } else if (this.famePercentage > 40) {
                this.fameSprite.frame = fameSpriteMap.yellow;
            } else {
                this.fameSprite.frame = fameSpriteMap.red;
            }
        }
    },

    createRubbishLoop: function() {
        var _this = this;

        this.rubbishGroup.classType = Rubbish;

        this.time.events.loop(Phaser.Timer.SECOND * 10 / this.difficulty, function() {
            if (_this.rubbishGroup.children.length >= 24) {
                return;
            }

            var proportion = 4/24;
            var countGuiris = _this.guirisGroup.length;
            var totalRubbishCount = Math.floor(countGuiris * proportion);

            for (i = 0; i < totalRubbishCount; i++) {
                var rnd = _this.rnd.integerInRange(0, _this.rubbishZones.length - 1);
                var arrRnd = _this.rubbishZones[rnd];

                var x = _this.rnd.integerInRange(arrRnd.x - 20, arrRnd.x + 20);
                var y = _this.rnd.integerInRange(arrRnd.y - 20, arrRnd.y + 20);

                this.rubbishGroup.getFirstDead(true, x, y);
            }
        }, this);
    },

    createGuirisLoop: function() {
        var _this = this;

        this.game.time.events.repeat(Phaser.Timer.SECOND * 10 / levels[this.currentLevel].velocity, levels[this.currentLevel].guirisTotalCount, function() {
            var guiri = new Guiri(game);
            _this.guirisGroup.add(guiri);
        }, this);
    },

    getUntakenBeachSlot: function(guiri) {
        var notTaken = [];

        this.beachSlots.forEach(function (beachSlot) {
            if (!beachSlot.taken) {
                notTaken.push(beachSlot);
            }
        });

        if (notTaken.length == 0) {
            return null;
        }

        var beachSlot = notTaken[Math.floor(Math.random() * notTaken.length)];
        beachSlot.taken = true;

        return beachSlot;
    },

    getUntakenWaterSlot: function(guiri) {
        var notTaken = [];

        var keyMax = guiri.beachSlot.squareIndex * 6;
        var keyMin = guiri.beachSlot.squareIndex * 6 - 6;

        this.waterSlots.forEach(function (waterSlot, key) {
            if (key >= keyMax || key < keyMin) {
                return;
            }

            if (waterSlot.taken) {
                return;
            }

            notTaken.push(waterSlot);
        });

        var waterSlot = notTaken[Math.floor(Math.random() * notTaken.length)];
        waterSlot.taken = true;

        return waterSlot;
    },

    getUntakenChiringuito: function() {
        var notTaken = [];

        this.chiringuitosGroup.forEach(function(chiringuito) {
            if (chiringuito.taken) {
                return;
            }

            if (!chiringuito.bought) {
                return;
            }

            if (chiringuito.stock < 1) {
                return;
            }

            notTaken.push(chiringuito);
        });

        if (notTaken.length == 0) {
            return null;
        }

        var chiringuito = notTaken[Math.floor(Math.random() * notTaken.length)];
        chiringuito.taken = true;

        return chiringuito;
    },

    createNotification: function(guiri) {
        var _this = this;

        if (this.notificationsGroup.children.length == this.maxNotifications) {
            this.destroyNotification(this.notificationsGroup.children[0]);
        }

        if (this.notificationsGroup.length > 0) {
            var x = this.notificationsGroup.children[this.notificationsGroup.children.length - 1].children[0].x;
            var y = this.notificationsGroup.children[this.notificationsGroup.children.length - 1].children[0].y + 35;
        } else {
            var x = this.notificationSlotInitialX;
            var y = this.notificationSlotInitialY;
        }

        this.renderNotification(guiri, x, y);
    },

    evaluateGuiriExperience : function(guiri) {
        this.createNotification(guiri);
        this.currentGuirisTotalCount++;

        if (guiri.happiness >= 0) {
            levels[this.currentLevel].guirisHappyCount++;
        }

        this.famePercentage = parseInt(levels[this.currentLevel].guirisHappyCount * 100 / gameState.currentGuirisTotalCount);
    },

    checkNextLevel : function() {
        gameState.realGuirisTotalCount++;

        if (this.realGuirisTotalCount == levels[this.currentLevel].guirisTotalCount) {
            this.currentGuirisTotalCount = 0;
            this.realGuirisTotalCount = 0;
            this.currentLevel++;
            this.createGuirisLoop();
        }
    },

    renderNotification : function(guiri, x, y) {
        var _this = this;

        var notification = this.add.group();

        var bubble = gameState.add.sprite(x, y, 'bubble');
        bubble.smoothed = false;
        bubble.scale.set(scaleFactor);

        var icon = gameState.add.sprite(x - 35, y + 5, 'icon' + guiri.id);
        icon.smoothed = false;
        icon.scale.set(scaleFactor);

        var review = gameState.add.sprite(x + 2, y, guiri.happiness >= 0 ? 'like' : 'dislike');
        review.smoothed = false;
        review.scale.set(scaleFactor);

        var text = gameState.add.text(x + 45, y + 12, guiri.getNotificationText(), {font: "16px pixellari"});

        notification.add(bubble);
        notification.add(icon);
        notification.add(review);
        notification.add(text);

        this.notificationsGroup.add(notification);

        var disappear = gameState.add.tween(notification);

        disappear.to({
            y: '-20',
            alpha: 0,
        }, 1000 / gameState.difficulty, Phaser.Easing.Circular.None, true, 5000 / gameState.difficulty);

        disappear.onComplete.add(function(notification) {
            _this.destroyNotification(notification);
        });

        disappear.start();
    },

    destroyNotification: function(notificationToDestroy) {
        this.notificationsGroup.children.forEach(function(notification) {
            notification.children.forEach(function(sprite) {
                sprite.y = sprite.y - 35;
            });
        });

        notificationToDestroy.destroy();
    },

    // createPriceInfo
    showPriceInfo: function(x, y, cost, priceInfo) {
        if (this.priceSprite == null) {
            this.priceSprite = gameState.add.sprite(x, y, 'price');
            this.priceSprite.smoothed = false;
            this.priceSprite.scale.set(scaleFactor);
        } else {
            this.priceSprite.revive();
        }

        this.priceSprite.x = x;
        this.priceSprite.y = y;

        if (this.priceText == null) {
            this.priceText = gameState.add.text(0, 0, '');
        } else {
            this.priceText.visible = true;
        }

        if (this.money >= cost) {
            var textColor = '#FFFFFF';
        } else {
            var textColor = '#FF0000';
        }

        this.priceText.setStyle({fill: textColor, font: '14px pixellari', boundsAlignH: 'right'});
        this.priceText.x = this.priceSprite.x + 28;
        this.priceText.y = this.priceSprite.y + 37;
        this.priceText.setText(cost)
        this.priceText.anchor.set(0.5);
    },

    showRefillInfo: function(chiringuito) {
        if (this.refillSprite == null) {
            this.refillSprite = gameState.add.sprite(0, 0, 'refill');
            this.refillSprite.smoothed = false;
            this.refillSprite.scale.set(scaleFactor);
            this.refillSprite.animations.add('refill', [1, 2, 3, 4], 5, true);

            this.cooldownsGroup.add(this.refillSprite);

            this.refillSprite.animations.play('refill');
        } else {
            this.refillSprite.revive();
        }

        this.refillSprite.x = chiringuito.centerX + 60;
        this.refillSprite.y = chiringuito.centerY - 15;

        if (this.refillText == null) {
            this.refillText = gameState.add.text(0, 0, '');
        } else {
            this.refillText.visible = true;
        }

        if (this.money >= chiringuito.stockPrice) {
            var textColor = '#FFFFFF';
        } else {
            var textColor = '#FF0000';
        }

        this.refillText.setStyle({fill: textColor, font: '16px pixellari', boundsAlignH: 'right'});
        this.refillText.x = this.refillSprite.x + 25;
        this.refillText.y = this.refillSprite.y + 50;
        this.refillText.setText(chiringuito.stockPrice);
    }
}