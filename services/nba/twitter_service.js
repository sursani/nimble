var sys = require('sys');
var twitter = require('twitter');

var TweetProvider = require('../../providers/tweet_provider').TweetProvider;

var tweetProvider = new TweetProvider();
var nbaAccessToken = "";
var nbaAccessTokenSecret= "";

var nbaDaemonProcess = function() {
	var category = 'nba';
	twitter.getUserStream(category, nbaAccessToken, nbaAccessTokenSecret, function (tweet) {
		tweetProvider.save(category, tweet, function() {
			console.log("saving tweet by " + tweet.user_name);
		});
	});
};

nbaDaemonProcess();



