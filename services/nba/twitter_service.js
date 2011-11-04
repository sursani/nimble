var sys = require('sys');
var twitter = require('twitter');

var TweetProvider = require('../../providers/tweet_provider').TweetProvider;

var tweetProvider = new TweetProvider('nba');
var nbaAccessToken = "399110344-H3TlQlfTKQwBZo7yfilrrTUIRZ0turcg3BQJTsjg";
var nbaAccessTokenSecret= "KFi3M2DVQxfYVU0Mk7HXKNtdjm6v6QClpwtftW6rY";

var nbaDaemonProcess = function() {
	var category = 'nba';
	twitter.getUserStream(category, nbaAccessToken, nbaAccessTokenSecret, function (tweet) {
		tweetProvider.save(category, tweet, function() {
			console.log("saving tweet by " + tweet.user_name);
		});
	});
};

nbaDaemonProcess();



