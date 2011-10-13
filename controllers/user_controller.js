var sys = require('sys');
var twitter = require('twitter');

var TweetProvider = require('../providers/tweet_provider').TweetProvider;
var TweetProvider = new TweetProvider();
//var FriendProvider = require('../providers/friend_provider').FriendProvider;
//var friendProvider = new FriendProvider();

module.exports = {
	displayUserTweets: function (req, res) {
		TweetProvider.getPagedTweetsByUser(1, req.params.user_name, function(err, docs) {
			if (!err && docs.length > 0) {
				var viewModel = {
					user_name: req.params.user_name,
					tweets: docs
				};
				
				var userInfo = {};
				userInfo.user_name = docs[0].user_name;
				userInfo.full_name = docs[0].full_name;
				
				res.render('index/user', {
					title: userInfo.full_name + ' (@' + userInfo.user_name + ') - Nimble Celebrity Tweets',
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