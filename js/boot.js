bootState = {
	preload : function() {
		this.game.load.spritesheet('loading', 'assets/loading.png', 150, 50);
	},

	create : function() {
		this.state.start("menuState");
	}
}