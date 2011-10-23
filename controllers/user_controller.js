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
	displayUserTweets: function (req, res) {
		var category = req.params.category.toLowerCase();
		if (!isValidCategory(categories, category)) {
			next();
		}
		
		var tweetProvider = new TweetProvider(category);
		var friendProvider = new FriendProvider(category);
		
		tweetProvider.getPagedTweetsByUser(1, req.params.user_name, function(err, docs) {
			if (!err && docs.length > 0) {
				friendProvider.find(function(err, friends) {
					if (!err) {
						var viewModel = {
							user_name: req.params.user_name,
							tweets: docs,
							friends: friends,
							category: category
						};
				
						var userInfo = {};
						userInfo.user_name = docs[0].user_name;
						userInfo.full_name = docs[0].full_name;
				
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
	},
	
	getMoreTweetsByUser: function (req, res) {
		var category = req.params.category;
		if (!isValidCategory(categories, category)) {
			next();
		}
		
		var tweetProvider = new TweetProvider(category);
		
		tweetProvider.getPagedTweetsByUser(req.body.page, req.body.user_name, function(err, docs) {
			if (!err) {
				res.json(docs);
			} else {
				next();
			}
		});
	}
};