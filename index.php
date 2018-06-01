<!doctype html> 
<html lang="en"> 
<head> 
    <meta charset="UTF-8" />
    <title>All for the Cove</title>
    <style type="text/css">
        body {
            background-color: black;
        }
        canvas {
            margin: 50px auto;
        }
        @font-face {
            font-family: 'pixellari';
            font-style: 'normal';
            src: url('fonts/pixellari.ttf');
            font-weight: 100;
        }
    </style>
</head>
<body>

<script src="lib/phaser.min.js"></script>
<script src="js/guiri.js"></script>
<script src="js/chiringuito.js"></script>
<script src="js/baywatcher.js"></script>
<script src="js/trash.js"></script>
<script src="js/rubbish.js"></script>
<script src="js/menu.js"></script>
<script src="js/game.js"></script>

<p style="font-family: pixellari;">.</p>

<script>
(function() {
    <?php if (array_key_exists('d', $_GET)) { ?>
    debug = true;
    <?php } else { ?>
    debug = false;
    <?php } ?>  

    <?php if (array_key_exists('v', $_GET)) { ?>
    velocity = <? echo $_GET['v']; ?>;
    <?php } else { ?>
    velocity = 1;
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