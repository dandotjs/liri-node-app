require("dotenv").config();

const apiKeys = require("keys.js");

var client = new twitter(apiKeys.twitter);

var spotify = new spotify(apiKeys.spotify);

client.stream('statuses/filter', {track: 'twitter'},  function(stream) {
    stream.on('data', function(tweet) {
      console.log(tweet.text);
    });
  
    stream.on('error', function(error) {
      console.log(error);
    });
  });