var Tutorial = {
    currentOption: null,
    toRead: [],
    alreadyRead: [],
    text: null,

    getCurrentOption: function() {
        return this.currentOption;
    },

    addToAlreadyDead: function(option) {
        if (this.alreadyRead.includes(option)) {
            return true;
        }

        this.alreadyRead.push(option);
    },

    addToRead: function(option) {
        if (this.toRead.includes(option)) {
            return true;
        }

        this.toRead.push(option);
    },

    add: function(option) {
        if (this.alreadyRead.includes(option)) {
            return true;
        }

        this.addToRead(option);

        if (this.toRead.length == 1) {
            this.update(option);
        }
    },

    update: function(option) {
        var _this = this;

        this.currentOption = option;

        gameState.tutorialGroup.callAll('kill');

        var text = this.createText(option);

        switch (option) {
            case 'guiri':
                gameState.guirisGroup.forEach(function(guiri) {
                    _this.createGuiriArrow(guiri);
                });

                text.setText(Languages.getText('LBL_TUTORIAL_GUIRI'));
            break;

            case 'rubbish':
                var draggingRubbish = false;

                gameState.rubbishGroup.forEach(function(rubbish) {
                    if (rubbish.beingDrag) {
                        draggingRubbish = true;
                        return false;
                    }
                });

                if (draggingRubbish) {
                    gameState.trashGroup.forEach(function(trash) {
                        _this.createTrashArrow(trash);
                    });
                } else {
                    gameState.rubbishGroup.forEach(function(rubbish) {
                        _this.createRubbishArrow(rubbish);
                    });
                }

                text.setText(Languages.getText('LBL_TUTORIAL_RUBBISH'));
            break;

            case 'chiringuito':
                gameState.chiringuitosGroup.forEach(function(chiringuito) {
                    _this.createChiringuitoArrow(chiringuito);
                });

                text.setText(Languages.getText('LBL_TUTORIAL_CHIRINGUITO'));
            break;

            case 'splash':
                var draggingWhistle = false;

                gameState.baywatchersGroup.forEach(function(baywatcher) {
                    if (baywatcher.beingDrag) {
                        draggingWhistle = true;
                        return false;
                    }
                });

                if (!draggingWhistle) {
                    gameState.baywatchersGroup.forEach(function(baywatcher) {
                        _this.createBaywatcherArrow(baywatcher);
                    });
                } else {
                    gameState.guirisGroup.forEach(function(guiri) {
                        _this.createSplashArrow(guiri);
                    });
                }

                text.setText(Languages.getText('LBL_TUTORIAL_SPLASH'));
            break;

            case 'buy':
                gameState.baywatchersGroup.forEach(function(baywatcher) {
                    _this.createToBuyArrow(baywatcher, 0, -30);
                });

                gameState.trashGroup.forEach(function(trash) {
                    _this.createToBuyArrow(trash, 0, -70);
                });

                gameState.chiringuitosGroup.forEach(function(chiringuito) {
                    _this.createToBuyArrow(chiringuito, 0, -30);
                });

                text.setText(Languages.getText('LBL_TUTORIAL_BUY'));
            break;
        }
    },

    removeFromRead: function(option) {
        var index = 0;

        if (option !== undefined) {
            var index = this.toRead.indexOf(option);
        }

        this.addToAlreadyDead(option);

        if (index >= 0) {
            this.toRead.splice(index, 1);
        }

        if (this.alreadyRead.includes('guiri')
            && this.alreadyRead.includes('rubbish')
            && this.alreadyRead.includes('chiringuito')
        ) {
            this.add('buy');
        }

        this.toRead.length == 0 ? this.update(null) : this.update(this.toRead[0]);
    },

    // RENDERS

    createText: function(option) {
        text = game.add.text(game.world.centerX, game.world.centerY + 150, '', {fill: 'black', font: '24px pixellari'});
        text.anchor.set(0.5);
        text.smoothed = false;

        gameState.tutorialGroup.add(text);

        return text;
    },

    createGuiriArrow: function(guiri) {
        arrow = game.add.sprite(0, 0, 'arrows');
        arrow.anchor.set(0.5);
        arrow.smoothed = false;
        arrow.scale.set(scaleFactor);
        arrow.frame = 0;

        arrow.update = function() {
            this.position.x = guiri.centerX;
            this.position.y = guiri.centerY - 80;
        };

        gameState.add.tween(arrow).to(
            { alpha: 0 },
            Phaser.Timer.SECOND,
            Phaser.Easing.Linear.None,
            true,
            Phaser.Timer.SECOND * 4
        ).onComplete.add(function() {
            Tutorial.removeFromRead('guiri');
        });

        gameState.tutorialGroup.add(arrow);
    },

    createRubbishArrow: function(rubbish) {
        arrow = game.add.sprite(rubbish.centerX, rubbish.centerY + 50, 'arrows');
        arrow.anchor.set(0.5);
        arrow.smoothed = false;
        arrow.scale.set(scaleFactor);
        arrow.frame = 1;

        gameState.tutorialGroup.add(arrow);
    },

    createTrashArrow: function(trash) {
        if (!trash.bought) {
            return true;
        }

        arrow = game.add.sprite(trash.centerX, trash.centerY + 60, 'arrows');
        arrow.anchor.set(0.5);
        arrow.smoothed = false;
        arrow.scale.set(scaleFactor);
        arrow.frame = 1;

        gameState.tutorialGroup.add(arrow);
    },

    createChiringuitoArrow: function(chiringuito) {
        if (!chiringuito.bought) {
            return true;
        }

        arrow = game.add.sprite(chiringuito.centerX - 80, chiringuito.centerY + 20, 'arrows');
        arrow.anchor.set(0.5);
        arrow.smoothed = false;
        arrow.scale.set(scaleFactor);
        arrow.frame = 5;

        gameState.tutorialGroup.add(arrow);
    },

    createSplashArrow: function(guiri) {
        if (!guiri.isSplashing) {
            return true;
        }

        arrow = game.add.sprite(guiri.centerX + 50, guiri.centerY, 'arrows');
        arrow.anchor.set(0.5);
        arrow.smoothed = false;
        arrow.scale.set(scaleFactor);
        arrow.frame = 3;

        gameState.tutorialGroup.add(arrow);
    },

    createBaywatcherArrow: function(baywatcher) {
        if (!baywatcher.bought) {
            return true;
        }

        arrow = game.add.sprite(baywatcher.exclamationMark.centerX + 50, baywatcher.exclamationMark.centerY - 10, 'arrows');
        arrow.anchor.set(0.5);
        arrow.smoothed = false;
        arrow.scale.set(scaleFactor);
        arrow.frame = 3;

        gameState.tutorialGroup.add(arrow);
    },

    createToBuyArrow: function(sprite, offsetX, offsetY) {
        if (sprite.bought) {
            return true;
        }

        arrow = game.add.sprite(sprite.centerX + offsetX, sprite.centerY + offsetY, 'arrows');
        arrow.anchor.set(0.5);
        arrow.smoothed = false;
        arrow.scale.set(scaleFactor);
        arrow.frame = 4;

        gameState.tutorialGroup.add(arrow);
    }
}