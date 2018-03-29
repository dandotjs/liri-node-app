import { twitter } from "./keys";

require("dotenv").config();

const apiKeys = require("keys.js")

var client = new twitter(keys.twitter);

var spotify = new spotify(keys.spotify);