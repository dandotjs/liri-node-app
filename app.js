require("dotenv").config();

const apiKeys = require("keys.js");

var client = new twitter(apiKeys.twitter);

var spotify = new spotify(apiKeys.spotify);


$.ajax({
    url: 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=' + '' + '&count=20'
})