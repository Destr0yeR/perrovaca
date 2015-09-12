var SDD = {};

SDD.Boot = function(game) {};

SDD.Boot.prototype = {
    preload: function() {
        
    },
    
    create: function() {

        //this.game.state.start('Preloader');
        this.game.state.start('Game');
    }

    
};