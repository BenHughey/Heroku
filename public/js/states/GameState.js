var GameState = {
    
    //initiate game settings
    init: function() {
        //adapt to screen size, fit all the game
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        //plays helicopter noise
        game.helisound = this.add.audio("helisound");
        game.helisound.play();
        //sets sound to loop at 0.7 volume
        game.helisound.loopFull(0.7);
        
        //starts phaser arcade physics system for gravity and collision detection
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //sets y axis gravity level to 500
        this.game.physics.arcade.gravity.y = 500;
        
        //creates a variable called cursors that listens for keyboard input
        this.cursors = this.game.input.keyboard.createCursorKeys();
        
        //sets the size of the world
        this.game.world.setBounds(0,0, 568, 1100); //(start x, start y, end x, end y)
        
        //variable used to set player forward speed
        this.FORWARD_SPEED = 80;
        //variable used to set up speed
        this.UP_SPEED = 100;
        
    },
    //executes when load finishes
    create: function() {
        
        //ground sprite             (x, y, key)
        this.ground = this.add.sprite(0, 1100, "ground");
        this.ground.anchor.setTo(0, 1);
        //enables arcade physics on ground object
        this.game.physics.arcade.enable(this.ground);
        //stops ground from falling
        this.ground.body.allowGravity = false;
        //stops ground being moved when collisions happen
        this.ground.body.immovable = true;
        
        //top of world sprite
        this.caveTop = this.add.sprite(0, 0 , "ground");
        this.game.physics.arcade.enable(this.caveTop);
        this.caveTop.body.allowGravity = false;
        this.caveTop.body.immovable = true;
        
        //left wall sprite
        this.wallLeft = this.game.add.sprite(0,0, "wall");
        this.game.physics.arcade.enable(this.wallLeft);
        this.wallLeft.body.allowGravity = false;
        this.wallLeft.body.immovable = true;
        
        //right wall sprite
        this.wallRight = this.game.add.sprite( 568, 0, "wall");
        //sets anchor point to top right corner of image
        this.wallRight.anchor.setTo(1,0);
        this.game.physics.arcade.enable(this.wallRight);
        this.wallRight.body.allowGravity = false;
        this.wallRight.body.immovable = true;
        
        //exit sprite
        this.exit = this.game.add.sprite(75, 165, "exit");
        this.exit.anchor.setTo(0.5);
        this.game.physics.arcade.enable(this.exit);
        this.exit.scale.setTo(-1, 1);
        this.exit.body.allowGravity = false;
        this.exit.body.immovable = true;
        
       
        
        //array containing coordinates of ceiling data
        var ceilingData = [
            {"x": 190, "y": 780},
            {"x": 17, "y": 600},
            {"x": 190, "y": 390},
            {"x": 17, "y": 190}
        ];
        
        //create group called ceilings
        this.ceilings = this.add.group();
        
        //gives body (physics) to all objects in ceilings group
        this.ceilings.enableBody = true;
        
        //creates an instance of roof sprite for each object in ceiling data using their coordinates
        ceilingData.forEach(function(element){
            this.ceilings.create(element.x, element.y, "roof");
        }, this);
        
        //sets all instances in ceiling class to not allow gravity and not be movable
        this.ceilings.setAll("body.allowGravity", false);
        this.ceilings.setAll("body.immovable", true);
        
        //array for placing volcanoes
            var volcanoData = [
            {"x": 380, "y": 785},
            {"x": 210, "y": 605},
            {"x": 220, "y": 400},
            {"x": 190, "y": 1027}
            ];
        
        //creates volcanoes group
        this.volcanoes = this.add.group();
        //enables physics on all objects in volcanoes group
        this.volcanoes.enableBody = true;
        
          //lava group
        this.lavasprites = this.add.group();
        this.lavasprites.enableBody = true;
        

        
  
        
    
      
        //creates a volcano for each object in volcanoData using their coordinates
        volcanoData.forEach(function(element){
            this.volcanoes.create(element.x, element.y, "volcano");   
        }, this);
        
        //sets anchor point to bottom left of all volcano sprites
        this.volcanoes.children.forEach(function(volcano){
            volcano.anchor.setTo(0, 1);
        }, this);
        
        //sets all instances in ceiling group to not allow gravity and not be movable
        this.volcanoes.setAll("body.allowGravity", false);
        this.volcanoes.setAll("body.immovable", true);
        
        //second foreach loop to create lava, must be in seperate loop as needs to access the properties
        //of the newly created volcano sprites
        volcanoData.forEach(function(element){
            this.lavasprites.create(element.x + this.volcanoes.children[0].width/2, 
                                    element.y - this.volcanoes.children[0].height ,"lava");
        },this);
        //sets anchor points of all lava sprites to bottom center
        this.lavasprites.children.forEach(function(lava){
            lava.anchor.setTo(0.3, 1);
        });
        
    

        
        //sets all instances of lava to not allow gravity and not be movable
        this.lavasprites.setAll("body.allowGravity", false);
        this.lavasprites.setAll("body.immovable", true);
        
        this.lavaRise();
        //executes the lavaRise tween every 5 seconds
        this.sprayLava = this.time.events.loop(Phaser.Timer.SECOND * 5, this.lavaRise, this);
        
    
        
        //player sprite based on selection in playerselect state
        this.player = this.add.sprite( 500, 950, game.state.states.PlayerSelectState.selectedItem);
        //custom params object to be used for our touch controls etc
        this.player.customParams = {};
        //sets anchor point to middle of image
        this.player.anchor.setTo(0.5);
     
        this.player.scale.setTo(0.22);
       
        
        //sets camera to follow player through world
        this.game.camera.follow(this.player);
        
        //calls createOnscreenControls method to create mobile touch buttons
        this.createOnScreenControls();
        
        //creates a group called rocks
        this.rocks = this.add.group();
        //enables physics on rocks group
        this.rocks.enableBody = true;
        //array for starting location of falling rocks
        var rockData =[
            {"x": 100, "y": 10},
            {"x": 250, "y": 10},
            {"x": 400, "y": 10}
        ];
     
        
        //creates a set of falling rocks using the coordinates specified in rockData
         rockData.forEach(function(element){
            //creates a falling rock right away
            this.createRock(element.x, element.y);
            // stores variable MultipleRocks as createRock with element.x and element.y as params
            //so it can be used in the rockCreator timer
            var MultipleRocks = function(){ this.createRock(element.x, element.y);};
            //creates a timer that executes the createRock method with elemet.x and element.y as params every 5 seconds
            this.rockCreator = this.time.events.loop(Phaser.Timer.SECOND * 6, MultipleRocks, this);
            },this);
        
        //timer to fire updateCounter function every second
        game.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);
        
        game.counter = 0;
        
       
        this.timerText = this.game.add.text(40,20, "Time: 0", {font: '35px Arial', fill: '#fff'});
        this.timerText.scale.setTo(0.3);
        this.timerText.fixedToCamera = true;
    },
    //executes multiple times per second
    update: function() {
        
        
       
        
     
        //checks collision between player and ground, executes killPlayer method
        this.game.physics.arcade.collide(this.player, this.ground, this.killPlayer);
        
        //checks collision between player and caveTop
        this.game.physics.arcade.collide(this.player, this.caveTop, this.killPlayer);
        
        //checks collision between player and wallLeft
        this.game.physics.arcade.collide(this.player, this.wallLeft, this.killPlayer);
        
        //checks collision between player and wallRight
        this.game.physics.arcade.collide(this.player, this.wallRight, this.killPlayer);
        
        //checks collision between player and ceilings
        this.game.physics.arcade.collide(this.player, this.ceilings, this.killPlayer);
        
        //checks collision between player and exit and executes win function
        this.game.physics.arcade.collide(this.player, this.exit, this.win)
        
        this.game.physics.arcade.collide(this.player, this.volcanoes, this.killPlayer);
        
        //checks collision between rocks and player
        this.game.physics.arcade.overlap(this.player, this.rocks, this.killPlayer);
        
        this.game.physics.arcade.overlap(this.player, this.lavasprites, this.killPlayer);
        
        //left button/ touch controls
        if(this.cursors.left.isDown || this.player.customParams.isMovingLeft) {
            
            //enables physics when player presses left button
            this.game.physics.arcade.enable(this.player);
            //moves player to left
            this.player.body.velocity.x = -this.FORWARD_SPEED;
            //flips player on x axis so facing the way we are flying
            this.player.scale.setTo(0.22);
            //tilts player to 20 degree angle when moving
            this.player.angle =0;
            this.player.angle -=20;
            
            
            }
        else if (this.cursors.right.isDown || this.player.customParams.isMovingRight) {
            
            this.game.physics.arcade.enable(this.player);
            //moves player to right
            this.player.body.velocity.x = this.FORWARD_SPEED;
            //flips player on x axis to face right way
            this.player.scale.setTo(-0.22,0.22);
            //tilts player to 20 degree angle when moving
            this.player.angle =0;
            this.player.angle +=20;
            
            
        }
        //moves player up when up key is pressed
        if(this.cursors.up.isDown || this.player.customParams.flyUp) {
            this.game.physics.arcade.enable(this.player);
            this.player.body.velocity.y = -this.UP_SPEED;
        }
        
        
        //kills rock when it gets to the bottom of the world 
        //reusing pool of dead rocks prevents memory leak
        this.rocks.forEach(function(element){
            //sets falling velocity
            element.body.velocity.y = 80;
            //Kills rocks once they get past 1000px on Y axis
            if(element.y > 1000) {
                element.kill();
            }
        });
        
    },
    //creates a falling rock, used with a timer to create a new one every few seconds
    createRock: function(x, y) {
        

        //gets the first dead sprite if it exists
        var rock = this.rocks.getFirstExists(false);
        //if none already exist create one
        if(!rock){
            rock = this.rocks.create(x, y, "rock");
        }
        //allows rocks to collide with the edges of the world
        rock.body.collideWorldBounds = true;
       
        //places rock at start coordinates
        rock.reset(x, y);
    
        
        
    },
    //method for creating on screen touch controls
   
    //to be executed when player reaches exit
    win: function() {
        //stops game sound
        game.sound.mute = true;
        //if local storage highscores aren't empty
        if (localStorage.getItem("HeliHighScores2")!== null){
        // gets entries from local storage
       var existingEntries = JSON.parse(localStorage.getItem("HeliHighScores2"));
        }
            
        else{ var existingEntries = [];
            }
        
       
        
       
    
        //sorts scores in ascending order
        existingEntries.sort(function(obj1, obj2) {
	       // Ascending: first age less than the previous
	    return obj1.counter - obj2.counter;
});
        
                        //testing high scores
         if (existingEntries.length < 10 || game.counter < existingEntries[9].counter) { 
             
             
             var usersName = prompt("Congratulations! That's a new high score! Please enter your first name \(Maximum 6 letters)");
             //shortens users name to 6 characters
             var usersNameShortened = usersName.substring(0, 6);
             var counter = game.counter;
             var userName = usersNameShortened;
             //pushes game data into object and sends it to userDetails array
             userDetails   = {userName, counter};
             existingEntries.push(userDetails);
             //existingEntries
             localStorage.setItem("HeliHighScores2", JSON.stringify(existingEntries));
             game.state.start("HighScoresState");

         }

            
            
        else {
        //confirm box, shows user their time and goes to Homestate on OK and gamestate on cancel
            if (confirm("Congratulations! You won!\nYour time was: " + game.counter + " seconds" +"\nPress OK to return to menu or Cancel to restart"))
            {
            //back to menu if ok
            game.state.start("HomeState");
            }
            else {
                //restart if cancel
            game.state.start("GameState");
            }
        }
        
        
    },
    //to be executed when player crashes
    killPlayer: function(){

        //plays crash sound
        helicrash = game.add.audio("helicrash");
        helicrash.play();
        //stops heli sound
        game.helisound.stop();

        //confirm box, shows user their time and goes to Homestate on OK and gamestate on cancel
        if (confirm("Game Over!\n Press OK to play again or CANCEL to return to menu"))
        {
            //restarts game
            game.state.start("GameState");
        }
        else {
            //returns to menu
            game.state.start("HomeState");
        }
    },
    //animation for rising and falling lava
    lavaRise: function () {
        //adds a tween called sprayLava that scales out x to create the effect of rising lava
        this.lavasprites.forEach(function(child){
        this.sprayLava = this.game.add.tween(child.scale).to({x: 1, y: 10}, 1000, Phaser.Easing.Back.InOut, true, 0).yoyo(true);
        },this);
        //calls the tween
        this.sprayLava.start();
    
        
        
    },
        //method for creating on screen touch controls
    createOnScreenControls: function(){//coordinates are measured from top of screen not world
        
        var cameraWidthCenter = this.game.camera.width/2;
        var cameraHeightbottom = this.game.camera.height - this.game.camera.height/6;
        //creates left arrow button    (coordinates, refeence key)
        this.leftArrow = this.add.button(cameraWidthCenter* 0.6, cameraHeightbottom, "arrowButton");
        this.rightArrow = this.add.button(cameraWidthCenter * 1.4, cameraHeightbottom, "arrowButton");
        this.actionButton = this.add.button(cameraWidthCenter, cameraHeightbottom, "actionButton");
        this.muteButton = this.add.button(cameraWidthCenter * 1.8, cameraHeightbottom +10, "mutedIcon");
        
        this.muteButton.scale.setTo(0.5);
        
        this.buttons = [this.leftArrow, this.rightArrow, this.actionButton, this.muteButton];
        
        this.buttons.forEach(function(element){
            element.alpha = 0.5;
            element.fixedToCamera = true;
            element.anchor.setTo(0.5);
        });
        
        
        //event listener for mute button
        this.muteButton.events.onInputDown.add(function(){
            //checks game isn't already muted
            if(!game.sound.mute){
                //change icon to unmuted
                this.muteButton.loadTexture("audioIcon");
                game.sound.mute = true;
            }
            else if(game.sound.mute) {
                this.muteButton.loadTexture("mutedIcon");
                game.sound.mute = false;
            }
            
                
                                               },this);
         //event listener for action button
        this.actionButton.events.onInputDown.add(function(){
            this.player.customParams.flyUp = true;
        },this);
        // changes flyUp to false when button is released
        this.actionButton.events.onInputUp.add(function(){
            this.player.customParams.flyUp = false;
        },this);
        
        //event listener for left touch button
        this.leftArrow.events.onInputDown.add(function(){
        this.player.customParams.isMovingLeft = true;
        },this);
        // changes isMovingLeft to false when button is released
        this.leftArrow.events.onInputUp.add(function(){
        this.player.customParams.isMovingLeft = false;
        },this);
        
        // event listener for right touch button
        this.rightArrow.events.onInputDown.add(function(){
        this.player.customParams.isMovingRight = true;
        },this);
        // changes isMovingRight to false when button is released
        this.rightArrow.events.onInputUp.add(function(){
        this.player.customParams.isMovingRight = false;
        },this);
        
    
        
        
        
        
    },
    

        

        updateCounter: function() {
            
            game.counter++
             this.timerText.setText("Time: " + game.counter);
            
        
        }
    
};