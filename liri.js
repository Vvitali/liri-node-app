var DEBUG = false;

DEBUG && console.log("Liri: start!");
var twitterKeys = require("./keys.js")
var Twitter = require('twitter');
var client = Twitter(twitterKeys);
var request = require('request');
var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/log.txt', {flags : 'a'});
var log_stdout = process.stdout;

console.log = function(d) { //
	log_file.write(util.format(d) + '\n');
	log_stdout.write(util.format(d) + '\n');
};

var Spotify = require('node-spotify-api');

var spotify = new Spotify({
	id: "d028e5930377471885981d046250476a",
	secret: "8142e3cf6e9a45bfbfed6e55944fb638"
});

var argument = '';
for (var i =3; i<process.argv.length; i++){
	argument+=process.argv[i]+"+";
}

var myTweets = ()=>{
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
}
var movieThis = ()=>{
	DEBUG && console.log(argument)

	if(!(!!argument)){
		console.log("if you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/")
		process.argv[3] = "Mr.nobody";
	}
	//somemovies do not contains certain fields - so I have to use && statment to track it
	request('http://www.omdbapi.com/?apikey=b5d73fa9&t='+argument, function (error, response, body) {
		body = JSON.parse(body);
		DEBUG && console.log(error)
		if(!!error || !body.Title){
			console.log('error:', error);
			return 0;
		}
		console.log("Title: "+body.Title);
		console.log("Year: "+body.Year)
		console.log("Rating: "+body.Rated);
		body.Ratings[2] && console.log("Rotten Tomatoes Rating: "+body.Ratings[2].Value);
		console.log("Country: "+body.Country);
		console.log("Language: "+body.Language);
		console.log("Plot: "+body.Plot);
		console.log("Actors: "+body.Actors);
	});
}

var spotifyThisSong = ()=>{
	spotify.search({ type: 'track', query: argument, limit: 3 }, function(error, data) {
		error && console.log(error);
		console.log("Artists:");
		for (var i in data.tracks.items[0].artists){
			console.log(data.tracks.items[0].artists[i].name)
		}
		console.log("The song's name: "+data.tracks.items[0].name);

		console.log("Preview link: "+data.tracks.items[0].preview_url);
		
		console.log("The album: "+data.tracks.items[0].album.name);
	});
}
var doWhatItSays = ()=>{
	DEBUG && console.log("Argument: "+process.argv[2]);
	fs.readFile('random.txt', "utf8", (error, data) => {
		if (error) {
			console.log('DWIS error:', error);
			return 0;
		}
		data = data.split(" ");
		var operation = data[0];

		DEBUG && console.log("Case:"+operation);
		DEBUG && console.log("len:"+data.length);

		argument = '';
		for (var i =1; i<data.length; i++){
			argument+=data[i]+"+";
		}
		DEBUG && console.log("Arguments from file: "+argument);
		switch(operation){
			case"movie-this":
			movieThis();
			break;
			case "my-tweets":
			myTweets();
			break;
			case "spotify-this-song":
			spotifyThisSong();
			break;
			//you should be very careful with typing this function to your random.txt file - it will cause infinity recursion
			case "doWhatItSays":
			doWhatItSays();
			break;
			default:
			break;
		}
	});
}

switch(process.argv[2]){
	case 'my-tweets':
	myTweets();
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
	movieThis();
	break;
	case "do-what-it-says":
	doWhatItSays();
	break;
	default:
	break;
}


// request('http://www.google.com', function (error, response, body){

// });