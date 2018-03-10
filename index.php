<!doctype html> 
<html lang="en"> 
<head> 
	<meta charset="UTF-8" />
	<title>All for the Cove</title>
    <style type="text/css">
        canvas {
            margin: 10px auto 0px auto;
        }
    </style>
</head>
<body>

<script src="js/phaser.min.js"></script>
<script src="js/person.js"></script>
<script src="js/menu.js"></script>
<script src="js/game.js"></script>

<script>
(function() {
	<?php if (array_key_exists('d', $_GET)) { ?>
	debug = true;
	<?php } else { ?>
	debug = false;
	<?php } ?>

	scaleFactor = 2;
	gameWidth = 480 * scaleFactor;
	gameHeight = 270 * scaleFactor;

	game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, '');
	game.state.add("menuState", menuState);
	game.state.add("gameState", gameState);
	game.state.add("howToPlayState", howToPlayState);
	game.state.add("creditsState", creditsState);

	if (debug) {
		game.state.start("gameState");
	} else {
		game.state.start("menuState");
	}
})();
</script>

</body>
</html>