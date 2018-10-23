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
        //this.game.stage.backgroundColor = "#4488AA";
        var preloadBarFrame = this.game.add.sprite(this.game.world.centerX - 150, this.game.world.centerY - 75, 'loading');
        preloadBarFrame.scale.set(scaleFactor);
        preloadBarFrame.smoothed = false;

        preloadBarFrame.animations.add('preloadBarFrame', [1, 2, 3], 2, true);
        preloadBarFrame.animations.play('preloadBarFrame');

        var preloadBar = this.game.add.sprite(this.game.world.centerX - 150, this.game.world.centerY - 75, 'loading');
        preloadBar.scale.set(scaleFactor);
        preloadBar.smoothed = false;

        this.game.load.setPreloadSprite(preloadBar);

        // Just to debug FPS
        this.time.advancedTiming = true;

        this.game.load.spritesheet('title', 'assets/titlemenu.png', 480, 270);
        this.game.load.image('button', 'assets/button1.png', 140, 40);
        
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
        this.game.load.spritesheet('refill', 'assets/refill.png', 23, 37);
        this.game.load.spritesheet('exit', 'assets/back2.png', 42, 42);
        this.game.load.spritesheet('price', 'assets/buy.png', 28, 28);
        this.game.load.image('rating', 'assets/ratings.png', 330, 250);
        this.game.load.image('visitors', 'assets/visitors.png', 10, 20);
        this.game.load.image('gameover', 'assets/gameover1.png', 480, 270);
        this.game.load.image('exitpanel', 'assets/exitbox1.png', 270, 120);
        this.game.load.image('exitbutton', 'assets/exitbutton.png', 90, 42);
        this.game.load.image('resumebutton', 'assets/resumebutton.png', 90, 42);
        this.game.load.image('credits', 'assets/credits.png', 480, 270);
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

        var background = this.game.add.sprite(0, 0, 'title');
        background.scale.set(scaleFactor);
        background.smoothed = false;
        background.animations.add('idle', [0, 1, 2, 3, 4, 5], 5, true);
        background.animations.play('idle');

        var startButton = this.add.button(35, 250, 'button');
        startButton.scale.set(scaleFactor);
        startButton.smoothed = false;

        var startText = this.add.text(startButton.x + startButton.width / 2, startButton.y + startButton.height / 2, "Empezar Juego", {fill: "yellow", font: "30px pixellari"});
        startText.anchor.set(0.5);

        var endlessModeButton = this.add.button(35, 350, 'button');
        endlessModeButton.scale.set(scaleFactor);
        endlessModeButton.smoothed = false;
        
        var endlessModeText = this.add.text(endlessModeButton.x + endlessModeButton.width / 2, endlessModeButton.y + endlessModeButton.height / 2, "Modo Infinito", {fill: "yellow", font: "30px pixellari"});
        endlessModeText.anchor.set(0.5);

        var howToPlayButton = this.add.button(35, 450, 'button');
        howToPlayButton.scale.set(scaleFactor);
        howToPlayButton.smoothed = false;
        
        var howToPlayText = this.add.text(howToPlayButton.x + howToPlayButton.width / 2, howToPlayButton.y + howToPlayButton.height / 2, "Cómo jugar", {fill: "yellow", font: "30px pixellari"});
        howToPlayText.anchor.set(0.5);

        var creditsButton = this.add.button(650, 450, 'button');
        creditsButton.scale.set(scaleFactor);
        creditsButton.smoothed = false;
        
        var creditsText = this.add.text(creditsButton.x + creditsButton.width / 2, creditsButton.y + creditsButton.height / 2, "Créditos", {fill: "yellow", font: "30px pixellari"});
        creditsText.anchor.set(0.5);

        startButton.onInputUp.add(function () {
            _this.state.start("beforePlayState");
        }, this);

        howToPlayButton.onInputUp.add(function () {
            _this.state.start("howToPlayState");
        }, this);

        creditsButton.onInputUp.add(function () {
            _this.state.start("creditsState");
        }, this);
    },

    update : function() {
    }
},

