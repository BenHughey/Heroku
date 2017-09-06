//Main Javascript document for running Helicopter Rescue Game
//Written by Ben Hughey

//Creates phaser game object w:  h:, auto select webGL or canvas rendering option

var game = new Phaser.Game(570, 320, Phaser.AUTO);


//add gamestates to game
game.state.add('GameState', GameState);
game.state.add('HomeState', HomeState);
game.state.add('PreloadState', PreloadState);
game.state.add('BootState', BootState);
game.state.add('HighScoresState', HighScoresState);
game.state.add('InstructionsState', InstructionsState);
game.state.add('PlayerSelectState', PlayerSelectState);


//start boot gamestate 
game.state.start('BootState');
