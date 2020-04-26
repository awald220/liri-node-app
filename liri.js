//required installations
require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var axios = require("axios");
// var inquirer = require("inquirer");
var bandsintown = require("bandsintown");
var omdb = require("omdb");
var moment = require('moment');
moment().format();

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

