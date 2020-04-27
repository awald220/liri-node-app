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
        say()
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
   
        for (var key in data.tracks.items){
            console.log("Artist Name: " + data.tracks.items[key].artists[0].name);
            console.log("Preview URL: " + data.tracks.items[key].preview_url);
            console.log("Track Name: " + data.tracks.items[key].name);
            console.log("Album Name: " + data.tracks.items[key].album.name);
            
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
        console.log(response)
        
        console.log("Name of the venue:", response.data[0].venue.name);
        console.log("Venue location:", response.data[0].venue.city);
        var eventDate = moment(response.data[0].datetime).format('MM/DD/YYYY');
        console.log("Date of the Event:", eventDate);
    })

    .catch(function(err){
        console.log(err)
        console.log(`Sorry, I don't know that one, try again!`)

    })
}


function say() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error){
            console.log(error);
        } 

        var dataArr = data.split(",");

        action = dataArr[0]
        functionData = dataArr[1]

        console.log(action, functionData)

        song()
    })
    
}


    
    
  
    


