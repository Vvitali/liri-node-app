var DEBUG = false;

DEBUG && console.log("Liri: start!");
var twitterKeys = require("./keys.js")
var Twitter = require('twitter');
var client = Twitter(twitterKeys);

var Spotify = require('node-spotify-api');

var spotify = new Spotify({
	id: "d028e5930377471885981d046250476a",
	secret: "8142e3cf6e9a45bfbfed6e55944fb638"
});

switch(process.argv[2]){
	case 'my-tweets':
	var params = {screen_name: 'Vitali_LoGoS4', 
	count:20};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		error && console.log(error);
		DEBUG && console.log(tweets);
		for (var i in tweets){
			console.log("▼▼ -- ▼▼")
			console.log("Date: "+tweets[i].created_at)
			//console.log("Message: "+ tweets[i].text);
		}
	});
	console.log(process.argv[2]);
	break;
	case 'spotify-this-song':
	spotify.search({ type: 'track', query: process.argv[3], limit: 3 }, function(error, data) {
		error && console.log(error);
		console.log("Artists:");
		for (var i in data.tracks.items[0].artists){
			console.log(data.tracks.items[0].artists[i].name)
		}
		console.log("The song's name: "+data.tracks.items[0].name);
		// A preview link of the song from Spotify
		// The album that the song is from
	});

	console.log(process.argv[2]);
	break;
	case "movie-this":	
	console.log(process.argv[2]);
	break;
	case "do-what-it-says":
	console.log(process.argv[2]);
	break;
	default:
	break;
}


// request('http://www.google.com', function (error, response, body){

// });