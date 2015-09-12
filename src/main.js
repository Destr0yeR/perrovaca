var game = new Phaser.Game(screenDimentions.width, screenDimentions.height, Phaser.AUTO, 'game-content');

game.state.add('Boot', SDD.Boot);
//game.state.add('Preloader', SDD.Preloader);
//game.state.add('MainMenu', SDD.Menu);
//game.state.add('HowTo', SDD.HowTo);
game.state.add('Game', SDD.Game);

game.state.start('Boot');