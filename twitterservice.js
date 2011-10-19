var sys = require('sys');
var twitter = require('twitter');
var TweetProvider = require('./providers/tweet_provider').TweetProvider;
var tweetProvider = new TweetProvider();
var FriendProvider = require('./providers/friend_provider').FriendProvider;
var friendProvider = new FriendProvider();
var access_token = "386324335-xUNH0SVvmaz87RQ246VPUaNTls2wftrYPH4T425Y";
var access_token_secret= "kuA0Ub5GXnVT8cOWe8Rn9OcUHhSBaHqVOZ2fbDg0CHo";
var screen_name = "CarTweetin";

var daemonProcess = function(){
	twitter.getUserStream(access_token, access_token_secret, function(tweet){
		tweetProvider.save(tweet, function(){
			console.log("saving tweet by " + tweet.user_name);
		});
	}); 
};

daemonProcess();



