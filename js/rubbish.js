Rubbish = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'rubbish');

    this.inputEnabled = true;
    this.input.enableDrag(true);

    gameState.world.bringToTop(this);

    var _this = this;

    this.initialX = this.x;
    this.initialY = this.y;
    this.isDragging = false;

    this.scale.set(scaleFactor);
    this.smoothed = false;

    var i = gameState.rnd.integerInRange(0, 7);
    this.animations.add('idle', [i], 0, false);
    this.animations.play('idle');

    this.enableBody = true;

    this.events.onDragStop.add(this.onDragStop, this);

    game.physics.arcade.enable(this);
};

Rubbish.prototype = Object.create(Phaser.Sprite.prototype);
Rubbish.prototype.constructor = Rubbish;

Rubbish.prototype.update = function() {

};

Rubbish.prototype.onDragStop = function() {
    game.physics.arcade.overlap(this, gameState.trashGroup, this.checkCollision, null, this)
}

Rubbish.prototype.checkCollision = function(rubbish, trash) {
    if (trash.bought && !trash.isInCooldown) {
        this.destroy();

        trash.startCooldown();
    } else {
        this.x = this.initialX;
        this.y = this.initialY;
    }
}