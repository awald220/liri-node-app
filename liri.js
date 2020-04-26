//required installations
require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var axios = require("axios");
// var inquirer = require("inquirer");
// var bandsintown = require("bandsintown");
// var omdb = require("omdb");
// var moment = require('moment');
// moment().format();

//vars 
var action = process.argv[2]
var functionData = process.argv[3]
console.log(action, functionData)

switch(action){
    case "movie-this":
        movie()
        break;

    case "concert-this":
        band()
        break;

    case "spotify-this-song":
        song()
        break;

    case "do-what-it-says":
        says()
        break;

    default:
        break;
    
}

//function that runs the spotify api
function song(){
    var spotify = new Spotify({
        id: "32f65d124f9246eb953de653e60f3c6b",
        secret: "83bd22ae940340d7a78adde1a238deec"
    });

    spotify.search({ type: 'track', query: functionData, limit: 1}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        // console.log(name)
        console.log(data.tracks)
        for (var key in data.tracks.items){
            console.log(data.tracks.items[key].artists[0].name);
            console.log(data.tracks.items[key].preview_url);
            console.log(data.tracks.items[key].name);
            console.log(data.tracks.items[key].album.name);
            
        }  
        
      });
}

function movie(){
    var queryUrl = "http://www.omdbapi.com/?t=" + functionData + "&y=&plot=short&apikey=e53d9ff8";

    axios
    .get(queryUrl)
    .then(function(response){
        console.log(response);
    })
}

function band(){
    var queryURL = "https://rest.bandsintown.com/artists/" + functionData + "?app_id=codingbootcamp";

    axios
    .get(queryURL)
    .then(function(response){
        console.log(response)
    })
}