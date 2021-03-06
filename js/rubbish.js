Rubbish = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'rubbish');

    this.inputEnabled = true;
    this.input.enableDrag(true, true);
    this.input.useHandCursor = true;

    var _this = this;

    this.moneyReward = 5;
    this.initialX = this.x;
    this.initialY = this.y;
    this.alpha = 0;

    this.scale.set(scaleFactor);
    this.smoothed = false;
    this.frame = gameState.rnd.integerInRange(0, 7);

    this.enableBody = true;

    this.events.onDragStart.add(this.onDragStart, this);
    this.events.onDragStop.add(this.onDragStop, this);
    this.beingDrag = false;

    game.physics.arcade.enable(this);

    gameState.add.tween(this).to({alpha: 1}, Phaser.Timer.SECOND / 2, Phaser.Easing.Linear.None, true);
};

Rubbish.prototype = Object.create(Phaser.Sprite.prototype);
Rubbish.prototype.constructor = Rubbish;

Rubbish.prototype.update = function() {
    if (!this.alive) {
        this.destroy();
    }
};

Rubbish.prototype.onDragStart = function() {
    this.beingDrag = true;

    if (Tutorial.getCurrentOption() == 'rubbish') {
        Tutorial.update('rubbish');
    }
}

Rubbish.prototype.onDragStop = function() {
    this.beingDrag = false;

    var overlap = game.physics.arcade.overlap(this, gameState.trashGroup, this.checkCollision, null, this);

    if (!overlap) {
        this.x = this.initialX;
        this.y = this.initialY;
    }

    if (Tutorial.getCurrentOption() == 'rubbish') {
        Tutorial.update('rubbish');
    }
}

Rubbish.prototype.checkCollision = function(rubbish, trash) {
    if (trash.bought && !trash.isInCooldown) {
        this.kill();
        Tutorial.removeFromRead('rubbish');
        AudioManager.getSound('trash').play();

        var distance = game.physics.arcade.distanceToXY(trash, this.initialX, this.initialY);

        trash.startCooldown(distance);

        gameState.money += this.moneyReward;
        levels[gameState.currentLevel].rubbishCleaned++;
        levels[gameState.currentLevel].moneySpent += this.moneyReward;
    } else {
        this.x = this.initialX;
        this.y = this.initialY;
    }
}