Person = function (game) {
    Phaser.Sprite.call(this, game, this.initialPosition.x, this.initialPosition.y, "catknight");

    var	_this = this;

	this.scale.x *= -1;

	this.animations.add('idle', [0, 1, 2, 3], 8, true);

	this.animations.play('idle');

	var untakenBeachSlot = gameState.getUntakenBeachSlot();

	if (untakenBeachSlot !== null) {
		this.beachSlot = untakenBeachSlot;
	}

	this.moveToTowel();
};

Person.prototype = Object.create(Phaser.Sprite.prototype);
Person.prototype.constructor = Person;
Person.prototype.beachSlot = null;
Person.prototype.initialPosition = {
	x :510,
	y : -50
}

Person.prototype.update = function() {

};

Person.prototype.moveToTowel = function() {
	var _this = this;

	var movingRoute1 = gameState.add.tween(this);
	var movingTransition1 = gameState.add.tween(this);
	var movingRoute2 = gameState.add.tween(this);
	var movingTransition2 = gameState.add.tween(this);
	var movingRoute3 = gameState.add.tween(this);
	var movingTransition3 = gameState.add.tween(this);
	var movingRoute4 = gameState.add.tween(this);
	var movingRoute5 = gameState.add.tween(this);

	// Come to the beach (+y)
	movingRoute1.to({ y: 100 }, 2000 / gameState.difficulty, Phaser.Easing.Linear.None);

	// Start transition to to movement2
	movingRoute1.onComplete.add(function() {
		if (_this.beachSlot !== null) {
			var offsetX = _this.beachSlot.x > _this.x ? 30 : -30;

			movingTransition1.to({
				y: '+25',
				x: _this.x + offsetX
			}, 1000 / gameState.difficulty, Phaser.Easing.Circular.None, true);
		} else {
			movingRoute5.to({
				y: _this.initialPosition.y
			}, 2000 / gameState.difficulty, Phaser.Easing.Linear.None, true);
		}
	});

	// Start walking between X axis to their path
	movingTransition1.onComplete.add(function() {
		var finalPoint = _this.beachSlot.x + (_this.beachSlot.way ? 20 : -30);
		var time = Phaser.Math.difference(finalPoint, _this.x) * 20;

		if (_this.beachSlot.x > _this.x) {
			finalPoint -= 20;
		} else {
			finalPoint +=20;
		}

		movingRoute2.to({
			x: finalPoint
		}, time / gameState.difficulty, Phaser.Easing.Linear.None, true);
	});

	// Start transition to movement 2
	movingRoute2.onComplete.add(function() {
		movingTransition2.to({
			x: _this.beachSlot.x + (_this.beachSlot.way ? 20 : -30),
			y: '+35'
		}, 1000 / gameState.difficulty, Phaser.Easing.Linear.None, true);
	});

	// Start movement to Towel (Y)
	movingTransition2.onComplete.add(function() {
		movingRoute3.to({
			y: _this.beachSlot.y
		}, 2000 / gameState.difficulty, Phaser.Easing.Linear.None, true);
	});

	// Start movement to Towel (X)
	movingRoute3.onComplete.add(function() {
		movingRoute4.to({
			x: _this.beachSlot.x
		}, 2000 / gameState.difficulty, Phaser.Easing.Linear.None, true);
	});

	// Back to city
	movingRoute5.onComplete.add(function() {
		_this.destroy();
	});

	movingRoute4.onComplete.add(function() {
		_this.moveToInitialPosition();
	});

	movingRoute1.start();
}

Person.prototype.moveToInitialPosition = function() {
	var _this = this;

	var movingRoute1 = gameState.add.tween(this);
	var movingRoute2 = gameState.add.tween(this);
	var movingTransition1 = gameState.add.tween(this);
	var movingTransition2 = gameState.add.tween(this);
	var movingRoute3 = gameState.add.tween(this);
	var movingTransition3 = gameState.add.tween(this);
	var movingRoute4 = gameState.add.tween(this);

	movingRoute1.to({
		x: _this.beachSlot.x + (_this.beachSlot.way ? 20 : -30)
	}, 2000 / gameState.difficulty, Phaser.Easing.Linear.None, true, 10000);

	movingRoute1.onComplete.add(function() {
		_this.beachSlot.taken = false;

		movingRoute2.to({
			y: 150
		}, 2000 / gameState.difficulty, Phaser.Easing.Linear.None, true);
	});

	movingRoute2.onComplete.add(function() {
		var offsetX = _this.initialPosition.x > _this.x ? 30 : -30;

		movingTransition1.to({
			y: '-25',
			x: _this.x + offsetX
		}, 1000 / gameState.difficulty, Phaser.Easing.Linear.None, true);
	});

	movingTransition1.onComplete.add(function() {
		var time = Phaser.Math.difference(_this.initialPosition.x, _this.x) * 20;
		var finalPoint = _this.initialPosition.x;

		if (_this.initialPosition.x > _this.x) {
			finalPoint -= 20;
		} else {
			finalPoint +=20;
		}

		movingRoute3.to({
			x: finalPoint
		}, time / gameState.difficulty, Phaser.Easing.Linear.None, true);
	});

	movingRoute3.onComplete.add(function() {
		movingTransition2.to({
			y: 100,
			x: _this.initialPosition.x
		}, 1000 / gameState.difficulty, Phaser.Easing.Linear.None, true);
	});

	movingTransition2.onComplete.add(function() {
		movingRoute4.to({
			y: _this.initialPosition.y
		}, 2000 / gameState.difficulty, Phaser.Easing.Linear.None, true);
	});

	// Back to city
	movingRoute4.onComplete.add(function() {
		_this.destroy();
	});
}





