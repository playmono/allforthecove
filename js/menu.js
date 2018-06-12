bootState = {
    preload : function() {
        this.game.load.spritesheet('loading', 'assets/loading.png', 150, 50);
    },

    create : function() {
        this.state.start("loadState");
    }
}

loadState = {
    preload : function() {
        preloadBarFrame = this.game.add.sprite(this.game.world.centerX - 75, this.game.world.centerY - 25, 'loading');
        preloadBarFrame.animations.add('preloadBarFrame', [1, 2, 3], 2, true);
        preloadBarFrame.animations.play('preloadBarFrame');

        preloadBar = this.game.add.sprite(this.game.world.centerX - 75, this.game.world.centerY - 25, 'loading');

        this.game.load.setPreloadSprite(preloadBar);

        // Just to debug FPS
        this.time.advancedTiming = true;

        if (debug) {
            this.game.load.spritesheet('background', 'assets/beach-debug.png', 480, 270);
        } else {
            this.game.load.spritesheet('background', 'assets/beach.png', 480, 270);
        }

        this.game.load.audio('music', ['audio/music.mp3']);
        this.game.load.audio('baywatacher', ['audio/baywatcher.mp3']);
        this.game.load.audio('trash', ['audio/trash.mp3']);
        this.game.load.audio('coin', ['audio/coin.mp3']);
        this.game.load.audio('buyguiri', ['audio/buyguiri.mp3']);
        this.game.load.audio('buy', ['audio/buy.mp3']);

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
        this.game.load.spritesheet('icons', 'assets/icons2.png', 16, 16);
        this.game.load.spritesheet('bubble', 'assets/bubble.png', 180, 20);
        this.game.load.spritesheet('refill', 'assets/refill1.png', 28, 36);
        this.game.load.spritesheet('exit', 'assets/back2.png', 42, 42);
        this.game.load.spritesheet('price', 'assets/buy.png', 28, 28);
    },

    create : function() {
        if (debug) {
            game.state.start("gameState");
        } else {
            game.state.start("menuState");
        }
    }
}

menuState = {
    preloadBarFrame : null,
    preloadBar : null,

    preload: function() {
    },

    create : function() {
        var _this = this;

        this.game.sound.stopAll();

        this.add.text(300, 100, "All for the Cove", {fill: "white", font: "50px pixellari"});

        var startGameText = this.add.text(120, 200, "Empezar Juego", {fill: "white", font: "50px pixellari"});
        var howtoPlayText = this.add.text(120, 300, "Cómo jugar", {fill: "white", font: "50px pixellari"});
        var creditsText = this.add.text(120, 400, "Credits", {fill: "white", font: "50px pixellari"});

        startGameText.inputEnabled = true;
        howtoPlayText.inputEnabled = true;
        creditsText.inputEnabled = true;

        startGameText.events.onInputDown.add(function () {
            _this.state.start("gameState");
        }, this);

        howtoPlayText.events.onInputDown.add(function () {
            _this.state.start("howToPlayState");
        }, this);

        creditsText.events.onInputDown.add(function () {
            _this.state.start("creditsState");
        }, this);
    },

    update : function() {
    }
}

howToPlayState = {
    preload :  function() {

        this.game.load.image('tutorial', 'assets/tutorial.png', 480, 270);
        this.game.load.image('story', 'assets/story.png', 480, 270);
        this.game.load.image('title', 'assets/title.png', 480, 270);
    },

    create : function() {
        var _this = this;

        a = this.game.add.image(0, 0, 'title');
        a.scale.set(scaleFactor);
        a.smoothed = false;

        a.inputEnabled = true;

        a.events.onInputDown.add(function () {
            b = this.game.add.image(0, 0, 'story');
            b.scale.set(scaleFactor);
            b.smoothed = false;

            b.inputEnabled = true;

            b.events.onInputDown.add(function () {
                c = this.game.add.image(0, 0, 'tutorial');
                c.scale.set(scaleFactor);
                c.smoothed = false;

                c.inputEnabled = true;

                c.events.onInputDown.add(function () {
                    _this.state.start("menuState");
                }, this);
            });

        }, this);

    },

    update : function() {

    }
}

creditsState = {
    preload : function() {

    },

    create : function () {
        _this = this;

        this.add.text(50, 100, "All for the Cove", {fill: "white", font: "50px pixellari"});
        this.add.text(50, 170, "Game Design: Noé Fernández", {fill: "white", font: "24px pixellari"});
        this.add.text(50, 200, "Programmer: Adrián Granado", {fill: "white", font: "24px pixellari"});
        this.add.text(50, 230, "Artist: Noé Fernández", {fill: "white", font: "24px pixellari"});

        this.add.text(50, 300, "Fuente: Zacchary Dempsey-Plante (https://www.dafont.com/pixellari.font)", {fill: "white", font: "24px pixellari"});
        this.add.text(50, 330, "Música: Kevin MacLeod", {fill: "white", font: "24px pixellari"});
    
        var backText = this.add.text(50, 400, "Volver a Menú", {fill: "white", font: "24px pixellari"});
        
        backText.inputEnabled = true;

        backText.events.onInputDown.add(function () {
            _this.state.start("menuState");
        }, this);
    },

    update : function() {

    }
}