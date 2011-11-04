var sys = require('sys');
var twitter = require('twitter');

var TweetProvider = require('../../providers/tweet_provider').TweetProvider;

var tweetProvider = new TweetProvider();
var celebAccessToken = "386324335-xUNH0SVvmaz87RQ246VPUaNTls2wftrYPH4T425Y";
var celebAccessTokenSecret= "kuA0Ub5GXnVT8cOWe8Rn9OcUHhSBaHqVOZ2fbDg0CHo";

var celebDaemonProcess = function() {
	var category = 'celebrity';
	twitter.getUserStream(category, celebAccessToken, celebAccessTokenSecret, function (tweet) {
		tweetProvider.save(category, tweet, function() {
			console.log("saving tweet by " + tweet.user_name);
		});
	});
};

celebDaemonProcess();