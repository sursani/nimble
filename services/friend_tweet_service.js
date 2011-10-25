var sys = require('sys');
var twitter = require('twitter');
var TweetProvider = require('../providers/tweet_provider').TweetProvider;
var tweetProvider = new TweetProvider('celebrity');
var FriendProvider = require('../providers/friend_provider').FriendProvider;
var friendProvider = new FriendProvider('celebrity');
var access_token = "386324335-xUNH0SVvmaz87RQ246VPUaNTls2wftrYPH4T425Y";
var access_token_secret= "kuA0Ub5GXnVT8cOWe8Rn9OcUHhSBaHqVOZ2fbDg0CHo";
var screen_name = "CarTweetin";


//the code below just adds friends to the database
//before adding we need to verify if a friend exist then update
friendProvider.find(function(err, data){
	if (!err) {
		for (var i=0; i<=data.length-1; i++){
			console.log('getting tweets for ' + data[i].friend_id);
			
			var getUserTweet = twitter.getUserTweets(access_token, access_token_secret, data[i].friend_id, function(err, tweets){
				if (!err){
					for (var j=0;j<=tweets.length-1;j++){
						tweetProvider.save(tweets[j], function(){
							console.log("saving tweet by " + tweets[j].user_name);
						});
					};
				} else {
					console.log(err);
				}
			});
			
		}
	}
});


