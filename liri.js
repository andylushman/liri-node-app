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
// retrieveTweets will retrieve my last 20 tweets and display them together with the date
function retrieveTweets(){
  // Append the command to the log file
	fs.appendFile("./log.txt", "User Command: node liri.js my-tweets\n\n", (err) => {
		if (err) throw err;
	});

	// Initialize the Twitter client
	var client = new Twitter(twitterKeys);

	// Set the 'screen_name' to my Twitter handle
	var params = {screen_name: "aldubootcamp", count: 20};

	// Retrieve the last 20 tweets
	client.get("statuses/user_timeline", params, (error, tweets, response) => {
		if (error) {
			var errorStr = "ERROR: Retrieving user tweets -- " + error;

			// Append the error string to the log file
			fs.appendFile("./log.txt", errorStr, (err) => {
				if (err) throw err;
				console.log(errorStr);
			});
			return;
		} else {
			// Pretty print user tweets
			var outputStr = "===================\n" +
							         "User Tweets:\n" +
							        "===================\n\n";

			for (var i = 0; i < tweets.length; i++) {
				outputStr += "Created on: " + tweets[i].created_at + "\n" +
    							 "Tweet content: " + tweets[i].text + "\n" +
    							 "================================\n";
			}

			// Append the output to the log file
			fs.appendFile("./log.txt", "LIRI Response:\n\n" + outputStr + "\n", (err) => {
				if (err) throw err;
				console.log(outputStr);
			});
		}
	});
} //End retrieveTweets();

// retrieveOMDBInfo will retrieve information on a movie from the OMDB database
function retrieveOBDBInfo(movie){

  // Append the command to the log file
	fs.appendFile("./log.txt", "User Command: node liri.js movie-this " + movie + "\n\n", (err) => {
		if (err) throw err;
	});

	// If no movie is provided, LIRI defaults to "Mr. Nobody"
	let search;
	if (movie === "") {
		search = "Mr. Nobody";
	} else {
		search = movie;
	}

	// Replace spaces with "+" for the query string
	search = search.split(" ").join("+");

	// Construct the query string
	const queryStr = 'http://www.omdbapi.com/?t=' + search + '&plot=full&tomatoes=true';

	// Send the request to OMDB
	request(queryStr, (error, response, body) => {
		if ( error || (response.statusCode !== 200) ) {
			const errorStr1 = 'ERROR: Retrieving OMDB entry -- ' + error;

			// Append the error string to the log file
			fs.appendFile("./log.txt", errorStr1, (err) => {
				if (err) throw err;
				console.log(errorStr1);
			});
			return;
		} else {
			const data = JSON.parse(body);
			if (!data.Title && !data.Released && !data.imdbRating) {
				const errorStr2 = 'ERROR: No movie info retrieved, please check the spelling of the movie name!';

				// Append the error string to the log file
				fs.appendFile('./log.txt', errorStr2, (err) => {
					if (err) throw err;
					console.log(errorStr2);
				});
				return;
			} else {
		    	//Print the movie information
		    	var outputStr = "===================\n" +
								          "Movie Information:\n" +
								          "====================\n\n" +
								          "Movie Title: " + data.Title + "\n" +
          								"Year Released: " + data.Released + "\n" +
          								"IMBD Rating: " + data.imdbRating + "\n" +
          								"Country Produced: " + data.Country + "\n" +
          								"Language: " + data.Language + "\n" +
          								"Plot: " + data.Plot + "\n" +
          								"Actors: " + data.Actors + "\n" +
          								"Rotten Tomatoes Rating: " + data.tomatoRating + "\n" +
          								"Rotten Tomatoes URL: " + data.tomatoURL + "\n";

				// Append the output to the log file
				fs.appendFile("./log.txt", "LIRI Response:\n\n" + outputStr + "\n", (err) => {
					if (err) throw err;
					console.log(outputStr);
				});
			}
		}
	});

} //End retrieveOBDBInfo();

// doWhatItSays will read in a file to determine the desired command and then execute
function doWhatItSays(){
  // Append the command to the log file
	fs.appendFile("./log.txt", "User Command: node liri.js do-what-it-says\n\n", (err) => {
		if (err) throw err;
	});

	// Read in the file containing the command
	fs.readFile("./random.txt", "utf8", (error, data) => {
		if (error) {
			console.log("ERROR: Reading random.txt -- " + error);
			return;
		} else {
			// Split out the command name and the parameter name
			const cmdString = data.split(",");
			const command = cmdString[0].trim();
			const param = cmdString[1].trim();

			switch(command) {
				case "my-tweets":
					retrieveTweets();
					break;

				case "spotify-this-song":
					spotifySong(param);
					break;

				case "movie-this":
					retrieveOBDBInfo(param);
					break;
			}
		}
	});
} //End doWhatItSays();

// spotifySong will retrieve information on a song from Spotify
function spotifySong(song){
  // Append the command to the log file
  	fs.appendFile("./log.txt", "User Command: node liri.js spotify-this-song " + song + "\n", (err) => {
  		if (err) throw err;
  	});

  	// If no song is provided, LIRI defaults to "The Sign" by Ace of Base
  	var search;
  	if (song === "") {
  		search = "The Sign";
  	} else {
  		search = song;
  	}

  	spotify.search({ type: "track", query: search}, (error, data) => {
  	    if (error) {
  			const errorStr1 = "ERROR: Retrieving Spotify track -- " + error;

  			// Append the error string to the log file
  			fs.appendFile("./log.txt", errorStr1, (err) => {
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
  doWhatItSays();

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
