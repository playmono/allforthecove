var Tutorial = {
    initialized: false,
    notepad: null,
    text1: null,
    text2: null,
    style: {
        fill: 'black',
        font: '20px pixellari'
    },
    toRead: [],
    alreadyRead: [],

    init: function() {
        if (this.initialized) {
            return true;
        }

        var x = gameState.world.centerX;
        var y = gameState.world.centerY + 150;

        this.initialized = true;
        this.notepad = gameState.add.sprite(x, y, 'notepad');
        this.notepad.alpha = 0.7;   
        this.notepad.anchor.set(0.5);
        this.notepad.smoothed = false;
        this.notepad.inputEnabled = true;
        this.notepad.input.useHandCursor = true;
        this.notepad.scale.set(scaleFactor);

        gameState.tutorialGroup.add(this.notepad);

        var text1x = this.notepad.position.x - 190;

        this.text1 = gameState.add.text(text1x, y, '', this.style);
        this.text1.anchor.set(0.5);
        gameState.tutorialGroup.add(this.text1);

        var text2x = this.notepad.position.x + 190; 

        this.text2 = gameState.add.text(text2x, y, '', this.style);
        this.text2.anchor.set(0.5);
        gameState.tutorialGroup.add(this.text2);

        var text3x = this.notepad.position.x + 320; 

        this.text3 = gameState.add.text(text3x, y + 15, '', this.style);
        gameState.tutorialGroup.add(this.text3);

        this.notepad.events.onInputDown.add(function () {
            this.removeFromRead();

            if (this.toRead.length < 1) {
                this.hide();
            }
        }, this);

        this.hide();
    },

    add: function(option) {
         this.init();

        if (this.isAlreadyRead(option)) {
            return true;
        }

        this.addToRead(option);

        if (this.notepad.alive) {
            return true;
        }

        this.show(option);
    },

    show: function(option) {
        this.text1.setText(this.getTexts1(option));
        this.text2.setText(this.getTexts2(option));

        this.notepad.revive();
        this.text1.revive();
        this.text2.revive();
    },

    hide: function() {
        this.notepad.kill();
        this.text1.kill();
        this.text2.kill();
        this.text3.kill();
    },

    isAlreadyRead: function(option) {
        var found = false;
        this.alreadyRead.forEach(function(item) {
            if (option == item) {
                found = true;
                return true;
            }
        });

        return found;
    },

    addToRead: function(option) {
        this.toRead.push(option);
        this.alreadyRead.push(option);

        this.text3.revive();
        this.text3.setText('1/' + this.toRead.length);
    },

    removeFromRead: function() {
        this.toRead.shift();
        this.show(this.toRead[0]);

        this.text3.setText('1/' + this.toRead.length);
    },

    getTexts1: function(option) {
        var map = {
            guiri: '¡Hey! Un turista ha llegado a la playa.',
            rubbish: 'Como ves, los turistas no son muy limpios.',
            splash: '¡Qué maleducada es la gente!',
            chiringuito: 'El stock de los chiringuitos se está acabando.',
            buy: 'Si te faltan recursos y te sobra dinero',
            end: 'Al salir de la playa, los turistas',
        };

        if (!map.hasOwnProperty(option)) {
            return '';
        }

        return map[option];
    },

    getTexts2: function(option) {
        var map = {
            guiri: '¡Hey! Un turista ha llegado a la playa.',
            rubbish: 'Como ves, los turistas no son muy limpios.',
            splash: '¡Qué maleducada es la gente!',
            chiringuito: 'El stock de los chiringuitos se está acabando.',
            buy: 'Si te faltan recursos y te sobra dinero',
            end: 'Al salir de la playa, los turistas',
        };

        if (!map.hasOwnProperty(option)) {
            return '';
        }

        return map[option];
    }
}