//required installations
require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require('moment');
moment().format();

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

//function to run get data for the movie api
function movie(){
    var queryUrl = "http://www.omdbapi.com/?t=" + functionData + "&y=&plot=short&apikey=e53d9ff8";
  

    axios
    .get(queryUrl)
    .then(function(response){
        console.log(response);

        console.log(response.data.Title)
        console.log(response.data.Year)
        console.log(response.data.imdbRating)
        console.log(response.data.Ratings[1].Value)
        console.log(response.data.Country)
        console.log(response.data.Language)
        console.log(response.data.Plot)
        console.log(response.data.Actors)
    })


    var empty;

    if (functionData === empty ){
         functionData = "Mr. Nobody";
        console.log("If you haven't watched 'Mr. Nobody', then you should. Its on Netflix! http://www.imdb.com/title/tt0485947/");
    }
}

//function to run get data for the bands in town concert
function band(){
    var queryURL = "https://rest.bandsintown.com/artists/" + functionData + "?app_id=codingbootcamp";

    axios
    .get(queryURL)
    .then(function(response){
        // console.log(response)
        console.log(response.data[0].venue.name)
        console.log(response.data[0].venue.location)
        
        //format the date of the show
        var date = response.data[0].datetime;
        var momentTime = moment(date).format('MM/DD/YYYY')
        console.log(momentTime)
    })
}


function doWhatItSays(){
    fs.readFile("random.txt", "utf8", function(error, data){
        if (error) {
            return console.log(error);
        }

        var dataArr = data.split(",");
        action1=dataArr[1];

        pick(action1, functionData1);
    })
}