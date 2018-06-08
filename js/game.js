gameState = {
    difficulty : 1,
    money: 250,
    moneyText : null,
    moneySprite : null,
    famePercentageText : null,
    fameSprite : null,
    famePercentage : 0,
    trashCost : 50,
    baywatcherCost : 300,
    guirisTotalCount : 0,
    guirisHappyCount : 0,

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

    preload: function() {
        // Just to debug FPS
        this.time.advancedTiming = true;

        if (debug) {
            this.game.load.spritesheet('background', 'assets/beach-debug.png', 480, 270);
        } else {
            this.game.load.spritesheet('background', 'assets/beach.png', 480, 270);
        }

        this.difficulty = velocity;

        this.game.load.spritesheet('guiri1', 'assets/guiri1.png', 17, 37);
        this.game.load.spritesheet('guiri2', 'assets/guiri2.png', 17, 37);
        this.game.load.spritesheet('guiri3', 'assets/guiri3.png', 17, 37);
        this.game.load.spritesheet('guiri4', 'assets/guiri4.png', 17, 37);
        this.game.load.spritesheet('guiri5', 'assets/guiri5.png', 17, 37);
        this.game.load.spritesheet('guiri6', 'assets/guiri6.png', 17, 37);
        this.game.load.spritesheet('guiri7', 'assets/guiri7.png', 17, 37);
        this.game.load.spritesheet('guiri8', 'assets/guiri8.png', 17, 37);
        this.game.load.spritesheet('icon1', 'assets/icon1.png', 18, 18);
        this.game.load.spritesheet('icon2', 'assets/icon2.png', 18, 18);
        this.game.load.spritesheet('icon3', 'assets/icon3.png', 18, 18);
        this.game.load.spritesheet('icon4', 'assets/icon4.png', 18, 18);
        this.game.load.spritesheet('icon5', 'assets/icon5.png', 18, 18);
        this.game.load.spritesheet('icon6', 'assets/icon6.png', 18, 18);
        this.game.load.spritesheet('icon7', 'assets/icon7.png', 18, 18);
        this.game.load.spritesheet('icon8', 'assets/icon8.png', 18, 18);
        this.game.load.spritesheet('like', 'assets/like.png', 20, 20);
        this.game.load.spritesheet('dislike', 'assets/dislike.png', 20, 20);
        this.game.load.spritesheet('chiringuito1', 'assets/chiringuito1.png', 80, 80);
        this.game.load.spritesheet('chiringuito2', 'assets/chiringuito2.png', 80, 80);
        this.game.load.spritesheet('chiringuito3', 'assets/chiringuito3.png', 80, 80);
        this.game.load.spritesheet('chiringuito4', 'assets/chiringuito4.png', 80, 80);
        this.game.load.spritesheet('trash', 'assets/trash.png', 33, 29);
        this.game.load.spritesheet('baywatcher1', 'assets/baywatcher1.png', 46, 74);
        this.game.load.spritesheet('baywatcher2', 'assets/baywatcher2.png', 46, 74);
        this.game.load.spritesheet('baywatcher3', 'assets/baywatcher3.png', 46, 74);
        this.game.load.spritesheet('towel', 'assets/towels.png', 17, 33);
        this.game.load.spritesheet('splash', 'assets/splash.png', 50, 50);
        this.game.load.spritesheet('rubbish', 'assets/rubbish.png', 20, 20);
        this.game.load.spritesheet('icons', 'assets/icons1.png', 16, 16);
        this.game.load.spritesheet('bubble', 'assets/bubble.png', 180, 20);

        this.game.load.audio('music', ['audio/music.mp3']);
        this.game.load.audio('baywatacher', ['audio/baywatcher.mp3']);
        this.game.load.audio('trash', ['audio/trash.mp3']);
        this.game.load.audio('coin', ['audio/coin.mp3']);
        this.game.load.audio('buyguiri', ['audio/buyguiri.mp3']);
        this.game.load.audio('buy', ['audio/buy.mp3']);
    },

    create: function() {
        var _this = this;

        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        var background = this.game.add.sprite(0, 0, 'background');
        background.scale.set(scaleFactor);
        background.smoothed = false;

        background.animations.add('idle', [0, 1, 2, 3, 4, 5], 5, true);
        background.animations.play('idle');

        this.moneyText = this.game.add.text(0, 0, this.money, {fill: '#FFFFFF', font: '24px pixellari', boundsAlignH: 'right'});
        this.moneyText.setTextBounds(gameWidth - 55, 14, 0, 50);

        this.moneySprite = this.game.add.sprite(gameWidth - 50, 10, 'icons');
        this.moneySprite.smoothed = false;
        this.moneySprite.scale.set(scaleFactor);
        this.moneySprite.animations.add('money', [13], 1);
        this.moneySprite.animations.play('money');

        this.famePercentageText = this.game.add.text(0, 0, '0%', {fill: '#FFFFFF', font: '24px pixellari', boundsAlignH: 'right'});
        this.famePercentageText.setTextBounds(gameWidth - 55, 55, 0, 50);

        this.fameSprite = this.game.add.sprite(gameWidth - 50, 50, 'icons');
        this.fameSprite.smoothed = false;
        this.fameSprite.scale.set(scaleFactor);
        this.fameSprite.animations.add('red', [24], 1);
        this.fameSprite.animations.add('yellow', [25], 1);
        this.fameSprite.animations.add('green', [26], 1);
        this.fameSprite.animations.add('blue', [27], 1);

        this.fameSprite.animations.play('yellow');

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

        this.time.events.loop(Phaser.Timer.SECOND * 10 / this.difficulty, function() {
            var guiri = new Guiri(game);
            _this.guirisGroup.add(guiri);
        }, this);

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
        /*
        this.rubbishZones.forEach(function(rubbish) {
            var rubbish = new Rubbish(game, rubbish.x, rubbish.y);
            _this.rubbishGroup.add(rubbish);
        });
        */

        // Rubbish Generation
        this.time.events.loop(Phaser.Timer.SECOND * 10 / this.difficulty, function() {
            if (this.rubbishGroup.children.length >= 24) {
                return;
            }

            var proportion = 4/24;
            var countGuiris = _this.guirisGroup.length; 
            var totalRubbishCount = Math.floor(countGuiris * proportion);

            for (i = 0; i < totalRubbishCount; i++) {
                var rnd = _this.rnd.integerInRange(0, _this.rubbishZones.length - 1);
                var arrRnd = _this.rubbishZones[rnd];

                var xRubbish = _this.rnd.integerInRange(arrRnd.x - 20, arrRnd.x + 20);
                var yRubbish = _this.rnd.integerInRange(arrRnd.y - 20, arrRnd.y + 20);

                var rubbish = new Rubbish(game, xRubbish, yRubbish);
                _this.rubbishGroup.add(rubbish);
            }
        }, this);

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
            this.game.debug.text('FPS: ' + this.time.fps, gameWidth - 250, 20);

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
        }


        this.moneyText.setText(this.money);
        this.famePercentageText.setText(this.famePercentage + '%');

        if (this.guirisTotalCount == 0) {
            this.fameSprite.animations.play('yellow');
        } else {
            if (this.famePercentage > 80) {
                this.fameSprite.animations.play('blue');
            } else if (this.famePercentage > 60) {
                this.fameSprite.animations.play('green');
            } else if (this.famePercentage > 40) {
                this.fameSprite.animations.play('yellow');
            } else {
                this.fameSprite.animations.play('red');
            }
        }

        //this.game.debug.text('FAMA: ' + this.fame, gameWidth - 50, 100);
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

    renderNotification: function(guiri, x, y) {
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
    }
}