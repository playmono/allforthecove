Chiringuito = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, "catknight");

	this.animations.add('idle', [0, 1, 2, 3], 8, true);

	this.animations.play('idle');
};

Chiringuito.prototype = Object.create(Phaser.Sprite.prototype);
Chiringuito.prototype.constructor = Chiringuito;

Chiringuito.prototype.update = function() {

};