var HighScoresState = {
    create: function () {


        var style = {font: '24px Arial', fill: '#fff'};

        var cameraWidthCenter = (this.game.camera.width / 2);
        var cameraHeightCenter = this.game.camera.height / 2;

        var number1 = this.game.add.text(cameraWidthCenter / 3, 40, "1st:  ", style);
        var number2 = this.game.add.text(cameraWidthCenter / 3, 60, "2nd:  ", style);
        var number3 = this.game.add.text(cameraWidthCenter / 3, 80, "3rd:  ", style);
        var number4 = this.game.add.text(cameraWidthCenter / 3, 100, "4th:  ", style);
        var number5 = this.game.add.text(cameraWidthCenter / 3, 120, "5th:  ", style);
        var number6 = this.game.add.text(cameraWidthCenter / 3, 140, "6th:  ", style);
        var number7 = this.game.add.text(cameraWidthCenter / 3, 160, "7th:  ", style);
        var number8 = this.game.add.text(cameraWidthCenter / 3, 180, "8th:  ", style);
        var number9 = this.game.add.text(cameraWidthCenter / 3, 200, "9th:  ", style);
        var number10 = this.game.add.text(cameraWidthCenter / 3, 220, "10th:  ", style);


        //for web socket
        var socket = io.connect();

        //client side socket logic
        $(document).ready(function () {
            if (localStorage.getItem("HeliHighScores2")) {
                socket.send(localStorage.getItem("HeliHighScores2"));
            }

            socket.on("message", function (message) {
                //for debugging
                //console.log(message);

                if (!localStorage.getItem("HeliHighScores2")) {
                    localStorage.setItem("HeliHighScores2", message);

                }

            });

        });


        if (localStorage.getItem("HeliHighScores2")) {

            console.log(localStorage.getItem("HeliHighScores2"));
            this.allScores = JSON.parse(localStorage.getItem("HeliHighScores2"));
            //sorts scores in ascending order
            this.allScores.sort(function (obj1, obj2) {
                // Ascending: first age less than the previous
                return obj1.counter - obj2.counter;
            });

            //console.log(this.allScores);
        }


//calls create high scores function to post times and names if they exist
        //(allscores index, variable name, y position)
        this.createHighScore(0, "firstplace", 40);
        this.createHighScore(1, "secondplace", 60);
        this.createHighScore(2, "thirdplace", 80);
        this.createHighScore(3, "fourthplace", 100);
        this.createHighScore(4, "fifthplace", 120);
        this.createHighScore(5, "sixthplace", 140);
        this.createHighScore(6, "seventhplace", 160);
        this.createHighScore(7, "eighthplace", 180);
        this.createHighScore(8, "ninthplace", 200);
        this.createHighScore(9, "tenthplace", 220);

//console.log(this.allScores);

//creates home button
        this.state.states.InstructionsState.createHomeButton();
        game.homebutton.x = cameraWidthCenter;
        game.homebutton.y = cameraHeightCenter * 1.8;

        game.buttontext.x = game.homebutton.x;
        game.buttontext.y = game.homebutton.y;
    },
    //function for creating High scores
    createHighScore: function (index, placeVariable, yposition) {
        var style = {font: '22px Arial', fill: '#fff'};
        var cameraWidthCenter = (this.game.camera.width / 2);
        if (localStorage.getItem("HeliHighScores2")) {
            this.allScores.sort();

            var cameraHeightCenter = this.game.camera.height / 2;
            if (this.allScores[index] != null) {
                var placeVariable = this.game.add.text(cameraWidthCenter / 1.5, yposition,
                    this.allScores[index].userName.toUpperCase() + "   " + this.allScores[index].counter + " SECONDS", style);
            }
        }
    }
}


