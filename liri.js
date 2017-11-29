var DEBUG = false;

DEBUG && console.log("Liri: start!");
var twitterKeys = require("./keys.js")
var Twitter = require('twitter');
var client = Twitter(twitterKeys);

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

	console.log(process.argv[2]);
	break;
	case 'spotify-this-song':
	request
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