var http = require("http");
var url = require('url');
var fs = require('fs');
var io = require('socket.io');
var xml2js = require('xml2js');
var express = require('express');
var path = require("path");
var app = express();

//sets default directory to public
app.use(express.static(__dirname + '/public'));


//sends index.html as home page for site
app.get('/',function(req, res) {
    res.sendFile(__dirname + '/index.html');
    res.send();
});
//listens for connections to this server
var server = app.listen(8070);


//socket listener
var listener = io.listen(server);
//to be executed when socket connection is established
listener.sockets.on('connection', function(socket) {

        //reads JSON file and sends scores to client
        fs.readFile("public/scores.json","utf-8", function (err, data) {
            if (err) {
                throw err
            }
            ;
            global_data = data;
            console.log(global_data);
            socket.send(global_data);
        });



//recieve client data
        socket.on('client_data', function (data) {

        });
        socket.on("message", function (message) {

            //var gamedata = message;
            //console.log(message);

            var obj = JSON.parse(message);

            var builder = new xml2js.Builder();
            var xml = builder.buildObject(obj);


            //writes scores data to xml file
            fs.writeFileSync("public/scores.xml", xml);

            //Writes scores to JSON file
            fs.writeFileSync("public/scores.json", JSON.stringify(obj));

            //Reads data from json scores file
            fs.readFile("public/scores.json","utf-8", function (err, data) {
                if (err) {
                    throw err
                }
                ;
                global_data = data;
                console.log(global_data);
                socket.send(global_data);
            });



        });

});