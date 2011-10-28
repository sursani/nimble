var sys = require('sys');
var twitter = require('twitter');

var TweetProvider = require('../../providers/tweet_provider').TweetProvider;

var celebTweetProvider = new TweetProvider('celebrity');
var celebAccessToken = "386324335-xUNH0SVvmaz87RQ246VPUaNTls2wftrYPH4T425Y";
var celebAccessTokenSecret= "kuA0Ub5GXnVT8cOWe8Rn9OcUHhSBaHqVOZ2fbDg0CHo";

var celebDaemonProcess = function(){
	twitter.getUserStream('celebrity', celebAccessToken, celebAccessTokenSecret, function (tweet) {
		celebTweetProvider.save(tweet, function() {
			console.log("saving tweet by " + tweet.user_name);
		});
	});
};

celebDaemonProcess();