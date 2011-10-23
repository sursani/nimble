var sys = require('sys');
var nimble = require('nimble');

var TweetProvider = require('../providers/tweet_provider').TweetProvider;
var FriendProvider = require('../providers/friend_provider').FriendProvider;

module.exports = {

	index: function (req, res, next) {
		var category = req.params.category.toLowerCase();
		if (!nimble.isValidCategory(category)) {
			next();
		}
		
		var tweetProvider = new TweetProvider(category);
		var friendProvider = new FriendProvider(category);
		tweetProvider.getPagedTweets(1, function(err, docs) {
			if (!err) {
				friendProvider.find(function(err, friends) {
					if (!err) {
						var viewModel = {
							tweets: docs,
							friends: friends,
							category: category
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
	},
	
	getMoreTweets: function (req, res, next) {
		var category = req.params.category.toLowerCase();
		if (!nimble.isValidCategory(category)) {
			next();
		}
		
		var tweetProvider = new TweetProvider(category);
		tweetProvider.getPagedTweets(req.body.page, function(err, docs) {
			if (!err) {
				res.json(docs);
			} else {
				next();
			}
		});
	}
};
