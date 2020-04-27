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
    var spotify = new Spotify(keys.spotify);

    if(!functionData){
        functionData = "the sign"
    }

    spotify.search({ type: 'track', query: functionData, limit: 1}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
   
        for (var key in data.tracks.items){
            var output;
            output = `
                Artist Name: ${data.tracks.items[key].artists[0].name}
                Preview URL: ${data.tracks.items[key].preview_url}
                Track Name: ${data.tracks.items[key].name}
                Album Name: ${data.tracks.items[key].album.name}
                `
        }  

        console.log(output)

        fs.appendFile("log.txt", output,  function(error){
            if (error) {
                console.log(err);
              }
              else {
                  console.log(functionData, "Has been logged!")
              }
        })
        
      });
}

//function to run get data for the movie api
function movie(){
    if (!functionData){
        functionData = "mr nobody"
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + functionData + "&y=&plot=short&apikey=e53d9ff8";
  

    axios
    .get(queryUrl)
    .then(function(response){
        var output;
        output = `
            Movie Title: ${response.data.Title}
            Year: ${response.data.Year}
            IMBD Rating: ${response.data.imdbRating}
            Country: ${response.data.Country}
            Language: ${response.data.Language}
            Plot: ${response.data.Plot}
            Cast:${response.data.Actors}
            `
        if(response.data.Ratings.length){
        output = `
            Movie Title: ${response.data.Title}
            Year: ${response.data.Year}
            IMBD Rating: ${response.data.imdbRating}
            Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}
            Country: ${response.data.Country}
            Language: ${response.data.Language}
            Plot: ${response.data.Plot}
            Cast:${response.data.Actors}
            `
        }

        console.log(output)
        fs.appendFile("log.txt", output,  function(error){
            if (error) {
                console.log(err);
              }
              else {
                  console.log(functionData, "Has been logged!")
              }
        })
       
    })

   
}

//function to run get data for the bands in town concert
function band(){
    if(!functionData){
        functionData = "taylor swift"
        console.log("Give " + functionData + " a try!")
    }

    var queryURL = "https://rest.bandsintown.com/artists/" + functionData + "/events?app_id=codingbootcamp";

    axios
    .get(queryURL)
    .then(function(response){
       
        var date = response.data[0].datetime;
        var momentTime = moment(date).format('MM/DD/YYYY')
        var output;
        var output = `
            Venue Name: ${response.data[0].venue.name}
            Venue Location: ${response.data[0].venue.city}
            Show Date: ${momentTime}
            `

            console.log(output)
            fs.appendFile("log.txt", output,  function(error){
                if (error) {
                    console.log(err);
                  }
                  else {
                      console.log(functionData, "Has been logged!")
                  }
            })
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



    
    
  
    


