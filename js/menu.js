menuState = {
    preload: function() {
    },

    create : function() {
        var _this = this;

        this.add.text(300, 100, "All for the Cove", {fill: "white", fontSize: 50});

        var startGameText = this.add.text(120, 200, "Empezar Juego", {fill: "white", fontSize: 50});
        var howtoPlayText = this.add.text(120, 300, "Cómo jugar", {fill: "white", fontSize: 50});
        var creditsText = this.add.text(120, 400, "Credits", {fill: "white", fontSize: 50});

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

        this.add.text(50, 100, "All for the Cove", {fill: "white", fontSize: 50});
        this.add.text(50, 170, "Game Design: Noé Fernández", {fill: "white", fontSize: 24});
        this.add.text(50, 200, "Programmer: Adrián Granado", {fill: "white", fontSize: 24});
        this.add.text(50, 230, "Artist: Noé Fernández", {fill: "white", fontSize: 24});
    
        var backText = this.add.text(50, 400, "Volver a Menú", {fill: "white", fontSize: 24});
        
        backText.inputEnabled = true;

        backText.events.onInputDown.add(function () {
            _this.state.start("menuState");
        }, this);
    },

    update : function() {

    }
}