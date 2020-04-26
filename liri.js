require("dotenv").config();

var keys = require("./keys.js");
var axios = require('axios');
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);