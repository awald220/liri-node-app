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

function song(){
    var spotify = new Spotify(keys.spotify);

    spotify.search({ type: 'track', query: functionData, limit: 1}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        // console.log(name)
        // console.log(data.tracks)
        for (var key in data.tracks.items){
            console.log(data.tracks.items[key].artists[0].name);
            console.log(data.tracks.items[key].preview_url);
            console.log(data.tracks.items[key].name);
            console.log(data.tracks.items[key].album.name);
            
        }  
        
      });
}