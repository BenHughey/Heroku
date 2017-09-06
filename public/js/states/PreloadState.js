//State for preloading Heli Escape game assets
//Written by Ben Hughey
var PreloadState = {
    
    preload: function() {
        //Shows us a progress bar in center of screen
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, "preloadBar");
        this.preloadBar.anchor.setTo(0.5);
        this.load.setPreloadSprite(this.preloadBar);
        
        //load images from assets folder (key, filepath)
        this.load.image("ground", "assets/images/ground.png");
        this.load.image("roof", "assets/images/roof.png");
        this.load.image("rock", "assets/images/rock.png");
        this.load.image("exit", "assets/images/exit.png");
        this.load.image("actionButton", "assets/images/actionButton.png");
        this.load.image("arrowButton", "assets/images/arrowButton.png");
        this.load.image("wall", "assets/images/wall.png");
        this.load.image("volcano", "assets/images/volcano.png");
        this.load.image("lava", "assets/images/lava.png");
        this.load.image("playerBlue", "assets/images/playerBlue.png");
        this.load.image("playerRed", "assets/images/playerRed.png");
        this.load.image("playerYellow", "assets/images/playerYellow.png");
        this.load.image("playerGreen", "assets/images/playerGreen.png");
        this.load.image("menuButton", "assets/images/menubutton.png");
        this.load.image("audioIcon", "assets/images/audioicon.png");
        this.load.image("mutedIcon", "assets/images/mutedicon.png");
        this.load.image("exitpic", "assets/images/exitpic2.png");
        this.load.image("startpic", "assets/images/startpic2.png");
        this.load.image("leftarrow", "assets/images/leftarrow.png");
        this.load.image("textplus", "assets/images/textplus.png");
        this.load.image("textminus", "assets/images/textminus.png")
        
        //load helicopter and crash sounds, Phaser will automatically pick the right format to use
        this.load.audio("helisound", ["assets/sounds/helicopter.mp3", "assets/sounds/helicopter.ogg"]);
        this.load.audio("helicrash", ["assets/sounds/carcrash.mp3", "assets/sounds/carcrash.ogg"]);
        
       
        
    },
    create: function() {
        //moves onto HomeState once assets are loaded
        this.state.start("HomeState");
        
    }
}