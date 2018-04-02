require("dotenv").config();

const request = require('request');

const apiKeys = require("./keys.js");

const Twitter = require('twitter');

const inquirer = require('inquirer');


const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const spotify = apiKeys.spotify;

let twitterUsername = ""

/*;*/


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
            console.log('Here are ' + twitterUsername.twitterUsername + '\'s\ ' +  'twenty latest tweets \n');



            client.get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=' + twitterUsername.twitterUsername + '&count=20', function (error, tweets, response) {
                if (error) throw error;

                for (i = 0; i < tweets.length; i++) {
                    console.log('- ' + tweets[i].text + '\n');
                    // console.log(JSON.stringify(tweets, null, 2));
                }

            });
        })
}

runTwitter();