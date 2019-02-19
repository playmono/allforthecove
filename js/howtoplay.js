howToPlayState = {
    preload :  function() {
    },

    create : function() {
        var _this = this;

        this.background = this.game.add.sprite(0, 0, 'background');
        this.background.scale.set(scaleFactor);
        this.background.smoothed = false;

        this.background.animations.add('idle', [0, 1, 2, 3, 4, 5], 5, true);
        this.background.animations.play('idle');

        var exit = this.game.add.sprite(gameWidth -70, 15, 'exit');
        exit.smoothed = false;
        exit.inputEnabled = true;
        exit.input.useHandCursor = true;

        this.message = this.game.add.text(500, 300, 'a', {fill: '#FFFFFF', font: '24px pixellari', boundsAlignH: 'right'});
        this.message.alpha = 0;
   
        exit.events.onInputDown.add(function () {
            _this.state.start("menuState");
        }, this);

        this.welcome();
    },

    welcome: function() {
        var _this = this;

        welcome = this.showMessage('Bienvenido al Tutorial.');

        welcome.onComplete.add(function() {
            game.input.onDown.addOnce(function() {
                var followUp = _this.showMessage('A continuación, aprenderás a jugar a\nAll for the Cove.');
                
                followUp.onComplete.add(function() {
                    game.input.onDown.addOnce(function() {
                        _this.showMessage('Cómo podrás ver, diferentes\nturistas llegan a la playa.');
                        _this.guiriToTowel();
                    });
                });
            });
        }, this);
    },

    guiriToTowel: function() {
        var guiri = new Guiri(game);
        guiri.position.x = 50;
        guiri.position.y = 50;

        var movingRoute1 = game.add.tween(guiri).to({ y: 100 }, Phaser.Timer.SECOND, Phaser.Easing.Linear.None);
        
        var offsetX = guiri.beachSlot.x > guiri.x ? 30 : -30;
        var movingRoute2 = game.add.tween(guiri).to({y: '+40', x: guiri.x + offsetX}, Phaser.Timer.SECOND / gameState.difficulty, Phaser.Easing.Circular.None, true);

        movingRoute1.onComplete.add(function() {
            movingRoute2.start();
        });

        movingRoute1.start();
    },

    showMessage: function(message) {
        this.message.setText(message);
        this.message.alpha = 0;

        return game.add.tween(this.message).to({alpha: 1}, Phaser.Timer.SECOND / 2, Phaser.Easing.Linear.None, true);
    },

    update : function() {

    }
}