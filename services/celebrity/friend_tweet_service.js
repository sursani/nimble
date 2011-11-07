var sys = require('sys');
var twitter = require('twitter');

var FriendProvider = require('../../providers/friend_provider').FriendProvider;
var TweetProvider = require('../../providers/tweet_provider').TweetProvider;
var friendProvider = new FriendProvider();
var tweetProvider = new TweetProvider();

var access_token = "386324335-xUNH0SVvmaz87RQ246VPUaNTls2wftrYPH4T425Y";
var access_token_secret= "kuA0Ub5GXnVT8cOWe8Rn9OcUHhSBaHqVOZ2fbDg0CHo";
var screen_name = "CarTweetin";

//the code below just adds friends to the database
//before adding we need to verify if a friend exist then update
var category = 'celebrity';

var friendTweetService = function () {
	friendProvider.find(category, function(err, data){
		if (!err) {
			for (var i=0; i<=data.length-1; i++){
				console.log('getting tweets for ' + data[i].friend_id);
			
				twitter.getUserTweets(access_token, access_token_secret, data[i].friend_id, function (err, tweets) {
					if (!err) {
						for (var j=0; j<=tweets.length-1; j++) {
							tweetProvider.save(category, tweets[j], function() {});
						}
					} else {
						console.log(err);
					}
				});
			}
		}
	});
};

friendTweetService();
setInterval(friendTweetService, 3600000);