gameState = {
	difficulty : 20,
	beachSlotsPositions : {
		x : [195, 240, 380, 425, 575, 620, 765, 810],
		y : [220, 260, 300],
	},
	personsGroup : null,
	beachSlostsGroup : null,
	beachSlots : [],
	towel : null,
	test : null,

	preload: function() {
		// Just to debug FPS
		this.time.advancedTiming = true;

		this.load.image('background', 'assets/beach.png');

		this.game.load.spritesheet('catknight', 'assets/knight.png', 100, 100);
	},

	create: function() {
		var _this = this;

		background = this.add.image(0, 0, 'background').scale.set(scaleFactor);
		background.smoothed = false;

		this.personsGroup = this.add.group();
		this.beachSlostsGroup = this.add.group();

		var way = true;

		this.beachSlotsPositions.x.forEach(function(x) {
			way = !way;

			_this.beachSlotsPositions.y.forEach(function(y) {
				item = {x: x, y: y, taken : false, way: way};
				_this.beachSlots.push(item);
			});
		});

		this.time.events.loop(Phaser.Timer.SECOND * 5 / this.difficulty, function() {
			person = new Person(game);
			_this.personsGroup.add(person);
		}, this, 1);
	},

	update: function() {

	},

	render: function() {
		if (debug) {
			this.game.debug.text('FPS: ' + this.time.fps, gameWidth - 200, 50);
			
			this.game.debug.text('Beach Slots: ' + this.beachSlots.length, gameWidth - 200, 70);

			if (this.test !== null) {
				this.game.debug.text('Way: ' + this.test.way, gameWidth - 200, 130);
			}
		}
	},

	getUntakenBeachSlot: function() {
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
	}
}