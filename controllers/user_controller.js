var sys = require('sys');

var TweetProvider = require('../providers/tweet_provider').TweetProvider;
var FriendProvider = require('../providers/friend_provider').FriendProvider;
var tweetProvider = new TweetProvider();
var friendProvider = new FriendProvider();

module.exports = {
	
	displayUserTweets: function (req, res, next) {
		if (req.category) {
			tweetProvider.getPagedTweetsByUser(null, req.category, req.params.user_name, function (err, tweets) {
				if (!err && tweets.length > 0) {
					friendProvider.find(req.category, function (err, friends) {
						if (!err) {
							var viewModel = {
								user_name: req.params.user_name,
								tweets: tweets,
								friends: friends,
								category: req.category
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
		if (req.category) {
			tweetProvider.getPagedTweetsByUser(req.body.last_date, req.category, req.body.user_name, function (err, tweets) {
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