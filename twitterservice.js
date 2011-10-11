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
	
	/*
	twitter.getFriendsIds(access_token, access_token_secret, screen_name, function(err, data){
		if (!err){
			for (var i=0; i<=data.length-1; i++){
				twitter.getUserDetails(access_token,access_token_secret,data[i], function(err,data){
					console.log('get user for ' + data[i]);
					var friend = {
						id: data.id,
						user_name: data.user_name,
						full_name: data.full_name,
						description: data.description
					};
					friendProvider.save(friend, function(){
						console.log('saving ' + friend.full_name + ' to database');
					});
				});
			}
		}
	});
	*/
};

daemonProcess();



