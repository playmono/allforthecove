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
        this.game.load.spritesheet('options', 'assets/options.png', 22, 22);
        this.game.load.spritesheet('price', 'assets/buy.png', 28, 28);
        this.game.load.spritesheet('arrows', 'assets/arrows.png', 25, 36);
        this.game.load.spritesheet('flags', 'assets/flags.png', 60, 40);
        this.game.load.spritesheet('flags', 'assets/flags.png', 60, 40);
        this.game.load.image('rating', 'assets/ratings.png', 330, 250);
        this.game.load.image('visitors', 'assets/visitors.png', 10, 20);
        this.game.load.image('gameover', 'assets/gameover1.png', 480, 270);
        this.game.load.image('exitpanel', 'assets/exitbox1.png', 270, 120);
        this.game.load.image('exitbutton', 'assets/exitbutton.png', 90, 42);
        this.game.load.image('resumebutton', 'assets/resumebutton.png', 90, 42);
        this.game.load.image('credits', 'assets/credits.png', 480, 270);
        this.game.load.image('notepad', 'assets/notepad.png', 370, 42);

        this.game.load.image('ending1', 'assets/ending1.png', 480, 270);
        this.game.load.image('ending2', 'assets/ending2.png', 480, 270);
        this.game.load.image('ending3', 'assets/ending3.png', 480, 270);

        this.game.load.json('es_es', 'languages/es_es.json');
        this.game.load.json('en_us', 'languages/en_us.json');

        Languages.init();
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

        // Background and sprites

        var background = this.game.add.sprite(0, 0, 'title');
        background.scale.set(scaleFactor);
        background.smoothed = false;
        background.animations.add('idle', [0, 1, 2, 3, 4, 5], 5, true);
        background.animations.play('idle');

        var startButton = this.add.button(35, 250, 'button');
        startButton.scale.set(scaleFactor);
        startButton.smoothed = false;

        var startText = this.add.text(startButton.x + startButton.width / 2, startButton.y + startButton.height / 2, Languages.getText('LBL_START_GAME'), {fill: "yellow", font: "30px pixellari"});
        startText.anchor.set(0.5);

        var endlessMode = JSON.parse(localStorage.getItem('allforthecove_endlessmode'));

        if (endlessMode) {
            var endlessModeButton = this.add.button(35, 350, 'button');
            endlessModeButton.scale.set(scaleFactor);
            endlessModeButton.smoothed = false;

            var endlessModeText = this.add.text(endlessModeButton.x + endlessModeButton.width / 2, endlessModeButton.y + endlessModeButton.height / 2, Languages.getText('LBL_ENDLESS_MODE'), {fill: "yellow", font: "30px pixellari"});
            endlessModeText.anchor.set(0.5);
        }

        var creditsButton = this.add.button(35, 450, 'button');
        creditsButton.scale.set(scaleFactor);
        creditsButton.smoothed = false;
        
        var creditsText = this.add.text(creditsButton.x + creditsButton.width / 2, creditsButton.y + creditsButton.height / 2, Languages.getText('LBL_CREDITS'), {fill: "yellow", font: "30px pixellari"});
        creditsText.anchor.set(0.5);

        startButton.onInputUp.add(function () {
            _this.state.start("beforePlayState");
        }, this);

        creditsButton.onInputUp.add(function () {
            _this.state.start("creditsState");
        }, this);

        // Language

        var flag = this.add.sprite(this.world.width - 150, 30, 'flags');
        flag.scale.set(scaleFactor);
        flag.smoothed = false;
        flag.inputEnabled = true;
        flag.input.useHandCursor = true;

        if (Languages.currentLang == 'en_us') {
            flag.frame = 1;
        } else {
            flag.frame = 0;
        }

        flag.events.onInputUp.add(function () {
            Languages.switchLanguage();

            if (Languages.currentLang == 'en_us') {
                flag.frame = 1;
            } else {
                flag.frame = 0;
            }

            startText.setText(Languages.getText('LBL_START_GAME'));
            creditsText.setText(Languages.getText('LBL_CREDITS'));

            if (endlessMode) {
                endlessModeText.setText(Languages.getText('LBL_ENDLESS_MODE'));
            }
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

        var style = {fill: '#000000', font: '24px pixellari'};

        var text1 = new Phaser.Text(this.game, 30, 170, Languages.getText('LBL_INTRO1'), style);
        var text2 = new Phaser.Text(this.game, 30, text1.y + 50, Languages.getText('LBL_INTRO2'), style);

        var text3 = new Phaser.Text(this.game, 600, 50, Languages.getText('LBL_INTRO3'), style);
        var text4 = new Phaser.Text(this.game, text3.x - 80, text3.y + 80, Languages.getText('LBL_INTRO4'), style);
        var text5 = new Phaser.Text(this.game, text4.x + 30, text4.y + 110, Languages.getText('LBL_INTRO5'), style);

        var text6 = new Phaser.Text(this.game, 120, 15, Languages.getText('LBL_INTRO6'), style);
        var text7 = new Phaser.Text(this.game, 150, text6.y + 70, Languages.getText('LBL_INTRO7'), style);
        var text8 = new Phaser.Text(this.game, 85, 245, Languages.getText('LBL_INTRO8'), style);

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

        this.game.add.existing(text1);
        this.game.add.existing(text2);

        story1.events.onInputDown.add(function () {
            story1.kill();
            text1.kill();
            text2.kill();

            this.game.add.existing(story2);
            this.game.add.existing(text3);
            this.game.add.existing(text4);
            this.game.add.existing(text5);

            game.add.tween(story2).to({ alpha: 1 }, Phaser.Second, "Linear", true);
        }, this);

        story2.events.onInputDown.add(function () {
            story2.kill();
            text3.kill();
            text4.kill();
            text5.kill();

            this.game.add.existing(story3);
            this.game.add.existing(text6);
            this.game.add.existing(text7);
            this.game.add.existing(text8);

            game.add.tween(story3).to({ alpha: 1 }, Phaser.Second, "Linear", true);
        }, this);

        story3.events.onInputDown.add(function () {
            story3.kill();
            text6.kill();
            text7.kill();
            text8.kill();

            this.state.start("gameState");
        }, this);
    }
},

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

        this.add.text(centerX, centerY - 140, Languages.getText("LBL_TITLE_GAME"), {fill: "white", font: "50px pixellari"}).anchor.set(0.5, 0.5);
        
        this.add.text(centerX, centerY - 60, Languages.getText("LBL_GAME_DESIGNERS"), {fill: "white", font: "24px pixellari"}).anchor.set(0.5, 0.5);
        this.add.text(centerX, centerY - 35, Languages.getText("LBL_PROGRAMMER"), {fill: "white", font: "24px pixellari"}).anchor.set(0.5, 0.5);
        this.add.text(centerX, centerY - 10, Languages.getText("LBL_ARTIST"), {fill: "white", font: "24px pixellari"}).anchor.set(0.5, 0.5);

        this.add.text(centerX, centerY + 40, Languages.getText("LBL_FONT_CREDITS"), {fill: "white", font: "20px pixellari"}).anchor.set(0.5, 0.5);
        this.add.text(centerX, centerY + 60, Languages.getText("LBL_MUSIC_CREDITS"), {fill: "white", font: "20px pixellari"}).anchor.set(0.5, 0.5);

        var exitButton = this.add.button(credits.x + 50, credits.height - 100, 'button');
        exitButton.scale.set(scaleFactor);
        exitButton.smoothed = false;

        var backText = this.add.text(exitButton.x + exitButton.width / 2, exitButton.y + exitButton.height / 2, Languages.getText("LBL_RETURN_TO_MENU"), {fill: "yellow", font: "30px pixellari"}).anchor.set(0.5, 0.5);

        exitButton.onInputUp.add(function () {
            _this.state.start("menuState");
        }, this);
    },

    update : function() {

    }
}