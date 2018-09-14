gameState = {
    // Level properties
    difficulty : 0,
    money: 0,
    famePercentage : 0,
    chiringuitoCost : 0,
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
    background: null,

    rubbishLoop: null,

    fameSpriteMap : {
        red: 24,
        yellow: 25,
        green: 26,
        blue: 27
    },

    weekdaysTitlesMap : {
        'Monday' : 'Lunes',
        'Tuesday' : 'Martes',
        'Wednesday' : 'Miércoles',
        'Thursday' : 'Jueves',
        'Friday' : 'Viernes',
        'Saturday' : 'Sábado',
        'Sunday' : 'Domingo'
    },

    preload: function() {
    },

    create: function() {
        var _this = this;

        this.currentLevel = 0;

        // Level properties
        this.famePercentage = 0;
        this.currentGuirisTotalCount = 0;
        this.money = levels[this.currentLevel].startMoney;

        this.chiringuitoCost = 150;
        this.trashCost = 50;
        this.baywatcherCost = 300;

        game.physics.startSystem(Phaser.Physics.ARCADE);

        // LAYERS

        this.background = this.game.add.sprite(0, 0, 'background');
        this.background.scale.set(scaleFactor);
        this.background.smoothed = false;

        this.background.animations.add('idle', [0, 1, 2, 3, 4, 5], 5, true);
        this.background.animations.play('idle');

        this.itemsGroup = this.add.group();
        this.chiringuitosGroup = this.add.group();
        this.trashGroup = this.add.group();
        this.cooldownsGroup = this.add.group();
        this.rubbishGroup = this.add.group();
        this.guirisGroup = this.add.group();
        this.baywatchersGroup = this.add.group();
        this.baywatcherCooldownsGroup = this.add.group();
        this.notificationsGroup = this.add.group();
        this.ratingsGroup = this.add.group();
        this.hudGroup = this.add.group();

        var exit = this.game.add.sprite(gameWidth -70, 15, 'exit');
        exit.smoothed = false;
        exit.inputEnabled = true;
        exit.input.useHandCursor = true;
        this.hudGroup.add(exit);

        exit.events.onInputDown.add(function () {
            _this.state.start("menuState");
        }, this);

        this.moneyText = this.game.add.text(0, 0, this.money, {fill: '#FFFFFF', font: '24px pixellari', boundsAlignH: 'right'});
        this.moneyText.setTextBounds(gameWidth - 320, 12, 0, 50);
        this.hudGroup.add(this.moneyText);

        this.moneySprite = this.game.add.sprite(gameWidth - 310, 6, 'icons');
        this.moneySprite.smoothed = false;
        this.moneySprite.scale.set(scaleFactor);
        this.moneySprite.frame = 13;
        this.hudGroup.add(this.moneySprite);

        this.famePercentageText = this.game.add.text(0, 0, '0%', {fill: '#FFFFFF', font: '24px pixellari', boundsAlignH: 'right'});
        this.famePercentageText.setTextBounds(gameWidth - 190, 12, 0, 50);
        this.hudGroup.add(this.famePercentageText);

        this.fameSprite = this.game.add.sprite(gameWidth - 180, 8, 'icons');
        this.fameSprite.smoothed = false;
        this.fameSprite.scale.set(scaleFactor);
        this.fameSprite.frame = 25; // 25 = yellow face
        this.hudGroup.add(this.fameSprite);

        this.refillSprite = null;
        this.refillText = null;

        this.priceSprite = null;
        this.priceText = null;

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

        var music = game.add.audio("music");
        trashEffect = game.add.audio("trash");
        buyGuiriEffect = game.add.audio("buyguiri");
        coinEffect = game.add.audio("coin");

        music.play();

        this.startLevel();
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
            
            //this.game.debug.text('Sprites: ' + this.ratingsGroup.countLiving(), gameWidth - 250, 40);

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

            this.game.debug.text(levels[this.currentLevel].moneySpent, gameWidth - 50, 80);

            this.game.debug.text(levels[this.currentLevel].title, gameWidth - 80, 120);
        }

        this.moneyText.setText(this.money);
        this.famePercentageText.setText(this.famePercentage + '%');

        if (this.currentGuirisTotalCount == 0) {
            this.fameSprite.frame = this.fameSpriteMap.yellow;
        } else {
            if (this.famePercentage > 80) {
                this.fameSprite.frame = this.fameSpriteMap.blue;
            } else if (this.famePercentage > 60) {
                this.fameSprite.frame = this.fameSpriteMap.green;
            } else if (this.famePercentage > 40) {
                this.fameSprite.frame = this.fameSpriteMap.yellow;
            } else {
                this.fameSprite.frame = this.fameSpriteMap.red;
            }
        }
    },

    createRubbishLoop: function() {
        var _this = this;

        this.rubbishLoop = this.time.events.loop(Phaser.Timer.SECOND * 10 / this.difficulty, function() {
            if (_this.rubbishGroup.countLiving() >= 24) {
                return;
            }

            var proportion = 4/24;
            var countGuiris = _this.guirisGroup.countLiving();
            var totalRubbishCount = Math.floor(countGuiris * proportion);

            if (totalRubbishCount == 0) {
                totalRubbishCount = 1;
            }

            for (i = 0; i < totalRubbishCount; i++) {
                var rnd = _this.rnd.integerInRange(0, _this.rubbishZones.length - 1);
                var arrRnd = _this.rubbishZones[rnd];

                var x = _this.rnd.integerInRange(arrRnd.x - 20, arrRnd.x + 20);
                var y = _this.rnd.integerInRange(arrRnd.y - 20, arrRnd.y + 20);

                //this.rubbishGroup.getFirstDead(true, x, y);

                var rubbish = new Rubbish(game, x, y);
                _this.rubbishGroup.add(rubbish);
            }
        }, this);
    },

    createGuirisLoop: function() {
        // We are using gameState instead this because context reasons

        // First guiri at 3 / difficulty
        gameState.time.events.add(Phaser.Timer.SECOND * 3 / gameState.difficulty, function(){
            var guiri = new Guiri(game);
            gameState.guirisGroup.add(guiri);
        });

        // Rest of guiris at 10 / difficulty
        gameState.time.events.repeat(Phaser.Timer.SECOND * 10 / gameState.difficulty, (levels[gameState.currentLevel].guirisTotalCount - 1), function() {
            var guiri = new Guiri(game);
            gameState.guirisGroup.add(guiri);
        });
    },

    startLevel: function() {
        var _this = this;

        this.currentGuirisTotalCount = 0;
        this.realGuirisTotalCount = 0;
        this.famePercentage = 0;
        this.difficulty = levels[this.currentLevel].velocity;
        this.money = levels[this.currentLevel].startMoney;

        levels[this.currentLevel].moneySpent = 0;
        levels[this.currentLevel].warningCount = 0;
        levels[this.currentLevel].rubbishCleaned = 0;
        levels[this.currentLevel].guirisHappyCount = 0;

        this.background.revive();
        gameState.itemsGroup.revive();
        gameState.chiringuitosGroup.revive();
        gameState.trashGroup.revive();
        gameState.cooldownsGroup.revive();
        gameState.rubbishGroup.revive();
        gameState.guirisGroup.revive();
        gameState.baywatchersGroup.revive();
        gameState.baywatcherCooldownsGroup.revive();
        gameState.notificationsGroup.revive();
        gameState.hudGroup.revive();

        this.rubbishGroup.removeAll(true);

        this.chiringuitosGroup.forEach(function(chiringuito) {
            if (chiringuito.bought) {
                chiringuito.stock = 3;
                chiringuito.stockSprite.frame = 11;
            }
        });

        var graphic = game.add.graphics(0, 0);
        graphic.beginFill(0x000000, 0.8);
        graphic.drawRect(this.background.x, (this.background.y + this.background.height / 2) - 100, this.background.width, 1);
        graphic.endFill();

        var bar = game.add.sprite(this.background.x, (this.background.y + this.background.height / 2) - 100, graphic.generateTexture());
        graphic.destroy();

        var dayTitle = this.weekdaysTitlesMap[levels[this.currentLevel].title];
        var dayText = _this.add.text(-50, bar.y + bar.height / 2, dayTitle, {fill: "white", font: "30px pixellari"});
        dayText.anchor.set(0.5, 0.5);

        var openDayBar = gameState.add.tween(bar).to({height: 50, y: '-30px'}, Phaser.Timer.SECOND / 2);
        var closeDayBar = gameState.add.tween(bar).to({height: 0, y: '+30px'}, Phaser.Timer.SECOND / 2);
        var moveText = gameState.add.tween(dayText).to({x: game.world.x + game.world.width / 2}, Phaser.Timer.SECOND / 2);
        var moveText2 = gameState.add.tween(dayText).to({x: game.world.width + 50}, Phaser.Timer.SECOND / 2, Phaser.Easing.Linear.None, false, Phaser.Timer.SECOND * 1);

        openDayBar.onStart.add(function() {
            moveText.start();
        });

        moveText.onComplete.add(function() {
            moveText2.start();
        })

        moveText2.onComplete.add(function() {
            closeDayBar.start();
        });

        closeDayBar.onComplete.add(function() {
            dayText.destroy();
            /*
            _this.fadeAll(0x213263, 0xffffff, Phaser.Timer.SECOND * 2, function() {
                _this.createGuirisLoop();
                _this.createRubbishLoop();
            });
            */
        })

        this.fadeAll(0x213263, 0xffffff, Phaser.Timer.SECOND * 2, function() {
            _this.createGuirisLoop();
            _this.createRubbishLoop();
        });

        openDayBar.start();
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

        this.famePercentage = Math.floor(levels[this.currentLevel].guirisHappyCount * 100 / gameState.currentGuirisTotalCount);
    },

    checkNextLevel: function() {
        gameState.realGuirisTotalCount++;

        if (this.realGuirisTotalCount != levels[this.currentLevel].guirisTotalCount) {
            return;
        }

        game.time.events.remove(this.rubbishLoop);

        this.fadeAll(0xffffff, 0x213263, Phaser.Timer.SECOND * 2, this.showRatings);
    },

    showRatings: function() {
        // We are using gameState instead of this because context reasons

        gameState.itemsGroup.kill();
        gameState.chiringuitosGroup.kill();
        gameState.trashGroup.kill();
        gameState.cooldownsGroup.kill();
        gameState.rubbishGroup.kill();
        gameState.guirisGroup.kill();
        gameState.baywatchersGroup.kill();
        gameState.baywatcherCooldownsGroup.kill();
        gameState.notificationsGroup.kill();
        gameState.hudGroup.kill();

        var rating = gameState.add.sprite(gameState.world.centerX, gameState.world.centerY, 'rating');
        rating.anchor.setTo(0.5, 0.5);
        rating.smoothed = false;
        rating.scale.set(scaleFactor);

        gameState.ratingsGroup.add(rating);

        var ratingText = gameState.add.text(gameState.world.centerX, 75, "Valoración del turismo" , {fill: "black", font: "36px pixellari"});
        ratingText.anchor.setTo(0.5);
        //ratingText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        gameState.ratingsGroup.add(ratingText);

        rating.events.onInputDown.addOnce(function() {
            gameState.ratingsGroup.removeAll(true);

            if (gameState.famePercentage <= 40) {
                gameState.gameOver();
            } else {
                gameState.currentLevel++;
                levels[gameState.currentLevel].startMoney = gameState.money;
                gameState.startLevel();
            }
        });

        var startY = 155;
        var startX = 190;

        for (var i = 0; i < gameState.currentLevel; i++) {
            gameState.renderDayRating(levels[i], startX, startY, false);
            startX += 85;
        }

        var lastTween = gameState.renderDayRating(levels[gameState.currentLevel], startX, startY, true);

        lastTween.onComplete.add(function() {
            rating.inputEnabled = true;
        });
    },

    renderDayRating: function(level, startX, startY, fadeIn) {
        var textStyle = {font: '24px pixellari', boundsAlignH: 'right'};

        var visitorsSprite = gameState.add.sprite(startX, startY, 'visitors');
        visitorsSprite.smoothed = false;
        visitorsSprite.scale.set(scaleFactor);
        this.ratingsGroup.add(visitorsSprite);

        var visitorsCounter = gameState.add.text(startX + 40, startY + 10, level.guirisTotalCount);
        visitorsCounter.setStyle(textStyle);
        this.ratingsGroup.add(visitorsCounter);

        var likeSprite = gameState.add.sprite(startX - 15, startY + 45, 'like');
        likeSprite.smoothed = false;
        likeSprite.scale.set(scaleFactor);
        this.ratingsGroup.add(likeSprite);

        var likesCounter = gameState.add.text(startX + 40, startY + 55, level.guirisHappyCount);
        likesCounter.setStyle(textStyle);
        this.ratingsGroup.add(likesCounter);

        var dislikeSprite = gameState.add.sprite(startX - 15, startY + 80, 'dislike');
        dislikeSprite.smoothed = false;
        dislikeSprite.scale.set(scaleFactor);
        this.ratingsGroup.add(dislikeSprite);

        var dislikesCounter = gameState.add.text(startX + 40, startY + 89, level.guirisTotalCount - level.guirisHappyCount);
        dislikesCounter.setStyle(textStyle);
        this.ratingsGroup.add(dislikesCounter);

        var moneySprite = gameState.add.sprite(startX + 10, startY + 125, 'icons');
        moneySprite.frame = 13;
        moneySprite.smoothed = false;
        moneySprite.scale.set(scaleFactor);
        this.ratingsGroup.add(moneySprite);

        var moneySpent = gameState.add.text(startX + 10, startY + 160, level.moneySpent);
        moneySpent.setStyle(textStyle);
        this.ratingsGroup.add(moneySpent);

        var rubbishSprite = gameState.add.sprite(startX - 7, startY + 190, 'rubbish');
        rubbishSprite.frame = 4;
        rubbishSprite.smoothed = false;
        rubbishSprite.scale.set(scaleFactor);
        this.ratingsGroup.add(rubbishSprite);

        var rubbishCounter = gameState.add.text(startX + 40, startY + 197, level.rubbishCleaned);
        rubbishCounter.setStyle(textStyle);
        this.ratingsGroup.add(rubbishCounter);

        var whistleSprite = gameState.add.sprite(startX - 3, startY + 232, 'icons');
        whistleSprite.frame = 12;
        whistleSprite.smoothed = false;
        whistleSprite.scale.set(scaleFactor);
        this.ratingsGroup.add(whistleSprite);

        var warningCounter = gameState.add.text(startX + 40, startY + 235, level.warningCount);
        warningCounter.setStyle(textStyle);
        this.ratingsGroup.add(warningCounter);

        var hapinessSprite = gameState.add.sprite(startX + 15, startY + 275, 'icons');
        hapinessSprite.smoothed = false;
        hapinessSprite.scale.set(scaleFactor);
        this.ratingsGroup.add(hapinessSprite);

        var happinessPercentatge = Math.floor(level.guirisHappyCount * 100 / level.guirisTotalCount);

        if (happinessPercentatge > 80) {
            hapinessSprite.frame = this.fameSpriteMap.blue;
        } else if (happinessPercentatge > 60) {
            hapinessSprite.frame = this.fameSpriteMap.green;
        } else if (happinessPercentatge > 40) {
            hapinessSprite.frame = this.fameSpriteMap.yellow;
        } else {
            hapinessSprite.frame = this.fameSpriteMap.red;
        }

        var happinessPercentatgeText = gameState.add.text(startX + 20, startY + 315, happinessPercentatge + '%');
        happinessPercentatgeText.setStyle(textStyle);
        this.ratingsGroup.add(happinessPercentatgeText);

        if (fadeIn) {
            visitorsCounter.alpha = 0;
            likesCounter.alpha = 0;
            dislikesCounter.alpha = 0;
            moneySpent.alpha = 0;
            rubbishCounter.alpha = 0;
            warningCounter.alpha = 0;
            happinessPercentatgeText.alpha = 0;

            visitorsCounter.x += 10;
            likesCounter.x += 10;
            dislikesCounter.x += 10;
            moneySpent.x += 10;
            rubbishCounter.x += 10;
            warningCounter.x += 10;
            happinessPercentatge.x += 10;

            var visitorsCounterFadeIn = gameState.add.tween(visitorsCounter).to({alpha: 1, x: '-10'}, Phaser.Timer.SECOND / 2, Phaser.Easing.Linear.None, false, Phaser.Timer.SECOND);
            var likesCounterFadeIn = gameState.add.tween(likesCounter).to({alpha: 1, x: '-10'}, Phaser.Timer.SECOND / 2);
            var dislikesCounterFadeIn = gameState.add.tween(dislikesCounter).to({alpha: 1, x: '-10'}, Phaser.Timer.SECOND / 2);
            var moneySpentCounterFadeIn = gameState.add.tween(moneySpent).to({alpha: 1, x: '-10'}, Phaser.Timer.SECOND / 2);
            var rubbishCounterFadeIn = gameState.add.tween(rubbishCounter).to({alpha: 1, x: '-10'}, Phaser.Timer.SECOND / 2);
            var warningCounterFadeIn = gameState.add.tween(warningCounter).to({alpha: 1, x: '-10'}, Phaser.Timer.SECOND / 2);
            var happinessPercentatgeFadeIn = gameState.add.tween(happinessPercentatgeText).to({alpha: 1, x: '-10'}, Phaser.Timer.SECOND / 2);

            visitorsCounterFadeIn.onComplete.add(function() {
                likesCounterFadeIn.start();
            });

            likesCounterFadeIn.onComplete.add(function() {
                dislikesCounterFadeIn.start();
            })

            dislikesCounterFadeIn.onComplete.add(function() {
                moneySpentCounterFadeIn.start();
            });

            moneySpentCounterFadeIn.onComplete.add(function() {
                rubbishCounterFadeIn.start();
            });

            rubbishCounterFadeIn.onComplete.add(function() {
                warningCounterFadeIn.start();
            });

            warningCounterFadeIn.onComplete.add(function() {
                happinessPercentatgeFadeIn.start();
            })

            visitorsCounterFadeIn.start();

            return moneySpentCounterFadeIn;
        }
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
    },

    tweenTint: function(obj, startColor, endColor, time) {
        var colorBlend = {step: 0};
        var colorTween = gameState.add.tween(colorBlend).to({step: 100}, time);
        colorTween.onUpdateCallback(function() {
            obj.tint = Phaser.Color.interpolateColor(startColor, endColor, 100, colorBlend.step);
        });
        obj.tint = startColor;

        return colorTween;
    },

    fadeAll: function(startColor, endColor, time, callback) {
        var _this = this;

        this.chiringuitosGroup.forEach(function(chiringuito) {
            var fadeChiringuito = _this.tweenTint(chiringuito, startColor, endColor, time);
            fadeChiringuito.start();
        });

        this.baywatchersGroup.forEach(function(baywatcher) {
            var fadeBaywatcher = _this.tweenTint(baywatcher, startColor, endColor, time);
            fadeBaywatcher.start();
        });

        this.trashGroup.forEach(function(trash) {
            var fadeTrash = _this.tweenTint(trash, startColor, endColor, time);
            fadeTrash.start();
        });

        this.rubbishGroup.forEach(function(rubbish) {
            var fadeRubbish = _this.tweenTint(rubbish, startColor, endColor, time);
            fadeRubbish.start();
        });

        this.cooldownsGroup.forEach(function(cooldown) {
            var fadeCooldown = _this.tweenTint(cooldown, startColor, endColor, time);
            fadeCooldown.start();
        });

        this.baywatcherCooldownsGroup.forEach(function(cooldown) {
            var fadeCooldown = _this.tweenTint(cooldown, startColor, endColor, time);
            fadeCooldown.start();
        });

        var tintBackground = this.tweenTint(this.background, startColor, endColor, time);

        tintBackground.onComplete.add(function() {
            callback();
        });

        tintBackground.start();

        return tintBackground;
    },

    gameOver: function() {
        var _this = this;

        this.background.kill();

        var gameOverBackground = gameState.add.sprite(-50, -50, 'gameover');
        gameOverBackground.smoothed = false;
        gameOverBackground.scale.set(scaleFactor);

        game.camera.shake(0.05, Phaser.Timer.SECOND / 2);

        game.time.events.add(Phaser.Timer.SECOND / 2 + Phaser.Timer.SECOND / 4, function () {
            var tryAgainButton = _this.add.button(345, 10, 'button');
            tryAgainButton.scale.set(scaleFactor);
            tryAgainButton.smoothed = false;

            var tryAgainText = _this.add.text(tryAgainButton.x + tryAgainButton.width / 2, tryAgainButton.y + tryAgainButton.height / 2, "Intentarlo otra vez", {fill: "yellow", font: "30px pixellari"});
            tryAgainText.anchor.set(0.5);

            var mainMenuButton = _this.add.button(645, 10, 'button');
            mainMenuButton.scale.set(scaleFactor);
            mainMenuButton.smoothed = false;

            var mainMenuText = _this.add.text(mainMenuButton.x + mainMenuButton.width / 2, mainMenuButton.y + mainMenuButton.height / 2, "Menú principal", {fill: "yellow", font: "30px pixellari"});
            mainMenuText.anchor.set(0.5);

            tryAgainButton.onInputUp.add(function () {
                gameOverBackground.destroy();
                tryAgainButton.destroy();
                mainMenuButton.destroy();
                tryAgainText.destroy();
                mainMenuText.destroy();

                _this.startLevel();
            }, _this);

            mainMenuButton.onInputUp.add(function () {
                _this.state.start("menuState");
            }, _this);
        }, _this);
    }
}