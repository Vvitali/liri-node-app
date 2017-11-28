console.log("Liri: start!");
var twitterKeys = require("./keys.js")

switch(process.argv[2]){
	case 'my-tweets':
	
	console.log(process.argv[2]);
	break;
	case 'spotify':
	
	console.log(process.argv[2]);
	break;
	case "movie-this":
	
	console.log(process.argv[2]);
	break;
	default:
	break;
}
