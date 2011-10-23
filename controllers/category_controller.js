var sys = require('sys');
var twitter = require('twitter');

var TweetProvider = require('../providers/tweet_provider').TweetProvider;
var FriendProvider = require('../providers/friend_provider').FriendProvider;

// constants
var categories = ['celebrity'];

function isValidCategory(catArray, cat) {
    return (catArray.indexOf(cat) != -1);
}

module.exports = {

	index: function (req, res) {
		var category = req.params.category.toLowerCase();
		if (!isValidCategory(categories, category)) {
			res.end();
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
						res.end();
					}
				});
			} else {
				res.end();
			}
		});
	},
	
	getMoreTweets: function (req, res) {
		var category = req.params.category;
		if (!isValidCategory(categories, category)) {
			res.end();
		}
		
		var tweetProvider = new TweetProvider(category);
		tweetProvider.getPagedTweets(req.body.page, function(err, docs) {
			if (!err) {
				res.json(docs);
			} else {
				res.end();
			}
		});
	}
};
