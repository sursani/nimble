var sys = require('sys');
var twitter = require('twitter');

var TweetProvider = require('../../providers/tweet_provider').TweetProvider;

var tweetProvider = new TweetProvider();
var nflAccessToken = "405881726-PwITAhRURYAB27XimgzTUg5tJmjaGZSscCoRXxSs";
var nflAccessTokenSecret= "OA8IuLk5fXRwbxoKgmeT9EJvIiGBKk1d14agSFry1Iw";

var nflDaemonProcess = function() {
	var category = 'nfl';
	twitter.getUserStream(category, nflAccessToken, nflAccessTokenSecret, function (tweet) {
		tweetProvider.save(category, tweet, function() {
			console.log("saving tweet by " + tweet.user_name);
		});
	});
};

nflDaemonProcess();