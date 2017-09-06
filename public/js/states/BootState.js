//Boot state for Heli Escape game
//Written by Ben Hughey
var BootState = {
    
    //initiate game settings
    init: function() {
        //adapt to screen size, fit all the game
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
    },
        
    preload: function() {
        //load image for status bar
        this.load.image('preloadBar', 'assets/images/bar.png');
        //possibly add logo to display while loading later
        
    },
    create: function() {
        //background colour set to black
        this.game.stage.backgroundColor = "#000";
        
        //Moves to preload state once finished
        this.state.start("PreloadState");
        
    }
    
};