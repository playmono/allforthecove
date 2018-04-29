gameState = {
	difficulty : 1,
	money: 10000,
	moneyText : null,
	fame : 0,
	trashCost : 50,
	baywatcherCost : 300,

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
		{x: 510, y: 10, name: 'chiringuito3'},
		{x: 670, y: 10, name: 'chiringuito4'}
	],
	trashSlots: [
		{x: 130, y: 215},
		{x: 240, y: 135},
		{x: 330, y: 215},
		{x: 425, y: 320},
		{x: 520, y: 215},
		{x: 640, y: 135},
		{x: 715, y: 215},
	],
	baywatchersSlot: [
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
	guirisGroup : null,
	chiringuitosGroup : null,
	trashGroup: null,
	baywatchersGroup: null,
	itemsGroup: null,
	test : null,

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
		//this.game.load.spritesheet('chiringuito', 'assets/chiringuito.png', 81, 80);
		this.game.load.spritesheet('chiringuito1', 'assets/chiringuito1.png', 80, 80);
		this.game.load.spritesheet('chiringuito2', 'assets/chiringuito2.png', 81, 80);
		this.game.load.spritesheet('chiringuito3', 'assets/chiringuito3.png', 80, 80);
		this.game.load.spritesheet('chiringuito4', 'assets/chiringuito4.png', 80, 80);
		this.game.load.spritesheet('trash', 'assets/trash.png', 33, 29);
		//this.game.load.spritesheet('baywatcher', 'assets/baywatcher.png', 46, 74);
		this.game.load.spritesheet('baywatcher1', 'assets/baywatcher1.png', 46, 74);
		this.game.load.spritesheet('baywatcher2', 'assets/baywatcher2.png', 46, 74);
		this.game.load.spritesheet('baywatcher3', 'assets/baywatcher3.png', 46, 74);
		this.game.load.spritesheet('towel', 'assets/towels.png', 17, 33);
		this.game.load.spritesheet('splash', 'assets/splash.png', 50, 50);
		this.game.load.spritesheet('rubbish', 'assets/rubbish.png', 20, 20);
		this.game.load.spritesheet('icons', 'assets/icons.png', 16, 16);

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

		this.moneyText = this.game.add.text(20, 20);
		this.moneyText.setStyle({fill: '#FFFFFF', fontSize: 16});

		this.itemsGroup = this.add.group();
		this.chiringuitosGroup = this.add.group();
		this.trashGroup = this.add.group();
		this.rubbishGroup = this.add.group();
		this.guirisGroup = this.add.group();
		this.baywatchersGroup = this.add.group();

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

		var chiringuitoActive = false;
		this.chiringuitoSlots.forEach(function(chiringuito) {
			var chiringuito = new Chiringuito(game, chiringuito.x, chiringuito.y, chiringuito.name);

			if (!chiringuitoActive) {
				chiringuito.buy(true);
				chiringuitoActive = true;
			}

			_this.chiringuitosGroup.add(chiringuito);
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

		this.baywatchersSlot.forEach(function(baywatcher) {
			var baywatcher = new Baywatcher(game, baywatcher.x, baywatcher.y, baywatcher.name);
			_this.baywatchersGroup.add(baywatcher);
		});
		/*
		this.rubbishZones.forEach(function(rubbish) {
			var rubbish = new Rubbish(game, rubbish.x, rubbish.y);
			_this.rubbishGroup.add(rubbish);
		});
		*/

		// Rubbish Generation
		this.time.events.loop(Phaser.Timer.SECOND * 10 / this.difficulty, function() {
			var proportion = 4/24;
			var countGuiris = _this.guirisGroup.length;	
			var totalRubbishCount = Math.floor(countGuiris * proportion);

			console.log(totalRubbishCount);

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
			
			this.game.debug.text('Rubbish generated: ' + this.rubbishGroup.length, gameWidth - 250, 40);

			if (this.test !== null) {
				this.game.debug.text('Way: ' + this.test.way, gameWidth - 200, 130);
			}

			this.guirisGroup.forEach(function(guiri) {
				this.game.debug.text('Happiness: ' + guiri.happiness, guiri.centerX, guiri.centerY);
				//this.game.debug.body(guiri);
			});
		}

		this.moneyText.setText('Dinero: ' + this.money);

		this.game.debug.text('Fama: ' + this.fame, 20, 70);
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

			notTaken.push(chiringuito);
		});

		if (notTaken.length == 0) {
			return null;
		}

		var chiringuito = notTaken[Math.floor(Math.random() * notTaken.length)];
		chiringuito.taken = true;

		return chiringuito;
	}
}