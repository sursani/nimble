var sys = require('sys');
var nimble = require('nimble');

var TweetProvider = require('../providers/tweet_provider').TweetProvider;
var FriendProvider = require('../providers/friend_provider').FriendProvider;

module.exports = {

	index: function (req, res, next) {
		var category = req.params.category.toLowerCase();
		if (nimble.isValidCategory(category)) {
			var tweetProvider = new TweetProvider(category);
			var friendProvider = new FriendProvider(category);
			tweetProvider.getPagedTweets(1, category, function(err, docs, cat) {
				if (!err) {
					friendProvider.find(function(err, friends) {
						if (!err) {
							var viewModel = {
								tweets: docs,
								friends: friends,
								category: cat
							};
						
							res.render('category/index', {
								title: 'Nimble Celebrity Tweets',
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
	
	getMoreTweets: function (req, res, next) {
		var category = req.params.category.toLowerCase();
		if (nimble.isValidCategory(category)) {
			var tweetProvider = new TweetProvider(category);
			tweetProvider.getPagedTweets(req.body.page, category, function(err, docs) {
				if (!err) {
					res.json(docs);
				} else {
					next();
				}
			});
		} else {
			next();
		}
	}
};
