require("dotenv").config();

const apiKeys = require("keys.js");

var client = new Twitter(apiKeys.twitter);

var spotify = new Spotify(apiKeys.spotify);


$.ajax({
    method: GET,
    url: 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=' + client.consumer_key + '&count=20',
})