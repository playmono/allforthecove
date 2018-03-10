Guiri = function (game) {
    Phaser.Sprite.call(this, game, this.initialPosition.x, this.initialPosition.y, "catknight");

	this.scale.x *= -1;

	this.animations.add('idle', [0, 1, 2, 3], 8, true);

	this.animations.play('idle');

	gameState.getUntakenBeachSlot(this);

	this.fromStartToPath();
};

Guiri.prototype = Object.create(Phaser.Sprite.prototype);
Guiri.prototype.constructor = Guiri;
Guiri.prototype.beachSlot = null;
Guiri.prototype.initialPosition = {
	x :510,
	y : -50
}

Guiri.prototype.update = function() {

};

Guiri.prototype.fromStartToPath = function() {
	var _this = this;

	var movingRoute1 = gameState.add.tween(this);
	var movingTransition1 = gameState.add.tween(this);
	var movingRoute2 = gameState.add.tween(this);

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
			movingRoute2.to({
				y: _this.initialPosition.y
			}, 2000 / gameState.difficulty, Phaser.Easing.Linear.None, true);
		}
	});

	movingTransition1.onComplete.add(function() {
		_this.fromPathToTowel();
	});

	movingRoute2.onComplete.add(function() {
		_this.destroy();
	});

	movingRoute1.start();
}

Guiri.prototype.fromPathToTowel = function() {
	var _this = this;

	var movingRoute2 = game.add.tween(this);
	var movingTransition2 = gameState.add.tween(this);
	var movingRoute3 = gameState.add.tween(this);
	var movingTransition3 = gameState.add.tween(this);
	var movingRoute4 = gameState.add.tween(this);

	var finalPoint = this.beachSlot.x + this.getTowelOffsetX(true);
	var time = Phaser.Math.difference(finalPoint, _this.x) * 20;

	if (_this.beachSlot.x > _this.x) {
		finalPoint -= 20;
	} else {
		finalPoint +=20;
	}

	movingRoute2.to({
		x: finalPoint
	}, time / gameState.difficulty, Phaser.Easing.Linear.None);

	// Start transition to movement 2
	movingRoute2.onComplete.add(function() {
		movingTransition2.to({
			x: _this.beachSlot.x + _this.getTowelOffsetX(true),
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

	movingRoute4.onComplete.add(function() {
		//_this.moveToInitialPosition();
		_this.fromTowelToMainPath();
	});

	movingRoute2.start();

}
/*
Guiri.prototype.moveToInitialPosition = function() {
	var _this = this;

	var movingRoute1 = gameState.add.tween(this);
	var movingRoute2 = gameState.add.tween(this);
	var movingTransition1 = gameState.add.tween(this);
	var movingTransition2 = gameState.add.tween(this);
	var movingRoute3 = gameState.add.tween(this);
	var movingTransition3 = gameState.add.tween(this);
	var movingRoute4 = gameState.add.tween(this);

	this.fromTowelToMainPath();

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
*/
Guiri.prototype.fromTowelToWater = function() {
	var _this = this;

	var movingRoute1 = gameState.add.tween(this);
	var movingRoute2 = gameState.add.tween(this);
	var movingRoute3 = gameState.add.tween(this);

	movingRoute1.to({
		x: _this.beachSlot.x + _this.getTowelOffsetX(true)
	}, 2000 / gameState.difficulty, Phaser.Easing.Linear.None, true);

	// GET A WATER SLOT BRO !!!
	gameState.getUntakenWaterSlot(this);

	movingRoute1.onComplete.add(function() {
		movingRoute2.to({
			y: 350,
		}, 2000 / gameState.difficulty, Phaser.Easing.Linear.None, true);
	});

	movingRoute2.onComplete.add(function() {
		movingRoute3.to({
			y: _this.waterSlot.y,
			x: _this.waterSlot.x
		}, 2000 / gameState.difficulty, Phaser.Easing.Linear.None, true);
	});

	movingRoute3.onComplete.add(function() {
		_this.fromWaterToTowel();
	})
}

Guiri.prototype.fromWaterToTowel = function() {
	var _this = this;

	var movingRoute1 = gameState.add.tween(this);
	var movingRoute2 = gameState.add.tween(this);
	var movingRoute3 = gameState.add.tween(this);

	this.waterSlot.taken = false;

	movingRoute1.to({
		x: _this.beachSlot.x + _this.getTowelOffsetX(true),
		y: 350
	}, 2000 / gameState.difficulty, Phaser.Easing.Linear.None, true);

	movingRoute1.onComplete.add(function() {
		movingRoute2.to({
			y: _this.beachSlot.y,
		}, 2000 / gameState.difficulty, Phaser.Easing.Linear.None, true);
	});

	movingRoute2.onComplete.add(function() {
		movingRoute3.to({
			x: _this.beachSlot.x,
		}, 2000 / gameState.difficulty, Phaser.Easing.Linear.None, true);
	});

	movingRoute3.onComplete.add(function() {
		_this.moveToInitialPosition();
	});
}

Guiri.prototype.getTowelOffsetX = function(revert) {
	if (revert) {
		return this.beachSlot.titleX == 'right' ? 20 : -30;
	} else {
		return this.beachSlot.titleX == 'right' ? -30 : 20;
	}
}

Guiri.prototype.fromTowelToMainPath = function() {
	var _this = this;

	var movingRoute1 = gameState.add.tween(this);
	var movingRoute2 = gameState.add.tween(this);
	var movingTransition1 = gameState.add.tween(this);
	var movingRoute3 = gameState.add.tween(this);

	movingRoute1.to({
		x: _this.beachSlot.x + _this.getTowelOffsetX(true)
	}, 2000 / gameState.difficulty, Phaser.Easing.Linear.None);

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
		_this.fromMainPathToCity();
	});

	movingRoute1.start();
}

Guiri.prototype.fromMainPathToCity = function() {
	var _this = this;

	var movingRoute1 = gameState.add.tween(this);
	var movingTransition1 = gameState.add.tween(this);
	var movingRoute2 = gameState.add.tween(this);

	var time = Phaser.Math.difference(_this.initialPosition.x, _this.x) * 20;
	var finalPoint = _this.initialPosition.x;

	if (_this.initialPosition.x > _this.x) {
		finalPoint -= 20;
	} else {
		finalPoint +=20;
	}

	movingRoute1.to({
		x: finalPoint
	}, time / gameState.difficulty, Phaser.Easing.Linear.None, true);

	movingRoute1.onComplete.add(function() {
		movingTransition1.to({
			y: 100,
			x: _this.initialPosition.x
		}, 1000 / gameState.difficulty, Phaser.Easing.Linear.None, true);
	});

	movingTransition1.onComplete.add(function() {
		movingRoute2.to({
			y: _this.initialPosition.y
		}, 2000 / gameState.difficulty, Phaser.Easing.Linear.None, true);
	});

	// Back to city
	movingRoute2.onComplete.add(function() {
		_this.destroy();
	});
}

Guiri.prototype.fromMainPathToChiringuito = function() {
	var _this = this;

	var movingRoute1 = gameState.add.tween(this);
}





