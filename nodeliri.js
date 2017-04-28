let fs = require('fs');
let keys = require('./keys.js');
let request = require('request');
let spotify = require('spotify');
let Twitter = require('twitter');


//User's request
let userRequest = process.argv[2];
let parameter = process.argv[3];

let client = new Twitter({
  consumer_key:'6VGLcANF66SZIaWyWSB8V6Pw7',
  consumer_secret:'SmCFWGsO4JEP8D71mJ7QdWuu0E3B4oBRSUKONVUAwbEFHVIrQd',
  access_token_key:'31961275-moMgw7dd3P1Q7sRvy09VLI2Isv0acnNsx8ytqwy2m',
  access_token_secret:'PlgID6ZGjvr7EvfO7dm9qMa0egsGn0Y4zba4QIQzSrGGr',
});

userQuery(userRequest, parameter);

function userQuery(userRequest, parameter){
	switch (userRequest){
		case "my-tweets":
			twitter();
			break;
		case "spotify-this-song":
			spotifyThisSong(parameter);
			break;
		case "movie-this":
			movie(parameter);
			break;
		case "do-what-it-says":
			doWhatItSays();
			break;
		default:
			console.log("Your Choices are:\nmy-tweets\nspotify-this-song\nmovie-this\ndo-what-it-says\n");
	}
}
//twitter defaults to my tweets
function twitter(){
	console.log("\n\nMost recent Tweets\n");

	let parameters = {screen_name: '@JakeBeaube'};
	client.get('statuses/user_timeline', parameters, function(error, tweets, response){
		if (!error) {
			let totalTweets = tweets.length
			if (totalTweets>20){
				totalTweets=20;
			}
			for (i=0;i<totalTweets;++i){
				console.log(tweets[i].created_at+": "+tweets[i].text);

			}
				console.log("\n");
		}else{console.log(error)}



 
});
}

function spotifyThisSong(song){
	//default if nothing selected
	if (!song) {
		song = 'Roxanne';
	};

	let spotify = require('spotify');
	 
	spotify.search({type: 'track', query: song}, function(err, data) {
	    if (!err) {
	        for (var i = 0; i < 10; i++) {
	        	if (data.tracks.items[i] != undefined) {
	        		console.log("\n---------------------\n");
			    	console.log('Artist: ' + data.tracks.items[i].artists[0].name)//Artist name
			    	console.log('Song: ' + data.tracks.items[i].name)//Song name
			    	console.log('Album: ' + data.tracks.items[i].album.name)//Album name
			    	console.log('Preview Url: ' + data.tracks.items[i].preview_url)//Preview URL
			    	console.log("\n---------------------\n");
			    };
	        };

	    } else {
	    	console.log('Error occurred: ' + err);
	    
	    };
	});
};

function movie(movie){
	if(!movie){
		//default if nothing selected
		movie = 'The Monster Squad'
		request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=full&tomatoes=true&r=json", function (error, response, body) {
		if(!error && response.statusCode == 200) {
			let info = JSON.parse(body)
			console.log("\n---------------------\n");
			console.log("Title: " + info.Title);
			console.log("Starring: " + info.Actors + "\n");
			console.log("Year: " + info.Year);
			console.log("Language: " + info.Language);
			console.log("IMDB Rating: " + info.imdbRating);
			console.log("Country: " + info.Country + "\n");
			console.log("Plot: " + info.Plot + "\n");	
			console.log("Tomato Score: " + info.tomatoUserMeter);
			console.log("Tomato URL: " + info.tomatoURL + "\n");
			console.log("\n---------------------\n");
		} else {
			console.log('Error occurred' + error);
		}
	});
		
	} else {
		request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=full&tomatoes=true&r=json", function (error, response, body) {
			if(!error && response.statusCode == 200) {
				let info = JSON.parse(body)
				console.log("\n---------------------\n");
				console.log("Title: " + info.Title);
				console.log("Starring: " + info.Actors + "\n");
				console.log("Year: " + info.Year);
				console.log("Language: " + info.Language);
				console.log("IMDB Rating: " + info.imdbRating);
				console.log("Country: " + info.Country + "\n");
				console.log("Plot: " + info.Plot+ "\n");	
				console.log("Tomato Score: " + info.tomatoUserMeter);
				console.log("Tomato URL: " + info.tomatoURL);
				console.log("\n---------------------\n");
			} else {
				console.log('Error occurred' + error);

			}
		});
	}
}
