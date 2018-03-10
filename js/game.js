gameState = {
	difficulty : 2,

	beachSlots : [
		{squareIndex: 1, titleY: 'top', titleX: 'left', x: 195, y: 220, taken: false},
		{squareIndex: 1, titleY: 'middle', titleX: 'left', x: 195, y: 260, taken: false},
		{squareIndex: 1, titleY: 'bottom', titleX: 'left', x: 195, y: 300, taken: false},
		{squareIndex: 1, titleY: 'top', titleX: 'right', x: 240, y: 220, taken: false},
		{squareIndex: 1, titleY: 'middle', titleX: 'right', x: 240, y: 260, taken: false},
		{squareIndex: 1, titleY: 'bottom', titleX: 'right', x: 240, y: 300, taken: false},

		{squareIndex: 2, titleY: 'top', titleX: 'left', x: 380, y: 220, taken: false},
		{squareIndex: 2, titleY: 'middle', titleX: 'left', x: 380, y: 260, taken: false},
		{squareIndex: 2, titleY: 'bottom', titleX: 'left', x: 380, y: 300, taken: false},
		{squareIndex: 2, titleY: 'top', titleX: 'right', x: 425, y: 220, taken: false},
		{squareIndex: 2, titleY: 'middle', titleX: 'right', x: 425, y: 260, taken: false},
		{squareIndex: 2, titleY: 'bottom', titleX: 'right', x: 425, y: 300, taken: false},

		{squareIndex: 3, titleY: 'top', titleX: 'left', x: 575, y: 220, taken: false},
		{squareIndex: 3, titleY: 'middle', titleX: 'left', x: 575, y: 260, taken: false},
		{squareIndex: 3, titleY: 'bottom', titleX: 'left', x: 575, y: 300, taken: false},
		{squareIndex: 3, titleY: 'top', titleX: 'right', x: 620, y: 220, taken: false},
		{squareIndex: 3, titleY: 'middle', titleX: 'right', x: 620, y: 260, taken: false},
		{squareIndex: 3, titleY: 'bottom', titleX: 'right', x: 620, y: 300, taken: false},

		{squareIndex: 4, titleY: 'top', titleX: 'left', x: 765, y: 220, taken: false},
		{squareIndex: 4, titleY: 'middle', titleX: 'left', x: 765, y: 260, taken: false},
		{squareIndex: 4, titleY: 'bottom', titleX: 'left', x: 765, y: 300, taken: false},
		{squareIndex: 4, titleY: 'top', titleX: 'right', x: 810, y: 220, taken: false},
		{squareIndex: 4, titleY: 'middle', titleX: 'right', x: 810, y: 260, taken: false},
		{squareIndex: 4, titleY: 'bottom', titleX: 'right', x: 810, y: 300, taken: false},
	],
	waterSlots : [],
	chiringuitoSlots: [
		{x: 130, y: 90},
		{x: 320, y: 90},
		{x: 500, y: 90},
		{x: 690, y: 90}
	],
	guirisGroup : null,
	chiringuitosGroup : null,
	towel : null,
	test : null,
	item : null,

	preload: function() {
		// Just to debug FPS
		this.time.advancedTiming = true;

		//this.load.image('background', 'assets/beach.png');
		if (debug) {
			this.game.load.spritesheet('background', 'assets/beach-debug.png', gameWidth / scaleFactor, gameHeight /scaleFactor);
		} else {
			this.game.load.spritesheet('background', 'assets/beach.png', gameWidth / scaleFactor, gameHeight /scaleFactor);
		}

		this.difficulty = velocity;

		this.game.load.spritesheet('catknight', 'assets/knight.png', 100, 100);
	},

	create: function() {
		var _this = this;

		//background = this.add.image(0, 0, 'background').scale.set(scaleFactor);
		
		var background = this.game.add.sprite(0, 0, 'background');
		background.scale.set(scaleFactor);
		background.smoothed = false;

		background.animations.add('idle', [0, 1, 2, 3, 4, 5], 5, true);
		background.animations.play('idle');

		this.chiringuitosGroup = this.add.group();
		this.guirisGroup = this.add.group();

		var waterPositionY = 400;
		var waterSlotsPositionsX = 60;

		for (i = 0; i < 24; i++) {
			waterSlotsPositionsX += 35;
			waterPositionY = waterPositionY == 400 ? 440 : 400;

			_this.waterSlots.push({
				x: waterSlotsPositionsX,
				y: waterPositionY,
				// y: _this.game.rnd.integerInRange(400, 440),
				taken: false
			})
		}

		this.time.events.loop(Phaser.Timer.SECOND * 5 / this.difficulty, function() {
			var guiri = new Guiri(game);
			_this.guirisGroup.add(guiri);
		}, this, 1);

		this.chiringuitoSlots.forEach(function(chiringuito) {
			var chiringuito = new Chiringuito(game, chiringuito.x, chiringuito.y);	
			_this.chiringuitosGroup.add(chiringuito);
		});
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
			
			this.game.debug.text('Free Beach Slots: ' + notTaken.length, gameWidth - 250, 40);

			if (this.test !== null) {
				this.game.debug.text('Way: ' + this.test.way, gameWidth - 200, 130);
			}
		}
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

		guiri.beachSlot = beachSlot;
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

		guiri.waterSlot = waterSlot;
	}
}