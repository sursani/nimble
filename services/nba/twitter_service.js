var sys = require('sys');
var twitter = require('twitter');

var TweetProvider = require('../../providers/tweet_provider').TweetProvider;

var nbaTweetProvider = new TweetProvider('nba');
var nbaAccessToken = "399110344-H3TlQlfTKQwBZo7yfilrrTUIRZ0turcg3BQJTsjg";
var nbaAccessTokenSecret= "KFi3M2DVQxfYVU0Mk7HXKNtdjm6v6QClpwtftW6rY";

var nbaDaemonProcess = function(){
	twitter.getUserStream('nba', nbaAccessToken, nbaAccessTokenSecret, function (tweet) {
		nbaTweetProvider.save(tweet, function() {
			console.log("saving tweet by " + tweet.user_name);
		});
	});
};

nbaDaemonProcess();



