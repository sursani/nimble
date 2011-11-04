var sys = require('sys');
var nimble = require('nimble');

var TweetProvider = require('../providers/tweet_provider').TweetProvider;
var FriendProvider = require('../providers/friend_provider').FriendProvider;
var tweetProvider = new TweetProvider();
var friendProvider = new FriendProvider();

module.exports = {
	displayUserTweets: function (req, res, next) {
		var category = req.params.category.toLowerCase();
		if (nimble.isValidCategory(category)) {
			tweetProvider.getPagedTweetsByUser(null, category, req.params.user_name, function (err, tweets) {
				if (!err && tweets.length > 0) {
					friendProvider.find(category, function (err, friends) {
						if (!err) {
							var viewModel = {
								user_name: req.params.user_name,
								tweets: tweets,
								friends: friends,
								category: category
							};
				
							var userInfo = {};
							userInfo.user_name = tweets[0].user_name;
							userInfo.full_name = tweets[0].full_name;
				
							res.render('user/user', {
								title: userInfo.full_name + ' (@' + userInfo.user_name + ')',
								model: viewModel
							});
						} else {
							next();
						}
					});
				} else {
					next();
				}
			});
		} else {
			next();
		}
	},
	
	getMoreTweetsByUser: function (req, res, next) {
		var category = req.params.category.toLowerCase();
		if (nimble.isValidCategory(category)) {
			tweetProvider.getPagedTweetsByUser(req.body.last_date, category, req.body.user_name, function (err, tweets) {
				if (!err) {
					res.json(tweets);
				} else {
					next();
				}
			});
		} else {
			next();
		}
	}
};