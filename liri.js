//=======================
//GLOBAL VARIABLES
//=======================
//Load Required Node Modules
const twitter = require('twitter');
//npm install --save node-spotify-api??
const Spotify = require('node-spotify-api');
const request = require('request'); //needed for OMBD API
const fs = require("fs"); //core node package for reading and writing files

//Load User Twitter Keys
const keys = require("./keys.js")
const twitterKeys = keys.twitterKeys;

//New twitter client
const client = new twitter(twitterKeys);
const params = {screen_name: 'aldubootcamp'};

//Command line agruments
const cmdArg = process.argv;
const liriCommand = cmdArg[2];

//If parameters to the liriCommand has spaces
const liriArg = "";

for (let i = 3; i < cmdArg.length; i++) {
  liriArg += cmdArg[i] + " ";
}

//=======================
//FUNCTIONS
//=======================
function retrieveTweets(){

}

function retrieveOBDBInfo(movie){

}

function doWhatItSays(){

}

function spotifySong(song){

}



//=======================
//MAIN PROCESS
//=======================
if (liriCommand === "my-tweets") {
    retrieveTweets();

} else if (liriCommand === "movie-this") {
    retrieveOBDBInfo(liriArg);

} else if (liriCommand === "do-what-it-says") {

} else if (liriCommand === "spotify-this-song") {
    spotifySong(liriArg);

} else {
  //Append command to the log.txt
  fs.appendFile("./log.txt", "User Command : " + cmdArg, (err) => {
      if (err) throw err;

      // If the user types in a command that LIRI does not recognize, output the Usage menu
  		// which lists the available commands.
  		outputStr = "Usage:\n" +
  				       "node liri.js my-tweets\n" +
  				       "node liri.js spotify-this-song '<song_name>'\n" +
  				       "node liri.js movie-this '<movie_name>'\n" +
  				       "node liri.js do-what-it-says\n";

  		// Append the output to the log file
  		fs.appendFile("./log.txt", "LIRI Response:\n" + outputStr + "\n", (err) => {
  			if (err) throw err;
  			console.log(outputStr);
      });
  });
}
