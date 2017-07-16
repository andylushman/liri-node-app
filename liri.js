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
  //Append the command to the log files
  fs.appendFile("./log.txt", "User Command: node liri.js my-tweets\n\n", (err) => {
    if (err) {
      throw err;
    }
  })

  // Initialize the twitter client
  const client = new twitter(twitterKeys);
  //Adjust screen name and count
  const params = {screen_name: 'aldubootcamp', count: 20};

  //Get the last 20 tweets
  client.get("statuses/user_timeline", params, (error, tweets, response) => {
    if (!error) {
    console.log(tweets);
    } else {
      var errorStr = "ERROR: Retrieving user tweets -- " + error;

			// Append the error string to the log file
			fs.appendFile("./log.txt", errorStr, (err) => {
				if (err) throw err;
				console.log(errorStr);
			});
			return;
    }
  })
} //End retrieveTweets();

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
