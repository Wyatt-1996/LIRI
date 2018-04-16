require("dotenv").config();
var fs = require('fs');
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');

var spotify = new Spotify(keys.spotify);

var client = new Twitter(keys.twitter);

var programToRun = process.argv[2];

var programChoice = process.argv[3];


if (programToRun == 'spotify-this') {

    spotifyThis();

} else if (programToRun == 'my-tweets') {

    myTweets();

} else if (programToRun == 'movie-this') {

    movieThis();

} else if (programToRun == 'do-what-it-says') {

    doWhatItSays();

} else {

    console.log('Request not recognized');

}

function spotifyThis() {
    console.log('Spotify something');
    if (programChoice == undefined) {

        programChoice = 'I Want it That Way'
    }
    spotify.search({ type: 'track', query: programChoice }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data.tracks.items[0].artists[0].name);
        console.log(data.tracks.items[0].name);
        console.log(data.tracks.items[0].artists[0].external_urls.spotify);
        console.log(data.tracks.items[0].album.name);

        var bandName = 'Artist: ' + data.tracks.items[0].artists[0].name;
        var trackName = 'Track Name: ' + data.tracks.items[0].name;
        var spotifyLink = 'Link: ' + data.tracks.items[0].artists[0].external_urls.spotify;
        var albumName = 'Album: ' + data.tracks.items[0].album.name;

        fs.appendFile("log.txt", '- SPOTIFY -' + '\n' + bandName + '\n' + trackName + '\n' + albumName + '\n' + spotifyLink + '\n' + '\n', function (err) {

            // If the code experiences any errors it will log the error to the console.
            if (err) {
                return console.log(err);
            }

            // Otherwise, it will print: "log.txt was updated!"
            console.log("log.txt was updated!");

        });
    });

}

function myTweets() {
    // console.log('Read my tweets');
    var params = { screen_name: 'nodejs' };

    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {

            for (i = 0; i < 20; i++) {

                console.log(i + '  ' + tweets[i].text);
                console.log(tweets[i].created_at);

                // var tweet = tweets[i].text;
                // var date = tweets[i].created_at
                // fs.writeFile("log.txt", tweet + '\n' + date + '\n', function (err) {

                //     // If the code experiences any errors it will log the error to the console.
                //     if (err) {
                //         return console.log(err);
                //     }

                // });
                // // Otherwise, it will print: "log.txt was updated!"
                // console.log("log.txt was updated!");

            }
        }
    });
}

function movieThis() {
    console.log('movies');
    if (programChoice == undefined) {

        programChoice = 'jurassic park'
    }
    request('http://www.omdbapi.com/?apikey=c5a8df09&t=' + programChoice, function (error, response, body) {
        // console.log('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('Title: ', JSON.parse(body).Title);
        console.log('Year: ', JSON.parse(body).Year);
        console.log('IMDB: ', JSON.parse(body).Ratings[0].Value);
        console.log('Rotten Tomatoes: ', JSON.parse(body).Ratings[1].Value);
        console.log('Country: ', JSON.parse(body).Country);
        console.log('Language: ', JSON.parse(body).Language);
        console.log('Plot: ', JSON.parse(body).Plot);
        console.log('Actors: ', JSON.parse(body).Actors);

        var title = 'Title: ' + JSON.parse(body).Title;
        var year = 'Year Released: ' + JSON.parse(body).Year;
        var IMDB = 'IMDB Rating: ' + JSON.parse(body).Ratings[0].Value;
        var RT = 'Rotten Tomatoes: ' + JSON.parse(body).Ratings[1].Value;
        var country = 'Country: ' + JSON.parse(body).Country;
        var lang = 'Language: ' + JSON.parse(body).Language;
        var plot = 'Plot: ' + JSON.parse(body).Plot;
        var cast = 'Actors: ' + JSON.parse(body).Actors;

        fs.appendFile('log.txt', '- MOVIE -' + '\n' + title + '\n' + year + '\n' + IMDB + '\n' + RT + '\n' + country + '\n' + lang + '\n' + plot + '\n' + cast + '\n' + '\n',
            function (err) {
                // If the code experiences any errors it will log the error to the console.
                if (err) {
                    return console.log(err);
                }

                // Otherwise, it will print: "movies.txt was updated!"
                console.log("log.txt was updated!");
            });
    });
}

function doWhatItSays() {
    // console.log(fs);
    fs.readFile('random.txt', 'utf8', function (error, data) {

        if (error) {
            return console.log(error);
        }
        console.log(data);
        
        // store data
        var randomText = data;

        fs.appendFile('log.txt', '- RANDOM TXT -' + '\n' + data + '\n' + '\n', function (err) {
            // If the code experiences any errors it will log the error to the console.
            if (err) {
                return console.log(err);
            }
    
            // Otherwise, it will print: "log.txt was updated!"
            console.log("log.txt was updated!");
        });
    });
    
}