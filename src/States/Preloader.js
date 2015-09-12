SDD.Preloader = function(game) {};

SDD.Preloader.prototype = {
    preload: function() {
        this.game.stage.backgroundColor = '#16181a';
        this.load.spritesheet('rat', 'assets/rat.png', 32 , 32;
    },
    
    create: function() {

        this.game.state.start('MainMenu');
    }


};