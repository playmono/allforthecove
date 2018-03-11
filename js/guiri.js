Guiri = function (game) {
	var i = gameState.rnd.integerInRange(1, 8);

    Phaser.Sprite.call(this, game, this.initialPosition.x, this.initialPosition.y, 'guiri' + i);

    this.smoothed = false;

	this.animations.add('down', [0, 1, 2, 3], 6, true);
	this.animations.add('up', [4, 5, 6, 7], 6, true);
	this.animations.add('swim', [8, 9, 10, 11], 6, true);
	this.animations.add('lay', [12]);

	this.animations.play('down');

	this.scale.set(scaleFactor);

	gameState.getUntakenBeachSlot(this);

	this.fromCityToMainPath();
};

Guiri.prototype = Object.create(Phaser.Sprite.prototype);
Guiri.prototype.constructor = Guiri;
Guiri.prototype.beachSlot = null;
Guiri.prototype.waterSlot = null;
Guiri.prototype.chiringuito = null;
Guiri.prototype.initialPosition = {x :445, y : -50};
Guiri.prototype.item = null;
Guiri.prototype.swimmingCounter = 0;
Guiri.prototype.buyCounter = 0;

Guiri.prototype.update = function() {

};

Guiri.prototype.fromCityToMainPath = function() {
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
				y: '+40',
				x: _this.x + offsetX
			}, 1000 / gameState.difficulty, Phaser.Easing.Circular.None, true);
		} else {
			movingRoute2.to({
				y: _this.initialPosition.y
			}, 2000 / gameState.difficulty, Phaser.Easing.Linear.None, true);
		}
	});

	movingTransition1.onComplete.add(function() {
		_this.fromMainPathToTowel();
		//_this.fromMainPathToChiringuito();
	});

	movingRoute2.onComplete.add(function() {
		_this.destroy();
	});

	movingRoute1.start();
}

Guiri.prototype.fromMainPathToTowel = function() {
	var _this = this;

	var movingRoute2 = game.add.tween(this);
	var movingTransition2 = gameState.add.tween(this);
	var movingRoute3 = gameState.add.tween(this);
	var movingTransition3 = gameState.add.tween(this);
	var movingRoute4 = gameState.add.tween(this);

	var finalPoint = this.beachSlot.x + this.getTowelOffsetX(false);
	var time = Phaser.Math.difference(finalPoint, _this.x) * 20;

	if (_this.beachSlot.x > _this.x) {
		finalPoint -= 30;
	} else {
		finalPoint += 30;
	}

	movingRoute2.to({
		x: finalPoint,
	}, time / gameState.difficulty, Phaser.Easing.Linear.None);

	// Start transition to movement 2
	movingRoute2.onComplete.add(function() {
		movingTransition2.to({
			x: _this.beachSlot.x + _this.getTowelOffsetX(false),
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
		_this.layOnTowel();
	});

	movingRoute2.start();
}

Guiri.prototype.fromTowelToWater = function() {
	var _this = this;

	this.animations.play('down');

	var movingRoute1 = gameState.add.tween(this);
	var movingRoute2 = gameState.add.tween(this);
	var movingRoute3 = gameState.add.tween(this);

	movingRoute1.to({
		x: _this.beachSlot.x + _this.getTowelOffsetX(false)
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
		_this.swimming();
		//_this.fromWaterToTowel();
	});
}

Guiri.prototype.fromWaterToTowel = function() {
	var _this = this;

	this.animations.play('up');

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
		_this.layOnTowel();

		//_this.moveToInitialPosition();
		//_this.fromTowelToMainPath(_this.fromMainPathToCity());
	});
}

Guiri.prototype.getTowelOffsetX = function(revert) {
	if (!revert) {
		return this.beachSlot.titleX == 'right' ? 20 : -20;
	} else {
		return this.beachSlot.titleX == 'right' ? -20 : 20;
	}
}

Guiri.prototype.fromTowelToCity = function() {
	var _this = this;

	this.animations.play('up');

	this.item.destroy();

	var movingRoute1 = gameState.add.tween(this);
	var movingRoute2 = gameState.add.tween(this);
	var movingTransition1 = gameState.add.tween(this);
	var movingRoute3 = gameState.add.tween(this);

	movingRoute1.to({
		x: _this.beachSlot.x + _this.getTowelOffsetX(false)
	}, 2000 / gameState.difficulty, Phaser.Easing.Linear.None);

	movingRoute1.onComplete.add(function() {
		_this.beachSlot.taken = false;

		movingRoute2.to({
			y: 165
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


Guiri.prototype.fromTowelToChiringuito = function() {
	var _this = this;

	this.animations.play('up');

	var movingRoute1 = gameState.add.tween(this);
	var movingRoute2 = gameState.add.tween(this);
	var movingTransition1 = gameState.add.tween(this);
	var movingRoute3 = gameState.add.tween(this);

	movingRoute1.to({
		x: _this.beachSlot.x + _this.getTowelOffsetX(false)
	}, 2000 / gameState.difficulty, Phaser.Easing.Linear.None);

	movingRoute1.onComplete.add(function() {
		movingRoute2.to({
			y: 165
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
		_this.fromMainPathToChiringuito();
	});

	movingRoute1.start();
}

Guiri.prototype.fromMainPathToCity = function() {
	var _this = this;

	this.animations.play('up');

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

	if (this.chiringuito == null) {
		return;
	} else {
		var movingRoute1 = gameState.add.tween(this);
		var time = Phaser.Math.difference(this.chiringuito.x + 60, this.x) * 20;

		movingRoute1.to({
			x: _this.chiringuito.x + 60,
			y: _this.chiringuito.y + 100
		}, time / gameState.difficulty, Phaser.Easing.Linear.None, true);
	}
}

Guiri.prototype.swimming = function() {
	var _this = this;

	this.swimmingCounter++;

	this.animations.play('swim');

	var rnd = gameState.rnd.integerInRange(4, 15);

	game.time.events.add(Phaser.Timer.SECOND * rnd, function () {
		_this.fromWaterToTowel();
	}, this);
}

Guiri.prototype.layOnTowel = function() {
	var _this = this;

	_this.animations.play('lay');

	if (this.item == null) {
		this.item = gameState.add.sprite(this.beachSlot.x, this.beachSlot.y, 'towel');

		gameState.itemsGroup.add(_this.item);
		this.item.scale.set(scaleFactor);

		var i = gameState.rnd.integerInRange(0, 7);
		this.item.animations.add('idle', [i], 0, false);
		this.item.animations.play('idle');
	}

	var rnd = gameState.rnd.integerInRange(4, 15);

	game.time.events.add((Phaser.Timer.SECOND * rnd) / gameState.difficulty, function () {
		// GET A CHIRINGUITO BRO!!!
		gameState.getUntakenChiringuito(_this);

		if (_this.chiringuito == null) {
			var swimProbability = gameState.rnd.integerInRange(0, 100);
			var buyProbability = gameState.rnd.integerInRange(0, 100);

			if (swimProbability > (75 - _this.swimmingCounter * 20) && _this.swimmingCounter <= 3) {
				_this.fromTowelToWater();
			} else {
				_this.fromTowelToCity();
			}
		} else {
			_this.fromTowelToChiringuito();
		}
	}, this);
}





