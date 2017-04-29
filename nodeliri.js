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
			song = 'The Sign';
		};

		let spotify = require('spotify');
	 
		spotify.search({type: 'track', query: song}, function(err, data) {
	    	if (!err) {
	        	for (var i = 0; i < 10; i++) {
	        		if (data.tracks.items[i] != undefined) {
	        			console.log('Artist: ' + data.tracks.items[i].artists[0].name)
			    		console.log('Song: ' + data.tracks.items[i].name)
			    		console.log('Album: ' + data.tracks.items[i].album.name)
			    		console.log('Preview Url: ' + data.tracks.items[i].preview_url)
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
			movie = 'Mr Nobody'
			request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=full&tomatoes=true&r=json", function (error, response, body) {
			if(!error && response.statusCode == 200) {
				let json = JSON.parse(body)
				console.log("Title: " + json.Title);
				console.log("Starring: " + json.Actors + "\n");
				console.log("Year: " + json.Year);
				console.log("Language: " + json.Language);
				console.log("IMDB Rating: " + json.imdbRating);
				console.log("Country: " + json.Country + "\n");
				console.log("Plot: " + json.Plot + "\n");	
				console.log("Tomato Score: " + json.tomatoUserMeter);
				console.log("Tomato URL: " + json.tomatoURL + "\n");
				console.log("\n---------------------\n");
				//appends the results to the log.txt file
				/*fs.appendFile("Title: " + json.Title);
				fs.appendFile("Starring: " + json.Actors + "\n");
				fs.appendFile("Year: " + json.Year);
				fs.appendFile("Language: " + json.Language);
				fs.appendFile("IMDB Rating: " + json.imdbRating);
				fs.appendFile("Country: " + json.Country + "\n");
				fs.appendFile("Plot: " + json.Plot + "\n");	
				fs.appendFile("Tomato Score: " + json.tomatoUserMeter);
				fs.appendFile("Tomato URL: " + json.tomatoURL + "\n");
				fs.appendFile("\n---------------------\n");*/
			} 
		});
		
		} else {
			request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=full&tomatoes=true&r=json", function (error, response, body) {
				if(!error && response.statusCode == 200) {
					let json = JSON.parse(body)
					console.log("Title: " + json.Title);
					console.log("Starring: " + json.Actors + "\n");
					console.log("Year: " + json.Year);
					console.log("Language: " + json.Language);
					console.log("IMDB Rating: " + json.imdbRating);
					console.log("Country: " + json.Country + "\n");
					console.log("Plot: " + json.Plot+ "\n");	
					console.log("Tomato Score: " + json.tomatoUserMeter);
					console.log("Tomato URL: " + json.tomatoURL);
					console.log("\n---------------------\n");
					//append the results to the log.txt file
					/*fs.appendFile("Title: " + json.Title);
				fs.appendFile("Starring: " + json.Actors + "\n");
				fs.appendFile("Year: " + json.Year);
				fs.appendFile("Language: " + json.Language);
				fs.appendFile("IMDB Rating: " + json.imdbRating);
				fs.appendFile("Country: " + json.Country + "\n");
				fs.appendFile("Plot: " + json.Plot + "\n");	
				fs.appendFile("Tomato Score: " + json.tomatoUserMeter);
				fs.appendFile("Tomato URL: " + json.tomatoURL + "\n");
				fs.appendFile("\n---------------------\n");*/
					//deprecation warning?
				} 

		
			});
		}
	}

	function doWhatItSays(){

		fs.readFile("random.txt","utf8",function(err,data){

		console.log(data);
		var dataArr = data.split(",");
		userSong = dataArr[1];
		spotifyThisSong(userSong);
		});
	}
