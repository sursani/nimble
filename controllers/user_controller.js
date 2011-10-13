var sys = require('sys');
var twitter = require('twitter');

var TweetProvider = require('../providers/tweet_provider').TweetProvider;
var TweetProvider = new TweetProvider();
//var FriendProvider = require('../providers/friend_provider').FriendProvider;
//var friendProvider = new FriendProvider();

module.exports = {
	displayUserTweets: function (req, res) {
		TweetProvider.getPagedTweetsByUser(1, req.params.user_name, function(err, docs) {
			if (!err) {
				var viewModel = {
					user_name: req.params.user_name,
					tweets: docs
				};
				
				res.render('index/user', {
					title: 'Nimble Celebrity Tweets for ' + req.params.user_name,
					model: viewModel
				});
			} else {
				res.end();
			}
		});
	},
	
	getMoreTweetsByUser: function (req, res) {
		TweetProvider.getPagedTweetsByUser(req.body.page, req.body.user_name, function(err, docs) {
			if (!err) {
				res.json(docs);
			} else {
				res.end();
			}
		});
	}
};