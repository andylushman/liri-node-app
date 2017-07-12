//=======================
//GLOBAL VARIABLES
//=======================
//Load Required Node Modules
const twitter = require('twitter');
//npm install --save node-spotify-api??
const Spotify = require('node-spotify-api');
const request = require('request'); //needed for OMBD API

//Load User Twitter Keys
const keys = require("./keys.js")
const twitterKeys = keys.twitterKeys;

//New twitter client
const client = new Twitter(twitterKeys);
const params = {screen_name: 'aldubootcamp'};

//=======================
//FUNCTIONS
//=======================
function retrieveTweets(){

}

function spotifySong(song){

}

function retrieveOBDBInfo(movie){

}

//=======================
//MAIN PROCESS
//=======================
