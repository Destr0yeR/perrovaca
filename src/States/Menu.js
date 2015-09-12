SDD.Menu = function(game) {};

SDD.Menu.prototype = {
	create: function() {
		this.add.sprite(0, 0, 'background_main');
		this.startButton = this.add.button( _screen.width/2 - 60, 440, 'button_start', this.startGame, this, 1, 0, 2);
		this.startButton = this.add.button( _screen.width/2 + 195, 470, 'button_credit', this.creditsGame, this, 1, 0, 2);
	},
	startGame: function() {
		this.game.state.start('Howto');
	},
	creditsGame: function() {
		console.log('credits');
	}
};