beforePlayState = {
    preload : function() {
        this.game.load.image('story1', 'assets/story1.png', 480, 270);
        this.game.load.image('story2', 'assets/story2.png', 480, 270);
        this.game.load.image('story3', 'assets/story3.png', 480, 270);
    },

    create : function() {
        var _this = this;

        var story1 = new Phaser.Image(this.game, 0, 0, 'story1');
        story1.scale.set(scaleFactor);
        story1.smoothed = false;
        story1.inputEnabled = true;
        story1.input.useHandCursor = true;
        story1.alpha = 0;

        var story2 = new Phaser.Image(this.game, 0, 0, 'story2');
        story2.scale.set(scaleFactor);
        story2.smoothed = false;
        story2.inputEnabled = true;
        story2.input.useHandCursor = true;
        story2.alpha = 0;

        var story3 = new Phaser.Image(this.game, 0, 0, 'story3');
        story3.scale.set(scaleFactor);
        story3.smoothed = false;
        story3.inputEnabled = true;
        story3.input.useHandCursor = true;
        story3.alpha = 0;

        this.game.add.existing(story1);
        game.add.tween(story1).to({ alpha: 1 }, Phaser.Second, "Linear", true);

        story1.events.onInputDown.add(function () {
            story1.kill();
            this.game.add.existing(story2);
            game.add.tween(story2).to({ alpha: 1 }, Phaser.Second, "Linear", true);
        }, this);

        story2.events.onInputDown.add(function () {
            story2.kill();
            this.game.add.existing(story3);
            game.add.tween(story3).to({ alpha: 1 }, Phaser.Second, "Linear", true);
        }, this);

        story3.events.onInputDown.add(function () {
            story3.kill();
            this.state.start("gameState");
        }, this);
    }
},

howToPlayState = {
    preload :  function() {
        this.game.load.image('tutorial', 'assets/tutorial.png', 480, 270);
        this.game.load.image('story', 'assets/story.png', 480, 270);
        this.game.load.image('title', 'assets/title.png', 480, 270);
    },

    create : function() {
        var _this = this;

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
    },

    update : function() {

    }
}

creditsState = {
    preload : function() {

    },

    create : function () {
        var _this = this;

        credits = this.game.add.image(0, 0, 'credits');
        credits.scale.set(scaleFactor);
        credits.smoothed = false;

        var centerX = credits.x + credits.width / 2;
        var centerY = credits.y + credits.height / 2;

        this.add.text(centerX, centerY - 140, "All for the Cove", {fill: "white", font: "50px pixellari"}).anchor.set(0.5, 0.5);
        
        this.add.text(centerX, centerY - 60, "Diseño: Noé Fernández y Adrián Granado", {fill: "white", font: "24px pixellari"}).anchor.set(0.5, 0.5);
        this.add.text(centerX, centerY - 35, "Programador: Adrián Granado", {fill: "white", font: "24px pixellari"}).anchor.set(0.5, 0.5);
        this.add.text(centerX, centerY - 10, "Artista: Noé Fernández", {fill: "white", font: "24px pixellari"}).anchor.set(0.5, 0.5);

        this.add.text(centerX, centerY + 40, "Fuente: Zacchary Dempsey-Plante (https://www.dafont.com/pixellari.font)", {fill: "white", font: "20px pixellari"}).anchor.set(0.5, 0.5);
        this.add.text(centerX, centerY + 60, "Música: Kevin MacLeod", {fill: "white", font: "20px pixellari"}).anchor.set(0.5, 0.5);

        var exitButton = this.add.button(credits.x + 50, credits.height - 100, 'button');
        exitButton.scale.set(scaleFactor);
        exitButton.smoothed = false;

        var backText = this.add.text(exitButton.x + exitButton.width / 2, exitButton.y + exitButton.height / 2, "Volver a Menú", {fill: "yellow", font: "30px pixellari"}).anchor.set(0.5, 0.5);

        exitButton.onInputUp.add(function () {
            _this.state.start("menuState");
        }, this);
    },

    update : function() {

    }
}