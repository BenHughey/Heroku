//Home State for Heli Escape game
//written by Ben Hughey
var HomeState = {
    
    init: function(message) {
        this.message = message;
    },
    
    create: function(){
        //putting these in variables so computer only has to calculate it once
        var cameraWidthCenter = this.game.camera.width/2;
        var cameraHeightCenter = this.game.camera.height/2;
        
        var style = {font: '35px Arial', fill: '#fff'};
        var headerText = this.game.add.text(cameraWidthCenter, cameraHeightCenter -120, 'Heli Escape', style);
        headerText.anchor.setTo(0.5);
        
  
        
      
        //creates button used to start game using the menuButton sprite places it in center of page
       game.playbutton = this.game.add.button(cameraWidthCenter, cameraHeightCenter - 50, "menuButton");
        //calls setupButton to set buttons attributes
        this.setupButton(game.playbutton);
        //calls our addbuttontext method that places given text at same coordinates as given button
        this.addButtonText(game.playbutton, "Play Game");
         //creates button for instructions
       game.instructionsbutton = this.game.add.button(cameraWidthCenter, cameraHeightCenter + 10, "menuButton");
        //calls setupButton to set buttons attributes
        this.setupButton(game.instructionsbutton);
        //calls our addbuttontext method that places given text at same coordinates as given button
        this.addButtonText(game.instructionsbutton, "Instructions");
        
        
         //creates button for accessing high scores
        game.highscoresbutton = this.game.add.button(cameraWidthCenter, cameraHeightCenter + 70, "menuButton");
        //calls setupButton to set buttons attributes
        this.setupButton(game.highscoresbutton);
        //calls our addbuttontext method that places given text at same coordinates as given button
        this.addButtonText(game.highscoresbutton, "High Scores");
        
          //creates button for changing settings
       game.settingsbutton = this.game.add.button(cameraWidthCenter, cameraHeightCenter + 130, "menuButton");
        //calls setupButton to set buttons attributes
        this.setupButton(game.settingsbutton);
        //calls our addbuttontext method that places given text at same coordinates as given button
        this.addButtonText(game.settingsbutton, "Orientation");
        
        game.menubuttons = [game.instructionsbutton, game.playbutton, game.highscoresbutton, game.settingsbutton];
        //resizes buttons if portrait mode
        if(this.camera.height > this.camera.width){
            
            headerText.y -= 160;
                  //makes menu buttons bigger & centers them
                game.menubuttons.forEach(function(element){
                    element.x = cameraWidthCenter;
                    element.scale.setTo(1);
                    //moves everything up 160px
                    element.y -= 160;
                    
                });
                //respaces buttons
                game.instructionsbutton.y += 30;
                game.highscoresbutton.y += 60;
                game.settingsbutton.y += 90;
            
            
            }
        
        //listens for click or touch on playbutton
        
 
        game.playbutton.events.onInputDown.add(function(){
            //starts game
            this.state.start("PlayerSelectState");
        }, this);
        
        game.instructionsbutton.events.onInputDown.add(function(){
            //moves to instructions gamestate
            this.state.start("InstructionsState");
        }, this);
        
         game.highscoresbutton.events.onInputDown.add(function(){
            //moves to highscores gamestate
            this.state.start("HighScoresState");
        }, this);
        
        //now Orientation button, changes orientation from landscape to portrait/ vice verse
        game.settingsbutton.events.onInputDown.add(function(){
            
            if(this.camera.width > this.camera.height){
                //changes settings to optimise for portrait mode
            
            game.scale.setGameSize(375, 667);
            cameraWidthCenter = this.game.camera.width/2;
            cameraHeightCenter = this.game.camera.height/2;
                
                //places header text back in center
                headerText.x = cameraWidthCenter;
                
                //makes menu buttons bigger & centers them
                game.menubuttons.forEach(function(element){
                    element.x = cameraWidthCenter;
                    element.scale.setTo(1);
                    
                });
                //respaces buttons
                game.instructionsbutton.y += 30;
                game.highscoresbutton.y += 60;
                game.settingsbutton.y += 90;
            }
            else{
                //Changes view back to landscape and refreshes gamestte
                game.scale.setGameSize(570, 320);
                
                this.state.start("HomeState");
                
                
                
            }
        },this);
        
        
    },
    //method to add text to center of given button
    addButtonText: function(buttonName, text) {
        var style = {font: '35px Arial', fill: '#fff'};
        var textname = this.game.add.text(0.5, 0.5, text);
        buttonName.addChild(textname);
        textname.anchor.setTo(0.5);
        
    },
        
        
    
    //sets up buttons anchor points, size etc
    setupButton: function(button) {
        //anchor point to center
        button.anchor.setTo(0.5);
        
        //make playbutton smaller
        button.scale.setTo(0.7);
        //allow input on background sprite
        button.inputEnabled = true;
       
        
    }
            
    
};