//Load Required Node Modules
const Twitter = require('twitter');
//npm install --save node-spotify-api??
const Spotify = require('node-spotify-api');
const request = require('request'); //needed for OMBD API
console.log("Required Node Modules loaded");

//Load User Twitter Keys
const keys = require("./keys.js")
const twitterKeys = keys.twitterKeys;
console.log("keys loaded");
