var sys = require('sys');
var twitter = require('twitter');

var TweetProvider = require('../../providers/tweet_provider').TweetProvider;

var tweetProvider = new TweetProvider();
var celebAccessToken = "";
var celebAccessTokenSecret= "";

var celebDaemonProcess = function() {
	var category = 'celebrity';
	twitter.getUserStream(category, celebAccessToken, celebAccessTokenSecret, function (tweet) {
		tweetProvider.save(category, tweet, function() {
			console.log("saving tweet by " + tweet.user_name);
		});
	});
};

celebDaemonProcess();