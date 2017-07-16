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
let liriArg = "";

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
      const errorStr = "ERROR: Retrieving user tweets -- " + error;

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

} //End retrieveOBDBInfo();


function doWhatItSays(){

} //End doWhatItSays();


function spotifySong(song){
  // Append the command to the log file
  	fs.appendFile("./log.txt", "User Command: node liri.js spotify-this-song " + song + "\n", (err) => {
  		if (err) throw err;
  	});

  	// If no song is provided, LIRI defaults to "O Canada"
  	var search;
  	if (song === "") {
  		search = 'O Canada';
  	} else {
  		search = song;
  	}

  	spotify.search({ type: 'track', query: search}, (error, data) => {
  	    if (error) {
  			const errorStr1 = 'ERROR: Retrieving Spotify track -- ' + error;

  			// Append the error string to the log file
  			fs.appendFile('./log.txt', errorStr1, (err) => {
  				if (err) throw err;
  				console.log(errorStr1);
  			});
  			return;

  	    } else {
  			const songInfo = data.tracks.items[0];
  			if (!songInfo) {
  				const errorStr2 = "ERROR: No song info retrieved, please check the spelling of the song name!";

  				// Append the error string to the log file
  				fs.appendFile("./log.txt", errorStr2, (err) => {
  					if (err) throw err;
  					console.log(errorStr2);
  				});
  				return;
  			} else {
  				//Print the song information
  				var outputStr = "====================\n" +
  								        "Song Information:\n" +
  								        "====================\n\n" +
                          "Song Name: " + songInfo.name + "\n" +
  								"Artist: "  + songInfo.artists[0].name + "\n" +
  								"Album: " + songInfo.album.name + "\n" +
  								"Preview Here: " + songInfo.preview_url + "\n";

  				// Append the output to the log file
  				fs.appendFile("./log.txt", "LIRI Response:\n" + outputStr + "\n", (err) => {
  					if (err) throw err;
  					console.log(outputStr);
  				});
  			}
  	    }
  	});
} //spotifySong();



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
