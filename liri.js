var DEBUG = true;

DEBUG && console.log("Liri: start!");
var twitterKeys = require("./keys.js")
var Twitter = require('twitter');
var client = Twitter(twitterKeys);
var request = require('request');

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
			console.log("Message: "+ tweets[i].text);
		}
	});
	break;
	case 'spotify-this-song':
	spotify.search({ type: 'track', query: process.argv[3], limit: 3 }, function(error, data) {
		error && console.log(error);
		console.log("Artists:");
		for (var i in data.tracks.items[0].artists){
			console.log(data.tracks.items[0].artists[i].name)
		}
		console.log("The song's name: "+data.tracks.items[0].name);

		console.log("Preview link: "+data.tracks.items[0].preview_url);
		
		console.log("The album: "+data.tracks.items[0].album.name);
	});
	break;
	case "movie-this":	
	DEBUG && console.log(process.argv[3])

	if(!(!!process.argv[3])){
		console.log("if you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/")
		process.argv[3] = "Mr.nobody";
	}
	request('http://www.omdbapi.com/?apikey=b5d73fa9&t='+process.argv[3], function (error, response, body) {
		body = JSON.parse(body);
		DEBUG && console.log(error)
		if(!!error){
			console.log('error:', error);
			return 0;
		}
		console.log("Title: "+body.Title);
		console.log("Year: "+body.Year)
		console.log("Rating: "+body.Rated);
		console.log("Rotten Tomatoes Rating: "+body.Ratings[2].Value);
		console.log("Country: "+body.Country);
		console.log("Language: "+body.Language);
		console.log("Plot: "+body.Plot);
		console.log("Actors: "+body.Actors);
	});
	break;
	case "do-what-it-says":
	DEBUG && console.log(process.argv[2]);
	break;
	default:
	break;
}


// request('http://www.google.com', function (error, response, body){

// });