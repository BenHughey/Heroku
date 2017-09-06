//State for selecting player
//Written by Ben Hughey
var PlayerSelectState = {
    create: function(){
        
        this.cameraWidthCenter = this.game.camera.width/2;
        this.cameraHeightCenter = this.game.camera.height/2;
        
        //Adds Chopper sprites as buttons
        this.greenChopper = this.add.button(this.cameraWidthCenter, this.cameraHeightCenter, "playerGreen");
        this.redChopper = this.add.button(this.cameraWidthCenter, this.cameraHeightCenter -40, "playerRed");
        this.blueChopper = this.add.button(this.cameraWidthCenter, this.cameraHeightCenter +40, "playerBlue");
        this.yellowChopper = this.add.button(this.cameraWidthCenter, this.cameraHeightCenter + 80, "playerYellow"); 

        //Header for player select page
        var playerSelectHeader = this.game.add.text(this.cameraWidthCenter, this.cameraHeightCenter- 100, "Select your player",{font: '35px Arial', fill: '#fff'});
        playerSelectHeader.anchor.setTo(0.5);
        //Array of buttons for use in foreach
        this.buttons = [this.greenChopper, this.redChopper, this.blueChopper, this.yellowChopper];
        this.buttons.forEach(function(element){
            element.scale.setTo(0.3);
            element.alpha = 1;
            element.anchor.setTo(0.5);
            element.events.onInputDown.add(function(){
                this.selectedItem = element.key;
                game.state.start("GameState");
            },this)
        },this);
        //creates and positions Home button
        this.state.states.InstructionsState.createHomeButton();
       game.homebutton.x = this.cameraWidthCenter;
        game.homebutton.y = this.cameraHeightCenter * 1.8;
        game.buttontext.x = game.homebutton.x;
        game.buttontext.y = game.homebutton.y;
        
        
       
    }
}