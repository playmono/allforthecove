gameState = {
	personsGroup : null,

	preload: function() {
		// Just to debug FPS
		this.time.advancedTiming = true;

		this.load.image('background', 'assets/beach.png');

		this.game.load.spritesheet('catknight', 'assets/knight.png', 100, 100);
	},

	create: function() {
		background = this.add.image(0, 0, 'background').scale.set(scaleFactor);
		background.smoothed = false;

		this.personsGroup = this.add.group();
		this.time.events.loop(Phaser.Timer.SECOND * 2, this.generatePerson, this, 1);
	},

	update: function() {

	},

	render: function() {
		if (debug) {
			this.game.debug.text('FPS: ' + this.time.fps, gameWidth - 100, 50, {fill: "white", fontSize: 24});
		}
	},

	generatePerson : function() {
		var knight = this.personsGroup.create(510, -50, "catknight");
		knight.scale.x *= -1;

		knight.animations.add('idle', [0, 1, 2, 3], 8, true);

		knight.animations.play('idle');

		a =this.add.tween(knight).to( { y: 130 }, 2000, Phaser.Easing.Linear.None, true);

		arr = [-500, 500];
		x = arr[this.game.rnd.integerInRange(0, 1)];

		b =this.add.tween(knight).to( { x: x }, 2000, Phaser.Easing.Linear.None);
	
		a.chain(b);
	}
}