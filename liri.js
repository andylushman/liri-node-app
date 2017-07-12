//=======================
//GLOBAL VARIABLES
//=======================

//Load Required Node Modules
const twitter = require('twitter');
//npm install --save node-spotify-api??
const Spotify = require('node-spotify-api');
const request = require('request'); //needed for OMBD API
console.log("Required Node Modules loaded");

//Load User Twitter Keys
const keys = require("./keys.js")
const twitterKeys = keys.twitterKeys;
console.log("keys loaded");


//=======================
//FUNCTIONS
//=======================


//=======================
//MAIN PROCESS
//=======================

var params = {screen_name: 'aldubootcamp'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});
