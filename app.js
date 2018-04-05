require("dotenv").config();

// Add in all necessary modules

const request = require('request');

const apiKeys = require("./keys.js");

const Twitter = require('twitter');

const inquirer = require('inquirer');

const SpotifyWebApi = require('node-spotify-api');

const fs = require('fs');

// sets spotifyApi up with all proper credentials
var spotifyApi = new SpotifyWebApi({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET,
});

// sets client up with all proper credentials
const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});


let twitterUsername = "";

let spotifySong = "";
const commandChoices = ['> my-tweets', '> spotify-this-song', '> movie-this'];
inquirer.prompt([
    {
        type: 'list',
        message: 'Please type one of the following commands: ',
        choices: commandChoices,
        name: 'usercommand',
    },

])
    .then(answers => {
        console.log(answers)
        if (answers.usercommand === commandChoices[0]) {
            runTwitter();
        }
        else if (answers.usercommand === commandChoices[1]) {
            runSpotify();
        }
        else if (answers.usercommand === commandChoices[2]) {
            runOMDB();
        }
    })




function runTwitter() {

    inquirer.prompt([
        {
            type: 'input',
            message: 'Please enter your twitter username',
            name: 'twitterUsername',
        }
    ])
        .then(answers => {
            twitterUsername = (answers);
            console.log('Here are ' + twitterUsername.twitterUsername + '\'s\ ' + 'twenty latest tweets \n');

            client.get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=' + twitterUsername.twitterUsername + '&count=20', function (error, tweets, response) {
                if (error) throw error;
                for (i = 0; i < tweets.length; i++) {
                    console.log('- ' + tweets[i].text + '\n');
                }
            });
        })
};

//runTwitter();

function runSpotify() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Please enter a song you want to search for',
            name: 'spotifySong',
        }
    ])
        .then(answers => {
            spotifySong = (answers);
            console.log('Here is your song info for ' + spotifySong.spotifySong)
            spotifyApi.search({ type: 'track', query: spotifySong.spotifySong, limit: 1 })
                .then(function (response) {
                    console.log(
                        'Artist: ' + JSON.stringify(response.tracks.items[0].album.artists[0].name, null, 2)
                        + ' Album: ' + JSON.stringify(response.tracks.items[0].album.name, null, 2)
                        + ' Listen Here: ' + JSON.stringify(response.tracks.items[0].album.artists[0].external_urls.spotify, null, 2));
                })
                
                .catch(function (err) {
                    console.log(err);
                });

        })
};

//runSpotify();

function runOMDB() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Please enter a movie you want to search for',
            name: 'movieSearch',
        }
    ])
        .then(answers => {
            movieSearch = (answers);
            var omdbSearch = movieSearch.movieSearch;
            request('http://www.omdbapi.com/?apikey=9d8265a0&t=' + omdbSearch.replace(/ /i, '+'), function (error, response, body) {
                
                console.log("Title: " +JSON.parse(body).Title);
                console.log("Year: " +JSON.parse(body).Released);
                console.log("IMBD: " +JSON.parse(body).imbdRating);
                console.log("RT: " +JSON.parse(body).Ratings[1].Value);
                console.log("Country: " +JSON.parse(body).Country);
                console.log("Language: " +JSON.parse(body).Language);
                console.log("Plot: " +JSON.parse(body).Plot);
                console.log("Actors: " +JSON.parse(body).Actors);
                
            })

        });
}